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

    try {
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

        const json = await res.json();
        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            return null;
        }
        return json.data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}

/**
 * Fetches products from WordPress. 
 * Since we aren't using WooCommerce, we fetch from a Custom Post Type named 'products'.
 * Note: You must register the 'products' CPT in WP and enable 'show_in_graphql' => true.
 */
export async function getProducts() {
    // Optimized: Only fetch fields needed for the Shop Grid / Listing using Fragment
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
        revalidate: 3600 // 1 hour default
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
    query AllProducts($first: Int, $after: String) {
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

export async function getPageBySlug(slug: string) {
    const data = await fetchAPI(`
    query PageBySlug($id: ID!, $idType: PageIdType!) {
      page(id: $id, idType: $idType) {
        title
        content
        slug
      }
    }
  `, {
        variables: { id: slug, idType: 'URI' },
        tags: ['pages', `page-${slug}`],
        revalidate: 86400 // Daily for pages
    });
    return data?.page;
}
