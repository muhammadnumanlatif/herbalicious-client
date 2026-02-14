const API_URL = process.env.WORDPRESS_API_URL || 'https://cms.herbalicious-shop.com/graphql';

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
    const headers = { 'Content-Type': 'application/json' };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                variables,
            }),
            next: { revalidate: 3600 } // Cache for 1 hour
        });

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
    const data = await fetchAPI(`
    query AllProducts {
      products(first: 100) {
        nodes {
          id
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          # We use ACF or Custom Fields for price and details since no WooCommerce
          productFields {
            price
            shortDescription
            stockStatus
            category
          }
        }
      }
    }
  `);

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
      }
    }
  `, { variables: { id: slug } });

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
    });
    return data?.page;
}
