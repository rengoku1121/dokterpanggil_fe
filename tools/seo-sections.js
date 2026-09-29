/**
 * Shared section components for layanan detail pages.
 * Factory receives helpers from build-seo.js so markup and i18n stay consistent.
 */
module.exports = function createSeoSections(h) {
    const {
        wrapWide, sectionHead, biTag, biAttrs, biSpan, icon, esc, waLink, BRAND
    } = h;

    function composeBody(parts) {
        return parts.filter(Boolean).map((inner, i) =>
            wrapWide(inner, i % 2 === 1 ? 'alt' : '')
        ).join('\n');
    }

    function aboutCard(paragraphs, paragraphsEn) {
        const en = paragraphsEn || [];
        return '<div class="canva-card rounded-2xl p-6 sm:p-8">'
            + paragraphs.map((p, i) =>
                biTag('p', p, en[i], 'class="text-sm text-gray-600 leading-relaxed' + (i ? ' mt-3' : '') + '"')
            ).join('')
            + '</div>';
    }

    function whenCards(items, itemsEn) {
        const en = itemsEn || [];
        return '<div class="grid md:grid-cols-2 gap-4">' + items.map((c, i) => {
            const ce = en[i] || {};
            return '<div class="canva-card rounded-2xl p-5 sm:p-6">'
                + biTag('h3', c.title, ce.title, 'class="font-bold mb-2 leading-snug"')
                + biTag('p', c.desc, ce.desc, 'class="text-sm text-gray-600 leading-relaxed"')
                + '</div>';
        }).join('') + '</div>';
    }

    function iconInfoCards(items, itemsEn, icons) {
        const en = itemsEn || [];
        const list = icons || [];
        return '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + items.map((c, i) => {
            const ce = en[i] || {};
            const ic = c.icon || list[i];
            return '<div class="canva-card rounded-2xl p-5">'
                + (ic
                    ? '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(ic, 22, BRAND) + '</div>'
                    : '')
                + biTag('h3', c.title, ce.title, 'class="font-bold mb-2 text-sm leading-snug"')
                + biTag('p', c.desc, ce.desc, 'class="text-sm text-gray-600 leading-relaxed"')
                + '</div>';
        }).join('') + '</div>';
    }

    function iconRowCards(items, itemsEn) {
        const en = itemsEn || [];
        return '<div class="grid sm:grid-cols-2 gap-4">' + items.map((c, i) => {
            const ce = en[i] || {};
            return '<div class="canva-card rounded-2xl p-5 flex gap-4">'
                + (c.icon
                    ? '<div class="w-11 h-11 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(c.icon, 22, BRAND) + '</div>'
                    : '')
                + '<div>' + biTag('h3', c.title, ce.title, 'class="font-bold mb-1 text-sm leading-snug"')
                + biTag('p', c.desc, ce.desc, 'class="text-sm text-gray-600 leading-relaxed"')
                + '</div></div>';
        }).join('') + '</div>';
    }

    function compactStepCards(steps, stepsEn, cols) {
        const en = stepsEn || [];
        const grid = cols || 'sm:grid-cols-2 lg:grid-cols-3';
        return '<ol class="grid ' + grid + ' gap-4">' + steps.map((s, i) => {
            const se = en[i] || {};
            const n = s.n || String(i + 1).padStart(2, '0');
            return '<li class="canva-card rounded-2xl p-5">'
                + '<span class="seo-step-num mb-3">' + n + '</span>'
                + biTag('span', s.title, se.title, 'class="block font-semibold mb-1 text-sm"')
                + biTag('span', s.desc, se.desc, 'class="block text-sm text-gray-500 leading-relaxed"')
                + '</li>';
        }).join('') + '</ol>';
    }

    function howStepCards(steps, stepsEn, cols) {
        const en = stepsEn || [];
        const grid = cols || 'sm:grid-cols-2 lg:grid-cols-3';
        const titlesOnly = steps.every(s => !s.desc);
        return '<ol class="grid ' + grid + (titlesOnly ? ' seo-steps-tiles gap-3' : ' gap-5') + '">' + steps.map((s, i) => {
            const se = en[i] || {};
            const n = s.n || String(i + 1).padStart(2, '0');
            return '<li class="canva-card rounded-2xl p-5 flex gap-4">'
                + '<span class="seo-step-num">' + n + '</span>'
                + '<span>' + biTag('span', s.title, se.title, 'class="block font-semibold seo-step-title' + (s.desc ? ' mb-1' : '') + '"')
                + (s.desc ? biTag('span', s.desc, se.desc, 'class="block text-sm text-gray-500 leading-relaxed"') : '')
                + '</span></li>';
        }).join('') + '</ol>';
    }

    function whyCards(items, itemsEn, icons) {
        const en = itemsEn || [];
        return '<div class="grid sm:grid-cols-2 gap-4">' + items.map((w, i) => {
            const we = en[i] || {};
            const ic = w.icon || (icons && icons[i]);
            return '<div class="canva-card rounded-2xl p-5 flex gap-4">'
                + (ic
                    ? '<div class="w-11 h-11 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(ic, 22, BRAND) + '</div>'
                    : '')
                + '<div>' + biTag('h3', w.title, we.title, 'class="font-bold mb-1 text-sm"')
                + biTag('p', w.desc, we.desc, 'class="text-sm text-gray-600 leading-relaxed"')
                + '</div></div>';
        }).join('') + '</div>';
    }

    function flowPills(items, itemsEn) {
        return '<ol class="flex flex-wrap gap-2 mt-4">' + items.map((t, i) =>
            '<li class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary">'
            + '<span class="opacity-60">' + String(i + 1).padStart(2, '0') + '</span>'
            + biTag('span', t, (itemsEn && itemsEn[i]) || t)
            + '</li>'
        ).join('') + '</ol>';
    }

    function pills(items, itemsEn) {
        const en = itemsEn || items;
        return '<div class="flex flex-wrap gap-2">' + items.map((s, i) =>
            '<span class="inline-flex px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"'
            + biAttrs(s, en[i]) + '>' + esc(s) + '</span>'
        ).join('') + '</div>';
    }

    function pathCards(cards) {
        return '<div class="grid md:grid-cols-2 gap-5">' + cards.map(c =>
            '<div class="canva-card rounded-3xl p-6 sm:p-8">'
            + (c.icon
                ? '<div class="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(c.icon, 24, BRAND) + '</div>'
                : '')
            + biTag('h3', c.title, c.titleEn, 'class="text-xl font-bold mb-3"')
            + (c.p1 ? biTag('p', c.p1, c.p1En, 'class="text-sm text-gray-600 leading-relaxed mb-3"') : '')
            + (c.p2 ? biTag('p', c.p2, c.p2En, 'class="text-sm text-gray-600 leading-relaxed' + (c.p3 ? ' mb-3' : '') + '"') : '')
            + (c.p3 ? biTag('p', c.p3, c.p3En, 'class="text-sm text-gray-600 leading-relaxed"') : '')
            + (c.flow ? flowPills(c.flow, c.flowEn) : '')
            + '</div>'
        ).join('') + '</div>';
    }

    function doctorNursePathCards(opts) {
        const e = opts.e || {};
        return pathCards([
            {
                icon: 'stethoscope',
                title: opts.doctorTitle, titleEn: e.doctorTitle,
                p1: opts.doctorP1, p1En: e.doctorP1,
                p2: opts.doctorP2, p2En: e.doctorP2,
                flow: opts.doctorFlow, flowEn: opts.doctorFlowEn
            },
            {
                icon: 'heart-handshake',
                title: opts.nurseTitle, titleEn: e.nurseTitle,
                p1: opts.nurseP1, p1En: e.nurseP1,
                p2: opts.nurseP2, p2En: e.nurseP2,
                flow: opts.nurseFlow, flowEn: opts.nurseFlowEn
            }
        ]);
    }

    function doubtBox(opts) {
        const target = opts.external === false ? '' : ' target="_blank" rel="noopener noreferrer"';
        return '<div class="rounded-2xl border border-[#F1E7E0] bg-warm-gray p-5 sm:p-6">'
            + biTag('p', opts.title, opts.titleEn, 'class="font-semibold mb-1"')
            + biTag('p', opts.body, opts.bodyEn, 'class="text-sm text-gray-600 leading-relaxed mb-4"')
            + '<a href="' + esc(opts.href) + '"' + target
            + biAttrs(opts.cta, opts.ctaEn)
            + ' class="inline-flex px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:scale-105 transition-transform">'
            + esc(opts.cta) + '</a></div>';
    }

    function noteLine(text, textEn) {
        return '<p class="seo-inline-note">'
            + '<i data-lucide="info" style="width:15px;height:15px;color:#D83030;flex-shrink:0;margin-top:2px"></i>'
            + biTag('span', text, textEn)
            + '</p>';
    }

    function promoBanner(opts) {
        const dark = opts.tone === 'dark';
        const target = opts.external === false ? '' : ' target="_blank" rel="noopener noreferrer"';
        const box = dark
            ? 'rounded-3xl bg-charcoal text-white p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'
            : 'canva-card rounded-3xl p-7 sm:p-9 flex flex-col md:flex-row md:items-center md:justify-between gap-5';
        const titleCls = dark ? 'text-xl sm:text-2xl font-bold mb-2' : 'text-2xl font-bold mb-2';
        const bodyCls = dark ? 'text-white/80 leading-relaxed' : 'text-gray-600 leading-relaxed';
        const btn = dark
            ? 'shrink-0 px-6 py-3 rounded-full bg-primary text-white font-semibold text-center hover:scale-105 transition-transform'
            : 'shrink-0 px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold text-center hover:bg-primary hover:text-white transition-colors';
        return '<div class="' + box + '"><div class="max-w-2xl">'
            + (opts.label ? biTag('p', opts.label, opts.labelEn, 'class="text-sm font-semibold text-primary mb-1"') : '')
            + biTag('h2', opts.title, opts.titleEn, 'class="' + titleCls + '"')
            + biTag('p', opts.body, opts.bodyEn, 'class="' + bodyCls + '"')
            + '</div>'
            + (opts.cta
                ? '<a href="' + esc(opts.href) + '"' + target + biAttrs(opts.cta, opts.ctaEn)
                + ' class="' + btn + '">' + esc(opts.cta) + '</a>'
                : '')
            + '</div>';
    }

    function linkCards(items) {
        return '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + items.map(c => {
            const inner = (c.icon
                ? '<div class="w-11 h-11 mb-3 bg-primary/10 rounded-xl flex items-center justify-center">' + icon(c.icon, 22, BRAND) + '</div>'
                : '')
                + biTag('h3', c.title, c.titleEn, 'class="font-bold mb-2 leading-snug"')
                + (c.desc ? biTag('p', c.desc, c.descEn, 'class="text-sm text-gray-600 leading-relaxed mb-3"') : '')
                + (c.cta
                    ? '<span class="text-sm font-semibold text-primary"' + biAttrs(c.cta, c.ctaEn) + '>' + esc(c.cta) + '</span>'
                    : '');
            if (c.href) {
                return '<a href="' + esc(c.href) + '" class="canva-card rounded-2xl p-5 block hover:border-primary/30 transition-colors">' + inner + '</a>';
            }
            return '<div class="canva-card rounded-2xl p-5">' + inner + '</div>';
        }).join('') + '</div>';
    }

    function headed(title, titleEn, subtitle, subtitleEn, inner) {
        return sectionHead(title, subtitle || null, titleEn, subtitleEn) + inner;
    }

    return {
        composeBody,
        aboutCard,
        compactStepCards,
        whenCards,
        iconInfoCards,
        iconRowCards,
        howStepCards,
        whyCards,
        flowPills,
        pills,
        pathCards,
        doctorNursePathCards,
        doubtBox,
        noteLine,
        promoBanner,
        linkCards,
        headed,
        sectionHead
    };
};
