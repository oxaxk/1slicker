import React from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import CookieBanner from '../../components/feature/CookieBanner';

export default function CookieSettingsPage() {
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
                src="/images/cookie.png"
                alt="Cookie Einstellungen"
                className="w-12 h-12 rounded-2xl object-contain bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/12 p-2"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
                draggable={false}
              />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[var(--card-glass)] border border-[rgba(15,23,42,0.14)] dark:border-white/12">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-[color:var(--page-fg)]"
                >
                  <path
                    d="M12 2.6c.55 0 1 .45 1 1 0 1.1.9 2 2 2 .55 0 1 .45 1 1 0 1.38 1.12 2.5 2.5 2.5.55 0 1 .45 1 1 0 6.02-4.88 10.9-10.9 10.9S1.7 18.12 1.7 12.1C1.7 6.08 6.58 1.2 12.6 1.2c.55 0 1 .45 1 1 0 .22-.02.43-.06.63-.09.45-.49.77-.94.77h-.6Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle cx="9.2" cy="12" r="1.2" fill="currentColor" opacity="0.55" />
                  <circle cx="13.4" cy="14.4" r="1" fill="currentColor" opacity="0.55" />
                  <circle cx="12.6" cy="9.1" r="0.9" fill="currentColor" opacity="0.55" />
                  <circle cx="16.3" cy="11.3" r="0.8" fill="currentColor" opacity="0.55" />
                </svg>
              </div>
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
                z.&nbsp;B. deine Session sowie deine Auswahl im Cookie-Banner selbst. Sie können in unseren
                Systemen nicht deaktiviert werden.
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
                Optionale Cookies helfen uns zu verstehen, wie die Seite genutzt wird (z.&nbsp;B. über
                Analytics) oder ermöglichen personalisierte Werbung (z.&nbsp;B. Google Ads). Diese werden nur
                gesetzt, wenn du im Cookie-Banner ausdrücklich zustimmst.
              </p>
              <p className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-60 leading-relaxed mt-3">
                Deine aktuelle Auswahl kannst du über den Cookie-Banner jederzeit ändern. Dafür kannst du den
                folgenden Button nutzen.
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
      <CookieBanner />
      <Footer />
    </>
  );
}
