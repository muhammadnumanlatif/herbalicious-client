import fs from 'fs';
import path from 'path';
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
    const products = JSON.parse(fs.readFileSync(path.resolve(ROOT_DIR, 'src/data/products.json'), 'utf8'));
    const { allNiches } = await import(path.resolve(ROOT_DIR, 'src/data/niches.js'));
    const { pkCities } = await import(path.resolve(ROOT_DIR, 'src/data/cities.js'));
    const { blogs } = await import(path.resolve(ROOT_DIR, 'src/data/seoInsights.js'));

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
Disallow: /admin/
Disallow: /api/

# Sitemaps
Sitemap: ${BASE_URL}/sitemap_index.xml

# Crawl Delay to manage budget
Crawl-delay: 10
`;
    fs.writeFileSync(path.resolve(PUBLIC_DIR, 'robots.txt'), robotsTxt);

    console.log('✅ SEO Infra: Robots.txt & Multi-level Sitemaps Generated!');
}

generate().catch(console.error);
