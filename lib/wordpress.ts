const API_URL = process.env.WORDPRESS_API_URL || 'https://cms.herbalicious-shop.com/graphql';

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCardFields on Product {
    id
    title
    slug
    featuredImage {
      node {
        sourceUrl
      }
    }
    productFields {
      price
      shortDescription
      category
    }
  }
`;

async function fetchAPI(query: string, { variables, revalidate, tags }: { variables?: any, revalidate?: number | false, tags?: string[] } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // Robustness: We do NOT wrap this in try/catch so Next.js can handle revalidation failures
  // by serving the stale cache. If this throws during revalidation, the old cache is kept.
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: revalidate === false ? 0 : (revalidate ?? 3600),
      tags
    }
  };

  if (revalidate === false) {
    fetchOptions.cache = 'no-store';
  }

  const res = await fetch(API_URL, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch API: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    // We throw so Next.js knows revalidation failed
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

/**
 * Fetches products from WordPress. 
 */
export async function getProducts() {
  const data = await fetchAPI(`
    ${PRODUCT_CARD_FRAGMENT}
    query AllProducts {
      products(first: 100) {
        nodes {
          ...ProductCardFields
        }
      }
    }
  `, {
    tags: ['products'],
    revalidate: 3600
  });

  // Helper to format the data
  return data?.products?.nodes?.map((p: any) => ({
    id: p.id,
    name: p.title,
    slug: p.slug,
    image: p.featuredImage?.node?.sourceUrl || '/Products/placeholder.png',
    price: p.productFields?.price || 'TBA',
    category: p.productFields?.category || 'General',
    shortDescription: p.productFields?.shortDescription || '',
  })) || [];
}

export async function getPaginatedProducts(first = 20, after: string | null = null) {
  const data = await fetchAPI(`
    ${PRODUCT_CARD_FRAGMENT}
    query GetPaginatedProducts($first: Int, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...ProductCardFields
        }
      }
    }
  `, {
    variables: { first, after },
    tags: ['products'],
    revalidate: 3600
  });

  const products = data?.products?.nodes?.map((p: any) => ({
    id: p.id,
    name: p.title,
    slug: p.slug,
    image: p.featuredImage?.node?.sourceUrl || '/Products/placeholder.png',
    price: p.productFields?.price || 'TBA',
    category: p.productFields?.category || 'General',
    shortDescription: p.productFields?.shortDescription || '',
  })) || [];

  return {
    products,
    pageInfo: data?.products?.pageInfo
  };
}

export async function getProductBySlug(slug: string) {
  const data = await fetchAPI(`
    query ProductBySlug($id: ID!) {
      product(id: $id, idType: SLUG) {
        title
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
        productFields {
          price
          shortDescription
          attributes
          howToUse
        }
        seo {
           title
           metaDesc
           opengraphTitle
           opengraphDescription
           opengraphImage {
              sourceUrl
           }
        }
      }
    }
  `, {
    variables: { id: slug },
    tags: ['products', `product-${slug}`],
    revalidate: 3600
  });

  return data?.product;
}

export async function getPageByURI(uri: string) {
  const data = await fetchAPI(`
    query PageByURI($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
        slug
        seo {
           title
           metaDesc
           fullHead
        }
      }
    }
  `, {
    variables: { id: uri },
    tags: ['pages', `page-${uri}`],
    revalidate: 86400 // Daily for pages
  });
  return data?.page;
}

// Alias for backward compatibility if needed, though we prefer URI for hierarchical pages
export const getPageBySlug = getPageByURI;

const POST_CARD_FRAGMENT = `
  fragment PostCardFields on Post {
    id
    title
    slug
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
      }
    }
    author {
      node {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export async function getPosts(first = 20) {
  const data = await fetchAPI(`
    ${POST_CARD_FRAGMENT}
    query AllPosts($first: Int!) {
      posts(first: $first) {
        nodes {
          ...PostCardFields
        }
      }
    }
    `, {
    variables: { first },
    tags: ['posts'],
    revalidate: 3600
  });

  return data?.posts?.nodes?.map((post: any) => ({
    id: post.slug, // Use slug as ID for routing
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt?.replace(/<[^>]+>/g, ''), // Strip HTML
    image: post.featuredImage?.node?.sourceUrl || '/images/blog-placeholder.jpg',
    author: post.author?.node?.name || 'Herbalicious Team'
  })) || [];
}

export async function getPaginatedPosts(first = 12, after: string | null = null) {
  const data = await fetchAPI(`
    ${POST_CARD_FRAGMENT}
    query GetPaginatedPosts($first: Int, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
            hasNextPage
            endCursor
        }
        nodes {
          ...PostCardFields
        }
      }
    }
  `, {
    variables: { first, after },
    tags: ['posts'],
    revalidate: 3600
  });

  const posts = data?.posts?.nodes?.map((post: any) => ({
    id: post.slug,
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt?.replace(/<[^>]+>/g, ''), // Strip HTML
    image: post.featuredImage?.node?.sourceUrl || '/images/blog-placeholder.jpg',
    author: post.author?.node?.name || 'Herbalicious Team'
  })) || [];

  return {
    posts,
    pageInfo: data?.posts?.pageInfo
  };
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
    query PostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        seo {
           title
           metaDesc
           opengraphTitle
           opengraphDescription
           opengraphImage {
              sourceUrl
           }
        }
      }
    }
  `, {
    variables: { id: slug },
    tags: ['posts', `post-${slug}`],
    revalidate: 3600
  });

  return data?.post;
}
