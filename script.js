// Keep the hero exactly the viewport height minus the sticky navbar.
// Measure only the top bar row so an expanded mobile menu doesn't inflate it.
function updateNavHeight() {
    const header = document.getElementById('main-header');
    const bar = header && (header.querySelector('.nav-bar') || header.firstElementChild);
    if (bar) document.documentElement.style.setProperty('--nav-h', bar.offsetHeight + 'px');
}
updateNavHeight();
window.addEventListener('resize', updateNavHeight);
window.addEventListener('load', updateNavHeight);

// Mobile menu (animated drawer + hamburger morph)
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
const headerEl = document.getElementById('main-header');

function setMobileMenuOpen(open) {
    if (!mobileMenu || !mobileMenuBtn) return;
    mobileMenu.hidden = false;
    requestAnimationFrame(() => {
        mobileMenu.classList.toggle('is-open', open);
        if (mobileBackdrop) {
            mobileBackdrop.hidden = false;
            mobileBackdrop.classList.toggle('is-open', open);
        }
        document.body.classList.toggle('nav-open', open);
        if (headerEl) headerEl.classList.toggle('nav-open', open);
        mobileMenuBtn.setAttribute('aria-expanded', String(open));
        mobileMenuBtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
        if (!open) {
            const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380;
            window.setTimeout(() => {
                if (!mobileMenu.classList.contains('is-open')) {
                    mobileMenu.hidden = true;
                    if (mobileBackdrop) mobileBackdrop.hidden = true;
                }
            }, closeDelay);
        }
    });
}

function closeMobileMenu() { setMobileMenuOpen(false); }
function toggleMobileMenu() {
    const open = !(mobileMenu && mobileMenu.classList.contains('is-open'));
    setMobileMenuOpen(open);
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
});
window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1024px)').matches) closeMobileMenu();
});
if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMobileMenu());
    });
}

// Smooth animated scroll to sections when clicking nav / anchor links
function animatedScrollTo(targetY, duration = 800) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;
    let startTime = null;
    // easeInOutCubic for a smooth, natural feel
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    function step(now) {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

function scrollToTarget(target) {
    if (!target) return;
    const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
    const offset = navH + 12;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
    animatedScrollTo(targetY);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        closeMobileMenu();
        scrollToTarget(target);
        history.replaceState(null, '', targetId);
    });
});

// Hero full-screen carousel (arrows, dots, autoplay, swipe)
(function initHeroCarousel() {
    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    if (!slides.length) return;
    const dotsWrap = document.getElementById('hero-dots');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const hero = document.getElementById('home');
    const DELAY = 6000;
    let current = 0;
    let timer = null;

    if (dotsWrap) {
        dotsWrap.innerHTML = slides.map((_, i) =>
            '<button class="hero-dot' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>'
        ).join('');
    }
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll('.hero-dot')) : [];

    function go(i) {
        current = (i + slides.length) % slides.length;
        slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
        dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }
    function start() { stop(); if (slides.length > 1) timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { start(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });
    dots.forEach(d => d.addEventListener('click', () => { go(parseInt(d.dataset.slide, 10)); restart(); }));

    if (hero) {
        hero.addEventListener('mouseenter', stop);
        hero.addEventListener('mouseleave', start);
        let startX = null;
        hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        hero.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); restart(); }
            startX = null;
        });
    }

    go(0);
    start();
})();

// Testimonials multi-card slider (3 desktop / 2 tablet / 1 mobile)
(function initTestiCarousel() {
    const viewport = document.getElementById('testi-viewport');
    const track = document.getElementById('testi-track');
    if (!viewport || !track) return;
    const cards = Array.from(track.querySelectorAll('.testi-card'));
    if (!cards.length) return;
    const dotsWrap = document.getElementById('testi-dots');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    const section = document.getElementById('testimonials');
    const DELAY = 6500;
    const GAP = 24;
    let page = 0;
    let perView = 3;
    let pageCount = 1;
    let timer = null;

    function calcPerView() {
        const w = window.innerWidth;
        if (w < 640) return 1;
        if (w < 1024) return 2;
        return 3;
    }

    function rebuildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = Array.from({ length: pageCount }, (_, i) =>
            '<button type="button" class="testi-dot' + (i === page ? ' active' : '') + '" data-page="' + i + '" aria-label="Halaman testimoni ' + (i + 1) + '"></button>'
        ).join('');
        dotsWrap.querySelectorAll('.testi-dot').forEach(d => {
            d.addEventListener('click', () => {
                go(parseInt(d.dataset.page, 10));
                restart();
            });
        });
    }

    function layout() {
        perView = calcPerView();
        pageCount = Math.max(1, Math.ceil(cards.length / perView));
        if (page > pageCount - 1) page = pageCount - 1;
        const gap = perView === 1 ? 16 : GAP;
        const vw = viewport.clientWidth;
        const cardW = (vw - gap * (perView - 1)) / perView;
        track.style.gap = gap + 'px';
        cards.forEach(c => {
            c.style.flex = '0 0 ' + cardW + 'px';
            c.style.width = cardW + 'px';
        });
        rebuildDots();
        go(page);
    }

    function go(i) {
        page = ((i % pageCount) + pageCount) % pageCount;
        const gap = perView === 1 ? 16 : GAP;
        const vw = viewport.clientWidth;
        const cardW = (vw - gap * (perView - 1)) / perView;
        const shift = page * perView * (cardW + gap);
        track.style.transform = 'translateX(-' + shift + 'px)';
        if (dotsWrap) {
            dotsWrap.querySelectorAll('.testi-dot').forEach((d, idx) => {
                d.classList.toggle('active', idx === page);
            });
        }
    }
    function next() { go(page + 1); }
    function prev() { go(page - 1); }
    function start() { stop(); if (pageCount > 1) timer = setInterval(next, DELAY); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { start(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

    if (section) {
        section.addEventListener('mouseenter', stop);
        section.addEventListener('mouseleave', start);
        let startX = null;
        viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        viewport.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); restart(); }
            startX = null;
        });
    }

    window.addEventListener('resize', layout);
    layout();
    start();
})();

