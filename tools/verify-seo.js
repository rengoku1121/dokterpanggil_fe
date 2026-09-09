/**
 * Sanity checks for the generated SEO pages.
 *
 *   node tools/verify-seo.js
 *
 * Checks every generated page for broken internal links, missing or duplicated
 * headings, unparseable JSON-LD, missing metadata, and sitemap consistency.
 * Exits non-zero when something is wrong so it can gate a deploy.
 */
const fs = require('fs');
const path = require('path');
const { SITE } = require('../seo-data.js');

const ROOT = path.join(__dirname, '..');
const GENERATED_DIRS = ['layanan', 'dokter', 'dokter-spesialis'];
const GENERATED_ROOT_FILES = [];

const problems = [];
const notes = [];

function fail(file, message) {
    problems.push(file + ': ' + message);
}

function collectPages() {
    const pages = GENERATED_ROOT_FILES.filter(f => fs.existsSync(path.join(ROOT, f)));
    GENERATED_DIRS.forEach(dir => {
        const abs = path.join(ROOT, dir);
        if (!fs.existsSync(abs)) return;
        fs.readdirSync(abs)
            .filter(f => f.endsWith('.html'))
            .forEach(f => pages.push(dir + '/' + f));
    });
    return pages;
}

const VOID_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'];

/** Stack-based tag balance check — catches concatenation slips in the generator. */
function checkTagBalance(relPath, html) {
    const markup = html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/<!doctype[^>]*>/i, '');

    const stack = [];
    const pattern = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(\/?)>/g;
    let match;

    while ((match = pattern.exec(markup)) !== null) {
        const closing = match[1] === '/';
        const tag = match[2].toLowerCase();
        const selfClosing = match[3] === '/';
        if (VOID_TAGS.indexOf(tag) !== -1 || selfClosing) continue;

        if (!closing) {
            stack.push(tag);
            continue;
        }
        if (!stack.length) {
            fail(relPath, 'stray closing </' + tag + '>');
            return;
        }
        const open = stack.pop();
        if (open !== tag) {
            fail(relPath, 'tag mismatch: <' + open + '> closed by </' + tag + '>');
            return;
        }
    }

    if (stack.length) fail(relPath, 'unclosed tag(s): ' + stack.join(', '));
}

function checkPage(relPath) {
    const html = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    checkTagBalance(relPath, html);

    /* Exactly one h1 */
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count !== 1) fail(relPath, 'expected 1 <h1>, found ' + h1Count);

    /* Required metadata */
    [
        [/<title>[^<]{10,}<\/title>/, 'missing or too short <title>'],
        [/<meta name="description" content="[^"]{50,}"/, 'missing or too short meta description'],
        [/<link rel="canonical" href="https?:\/\/[^"]+"/, 'missing canonical'],
        [/<meta property="og:title"/, 'missing og:title'],
        [/<meta property="og:image"/, 'missing og:image'],
        [/<meta name="robots" content="(index|noindex), follow"/, 'missing robots directive']
    ].forEach(([pattern, message]) => {
        if (!pattern.test(html)) fail(relPath, message);
    });

    /* Title length guidance — not a hard failure */
    const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1] || '';
    if (title.length > 65) notes.push(relPath + ': title is ' + title.length + ' chars, may be truncated in results');

    /* JSON-LD must parse */
    const blocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    if (!blocks.length) fail(relPath, 'no JSON-LD found');
    blocks.forEach((block, i) => {
        const json = block.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
        try {
            const parsed = JSON.parse(json);
            if (!parsed['@type']) fail(relPath, 'JSON-LD block ' + (i + 1) + ' has no @type');
        } catch (e) {
            fail(relPath, 'JSON-LD block ' + (i + 1) + ' does not parse: ' + e.message);
        }
    });

    /* Internal links must resolve on disk */
    const hrefs = (html.match(/href="([^"]+)"/g) || []).map(m => m.slice(6, -1));
    const dir = path.dirname(path.join(ROOT, relPath));
    hrefs.forEach(href => {
        if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
        const target = href.split('#')[0].split('?')[0];
        if (!target) return;
        if (!fs.existsSync(path.resolve(dir, target))) fail(relPath, 'broken link -> ' + href);
    });

    /* Must not link to deleted support/location pages */
    [
        'tentang-kami.html',
        'cara-memesan.html',
        'faq.html',
        'kontak.html',
        'lokasi/'
    ].forEach(needle => {
        if (html.indexOf(needle) !== -1) fail(relPath, 'links to removed page pattern: ' + needle);
    });

    const noindex = /content="noindex, follow"/.test(html);
    return { relPath, noindex, canonical: (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] };
}

