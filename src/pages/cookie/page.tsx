import React, { useEffect, useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function CookieSettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === 'undefined') return true;
    const el = document.documentElement;
    const dataTheme = el.getAttribute('data-theme');
    if (dataTheme === 'light') return false;
    if (dataTheme === 'dark') return true;
    return el.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const el = document.documentElement;

    const compute = () => {
      const dataTheme = el.getAttribute('data-theme');
      if (dataTheme === 'light') return false;
      if (dataTheme === 'dark') return true;
      return el.classList.contains('dark');
    };

    setIsDarkMode(compute());

    const obs = new MutationObserver(() => setIsDarkMode(compute()));
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => obs.disconnect();
  }, []);

  const handleOpenBanner = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-cookie-banner'));
    }
  };

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-28 md:pt-32 pb-20 px-4"
        style={{ background: 'var(--page-bg)', color: 'var(--page-fg)' }}
      >
        <div
          className="max-w-3xl mx-auto rounded-[28px] md:rounded-[32px] backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.14)] px-6 sm:px-10 lg:px-12 py-10 md:py-12"
          style={{ background: 'var(--section-glass)' }}
        >
          <header className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={isDarkMode ? '/images/cookie.png' : '/images/cookie2.png'}
                alt="Cookie Einstellungen"
                className="w-12 h-12 rounded-2xl object-contain bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/12 p-2"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
                draggable={false}
              />
            </div>
            <h1
              className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-light leading-snug tracking-[0.08em] uppercase text-[color:var(--page-fg)]"
              style={{
                fontFamily:
                  'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
              }}
            >
              Cookie-Einstellungen
            </h1>
            <p className="mt-3 text-sm md:text-[0.95rem] text-[color:var(--page-fg)] opacity-75 max-w-xl">
              Hier kannst du deine Auswahl zu Cookies und ähnlichen Technologien für slicker.agency
              einsehen und über den Cookie-Banner jederzeit anpassen.
            </p>
          </header>

          <section className="space-y-6">
            <div className="rounded-2xl bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/10 backdrop-blur-2xl px-5 py-5 md:px-6 md:py-6">
              <h2
                className="text-sm md:text-base font-semibold tracking-[0.16em] uppercase text-[color:var(--page-fg)] mb-2"
                style={{
                  fontFamily:
                    'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                Technisch notwendige Cookies
              </h2>
              <p className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-75 leading-relaxed">
                Diese Cookies sind erforderlich, damit die Website technisch funktioniert. Dazu gehören
                z.&nbsp;B. deine Session, deine Auswahl im Cookie-Banner selbst sowie bestimmte
                Darstellungsfunktionen (z.&nbsp;B. lokal eingebundene Icons und UI-Elemente). Sie können in
                unseren Systemen nicht deaktiviert werden.
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/10 backdrop-blur-2xl px-5 py-5 md:px-6 md:py-6">
              <h2
                className="text-sm md:text-base font-semibold tracking-[0.16em] uppercase text-[color:var(--page-fg)] mb-2"
                style={{
                  fontFamily:
                    'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                Optionale Cookies (Analytics & Marketing)
              </h2>
              <p className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-75 leading-relaxed">
                Optionale Cookies und vergleichbare Technologien helfen uns zu verstehen, wie die Seite genutzt
                wird (z.&nbsp;B. über Analytics) und ermöglichen Marketing-Maßnahmen (z.&nbsp;B. Google Ads
                Conversion-Tracking). Diese Cookies werden nur gesetzt, wenn du im Cookie-Banner ausdrücklich
                zustimmst.
              </p>
              <p className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-60 leading-relaxed mt-3">
                Deine aktuelle Auswahl zu Analytics- und Marketing-Cookies kannst du über den Cookie-Banner
                jederzeit ändern. Dafür kannst du den folgenden Button nutzen.
              </p>
            </div>

            <div className="rounded-2xl bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/10 backdrop-blur-2xl px-5 py-5 md:px-6 md:py-6 flex flex-col gap-3">
              <h2
                className="text-sm md:text-base font-semibold tracking-[0.16em] uppercase text-[color:var(--page-fg)] mb-1"
                style={{
                  fontFamily:
                    'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                }}
              >
                Auswahl im Cookie-Banner anpassen
              </h2>
              <p className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-75 leading-relaxed">
                Wenn du deine Entscheidung zu Cookies (z.&nbsp;B. für Analytics oder Marketing) ändern
                möchtest, kannst du den Cookie-Banner erneut öffnen und deine Auswahl dort anpassen.
              </p>
              <button
                type="button"
                onClick={handleOpenBanner}
                className="inline-flex items-center justify-center mt-1 px-6 py-3 rounded-full bg-[#22d3ee] hover:bg-[#38e0ff] text-[#06121f] text-xs md:text-sm font-semibold tracking-[0.16em] uppercase hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all duration-200 w-full sm:w-auto"
              >
                Cookie-Banner öffnen
              </button>
              <p className="text-[0.7rem] md:text-xs text-[color:var(--page-fg)] opacity-60 leading-relaxed mt-1">
                Detaillierte Informationen findest du außerdem in unserer{' '}
                <a
                  href="/datenschutz"
                  className="text-[#0891b2] dark:text-[#22d3ee] hover:opacity-100 underline underline-offset-2"
                >
                  Datenschutzerklärung
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
