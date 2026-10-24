/**
 * Google Tag Manager loader + conversion events (WhatsApp / phone clicks).
 * Fill in GTM_ID (e.g. 'GTM-ABC1234') to enable; empty = nothing is loaded.
 * Setup steps for the client: see docs/ANALYTICS-SETUP.md.
 */
(function () {
    const GTM_ID = '';

    window.dataLayer = window.dataLayer || [];

    if (GTM_ID) {
        window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(GTM_ID);
        document.head.appendChild(s);
    }

    function sectionOf(el) {
        const section = el.closest('section, header, footer, [role="dialog"]');
        if (!section) return '';
        if (section.matches('header')) return 'header';
        if (section.matches('footer')) return 'footer';
        const heading = section.querySelector('h1, h2, h3');
        return heading ? heading.textContent.trim().slice(0, 100) : '';
    }

    document.addEventListener('click', function (e) {
        const link = e.target.closest ? e.target.closest('a[href]') : null;
        if (!link) return;
        const href = link.getAttribute('href') || '';
        let event = null;
        if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) event = 'wa_click';
        else if (/^tel:/i.test(href)) event = 'phone_click';
        if (!event) return;
        window.dataLayer.push({
            event: event,
            link_text: (link.textContent || link.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100),
            link_url: href.split('?')[0],
            page_path: location.pathname,
            section: link.classList.contains('wa-float') ? 'floating_button' : sectionOf(link)
        });
    }, true);
})();
