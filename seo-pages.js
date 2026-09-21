/**
 * Behaviour for the generated SEO landing pages.
 *
 * Intentionally separate from script.js: that file drives the homepage carousel,
 * doctor directory, and modals. This file handles mobile nav + chrome i18n.
 */
(function () {
    'use strict';

    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const header = document.getElementById('main-header');

    function updateNavHeight() {
        const bar = header && (header.querySelector('.nav-bar') || header.firstElementChild);
        if (bar) document.documentElement.style.setProperty('--nav-h', bar.offsetHeight + 'px');
    }
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    window.addEventListener('load', updateNavHeight);

    function setMenuOpen(open) {
        if (!menu || !menuBtn) return;
        menu.hidden = false;
        requestAnimationFrame(function () {
            menu.classList.toggle('is-open', open);
            if (backdrop) {
                backdrop.hidden = false;
                backdrop.classList.toggle('is-open', open);
            }
            document.body.classList.toggle('nav-open', open);
            if (header) header.classList.toggle('nav-open', open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
            if (!open) {
                closeNavAccordions();
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.setTimeout(function () {
                    if (!menu.classList.contains('is-open')) {
                        menu.hidden = true;
                        if (backdrop) backdrop.hidden = true;
                    }
                }, reduce ? 0 : 380);
            }
        });
    }

    function closeMenu() { setMenuOpen(false); }

    var NAV_DD_MS = 280;
    var NAV_ACC_MS = 380;
    function navPrefersReduce() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    function hideNavPanelAfter(el, panel, ms) {
        var hide = function () { if (!el.classList.contains('is-open')) panel.hidden = true; };
        if (navPrefersReduce()) hide();
        else setTimeout(hide, ms);
    }

    function closeNavDropdowns() {
        document.querySelectorAll('[data-nav-dd]').forEach(function (dd) {
            dd.classList.remove('is-open');
            var toggle = dd.querySelector('.nav-dd-toggle');
            var panel = dd.querySelector('.nav-dd-panel');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
            if (panel) hideNavPanelAfter(dd, panel, NAV_DD_MS);
        });
    }

    function closeNavAccordions() {
        document.querySelectorAll('[data-nav-acc]').forEach(function (acc) {
            acc.classList.remove('is-open');
            var toggle = acc.querySelector('.nav-acc-toggle');
            var panel = acc.querySelector('.nav-acc-panel');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
            if (panel) hideNavPanelAfter(acc, panel, NAV_ACC_MS);
        });
    }

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function () {
            setMenuOpen(!menu.classList.contains('is-open'));
        });
    }
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeNavDropdowns();
            closeMenu();
        }
    });
    window.addEventListener('resize', function () {
        if (window.matchMedia('(min-width: 1024px)').matches) closeMenu();
        else closeNavDropdowns();
    });
    if (menu) {
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    (function initNavMenus() {
        var desktopMq = window.matchMedia('(min-width: 1024px)');
        document.querySelectorAll('[data-nav-dd]').forEach(function (dd) {
            var toggle = dd.querySelector('.nav-dd-toggle');
            var panel = dd.querySelector('.nav-dd-panel');
            if (!toggle || !panel) return;
            var closeTimer = null;
            function open() {
                if (!desktopMq.matches) return;
                if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
                panel.hidden = false;
                toggle.setAttribute('aria-expanded', 'true');
                requestAnimationFrame(function () { dd.classList.add('is-open'); });
            }
            function close() {
                dd.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                hideNavPanelAfter(dd, panel, NAV_DD_MS);
            }
            function scheduleClose() {
                if (closeTimer) clearTimeout(closeTimer);
                closeTimer = setTimeout(close, 120);
            }
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                if (!desktopMq.matches) return;
                if (dd.classList.contains('is-open')) close();
                else open();
            });
            dd.addEventListener('mouseenter', open);
            dd.addEventListener('mouseleave', function () {
                if (desktopMq.matches) scheduleClose();
            });
            document.addEventListener('click', function (e) {
                if (!dd.contains(e.target)) close();
            });
        });
        document.querySelectorAll('[data-nav-acc]').forEach(function (acc) {
            var toggle = acc.querySelector('.nav-acc-toggle');
            var panel = acc.querySelector('.nav-acc-panel');
            if (!toggle || !panel) return;
            toggle.addEventListener('click', function () {
                var next = !acc.classList.contains('is-open');
                toggle.setAttribute('aria-expanded', String(next));
                if (next) {
                    panel.hidden = false;
                    requestAnimationFrame(function () { acc.classList.add('is-open'); });
                    acc.scrollIntoView({ block: 'nearest' });
                } else {
                    acc.classList.remove('is-open');
                    hideNavPanelAfter(acc, panel, NAV_ACC_MS);
                }
            });
        });
    })();

    /* FAQ accordion */
    document.addEventListener('click', function (e) {
        const q = e.target.closest ? e.target.closest('.seo-faq-q') : null;
        if (!q) return;
        const answer = q.nextElementSibling;
        if (!answer) return;
        const open = answer.classList.toggle('open');
        q.setAttribute('aria-expanded', String(open));
    });

    /* Retry remote images once — CDN hiccups otherwise leave an empty frame */
    document.querySelectorAll('img[data-retry]').forEach(function (img) {
        img.addEventListener('error', function () {
            if (img.dataset.retried) return;
            img.dataset.retried = '1';
            const base = img.src.split('&_r=')[0];
            img.src = base + '&_r=' + Date.now();
        });
    });

    /* Chrome i18n (nav / CTAs / footer) — synced with homepage via localStorage */
    const translations = {
        id: {
            'lang.label': 'Bahasa',
            'nav.home': 'Beranda',
            'nav.about': 'Tentang Kami',
            'nav.services': 'Layanan',
            'nav.doctors': 'Temukan Dokter',
            'nav.locations': 'Lokasi',
            'nav.contact': 'Kontak',
            'nav.allServices': 'Lihat semua layanan',
            'nav.g.main': 'Layanan Utama',
            'nav.g.procedures': 'Tindakan Medis',
            'nav.g.exam': 'Pemeriksaan',
            'nav.g.other': 'Layanan Lainnya',
            'btn.book': 'Pesan Sekarang',
            'cta.book': 'Pesan Sekarang',
            'cta.ask': 'Chat WhatsApp',
            'footer.desc': 'Layanan kesehatan homecare yang menghadirkan dokter dan tenaga kesehatan langsung ke rumah untuk Anda dan keluarga',
            'footer.services': 'Layanan',
            'footer.company': 'Informasi',
            'footer.contact': 'Hubungi Kami',
            'footer.specialists': 'Dokter Spesialis',
            'footer.faq': 'FAQ',
            'footer.how': 'Cara Panggil',
            'footer.area': 'Area Layanan',
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
            'nav.home': 'Home',
            'nav.about': 'About Us',
            'nav.services': 'Services',
            'nav.doctors': 'Find a Doctor',
            'nav.locations': 'Locations',
            'nav.contact': 'Contact',
            'nav.allServices': 'See all services',
            'nav.g.main': 'Main Services',
            'nav.g.procedures': 'Medical Procedures',
            'nav.g.exam': 'Health Checks',
            'nav.g.other': 'Other Services',
            'btn.book': 'Book Now',
            'cta.book': 'Book Now',
            'cta.ask': 'Chat WhatsApp',
            'footer.desc': 'Homecare health services that bring doctors and healthcare professionals directly to your home for you and your family',
            'footer.services': 'Services',
            'footer.company': 'Information',
            'footer.contact': 'Contact Us',
            'footer.specialists': 'Specialists',
            'footer.faq': 'FAQ',
            'footer.how': 'How to Call',
            'footer.area': 'Service Area',
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
        const dict = translations[lang];
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const val = dict[el.getAttribute('data-i18n')];
            if (val !== undefined) el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-id]').forEach(function (el) {
            const next = el.getAttribute(lang === 'en' ? 'data-i18n-en' : 'data-i18n-id');
            if (next != null) el.textContent = next;
        });
        document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
            const active = btn.getAttribute('data-lang-btn') === lang;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', String(active));
        });
        document.querySelectorAll('[data-wa-id]').forEach(function (el) {
            const msg = el.getAttribute(lang === 'en' ? 'data-wa-en' : 'data-wa-id');
            if (!msg) return;
            el.href = 'https://wa.me/628114677700?text=' + encodeURIComponent(msg);
        });
        if (typeof window.setDoctorsDirectoryLang === 'function') {
            window.setDoctorsDirectoryLang(lang);
        }
        try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
        markLangReady();
        if (typeof window.__refreshVaxModalLang === 'function') {
            window.__refreshVaxModalLang();
        }
    }

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setLanguage(btn.getAttribute('data-lang-btn'));
        });
    });

    let savedLang = 'id';
    try { savedLang = localStorage.getItem('lang') || 'id'; } catch (e) { /* ignore */ }
    setLanguage(savedLang);
    setTimeout(markLangReady, 2500);

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    /* Vaccination category detail modal (layanan/vaksinasi.html) */
    (function initVaxModal() {
        const dataEl = document.getElementById('vax-modal-data');
        const modal = document.getElementById('vax-modal');
        const body = document.getElementById('vax-modal-body');
        const footer = document.getElementById('vax-modal-footer');
        if (!dataEl || !modal || !body) return;

        let data;
        try { data = JSON.parse(dataEl.textContent); } catch (err) { return; }
        if (!data || !data.items) return;

        const MODAL_MS = 280;
        let hideTimer = null;
        let openId = null;

        function lang() {
            return document.documentElement.lang === 'en' ? 'en' : 'id';
        }

        function t(obj) {
            if (!obj) return '';
            if (typeof obj === 'string') return obj;
            return obj[lang()] || obj.id || '';
        }

        function esc(s) {
            return String(s == null ? '' : s)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }

        function show() {
            clearTimeout(hideTimer);
            modal.hidden = false;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            requestAnimationFrame(function () {
                modal.classList.add('is-open');
            });
        }

        function hide() {
            if (modal.classList.contains('hidden')) return;
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
            openId = null;
            clearTimeout(hideTimer);
            hideTimer = setTimeout(function () {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                modal.hidden = true;
            }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : MODAL_MS);
        }

        function lines(values, cls) {
            return (values || []).filter(Boolean).map(function (value) {
                return '<span class="' + cls + '">' + esc(value) + '</span>';
            }).join('');
        }

        function renderSchedule(schedule, ui) {
            if (!schedule || !schedule.tabs || !schedule.tabs.length) return '';
            const tabs = schedule.tabs;
            const tabsLabel = t(schedule.tabsLabel) || t(ui.scheduleTitle);
            const tabBtns = '<div class="vax-age-tabs" role="tablist" aria-label="' + esc(tabsLabel) + '">'
                + tabs.map(function (tab, i) {
                    const active = i === 0 ? ' is-active' : '';
                    return '<button type="button" role="tab" class="vax-age-tab' + active + '"'
                        + ' data-vax-age-tab="' + esc(tab.id) + '"'
                        + ' aria-selected="' + (i === 0 ? 'true' : 'false') + '">'
                        + esc(lang() === 'en' ? (tab.labelEn || tab.label) : tab.label)
                        + '</button>';
                }).join('')
                + '</div>';

            const panels = tabs.map(function (tab, i) {
                const groups = (tab.groups || []).map(function (g) {
                    const rows = (g.vaccines || []).map(function (v) {
                        const pending = v.brandPending || !String(v.brand || '').trim();
                        const brandHtml = pending
                            ? '<span class="vax-brand-pending">' + esc(t(ui.brandPending)) + '</span>'
                            : lines(v.brands || [v.brand], 'vax-brand');
                        let meta = '';
                        if (v.benefit) {
                            meta += '<span class="vax-meta-item"><span class="vax-meta-label">' + esc(t(ui.benefit)) + '</span>'
                                + '<span class="vax-meta-value">' + esc(v.benefit) + '</span></span>';
                        }
                        if (v.schedule) {
                            meta += '<span class="vax-meta-item"><span class="vax-meta-label">' + esc(t(ui.schedule)) + '</span>'
                                + lines(v.schedules || [v.schedule], 'vax-meta-value') + '</span>';
                        }
                        meta += '<span class="vax-meta-item"><span class="vax-meta-label">' + esc(t(ui.brand)) + '</span>'
                            + brandHtml + '</span>';
                        return '<article class="vax-row"><h4 class="vax-row-name">' + esc(v.name) + '</h4>'
                            + '<div class="vax-row-meta">' + meta + '</div></article>';
                    }).join('');
                    return '<div class="vax-age-group">'
                        + (g.age ? '<h4 class="vax-age-group-title">' + esc(g.age) + '</h4>' : '')
                        + '<div class="vax-rows">' + rows + '</div></div>';
                }).join('');

                const lead = lang() === 'en' ? (tab.leadEn || tab.lead) : tab.lead;
                return '<div class="vax-age-panel' + (i === 0 ? ' is-active' : '') + '"'
                    + ' data-vax-age-panel="' + esc(tab.id) + '" role="tabpanel"'
                    + (i === 0 ? '' : ' hidden') + '>'
                    + (lead ? '<p class="text-sm text-gray-500 leading-relaxed mb-3">' + esc(lead) + '</p>' : '')
                    + groups
                    + '</div>';
            }).join('');

            return '<div class="vax-anim vax-modal-schedule" style="--vax-i:2">'
                + '<p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">' + esc(t(schedule.title) || t(ui.scheduleTitle)) + '</p>'
                + '<p class="text-sm text-gray-600 leading-relaxed mb-3">' + esc(t(schedule.lead)) + '</p>'
                + tabBtns + panels
                + '</div>';
        }

        function render(item) {
            const ui = data.ui || {};

            const chips = (item.examples || []).map(function (ex, i) {
                return '<span class="vax-chip vax-anim" style="--vax-i:' + (i + 3) + '">' + esc(t(ex)) + '</span>';
            }).join('');
            const points = (item.points || []).map(function (pt, i) {
                return '<li class="vax-anim flex gap-2.5 items-start" style="--vax-i:' + (i + 8) + '">'
                    + '<span class="seo-dot shrink-0 mt-0.5" style="background:rgba(216,48,48,0.12)">'
                    + '<i data-lucide="check" style="width:13px;height:13px;color:#D83030"></i></span>'
                    + '<span class="text-sm text-gray-600 leading-relaxed">' + esc(t(pt)) + '</span></li>';
            }).join('');

            const examplesBlock = chips
                ? ('<div>'
                    + '<p class="vax-anim text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2.5" style="--vax-i:2">' + esc(t(item.examplesTitle) || t(ui.examplesTitle)) + '</p>'
                    + '<div class="flex flex-wrap gap-2">' + chips + '</div>'
                    + '</div>')
                : '';

            const bookLabel = t(ui.book);
            const tempLine = item.hideTemp ? '' : ('<p class="vax-anim text-[11px] text-gray-400" style="--vax-i:13">' + esc(t(ui.temp)) + '</p>');

            body.innerHTML =
                '<div class="vax-modal-hero relative px-5 pt-6 pb-5 sm:px-6 sm:pt-7 sm:pb-6">'
                + '<div class="vax-modal-hero-bg" aria-hidden="true"></div>'
                + '<div class="relative vax-anim" style="--vax-i:0">'
                + '<div class="w-12 h-12 mb-3 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/30">'
                + '<i data-lucide="' + esc(item.icon || 'syringe') + '" style="width:24px;height:24px;color:#fff"></i></div>'
                + '<span class="inline-block mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white/95 ring-1 ring-white/25">' + esc(t(item.badge)) + '</span>'
                + '<h3 id="vax-modal-title" class="text-xl sm:text-2xl font-bold text-white leading-tight pr-8">' + esc(t(item.title)) + '</h3>'
                + '</div></div>'
                + '<div class="px-5 py-5 sm:px-6 sm:pb-6 space-y-5">'
                + '<p class="vax-anim text-sm text-gray-600 leading-relaxed" style="--vax-i:1">' + esc(t(item.lead)) + '</p>'
                + examplesBlock
                + renderSchedule(item.schedule, ui)
                + '<div>'
                + '<p class="vax-anim text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2.5" style="--vax-i:7">' + esc(t(item.pointsTitle) || t(ui.pointsTitle)) + '</p>'
                + '<ul class="space-y-2.5">' + points + '</ul>'
                + '</div>'
                + '<p class="vax-anim seo-inline-note" style="--vax-i:12">'
                + '<i data-lucide="info" style="width:15px;height:15px;color:#D83030;flex-shrink:0;margin-top:2px"></i>'
                + '<span>' + esc(t(item.note)) + '</span></p>'
                + tempLine
                + '</div>';

            if (footer) {
                const pdfBtn = item.pdf
                    ? ('<a href="' + esc(item.pdf) + '" download class="vax-modal-pdf inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-[#F1E7E0] bg-white text-charcoal text-sm font-semibold hover:border-primary/30 hover:bg-primary/5 transition-colors">'
                        + '<i data-lucide="download" style="width:16px;height:16px;color:#D83030"></i>'
                        + '<span>' + esc(t(ui.downloadPdf)) + '</span></a>')
                    : '';
                footer.innerHTML =
                    '<div class="flex flex-col gap-2.5">'
                    + pdfBtn
                    + '<div class="flex flex-col sm:flex-row gap-2.5">'
                    + '<a href="' + esc(item.waBook) + '" target="_blank" rel="noopener noreferrer" class="vax-modal-book flex-1 text-center px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors">' + esc(bookLabel) + '</a>'
                    + '<a href="' + esc(item.waAsk) + '" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-3 rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors">' + esc(t(ui.ask)) + '</a>'
                    + '</div></div>';
            }

            if (window.lucide) window.lucide.createIcons();
        }

        function open(id) {
            const item = data.items.find(function (x) { return x.id === id; });
            if (!item) return;
            openId = id;
            render(item);
            show();
        }

        document.addEventListener('click', function (e) {
            const btn = e.target.closest ? e.target.closest('[data-vax-open]') : null;
            if (btn) {
                e.preventDefault();
                open(btn.getAttribute('data-vax-open'));
                return;
            }
            if (e.target.closest && e.target.closest('.vax-modal-book')) {
                hide();
            }
        });

        const overlay = document.getElementById('vax-modal-overlay');
        const closeBtn = document.getElementById('vax-modal-close');
        if (overlay) overlay.addEventListener('click', hide);
        if (closeBtn) closeBtn.addEventListener('click', hide);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && openId) hide();
        });

        window.__refreshVaxModalLang = function () {
            if (openId) {
                const item = data.items.find(function (x) { return x.id === openId; });
                if (item) render(item);
            }
        };
    })();

    /* Age tabs inside vaksinasi modal (event delegation) */
    (function initVaxAgeTabs() {
        function activate(root, id) {
            const scope = root || document;
            const tabs = scope.querySelectorAll('[data-vax-age-tab]');
            const panels = scope.querySelectorAll('[data-vax-age-panel]');
            tabs.forEach(function (tab) {
                const on = tab.getAttribute('data-vax-age-tab') === id;
                tab.classList.toggle('is-active', on);
                tab.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            panels.forEach(function (panel) {
                const on = panel.getAttribute('data-vax-age-panel') === id;
                panel.classList.toggle('is-active', on);
                if (on) panel.removeAttribute('hidden');
                else panel.setAttribute('hidden', '');
            });
        }

        document.addEventListener('click', function (e) {
            const tab = e.target.closest ? e.target.closest('[data-vax-age-tab]') : null;
            if (!tab) return;
            const root = tab.closest('.vax-modal-schedule') || tab.closest('#vax-modal-body') || document;
            activate(root, tab.getAttribute('data-vax-age-tab'));
        });
    })();
})();
