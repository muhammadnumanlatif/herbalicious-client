import productsData from '@/src/data/products.json';

// Return products from JSON
export async function getProducts() {
  return productsData.map((p: any) => ({
    id: p.id,
    name: p.name,
    slug: p.id,
    image: p.image || '/Products/placeholder.png',
    price: p.price || 'TBA',
    category: p.category || 'General',
    shortDescription: p.shortDescription || '',
  }));
}

export async function getPaginatedProducts(first = 20, after: string | null = null) {
  const products = await getProducts();
  return { products, pageInfo: { hasNextPage: false, endCursor: null } };
}

export async function getProductBySlug(slug: string) {
  const product = productsData.find((p: any) => p.id === slug);
  if (!product) return null;
  // Map it to what the GraphQL query used to return so pages don't break
  return {
    title: product.name,
    content: product.description,
    featuredImage: { node: { sourceUrl: product.image } },
    productFields: {
      price: product.price,
      shortDescription: product.shortDescription,
      attributes: product.attributes ? Object.entries(product.attributes).map(([k, v]) => ({ name: k, value: String(v) })) : [],
      howToUse: product.proTip || ''
    },
    seo: {
      title: product.name,
      metaDesc: product.shortDescription,
      opengraphTitle: product.name,
      opengraphDescription: product.shortDescription,
      opengraphImage: { sourceUrl: product.image }
    }
  };
}

export async function getPageByURI(uri: string) {
  return null;
}
export const getPageBySlug = getPageByURI;

export async function getPosts(first = 20) {
  return [];
}

export async function getPaginatedPosts(first = 12, after: string | null = null) {
  return { posts: [], pageInfo: { hasNextPage: false, endCursor: null } };
}

export async function getPostBySlug(slug: string) {
  return null;
}