// Locations map city switcher (+ lazy-load iframe when section is near)
(function initLocationMap() {
    const list = document.getElementById('loc-city-list');
    const map = document.getElementById('loc-map');
    const label = document.getElementById('loc-map-label');
    const openLink = document.getElementById('loc-map-open');
    const section = document.getElementById('locations');
    if (!list || !map) return;

    function ensureMapSrc(src) {
        const next = src || map.getAttribute('data-src');
        if (!next) return;
        if (map.getAttribute('src') !== next) map.src = next;
        map.setAttribute('data-src', next);
    }

    if (section && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            if (!entries.some(e => e.isIntersecting)) return;
            ensureMapSrc();
            io.disconnect();
        }, { rootMargin: '200px 0px' });
        io.observe(section);
    } else {
        ensureMapSrc();
    }

    list.addEventListener('click', e => {
        const btn = e.target.closest('.loc-city-btn');
        if (!btn || btn.disabled || btn.classList.contains('loc-city-soon')) return;
        const src = btn.getAttribute('data-map');
        const name = (btn.querySelector('.font-semibold') || {}).textContent || '';
        if (!src) return;

        list.querySelectorAll('.loc-city-btn').forEach(b => {
            b.classList.remove('is-active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        ensureMapSrc(src);
        if (label) label.textContent = name.trim();
        if (openLink) {
            openLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name.trim() + ', Indonesia');
        }
    });
})();

// FAQ accordion — animated open/close; only one open at a time
(function initFaqAccordion() {
    const items = Array.from(document.querySelectorAll('#faq-list details.faq-item'));
    if (!items.length) return;

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function openItem(item) {
        const answer = item.querySelector('.faq-answer');
        if (!answer) return;
        item.open = true;
        item.classList.add('is-open');
        if (prefersReducedMotion()) {
            answer.style.height = 'auto';
            return;
        }
        answer.style.height = '0px';
        requestAnimationFrame(() => {
            answer.style.height = answer.scrollHeight + 'px';
        });
        const onEnd = e => {
            if (e.propertyName !== 'height') return;
            if (item.classList.contains('is-open')) answer.style.height = 'auto';
            answer.removeEventListener('transitionend', onEnd);
        };
        answer.addEventListener('transitionend', onEnd);
    }

    function closeItem(item) {
        const answer = item.querySelector('.faq-answer');
        if (!answer) return;
        item.classList.remove('is-open');
        if (prefersReducedMotion()) {
            item.open = false;
            answer.style.height = '';
            return;
        }
        answer.style.height = answer.scrollHeight + 'px';
        void answer.offsetHeight;
        answer.style.height = '0px';
        const onEnd = e => {
            if (e.propertyName !== 'height') return;
            if (!item.classList.contains('is-open')) {
                item.open = false;
                answer.style.height = '';
            }
            answer.removeEventListener('transitionend', onEnd);
        };
        answer.addEventListener('transitionend', onEnd);
    }

    items.forEach(item => {
        const summary = item.querySelector('summary');
        if (!summary) return;
        summary.addEventListener('click', e => {
            e.preventDefault();
            const isOpen = item.classList.contains('is-open');
            if (isOpen) {
                closeItem(item);
                return;
            }
            items.forEach(other => {
                if (other !== item && other.classList.contains('is-open')) closeItem(other);
            });
            openItem(item);
        });
    });
})();

let currentLang = 'id';

