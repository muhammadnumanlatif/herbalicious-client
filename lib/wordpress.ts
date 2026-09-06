import { listProducts, getProductById } from '@/lib/db';
import productsData from '@/src/data/products.json';

// Products are sourced from D1 (dashboard-managed). Falls back to the
// static JSON snapshot if D1 is unreachable so the storefront never goes blank.
export async function getProducts() {
  try {
    const products = await listProducts();
    if (products.length === 0) throw new Error('empty');
    return products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.id,
      image: p.image || '/Products/placeholder.png',
      price: p.price || 'TBA',
      category: p.category || 'General',
      shortDescription: p.shortDescription || '',
    }));
  } catch {
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
}

export async function getPaginatedProducts(first = 20, after: string | null = null) {
  const products = await getProducts();
  return { products, pageInfo: { hasNextPage: false, endCursor: null } };
}

// Raw product record (matches the old products.json shape) for pages that
// render the full product detail (price, attributes, keyActives, etc.)
export async function getRawProductById(id: string) {
  try {
    const product = await getProductById(id);
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice ?? undefined,
      category: product.category ?? undefined,
      image: product.image ?? undefined,
      shortDescription: product.shortDescription ?? undefined,
      description: product.description ?? undefined,
      attributes: product.attributes,
      suitableFor: product.suitableFor ?? undefined,
      keyActives: product.keyActives,
      safetyProfile: product.safetyProfile ?? undefined,
      proTip: product.proTip ?? undefined,
    };
  } catch {
    return productsData.find((p: any) => p.id === id) ?? null;
  }
}

export async function getProductBySlug(slug: string) {
  const product = await getRawProductById(slug);
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
