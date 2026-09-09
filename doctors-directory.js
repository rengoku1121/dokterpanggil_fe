/**
 * Interactive doctor directory (search, filters, cards, detail modal).
 * Expects #doctor-filters, #specialty-filters, #doctors-grid, #doctor-modal on the page.
 */
(function () {
    if (typeof DOCTORS === 'undefined' || !document.getElementById('doctors-grid')) return;

    const WA_NUMBER = '628114677700';
    const MODAL_ANIM_MS = 260;
    const modalHideTimers = {};
    const docState = { category: 'all', specialty: 'all', query: '' };
    let currentLang = 'id';

    const UI = {
        id: {
            spAll: 'Semua Spesialis',
            available: 'Tersedia',
            detail: 'Detail',
            book: 'Pesan Sekarang',
            location: 'Layanan',
            locationVal: 'Kunjungan ke rumah di Makassar',
            bookAppt: 'Pesan Sekarang',
            bookNow: 'Chat WhatsApp',
            empty: 'Tidak ada tenaga medis yang cocok. Coba kata kunci atau filter lain.',
            searchPh: 'Cari nama, spesialisasi, atau kondisi...',
            alumni: 'Alumnus',
            practice: 'Praktek di',
            conditions: 'Keluhan & kondisi yang ditangani'
        },
        en: {
            spAll: 'All Specialties',
            available: 'Available',
            detail: 'Details',
            book: 'Book Now',
            location: 'Service',
            locationVal: 'Home visit in Makassar',
            bookAppt: 'Book Now',
            bookNow: 'Chat WhatsApp',
            empty: 'No matching professionals. Try another keyword or filter.',
            searchPh: 'Search by name, specialty, or condition...',
            alumni: 'Alumnus',
            practice: 'Practices at',
            conditions: 'Complaints & conditions treated'
        }
    };

    function t(key) { return (UI[currentLang] || UI.id)[key] || UI.id[key]; }
    function L(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[currentLang] || obj.id || obj.en || '';
    }
    function docBadge(d) {
        return d.specialty
            ? L(SPECIALTIES[d.specialty])
            : L(DOC_CATEGORIES.find(c => c.key === d.category));
    }
    function avatarBlock(d, heightClass) {
        if (d.photo) {
            return '<img src="' + d.photo + '" alt="' + d.name + '" class="w-full ' + heightClass + ' object-cover" loading="lazy">';
        }
        return '<div class="w-full ' + heightClass + ' flex items-center justify-center" style="background:' + (d.tint || '#D83030') + '" aria-hidden="true">'
            + '<span class="text-white font-bold tracking-wide select-none" style="font-size:2.25rem">' + (d.initials || '') + '</span></div>';
    }

    function chips(list) {
        return (list || []).map(function (item) {
            return '<span class="inline-flex px-2.5 py-1 rounded-full bg-primary/10 text-charcoal text-[11px] font-medium border border-primary/10">' + item + '</span>';
        }).join('');
    }

    function waLink(d) {
        const role = L(d.role);
        const msg = currentLang === 'en'
            ? ('Hi, I would like to book an appointment with ' + d.name + ' (' + role + ') for a home visit in Makassar.\nPlease share availability and an estimated fee. Thank you.')
            : ('Halo, saya mau buat janji dengan ' + d.name + ' (' + role + ') untuk kunjungan ke rumah di Makassar.\nMohon info ketersediaan jadwal dan estimasi biayanya. Terima kasih.');
        return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    }

    function retryImage(img) {
        const retries = parseInt(img.dataset.retries || '0', 10);
        if (retries >= 3) return;
        img.dataset.retries = String(retries + 1);
        const base = img.src.split('&_r=')[0];
        setTimeout(() => { img.src = base + '&_r=' + Date.now(); }, 1500 * (retries + 1));
    }
    function applyImageRetry(root) {
        (root || document).querySelectorAll('img').forEach(img => {
            if (img.dataset.retryBound) return;
            img.dataset.retryBound = '1';
            img.addEventListener('error', () => retryImage(img));
            if (img.complete && img.naturalWidth === 0) retryImage(img);
        });
    }

    function filterDoctors() {
        const q = docState.query.trim().toLowerCase();
        return DOCTORS.filter(d => {
            if (docState.category !== 'all' && d.category !== docState.category) return false;
            if (docState.category === 'spesialis' && docState.specialty !== 'all' && d.specialty !== docState.specialty) return false;
            if (q) {
                const spec = d.specialty ? L(SPECIALTIES[d.specialty]) : '';
                const cond = (d.conditions && (d.conditions[currentLang] || d.conditions.id) || []).join(' ');
                const hay = [
                    d.name, L(d.role), spec, d.alumni || '',
                    (d.practice || []).join(' '), cond,
                    d.role && d.role.id, d.role && d.role.en,
                    d.bio && d.bio.id, d.bio && d.bio.en
                ].join(' ').toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });
    }

    function renderCategoryFilters() {
        const wrap = document.getElementById('doctor-filters');
        if (!wrap) return;
        const cats = DOC_CATEGORIES.filter(c => c.key === 'all' || DOCTORS.some(d => d.category === c.key));
        wrap.innerHTML = cats.map(c => {
            const active = docState.category === c.key;
            const cls = active
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-charcoal border-gray-200 hover:border-primary/40';
            return '<button type="button" class="doc-cat-btn min-h-[44px] px-5 py-2.5 rounded-full text-sm font-medium border transition-colors ' + cls + '" data-cat="' + c.key + '">' + L(c) + '</button>';
        }).join('');
    }

    function renderSpecialtyFilters() {
        const wrap = document.getElementById('specialty-filters');
        if (!wrap) return;
        if (docState.category !== 'spesialis') { wrap.classList.add('hidden'); wrap.innerHTML = ''; return; }
        wrap.classList.remove('hidden');
        const present = Object.keys(SPECIALTIES).filter(k => DOCTORS.some(d => d.specialty === k));
        const chips = [{ key: 'all', label: t('spAll'), icon: null }].concat(
            present.map(k => ({ key: k, label: L(SPECIALTIES[k]), icon: SPECIALTIES[k].icon }))
        );
        wrap.innerHTML = chips.map(c => {
            const active = docState.specialty === c.key;
            const cls = active
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-charcoal border-gray-200 hover:border-primary/40';
            const icon = c.icon ? '<i data-lucide="' + c.icon + '" style="width:14px;height:14px"></i>' : '';
            return '<button type="button" class="doc-spec-btn inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-full text-xs font-medium border transition-colors ' + cls + '" data-spec="' + c.key + '">' + icon + '<span>' + c.label + '</span></button>';
        }).join('');
    }

    function renderDoctorCards() {
        const grid = document.getElementById('doctors-grid');
        const empty = document.getElementById('doctors-empty');
        if (!grid) return;
        const list = filterDoctors();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        grid.classList.add('is-updating');

        if (!list.length) {
            grid.innerHTML = '';
            grid.classList.remove('is-updating');
            if (empty) {
                empty.textContent = t('empty');
                empty.classList.remove('hidden');
                empty.classList.remove('is-shown');
                if (!reduceMotion) {
                    void empty.offsetWidth;
                    empty.classList.add('is-shown');
                }
            }
            return;
        }

        if (empty) {
            empty.classList.add('hidden');
            empty.classList.remove('is-shown');
        }

        grid.innerHTML = list.map((d, i) => (
            '<div class="doctor-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col" style="--stagger:' + Math.min(i, 12) + '">' +
            '<div class="relative">' +
            avatarBlock(d, 'h-40') +
            '<span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 text-primary shadow-sm">' + docBadge(d) + '</span>' +
            '</div>' +
            '<div class="p-4 flex flex-col flex-1">' +
            '<h3 class="font-bold leading-tight">' + d.name + '</h3>' +
            '<p class="text-sm text-gray-500 mb-3">' + L(d.role) + '</p>' +
            '<div class="flex items-center gap-1 mb-4">' +
            '<span class="w-2 h-2 bg-soft-green rounded-full"></span>' +
            '<span class="text-xs text-soft-green font-medium">' + t('available') + '</span>' +
            '</div>' +
            '<div class="mt-auto flex gap-2">' +
            '<button type="button" class="doc-detail-btn flex-1 px-3 py-2 rounded-lg text-sm font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition-colors" data-id="' + d.id + '">' + t('detail') + '</button>' +
            '<a href="' + waLink(d) + '" target="_blank" rel="noopener noreferrer" class="doc-book-btn flex-1 text-center px-3 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors" data-id="' + d.id + '">' + t('book') + '</a>' +
            '</div></div></div>'
        )).join('');

        if (!reduceMotion) {
            const cards = grid.querySelectorAll('.doctor-card');
            cards.forEach(card => {
                card.style.animation = 'none';
                void card.offsetWidth;
                card.style.animation = '';
            });
        }

        requestAnimationFrame(() => grid.classList.remove('is-updating'));
        applyImageRetry(grid);
        if (window.lucide) lucide.createIcons();
    }

    function renderDoctors() {
        renderCategoryFilters();
        renderSpecialtyFilters();
        renderDoctorCards();
        const search = document.getElementById('doctor-search');
        if (search) {
            if (search.value !== docState.query) search.value = docState.query;
            search.placeholder = t('searchPh');
        }
        if (window.lucide) lucide.createIcons();
    }

    function showModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return null;
        clearTimeout(modalHideTimers[id]);
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => modal.classList.add('is-open'));
        return modal;
    }

    function hideModal(id) {
        const modal = document.getElementById(id);
        if (!modal || modal.classList.contains('hidden')) return;
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        clearTimeout(modalHideTimers[id]);
        modalHideTimers[id] = setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, MODAL_ANIM_MS);
    }

    function openDoctorModal(id) {
        const d = DOCTORS.find(x => x.id === id);
        const modal = document.getElementById('doctor-modal');
        const body = document.getElementById('doctor-modal-body');
        if (!d || !modal || !body) return;
        const link = waLink(d);
        const conds = (d.conditions && (d.conditions[currentLang] || d.conditions.id)) || [];
        const practice = (d.practice || []).join(' · ');
        const condBlock = conds.length
            ? ('<div class="mb-5"><p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">' + t('conditions') + '</p>'
                + '<div class="flex flex-wrap gap-1.5">' + chips(conds) + '</div></div>')
            : '';
        const metaRows = [];
        if (d.alumni) {
            metaRows.push('<div class="flex items-start gap-2 text-gray-600"><i data-lucide="book-open" style="width:16px;height:16px;color:#D83030;flex-shrink:0;margin-top:2px"></i><span>' + t('alumni') + ': ' + d.alumni + '</span></div>');
        }
        if (practice) {
            metaRows.push('<div class="flex items-start gap-2 text-gray-600"><i data-lucide="building" style="width:16px;height:16px;color:#D83030;flex-shrink:0;margin-top:2px"></i><span>' + t('practice') + ': ' + practice + '</span></div>');
        }
        metaRows.push('<div class="flex items-start gap-2 text-gray-600"><i data-lucide="map-pin" style="width:16px;height:16px;color:#D83030;flex-shrink:0;margin-top:2px"></i><span>' + t('location') + ': ' + t('locationVal') + '</span></div>');
        body.innerHTML = (
            '<div class="relative">' +
            avatarBlock(d, 'h-44') +
            '<div class="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>' +
            '<div class="absolute bottom-3 left-4 right-12 text-white">' +
            '<span class="inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary mb-2">' + docBadge(d) + '</span>' +
            '<h3 id="doctor-modal-title" class="text-xl font-bold leading-tight">' + d.name + '</h3>' +
            '<p class="text-sm opacity-90">' + L(d.role) + '</p>' +
            '</div></div>' +
            '<div class="p-5">' +
            '<p class="text-sm text-gray-600 leading-relaxed mb-5">' + L(d.bio) + '</p>' +
            condBlock +
            '<div class="space-y-2 mb-5 text-sm">' + metaRows.join('') + '</div>' +
            '<div class="flex flex-col sm:flex-row gap-3">' +
            '<a href="' + link + '" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors">' + t('bookAppt') + '</a>' +
            '<a href="' + link + '" target="_blank" rel="noopener noreferrer" class="modal-book-now flex-1 text-center px-4 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors">' + t('bookNow') + '</a>' +
            '</div></div>'
        );
        applyImageRetry(body);
        showModal('doctor-modal');
        if (window.lucide) lucide.createIcons();
    }

    function closeDoctorModal() { hideModal('doctor-modal'); }

    const filters = document.getElementById('doctor-filters');
    if (filters) filters.addEventListener('click', e => {
        const btn = e.target.closest('.doc-cat-btn');
        if (!btn) return;
        docState.category = btn.dataset.cat;
        if (docState.category !== 'spesialis') docState.specialty = 'all';
        renderDoctors();
    });

    const specs = document.getElementById('specialty-filters');
    if (specs) specs.addEventListener('click', e => {
        const btn = e.target.closest('.doc-spec-btn');
        if (!btn) return;
        docState.specialty = btn.dataset.spec;
        renderDoctors();
    });

    const search = document.getElementById('doctor-search');
    let searchTimer = null;
    if (search) search.addEventListener('input', () => {
        docState.query = search.value;
        clearTimeout(searchTimer);
        searchTimer = setTimeout(renderDoctorCards, 160);
    });

    const grid = document.getElementById('doctors-grid');
    if (grid) grid.addEventListener('click', e => {
        const detail = e.target.closest('.doc-detail-btn');
        if (detail) { openDoctorModal(detail.dataset.id); return; }
    });

    const overlay = document.getElementById('doctor-modal-overlay');
    const closeBtn = document.getElementById('doctor-modal-close');
    if (overlay) overlay.addEventListener('click', closeDoctorModal);
    if (closeBtn) closeBtn.addEventListener('click', closeDoctorModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDoctorModal();
    });

    const modal = document.getElementById('doctor-modal');
    if (modal) modal.addEventListener('click', e => {
        if (e.target.closest('.modal-book-now')) closeDoctorModal();
    });

    window.setDoctorsDirectoryLang = function (lang) {
        currentLang = (lang === 'en') ? 'en' : 'id';
        renderDoctors();
    };

    try { currentLang = localStorage.getItem('lang') || 'id'; } catch (e) { /* ignore */ }
    if (currentLang !== 'id' && currentLang !== 'en') currentLang = 'id';

    // Deep-link: /dokter/?cat=spesialis (atau umum / perawat / fisioterapis)
    try {
        const params = new URLSearchParams(window.location.search);
        const cat = params.get('cat');
        if (cat && typeof DOC_CATEGORIES !== 'undefined' && DOC_CATEGORIES.some(c => c.key === cat)) {
            docState.category = cat;
            if (cat !== 'spesialis') docState.specialty = 'all';
        }
        const spec = params.get('spec');
        if (spec && docState.category === 'spesialis' && typeof SPECIALTIES !== 'undefined' && SPECIALTIES[spec]) {
            docState.specialty = spec;
        }
    } catch (e) { /* ignore */ }

    renderDoctors();
})();