// Fade-up on scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// Auto-retry images that fail to load (e.g. temporary CDN throttling)
function retryImage(img) {
    const retries = parseInt(img.dataset.retries || '0', 10);
    if (retries >= 3) return;
    img.dataset.retries = String(retries + 1);
    const base = img.src.split('&_r=')[0];
    setTimeout(() => { img.src = base + '&_r=' + Date.now(); }, 1500 * (retries + 1));
}
function attachImageRetry(img) {
    if (img.dataset.retryBound) return;
    img.dataset.retryBound = '1';
    img.addEventListener('error', () => retryImage(img));
    // Handle images that already failed before this handler was attached
    if (img.complete && img.naturalWidth === 0) retryImage(img);
}
function applyImageRetry(root) {
    (root || document).querySelectorAll('img').forEach(attachImageRetry);
}
applyImageRetry(document);

// ---------- Language switcher (ID default / EN) ----------
const translations = {
    id: {
        'lang.label': 'Bahasa',
        'nav.home': 'Beranda', 'nav.about': 'Tentang Kami', 'nav.services': 'Layanan', 'nav.doctors': 'Temukan Dokter', 'nav.gallery': 'Galeri', 'nav.locations': 'Lokasi', 'nav.contact': 'Kontak',
        'btn.book': 'Pesan Sekarang', 'btn.phone': 'Telepon',
        'hero.badge': 'Layanan Kesehatan Lebih Dekat, Langsung di Rumah Anda',
        'hero.title': 'Dokter dan Perawat Profesional Datang ke Rumah Anda',
        'hero.subtitle': 'Layanan kesehatan terpadu yang menghadirkan dokter dan tenaga kesehatan profesional langsung ke rumah Anda, untuk perawatan yang lebih mudah, nyaman, dan personal.',
        'hero.cta1': 'Pesan Sekarang', 'hero.cta2': 'Lihat Layanan',
        'hero.trust1': 'Tersedia 24 jam', 'hero.trust2': 'Dokter dan tenaga medis profesional', 'hero.trust3': 'Pelayanan langsung ke rumah', 'hero.trust4': 'Ramah Keluarga',
        'hero.card1title': 'Respons Cepat', 'hero.card1sub': 'Tiba dalam ±60 menit', 'hero.card2title': 'Rating Pasien 4.9', 'hero.card2sub': '2.500+ ulasan',
        // B1 — Wording dari Client (typo diperbaiki: pemeriksaan, profesional, Langsung, terintegrasi dalam)
        'hero.s1badge': 'Dokter Umum 24 Jam',
        'hero.s1title': 'Butuh Dokter? Kami siap datang 24 jam',
        'hero.s1lead': 'Dokter langsung ke rumah Anda untuk pemeriksaan, pengobatan, hingga tindakan medis ringan.',
        'hero.s1t1': '24 Jam', 'hero.s1t2': 'Visit ke Rumah', 'hero.s1t3': 'Dokter berpengalaman',
        'hero.s1cta1': 'Pesan Sekarang', 'hero.s1cta2': 'Chat WhatsApp',
        'hero.s2badge': 'Temukan Dokter Spesialis',
        'hero.s2title': 'Dokter Spesialis untuk Perawatan yang Tepat',
        'hero.s2sub': 'Cari dokter spesialis berdasarkan nama, bidang keahlian, atau kondisi medis',
        'hero.s2cta1': 'Temukan Dokter Spesialis', 'hero.s2cta2': 'Chat WhatsApp',
        'hero.s3badge': 'Homecare 24 jam',
        'hero.s3title': 'Layanan Kesehatan Lengkap, Langsung di Rumah Anda',
        'hero.s3sub': 'Dokter, Perawat, Laboratorium hingga kebutuhan obat terintegrasi dalam satu layanan homecare, menghadirkan perawatan yang lebih nyaman langsung di Rumah Anda',
        'hero.s3cta1': 'Pesan Sekarang', 'hero.s3cta2': 'Chat WhatsApp',
        'about.title': 'Layanan Kesehatan, Lebih Dekat dengan Anda',
        'about.desc': "Dokter Panggil di bawah CV. Mentari Kasih Indonesia adalah layanan kesehatan berbasis homecare yang memberikan layanan 24 jam dengan menghadirkan dokter, perawat, dan tenaga kesehatan langsung ke rumah Anda. Pemeriksaan laboratorium hingga kebutuhan obat terintegrasi dalam satu layanan agar perawatan lebih mudah, nyaman, dan dekat bagi pasien dan keluarga.",
        'about.v1': 'Datang ke Rumah', 'about.v2': 'Siap 24 Jam', 'about.v3': 'Layanan Lengkap', 'about.v4': 'Lebih Nyaman',
        'svc.title': 'Layanan Kami',
        'svc.subtitle': 'Beragam layanan kesehatan untuk kebutuhan Anda dan Keluarga, langsung di rumah',
        'svc.all': 'Lihat semua layanan →',
        'why.title': 'Mengapa Memilih Kami',
        'why.1': 'Tenaga Kesehatan Profesional',
        'why.1desc': 'Pelayanan diberikan oleh dokter, perawat, dan tenaga kesehatan yang kompeten sesuai kebutuhan pasien.',
        'why.2': 'Pelayanan sesuai kebutuhan pasien',
        'why.2desc': 'Setiap layanan disesuaikan dengan kondisi dan kebutuhan masing-masing pasien.',
        'why.3': 'Perawatan yang Terkoordinasi',
        'why.3desc': 'Kebutuhan dokter, perawat, pemeriksaan laboratorium hingga layanan pendukung dapat dikoordinasikan melalui satu layanan.',
        'why.4': 'Pendampingan untuk Pasien dan Keluarga',
        'why.4desc': 'Kami membantu pasien dan keluarga mendapatkan pelayanan kesehatan di rumah dengan proses yang lebih mudah dan nyaman.',
        'how.title': 'Cara Panggil Dokter Panggil',
        'how.1': 'Hubungi Kami 24 Jam',
        'how.1desc': 'WhatsApp atau hubungi Hotline Dokter Panggil untuk memulai layanan.',
        'how.2': 'Sampaikan Kebutuhan',
        'how.2desc': 'Pilih layanan dan informasikan kebutuhan atau kondisi pasien kepada tim kami.',
        'how.3': 'Konfirmasi Layanan & Biaya',
        'how.3desc': 'Tim kami akan menginformasikan biaya layanan sebelum kunjungan.',
        'how.4': 'Tim Medis menghubungi Anda',
        'how.4desc': 'Setelah dikonfirmasi, tim medis yang bertugas akan segera menghubungi Anda untuk persiapan dan kunjungan.',
        'doctors.title': 'Temukan Dokter yang Tepat untuk Anda',
        'doctors.subtitle': 'Dokter umum 24 jam dan berbagai dokter spesialis siap membantu sesuai kondisi dan kebutuhan kesehatan Anda.',
        'doctors.browse': 'Temukan Dokter →',
        'doctors.cat.umum': 'Dokter Umum 24 Jam',
        'doctors.cat.umumDesc': 'Butuh dokter sekarang? Dokter umum kami siap datang ke rumah 24 jam untuk pemeriksaan, penanganan awal, dan membantu menentukan perawatan selanjutnya.',
        'doctors.cat.spec': 'Dokter Spesialis',
        'doctors.cat.specDesc': 'Temukan dokter spesialis sesuai kebutuhan Anda. Cari berdasarkan bidang spesialisasi atau kondisi medis.',
        'doctors.cat.nurse': 'Pendampingan Perawat 24 Jam',
        'doctors.cat.nurseDesc': 'Perawat profesional siap mendampingi pasien di rumah selama 24 jam untuk pemantauan, perawatan, dan kebutuhan harian pasien.',
        'gallery.title': 'Perawatan dalam Aksi',
        'loc.title': 'Tersedia di Kota Anda',
        'loc.subtitle': 'Saat ini Dokter Panggil melayani Makassar. Surabaya akan segera hadir.',
        'loc.placeholder': 'Masukkan kota atau area Anda...', 'loc.check': 'Cek',
        'loc.pick': 'Area layanan',
        'loc.available': 'Tersedia',
        'loc.soon': 'Segera hadir',
        'loc.openMaps': 'Buka di Google Maps →',
        'loc.expanding': '',
        'testi.title': 'Cerita dari Pasien Kami',
        'testi.1': '“Sudah sangat baik sebagai homecare dengan kecepatan dalam pelayanannya dan menyembuhkan pasien.”',
        'testi.1name': 'Mahdi S', 'testi.1city': 'Makassar',
        'testi.2': '“Sudah 3 kali saya menggunakan layanan ini untuk orang tua dan kali ini diri saya sendiri. Seluruh layanan dan petugas sangat profesional. Terima kasih dokter, perawat, dan tim yang merawat saya hari ini. Sangat puas — saya hubungi subuh-subuh tidak sampai sejam sudah tiba di rumah.”',
        'testi.2name': 'Citra', 'testi.2city': 'Makassar',
        'testi.3': '“Dipertahankan pelayanannya seperti ini karena sangat memuaskan.”',
        'testi.3name': 'Nur Sahmi', 'testi.3city': 'Makassar',
        'testi.4': '“Dipertahankan cepat tanggapnya, sangat membantu untuk keluarga yang berjauhan.”',
        'testi.4name': 'Rudiansyah', 'testi.4city': 'Makassar',
        'testi.5': '“Terima kasih sudah menghadirkan Dokter Panggil untuk mempermudah pasien. Semoga ke depannya Dokter Panggil semakin besar dan sukses.”',
        'testi.5name': 'Darwisa', 'testi.5city': 'Makassar',
        'testi.6': '“Informasi mudah didapat dan alasan memilih Dokter Panggil karena rating baik.”',
        'testi.6name': 'Bambang', 'testi.6city': 'Makassar',
        'faq.title': 'Pertanyaan yang Sering Diajukan',
        'faq.q1': 'Apakah Dokter Panggil tersedia 24 jam?',
        'faq.a1': 'Ya. Layanan dokter umum tersedia 24 jam, termasuk malam hari, akhir pekan, dan hari libur. Untuk dokter spesialis, ketersediaan menyesuaikan jadwal tenaga medis yang dijadwalkan terlebih dahulu.',
        'faq.q2': 'Bagaimana cara memanggil dokter ke rumah?',
        'faq.a2': 'Hubungi Call Centre Dokter Panggil 24 jam melalui WhatsApp atau telepon, lalu sampaikan keluhan pasien, KTP pasien, dan bagikan lokasi. Tim medis akan segera menghubungi setelah pendaftaran selesai.',
        'faq.q3': 'Berapa biaya dokter datang ke rumah?',
        'faq.a3': 'Biaya kunjungan dokter umum Rp220.000 dan dokter spesialis Rp450.000 untuk satu kali kunjungan, ditambah transportasi dokter Rp10.000/km dari lokasi Dokter Panggil. Kunjungan di luar jam kerja dikenakan tambahan 50% dari biaya kunjungan dokter. Biaya belum termasuk obat, bahan medis, tindakan, laboratorium, jasa perawat, serta administrasi bila diperlukan.',
        'faq.q4': 'Berapa lama dokter tiba di rumah?',
        'faq.a4': 'Waktu kedatangan bergantung pada jarak, lokasi pasien, dan kondisi lalu lintas. Tim medis akan segera menghubungi setelah pendaftaran diterima dan menginformasikan perkiraan waktu tiba.',
        'faq.q5': 'Wilayah mana saja yang dilayani Dokter Panggil?',
        'faq.a5': 'Layanan homecare tersedia di area Kota Makassar, Kabupaten Gowa, dan Maros. Jangkauan operasional yaitu 20 km dari titik lokasi klinik. Kirimkan lokasi pasien kepada admin untuk informasi layanan.',
        'faq.q6': 'Kondisi apa saja yang dapat ditangani di rumah?',
        'faq.a6': 'Berbagai keluhan dapat diperiksa di rumah, seperti demam, batuk dan flu, lemas, diare, mual dan muntah, sakit kepala, gangguan lambung, hingga pemeriksaan pasien lansia dan penyakit kronis. Dokter akan menentukan penanganan selanjutnya berdasarkan hasil pemeriksaan.',
        'faq.q7': 'Apakah bisa melakukan infus di rumah?',
        'faq.a7': 'Ya. Terapi infus dapat dilakukan di rumah apabila terdapat indikasi medis dan dilakukan oleh tenaga kesehatan yang kompeten.',
        'faq.q8': 'Apakah dokter bisa melakukan tindakan medis di rumah?',
        'faq.a8': 'Ya. Tindakan medis tertentu dapat dilakukan di rumah sesuai hasil pemeriksaan dan indikasi medis. Jika diperlukan fasilitas atau penanganan lebih lanjut, dokter akan menyarankan rujukan yang sesuai.',
        'faq.q9': 'Apakah bisa memanggil dokter spesialis ke rumah?',
        'faq.a9': 'Ya. Dokter Panggil menyediakan kunjungan berbagai dokter spesialis. Ketersediaan menyesuaikan jadwal tenaga medis yang dijadwalkan terlebih dahulu.',
        'faq.q10': 'Apakah bisa memilih dokter sendiri?',
        'faq.a10': 'Ya. Anda dapat mencari dokter berdasarkan nama, bidang spesialisasi, maupun kondisi medis. Tim admin call centre dapat membantu merekomendasikan dokter yang sesuai dengan kebutuhan pasien.',
        'faq.q11': 'Apakah tersedia pemeriksaan laboratorium di rumah?',
        'faq.a11': 'Ya. Pengambilan sampel untuk berbagai pemeriksaan laboratorium dapat dilakukan langsung di rumah sesuai jenis pemeriksaan yang dibutuhkan.',
        'faq.q12': 'Apakah tersedia perawat untuk menjaga pasien di rumah?',
        'faq.a12': 'Ya. Tersedia layanan perawat profesional homecare untuk pendampingan, observasi, perawatan harian, dan tindakan keperawatan sesuai kebutuhan pasien.',
        'faq.q13': 'Apakah Dokter Panggil melayani anak dan lansia?',
        'faq.a13': 'Ya. Pelayanan tersedia untuk berbagai kelompok usia. Untuk kondisi tertentu, tim dapat membantu mengarahkan pasien kepada dokter spesialis yang sesuai.',
        'faq.q14': 'Apakah bisa membuat janji untuk hari atau jam tertentu?',
        'faq.a14': 'Ya. Selain layanan yang dibutuhkan segera, Anda dapat menjadwalkan kunjungan dokter atau tenaga kesehatan sesuai waktu yang diinginkan.',
        'faq.q15': 'Bagaimana jika kondisi pasien ternyata membutuhkan rumah sakit?',
        'faq.a15': 'Dokter akan melakukan penilaian terlebih dahulu. Apabila kondisi pasien membutuhkan pemeriksaan atau penanganan yang tidak dapat dilakukan di rumah, dokter akan menyarankan pasien untuk mendapatkan pelayanan di fasilitas kesehatan yang sesuai.',
        'cta.title': 'Butuh Dokter atau Perawat di Rumah?',
        'cta.subtitle': 'Sampaikan kebutuhan Anda kepada Tim Dokter Panggil. Kami akan membantu memilih layanan yang sesuai untuk Anda dan keluarga.',
        'cta.book': 'Pesan Sekarang', 'cta.wa': 'Chat WhatsApp',
        'footer.desc': 'Layanan kesehatan homecare yang menghadirkan dokter dan tenaga kesehatan langsung ke rumah untuk Anda dan keluarga',
        'footer.services': 'Layanan', 'footer.company': 'Informasi', 'footer.contact': 'Hubungi Kami',
        'footer.specialists': 'Dokter Spesialis', 'footer.faq': 'FAQ', 'footer.how': 'Cara Panggil', 'footer.area': 'Area Layanan',
        'footer.allServices': 'Lihat Semua Layanan',
        'footer.phone': 'WhatsApp & Hotline 24 jam 0811-4677-700',
        'footer.address': 'Kantor : Jl. Letnan Jenderal Hertasning No. 110 Makassar, Sulawesi Selatan.',
        'footer.maps': 'Lihat di Google Maps',
        'footer.hours': 'Jam Layanan : 24 jam',
        'footer.chatWa': 'Chat WhatsApp',
        'footer.copyright': '2026 Dokter Panggil. All Rights Reserved'
    },
    en: {
        'lang.label': 'Language',
        'nav.home': 'Home', 'nav.about': 'About Us', 'nav.services': 'Services', 'nav.doctors': 'Find a Doctor', 'nav.gallery': 'Gallery', 'nav.locations': 'Locations', 'nav.contact': 'Contact',
        'btn.book': 'Book Now', 'btn.phone': 'Call',
        'hero.badge': 'Healthcare Closer to You, Right at Home',
        'hero.title': 'Professional Doctors and Nurses Come to Your Home',
        'hero.subtitle': 'Integrated healthcare that brings doctors and medical professionals directly to your home—for care that is easier, more comfortable, and personal.',
        'hero.cta1': 'Book Now', 'hero.cta2': 'Explore Services',
        'hero.trust1': 'Available 24/7', 'hero.trust2': 'Professional Doctors and Medical Personnel', 'hero.trust3': 'Direct Home Healthcare Services', 'hero.trust4': 'Family-Friendly',
        'hero.card1title': 'Fast Response', 'hero.card1sub': 'Arrives in ~60 minutes', 'hero.card2title': '4.9 Patient Rating', 'hero.card2sub': '2,500+ reviews',
        'hero.s1badge': 'GP Visit 24 Hours',
        'hero.s1title': 'Need a Doctor? We are ready 24 hours',
        'hero.s1lead': 'A doctor comes to your home for examination, treatment, and minor medical procedures.',
        'hero.s1t1': '24 Hours', 'hero.s1t2': 'Home Visit', 'hero.s1t3': 'Experienced Doctors',
        'hero.s1cta1': 'Book Now', 'hero.s1cta2': 'Chat WhatsApp',
        'hero.s2badge': 'Find a Specialist',
        'hero.s2title': 'Specialist doctors for the right care',
        'hero.s2sub': 'Search specialists by name, specialty, or medical condition',
        'hero.s2cta1': 'Find a Specialist', 'hero.s2cta2': 'Chat WhatsApp',
        'hero.s3badge': 'Homecare 24 hours',
        'hero.s3title': 'Complete Healthcare, Right at Your Home',
        'hero.s3sub': 'Doctors, nurses, laboratory, and medication needs integrated in one homecare service—more comfortable care right at your home',
        'hero.s3cta1': 'Book Now', 'hero.s3cta2': 'Chat WhatsApp',
        'about.title': 'Healthcare, Closer to You',
        'about.desc': "Dokter Panggil, under CV. Mentari Kasih Indonesia, is a 24-hour homecare health service that brings doctors, nurses, and healthcare professionals directly to your home. Laboratory tests and medication needs are integrated in one service so care stays easier, more comfortable, and closer for patients and families.",
        'about.v1': 'Comes to Your Home', 'about.v2': 'Ready 24 Hours', 'about.v3': 'Complete Services', 'about.v4': 'More Comfortable',
        'svc.title': 'Our Services',
        'svc.subtitle': 'A range of healthcare services for you and your family, right at home',
        'svc.all': 'View all services →',
        'why.title': 'Why Choose Us',
        'why.1': 'Professional Healthcare Team',
        'why.1desc': 'Care is delivered by competent doctors, nurses, and health workers matched to patient needs.',
        'why.2': 'Care tailored to each patient',
        'why.2desc': 'Every service is adjusted to each patient’s condition and needs.',
        'why.3': 'Coordinated Care',
        'why.3desc': 'Doctor visits, nursing, lab tests, and supporting services can be coordinated through one service.',
        'why.4': 'Support for Patients and Families',
        'why.4desc': 'We help patients and families get home healthcare with a simpler, more comfortable process.',
        'how.title': 'How to Call Dokter Panggil',
        'how.1': 'Contact Us 24 Hours',
        'how.1desc': 'WhatsApp or call the Dokter Panggil hotline to start a service.',
        'how.2': 'Share Your Needs',
        'how.2desc': 'Choose a service and tell our team the patient needs or condition.',
        'how.3': 'Confirm Service & Fee',
        'how.3desc': 'Our team will inform you of the service fee before the visit.',
        'how.4': 'The Medical Team Contacts You',
        'how.4desc': 'After confirmation, the assigned medical team will contact you to prepare for the visit.',
        'doctors.title': 'Find the Right Doctor for You',
        'doctors.subtitle': '24-hour GPs and specialists ready to help based on your health needs.',
        'doctors.browse': 'Find a Doctor →',
        'doctors.cat.umum': 'GP Visit 24 Hours',
        'doctors.cat.umumDesc': 'Need a doctor now? Our GPs are ready for home visits 24 hours for examination, initial care, and next-step guidance.',
        'doctors.cat.spec': 'Specialists',
        'doctors.cat.specDesc': 'Find the right specialist. Search by specialty or medical condition.',
        'doctors.cat.nurse': '24-Hour Nurse Support',
        'doctors.cat.nurseDesc': 'Professional nurses ready to support patients at home around the clock for monitoring, care, and daily needs.',
        'gallery.title': 'Care in Action',
        'loc.title': 'Available in Your City',
        'loc.subtitle': 'Dokter Panggil currently serves Makassar. Surabaya is coming soon.',
        'loc.placeholder': 'Enter your city or area...', 'loc.check': 'Check',
        'loc.pick': 'Service area',
        'loc.available': 'Available',
        'loc.soon': 'Coming soon',
        'loc.openMaps': 'Open in Google Maps →',
        'loc.expanding': '',
        'testi.title': 'Stories from Our Patients',
        'testi.1': '“Excellent as a homecare service—fast response and helped the patient recover.”',
        'testi.1name': 'Mahdi S', 'testi.1city': 'Makassar',
        'testi.2': '“I have used this service three times for my parents and this time for myself. The whole team was very professional. Thank you to the doctor, nurses, and team who cared for me today. Very satisfied—I called before dawn and they arrived in under an hour.”',
        'testi.2name': 'Citra', 'testi.2city': 'Makassar',
        'testi.3': '“Please keep the service like this—it is very satisfying.”',
        'testi.3name': 'Nur Sahmi', 'testi.3city': 'Makassar',
        'testi.4': '“Please keep the quick response—it really helps families who live far apart.”',
        'testi.4name': 'Rudiansyah', 'testi.4city': 'Makassar',
        'testi.5': '“Thank you for bringing Dokter Panggil to make things easier for patients. Hoping Dokter Panggil grows and succeeds.”',
        'testi.5name': 'Darwisa', 'testi.5city': 'Makassar',
        'testi.6': '“Information is easy to get, and I chose Dokter Panggil because of the good rating.”',
        'testi.6name': 'Bambang', 'testi.6city': 'Makassar',
        'faq.title': 'Frequently Asked Questions',
        'faq.q1': 'Is Dokter Panggil available 24 hours?',
        'faq.a1': 'Yes. GP visits are available 24 hours, including nights, weekends, and holidays. Specialist availability follows the scheduled medical team calendar.',
        'faq.q2': 'How do I call a doctor to my home?',
        'faq.a2': 'Contact the Dokter Panggil 24-hour call centre via WhatsApp or phone, share the patient’s complaint, ID card details, and location. The medical team will contact you after registration.',
        'faq.q3': 'How much does a doctor home visit cost?',
        'faq.a3': 'GP visit Rp220,000 and specialist visit Rp450,000 per visit, plus doctor transport Rp10,000/km from Dokter Panggil’s location. Outside working hours, an extra 50% of the visit fee applies. Fees exclude medicine, medical supplies, procedures, lab tests, nursing fees, and admin if needed.',
        'faq.q4': 'How long until the doctor arrives?',
        'faq.a4': 'Arrival time depends on distance, patient location, and traffic. The medical team will contact you after registration and share an estimated arrival time.',
        'faq.q5': 'Which areas does Dokter Panggil serve?',
        'faq.a5': 'Homecare is available in Makassar City, Gowa Regency, and Maros, within a 20 km operating radius from the clinic. Send the patient location to admin for service details.',
        'faq.q6': 'What conditions can be treated at home?',
        'faq.a6': 'Many complaints can be examined at home, such as fever, cough and cold, fatigue, diarrhea, nausea and vomiting, headache, stomach issues, as well as elderly check-ups and chronic conditions. The doctor will decide next steps based on the examination.',
        'faq.q7': 'Can infusion be done at home?',
        'faq.a7': 'Yes. Infusion therapy can be done at home when medically indicated and performed by competent healthcare professionals.',
        'faq.q8': 'Can doctors perform medical procedures at home?',
        'faq.a8': 'Yes. Certain procedures can be done at home based on examination findings and medical indication. If further facilities or care are needed, the doctor will recommend an appropriate referral.',
        'faq.q9': 'Can I call a specialist to my home?',
        'faq.a9': 'Yes. Dokter Panggil provides specialist home visits. Availability follows the scheduled medical team calendar.',
        'faq.q10': 'Can I choose the doctor myself?',
        'faq.a10': 'Yes. You can search doctors by name, specialty, or medical condition. The call-centre admin team can also recommend a doctor that fits the patient’s needs.',
        'faq.q11': 'Is home laboratory testing available?',
        'faq.a11': 'Yes. Sample collection for various lab tests can be done at home according to the type of examination needed.',
        'faq.q12': 'Is a nurse available to stay with the patient at home?',
        'faq.a12': 'Yes. Professional homecare nursing is available for companionship, observation, daily care, and nursing procedures based on the patient’s needs.',
        'faq.q13': 'Does Dokter Panggil serve children and elderly patients?',
        'faq.a13': 'Yes. Care is available for various age groups. For specific conditions, the team can help refer patients to the right specialist.',
        'faq.q14': 'Can I book for a specific day or time?',
        'faq.a14': 'Yes. Besides urgent visits, you can schedule a doctor or healthcare professional for a preferred time.',
        'faq.q15': 'What if the patient actually needs a hospital?',
        'faq.a15': 'The doctor will assess first. If the patient needs tests or care that cannot be done at home, the doctor will recommend the appropriate healthcare facility.',
        'cta.title': 'Need a Doctor or Nurse at Home?',
        'cta.subtitle': 'Tell the Dokter Panggil team what you need. We will help choose the right service for you and your family.',
        'cta.book': 'Book Now', 'cta.wa': 'Chat WhatsApp',
        'footer.desc': 'Homecare health services that bring doctors and healthcare professionals directly to your home for you and your family',
        'footer.services': 'Services', 'footer.company': 'Information', 'footer.contact': 'Contact Us',
        'footer.specialists': 'Specialists', 'footer.faq': 'FAQ', 'footer.how': 'How to Call', 'footer.area': 'Service Area',
        'footer.allServices': 'See All Services',
        'footer.phone': 'WhatsApp & 24-hour hotline 0811-4677-700',
        'footer.address': 'Office: Jl. Letnan Jenderal Hertasning No. 110 Makassar, South Sulawesi.',
        'footer.maps': 'View on Google Maps',
        'footer.hours': 'Service hours: 24 hours',
        'footer.chatWa': 'Chat WhatsApp',
        'footer.copyright': '2026 Dokter Panggil. All Rights Reserved'
    }
};

function markLangReady() {
    document.documentElement.classList.add('lang-ready');
}

function setLanguage(lang) {
    if (!translations[lang]) lang = 'id';
    currentLang = lang;
    const dict = translations[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const val = dict[el.getAttribute('data-i18n')];
        if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const val = dict[el.getAttribute('data-i18n-placeholder')];
        if (val !== undefined) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
        const active = btn.getAttribute('data-lang-btn') === lang;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('[data-wa-id]').forEach(el => {
        const msg = el.getAttribute(lang === 'en' ? 'data-wa-en' : 'data-wa-id');
        if (!msg) return;
        el.href = 'https://wa.me/628114677700?text=' + encodeURIComponent(msg);
    });

    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
    markLangReady();
}

document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang-btn')));
});

let savedLang = 'id';
try { savedLang = localStorage.getItem('lang') || 'id'; } catch (e) { /* ignore */ }
setLanguage(savedLang);
/* Safety: never leave the page blank if i18n fails */
setTimeout(markLangReady, 2500);

// Render icons when Lucide is ready (supports deferred/async load)
function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}
renderIcons();
