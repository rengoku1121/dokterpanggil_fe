/**
 * Syncs footer layanan links (Form A2) in index.html.
 * Homepage services section is a teaser only (title + CTA → layanan/).
 *
 *   node tools/build-services.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Footer layanan list follows Form Wording A2 (short curated links). */
function renderFooterServiceLinks() {
    const links = [
        ['layanan/kunjungan-dokter.html', 'Dokter Umum 24 jam'],
        ['layanan/kunjungan-dokter-spesialis.html', 'Dokter Spesialis'],
        ['layanan/perawatan-rumah.html', 'Perawat Homecare'],
        ['layanan/terapi-infus.html', 'Infus & Tindakan Medis'],
        ['layanan/index.html', 'Lihat Semua Layanan', 'footer.allServices']
    ];
    return links.map(([href, label, i18n]) =>
        i18n
            ? `       <li><a href="${href}" data-i18n="${i18n}" class="opacity-80 hover:opacity-100">${esc(label)}</a></li>`
            : `       <li><a href="${href}" class="opacity-80 hover:opacity-100">${esc(label)}</a></li>`
    ).join('\n');
}

function replaceRegion(html, marker, content) {
    const start = '<!-- ' + marker + ':START -->';
    const end = '<!-- ' + marker + ':END -->';
    const si = html.indexOf(start);
    const ei = html.indexOf(end);
    if (si === -1 || ei === -1) {
        console.warn('  ! marker ' + marker + ' not found, skipped');
        return html;
    }
    return html.slice(0, si + start.length) + '\n' + content + '\n' + html.slice(ei);
}

function build() {
    const indexPath = path.join(ROOT, 'index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = replaceRegion(html, 'SERVICES:FOOTER', renderFooterServiceLinks());
    fs.writeFileSync(indexPath, html, 'utf8');
    console.log('  ~ index.html footer layanan links (A2)');
}

build();