function checkSitemap(pages) {
    const sitemapPath = path.join(ROOT, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        fail('sitemap.xml', 'missing');
        return;
    }
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const locs = (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map(m => m.slice(5, -6));

    if (locs.indexOf(SITE.url + '/') === -1) fail('sitemap.xml', 'homepage URL is missing');

    pages.filter(p => !p.noindex).forEach(p => {
        if (locs.indexOf(p.canonical) === -1) fail('sitemap.xml', 'missing ' + p.canonical);
    });
    pages.filter(p => p.noindex).forEach(p => {
        if (locs.indexOf(p.canonical) !== -1) fail('sitemap.xml', 'draft page should not be listed: ' + p.canonical);
    });

    ['tentang-kami', 'cara-memesan', '/faq.html', '/kontak.html', '/lokasi/'].forEach(needle => {
        if (xml.indexOf(needle) !== -1) fail('sitemap.xml', 'still lists removed page: ' + needle);
    });

    if (!fs.existsSync(path.join(ROOT, 'robots.txt'))) fail('robots.txt', 'missing');
    else if (!/Sitemap:/.test(fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8'))) {
        fail('robots.txt', 'no Sitemap directive');
    }
}

/** Homepage keeps About/FAQ/etc; only layanan + dokter are separate pages. */
function checkHomepageIntact() {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    [
        ['id="home"', 'hero carousel section'],
        ['id="about"', 'about section'],
        ['id="faq"', 'faq section'],
        ['id="locations"', 'locations section'],
        ['id="contact"', 'contact footer'],
        ['SERVICES:FOOTER:START', 'footer link generator markers'],
        ['href="layanan/', 'service cards linking to layanan pages'],
        ['href="dokter/index.html"', 'doctors hub link'],
        ['href="#about"', 'about anchor'],
        ['href="#faq"', 'faq anchor'],
        ['href="#contact"', 'contact anchor']
    ].forEach(([needle, label]) => {
        if (html.indexOf(needle) === -1) fail('index.html', 'lost ' + label + ' (' + needle + ')');
    });
    [
        'tentang-kami.html',
        'cara-memesan.html',
        'faq.html',
        'kontak.html',
        'lokasi/'
    ].forEach(needle => {
        if (html.indexOf(needle) !== -1) fail('index.html', 'still links to removed page: ' + needle);
    });
    if (html.indexOf('id="doctors-grid"') !== -1) {
        fail('index.html', 'full doctor directory should live on dokter/index.html, not the homepage');
    }
}

/** Doctor hub hosts the interactive directory. */
function checkDoctorDirectory() {
    const rel = 'dokter/index.html';
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) {
        fail(rel, 'missing doctor hub page');
        return;
    }
    const html = fs.readFileSync(abs, 'utf8');
    [
        ['id="doctors-grid"', 'doctor directory grid'],
        ['id="doctor-modal"', 'doctor detail modal'],
        ['doctors-data.js', 'doctors data script'],
        ['doctors-directory.js', 'doctors directory script']
    ].forEach(([needle, label]) => {
        if (html.indexOf(needle) === -1) fail(rel, 'missing ' + label);
    });
    ['doctors-data.js', 'doctors-directory.js'].forEach(file => {
        if (!fs.existsSync(path.join(ROOT, file))) fail(file, 'shared script missing');
    });
}

function checkRemovedPagesGone() {
    [
        'tentang-kami.html',
        'cara-memesan.html',
        'faq.html',
        'kontak.html',
        'lokasi/index.html',
        'lokasi/jakarta.html'
    ].forEach(rel => {
        if (fs.existsSync(path.join(ROOT, rel))) fail(rel, 'should have been deleted');
    });
}

function run() {
    const pages = collectPages();
    if (!pages.length) {
        console.error('No generated pages found. Run: node tools/build-seo.js');
        process.exit(1);
    }

    const results = pages.map(checkPage);
    checkSitemap(results);
    checkHomepageIntact();
    checkDoctorDirectory();
    checkRemovedPagesGone();

    console.log('Checked ' + pages.length + ' generated page(s).');
    const drafts = results.filter(r => r.noindex);
    if (drafts.length) console.log(drafts.length + ' draft page(s) marked noindex: ' + drafts.map(r => r.relPath).join(', '));

    notes.forEach(n => console.log('  note  ' + n));

    if (problems.length) {
        console.error('\n' + problems.length + ' problem(s) found:');
        problems.forEach(p => console.error('  FAIL  ' + p));
        process.exit(1);
    }
    console.log('\nAll checks passed.');
}

run();
