import { listProducts, getProductById, listBlogPosts, getBlogPostById } from '@/lib/db';
import productsData from '@/src/data/products.json';
import { blogs as blogsData } from '@/src/data/seoInsights';

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

// Blog posts are sourced from D1 (dashboard-managed), with a static
// fallback so the blog never goes blank if D1 is unreachable.
export async function getPosts(first = 20) {
  try {
    const posts = await listBlogPosts();
    if (posts.length === 0) throw new Error('empty');
    return posts.slice(0, first).map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.id,
      date: p.date,
      excerpt: p.excerpt || '',
      image: p.image || '/images/blog-placeholder.jpg',
      author: p.author || 'Herbalicious Team',
    }));
  } catch {
    return blogsData.slice(0, first).map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.id,
      date: b.date,
      excerpt: b.excerpt,
      image: b.image,
      author: b.author,
    }));
  }
}

export async function getPaginatedPosts(first = 12, after: string | null = null) {
  const posts = await getPosts(first);
  return { posts, pageInfo: { hasNextPage: false, endCursor: null } };
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await getBlogPostById(slug);
    if (!post) return null;
    return {
      slug: post.id,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: { node: { sourceUrl: post.image || '/images/blog-placeholder.jpg' } },
      author: { node: { name: post.author || 'Herbalicious Team' } },
      relatedProductId: post.relatedProductId,
    };
  } catch {
    const fallback = blogsData.find((b: any) => b.id === slug);
    if (!fallback) return null;
    return {
      slug: fallback.id,
      title: fallback.title,
      date: fallback.date,
      excerpt: fallback.excerpt,
      content: fallback.content,
      featuredImage: { node: { sourceUrl: fallback.image } },
      author: { node: { name: fallback.author } },
      relatedProductId: fallback.relatedProductId,
    };
  }
}
