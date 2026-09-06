import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.resolve(ROOT_DIR, 'public');
const BASE_URL = 'https://herbalicious-shop.com';

const escapeXml = (str) => {
    return str.replace(/[<>&"']/g, (m) => {
        switch (m) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return m;
        }
    });
};

const encodePath = (path) => {
    return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
};

async function generate() {
    console.log('🚀 Starting Sitemap & Robots Automation (SEO/AEO/GEO Edition)...');

    // 1. Load Data
    let products;
    try {
        const output = execSync(
            'npx wrangler d1 execute herbalicious-db --remote --json --command "SELECT id, name, image FROM products"',
            { cwd: ROOT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
        );
        products = JSON.parse(output)[0].results;
        console.log(`🛍️  Loaded ${products.length} products from D1 for sitemap.`);
    } catch (err) {
        console.warn('⚠️  Could not reach D1 for sitemap generation, falling back to static product data.');
        products = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, 'src/data/products.json'), 'utf8'));
    }
    const { allNiches } = await import(path.resolve(ROOT_DIR, 'src/data/niches.js'));
    const { pkCities } = await import(path.resolve(ROOT_DIR, 'src/data/cities.js'));
    let blogs;
    try {
        const output = execSync(
            'npx wrangler d1 execute herbalicious-db --remote --json --command "SELECT id, title, image FROM blog_posts"',
            { cwd: ROOT_DIR, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
        );
        blogs = JSON.parse(output)[0].results;
        console.log(`📚 Loaded ${blogs.length} blog posts from D1 for sitemap.`);
    } catch (err) {
        console.warn('⚠️  Could not reach D1 for sitemap generation, falling back to static blog data.');
        ({ blogs } = await import(path.resolve(ROOT_DIR, 'src/data/seoInsights.js')));
    }

    const lastMod = new Date().toISOString();

    // 2. Generate Main Sitemap
    const mainPages = [
        '',
        '/shop',
        '/quote',
        '/blogs',
        '/contact',
        '/directory',
        '/directory/lahore',
        '/ingredients',
        '/about-us',
        '/privacy-policy',
        '/terms-of-service',
        '/disclaimer',
        '/shipping-policy'
    ];
    let mainXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    mainPages.forEach(page => {
        mainXml += `  <url>\n    <loc>${BASE_URL}${page}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
    });
    mainXml += '</urlset>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap-main.xml'), mainXml);

    // 3. Generate Products Sitemap
    let prodXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    products.forEach(p => {
        const imgUrl = `${BASE_URL}${encodePath(p.image)}`;
        prodXml += `  <url>\n    <loc>${BASE_URL}/product/${p.id}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n      <image:title>${escapeXml(p.name)}</image:title>\n    </image:image>\n  </url>\n`;
    });
    prodXml += '</urlset>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap-products.xml'), prodXml);

    // 4. Generate Niches Sitemap
    let nicheXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    allNiches.forEach(n => {
        nicheXml += `  <url>\n    <loc>${BASE_URL}/${n.id}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    nicheXml += '</urlset>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap-niches.xml'), nicheXml);

    // 5. Generate City Pages Sitemap
    let cityXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const topNiches = allNiches.slice(0, 10);
    topNiches.forEach(n => {
        pkCities.slice(0, 30).forEach(city => {
            const citySlug = city.toLowerCase().replace(/ /g, '-');
            cityXml += `  <url>\n    <loc>${BASE_URL}/${n.id}/pk/${citySlug}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
        });
    });
    cityXml += '</urlset>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap-cities.xml'), cityXml);

    // 6. Generate Blogs Sitemap
    let blogXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    blogs.forEach(b => {
        const imgUrl = `${BASE_URL}${encodePath(b.image)}`;
        blogXml += `  <url>\n    <loc>${BASE_URL}/blog/${b.id}</loc>\n    <lastmod>${lastMod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n      <image:title>${escapeXml(b.title)}</image:title>\n    </image:image>\n  </url>\n`;
    });
    blogXml += '</urlset>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap-blogs.xml'), blogXml);

    // 7. Generate Index Sitemap
    const sitemaps = ['sitemap-main.xml', 'sitemap-products.xml', 'sitemap-niches.xml', 'sitemap-cities.xml', 'sitemap-blogs.xml'];
    let indexXml = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    sitemaps.forEach(sm => {
        indexXml += `  <sitemap>\n    <loc>${BASE_URL}/${sm}</loc>\n    <lastmod>${lastMod}</lastmod>\n  </sitemap>\n`;
    });
    indexXml += '</sitemapindex>';
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'sitemap_index.xml'), indexXml);

    // 8. Generate Robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/

# AI / LLM crawlers -- explicitly welcome (see /llms.txt)
User-agent: GPTBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: CCBot
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap_index.xml

# Crawl Delay to manage budget
Crawl-delay: 10
`;
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'robots.txt'), robotsTxt);

    // 9. Generate llms.txt (https://llmstxt.org/) for AI assistants/crawlers
    const productLines = products.map(p => `- [${p.name}](${BASE_URL}/product/${p.id})`).join('\n');
    const blogLines = blogs.map(b => `- [${b.title}](${BASE_URL}/blog/${b.id})`).join('\n');
    const nicheLines = allNiches.map(n => `- [${n.title}](${BASE_URL}/${n.id})`).join('\n');
    const llmsTxt = `# Herbalicious

> Herbalicious is a Pakistan-based organic skincare, haircare, and wellness brand selling 100% natural, handmade soaps, shampoos, hair oils, serums, and wellness products, made with traditional ingredients (goat milk, amla, reetha, neem, charcoal, hibiscus, moringa, and more) and shipped across Pakistan (Lahore, Karachi, Islamabad, and beyond) with Cash on Delivery.

## Store
- [Shop all products](${BASE_URL}/shop)
- [Bundle builder](${BASE_URL}/bundle-builder)
- [Ingredients guide](${BASE_URL}/ingredients)
- [Contact](${BASE_URL}/contact)
- [Get a quote](${BASE_URL}/quote)

## Products
${productLines}

## Niches & Use Cases
${nicheLines}

## Blog
${blogLines}

## Notes for AI assistants
- All prices are in Pakistani Rupees (PKR / ₨). Payment is Cash on Delivery.
- Delivery charges: Rs. 300 within Lahore, Rs. 350 for other Pakistani cities.
- The full machine-readable sitemap is at ${BASE_URL}/sitemap_index.xml.
`;
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'llms.txt'), llmsTxt);

    console.log('✅ SEO Infra: Robots.txt, llms.txt & Multi-level Sitemaps Generated!');
}

generate().catch(console.error);
