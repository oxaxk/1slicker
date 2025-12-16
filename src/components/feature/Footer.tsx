import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleSmoothFooterNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const [path, hash] = href.split('#');
    const isHome = window.location.pathname === '/' || window.location.pathname === '';

    // Kein Hash, anderer Pfad oder wir sind nicht auf der Startseite → normal navigieren
    if (!hash || (path && path !== '' && path !== '/') || !isHome) {
      return;
    }

    event.preventDefault();

    const targetElement = document.getElementById(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const Icon = ({ name, className }: { name: 'whatsapp' | 'mail' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'arrowRight' | 'question'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
      case 'arrowRight':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'question':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9.4 9.2a2.9 2.9 0 1 1 4.7 2.3c-.9.7-1.6 1.2-1.6 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M12 17h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        );
      case 'mail':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 3a8.5 8.5 0 0 0-7.3 12.9L4 21l5.3-1.4A8.5 8.5 0 1 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9.2 9.1c.2-.5.4-.6.8-.6h.7c.2 0 .5.1.6.4l.8 2c.1.2.1.5-.1.7l-.5.6c-.2.2-.2.5 0 .8.6 1.1 1.5 2 2.6 2.6.3.2.6.2.8 0l.6-.5c.2-.2.5-.2.7-.1l2 .8c.3.1.4.4.4.6v.7c0 .4-.1.6-.6.8-.7.3-1.9.5-3.9-.4-2-.9-3.7-2.6-4.6-4.6-.9-2-.7-3.2-.4-3.9Z" fill="currentColor" />
          </svg>
        );
      case 'tiktok':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M14 4c.6 2.2 2.4 3.8 4.7 4v3.1c-1.8-.1-3.4-.8-4.7-1.9V15a5 5 0 1 1-4.3-4.9v3.3a2 2 0 1 0 1.3 1.9V4h3Z" fill="currentColor" />
          </svg>
        );
      case 'instagram':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        );
      case 'facebook':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M14 8h2V5h-2c-2 0-3.5 1.6-3.5 3.6V11H8v3h2.5v7H14v-7h2.5l.5-3H14V9c0-.6.3-1 1-1Z" fill="currentColor" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M6.5 9.5V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M6.5 6.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M10.5 18v-5.2c0-1.7 1-3 2.7-3 1.6 0 2.3 1 2.3 2.9V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17.5 18V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleOpenCookieBanner = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new Event('open-cookie-banner'));
  };

  return (
    <footer className="pt-16 pb-10 md:pb-12 text-[color:var(--page-fg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/10 rounded-[28px] md:rounded-[32px] shadow-[0_20px_80px_rgba(15,23,42,0.14)] px-5 sm:px-7 md:px-10 lg:px-12 py-10 md:py-12"
          style={{ background: 'var(--section-glass)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
            {/* Brand / Intro */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <a
                  href="/#hero"
                  onClick={(e) => handleSmoothFooterNavClick(e, '/#hero')}
                  aria-label="Zur Startsektion von Slicker"
                  className="group inline-flex items-center"
                >
                  <div
                    className="flex items-center gap-2 text-2xl md:text-3xl font-light uppercase tracking-[0.3em]"
                    role="heading"
                    aria-level={2}
                  >
                    {'SLICKER'.split('').map((letter, index) => (
                      <span
                        key={index}
                        className="transition-all duration-200 hover:text-[#38e0ff] hover:drop-shadow-[0_0_20px_rgba(56,224,255,1)]"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                </a>
              </div>
              <p className="text-[color:var(--page-fg)] opacity-70 mb-8 text-sm md:text-base leading-relaxed max-w-md">
                Slicker entwickelt KI-native Systeme, Automationen und Web-Plattformen – von schlanken
                Service-Sites bis zu integrierten E‑Commerce- und Daten-Setups. Fokus: Lösungen, die im
                Alltag tragen, statt zusätzliche Komplexität zu erzeugen.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/4915511207431"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366] hover:shadow-[0_0_14px_rgba(37,211,102,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="whatsapp" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="mailto:info@slicker.agency"
                  aria-label="E-Mail"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#22d3ee]/18 hover:border-[#22d3ee] hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="mail" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#a855f7]/18 hover:border-[#a855f7] hover:shadow-[0_0_14px_rgba(168,85,247,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="tiktok" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.instagram.com/slicker.agency/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#E1306C]/18 hover:border-[#E1306C] hover:shadow-[0_0_14px_rgba(225,48,108,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="instagram" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#1877F2]/18 hover:border-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="facebook" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[#0A66C2]/18 hover:border-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.9)] text-[color:var(--page-fg)] text-sm transition-colors duration-150"
                >
                  <Icon name="linkedin" className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>

            {/* Leistungen */}
            <div className="lg:col-span-2">
              <h3
                className="text-xl font-semibold mb-6 pl-1"
              >
                Leistungen
              </h3>
              <ul className="space-y-3 text-sm md:text-base text-[color:var(--page-fg)] opacity-60">
                <li>
                  <a
                    href="/leistungen/webauftritte-interfaces"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Webauftritte &amp; Interfaces
                  </a>
                </li>
                <li>
                  <a
                    href="/leistungen/automationen-workflows"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Automationen &amp; Workflows
                  </a>
                </li>
                <li>
                  <a
                    href="/leistungen/shops-ecommerce"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Shops &amp; E‑Commerce
                  </a>
                </li>
                <li>
                  <a
                    href="/leistungen/seo-analytics"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    SEO &amp; Analytics
                  </a>
                </li>
                <li>
                  <a
                    href="/leistungen/ads-performance"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Ads &amp; Performance
                  </a>
                </li>
                <li>
                  <a
                    href="/leistungen/content-ai-media"
                    className="flex items-center gap-2 hover:text-[#22d3ee] transition-colors"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Content &amp; AI‑Media
                  </a>
                </li>
              </ul>
            </div>

            {/* Unternehmen */}
            <div className="lg:col-span-2">
              <h3
                className="text-xl font-semibold mb-6 pl-1"
              >
                Unternehmen
              </h3>
              <ul className="space-y-4 text-sm md:text-base">
                <li>
                  <a
                    href="/#about"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#about')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Über uns
                  </a>
                </li>
                <li>
                  <a
                    href="/#expertise"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#expertise')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Expertise
                  </a>
                </li>
                <li>
                  <a
                    href="/#projekte"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#projekte')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Projekte
                  </a>
                </li>
                <li>
                  <a
                    href="/#blog"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#blog')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/#kontakt"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#kontakt')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="arrowRight" className="w-4 h-4" />
                    Kontakt
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    onClick={(e) => handleSmoothFooterNavClick(e, '/#faq')}
                    className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors flex items-center gap-2"
                  >
                    <Icon name="question" className="w-4 h-4" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-4">
              <h3
                className="text-xl font-semibold mb-6"
              >
                Signal / Newsletter
              </h3>
              <p className="text-[color:var(--page-fg)] opacity-70 mb-6 text-sm md:text-base leading-relaxed">
                Gelegentliche Updates zu KI-Systemen, Automationen und technischen Playbooks –
                kein Spam, sondern Signale, wenn es wirklich relevante Entwicklungen oder Cases gibt.
              </p>
              <form className="mb-2">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    className="w-full px-4 py-3 bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/15 rounded-t-md sm:rounded-l-md sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-[#22d3ee]/40 text-[color:var(--page-fg)] text-sm md:text-base placeholder-[color:rgba(15,23,42,0.45)] dark:placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-[var(--card-glass)] hover:bg-[rgba(8,145,178,0.22)] dark:bg-white/10 dark:hover:bg-white/15 border border-[rgba(15,23,42,0.14)] dark:border-white/20 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.65)] text-[color:var(--page-fg)] px-6 py-3 rounded-b-md sm:rounded-r-md sm:rounded-bl-none font-medium whitespace-nowrap text-xs md:text-sm backdrop-blur-xl transition-all duration-200"
                  >
                    Abonnieren
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[rgba(15,23,42,0.14)] dark:border-white/10 pt-6 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[color:var(--page-fg)] opacity-55 text-xs md:text-sm text-center md:text-left">
                © 2025 Slicker. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6 text-xs md:text-sm">
                <Link
                  to="/impressum"
                  className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  to="/datenschutz"
                  className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors"
                >
                  Datenschutz
                </Link>
                <a
                  href="#cookie"
                  onClick={handleOpenCookieBanner}
                  className="text-[color:var(--page-fg)] opacity-60 hover:text-[#22d3ee] transition-colors"
                >
                  Cookie-Einstellungen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
