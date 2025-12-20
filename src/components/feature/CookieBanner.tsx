import React, { useEffect, useState } from 'react';

// Zustände für einzelne Kategorien – bei Bedarf erweiterbar
type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = 'slicker_cookie_consent_v1';

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function loadConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

function saveConsent(consent: ConsentState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      analytics: consent.analytics,
      marketing: consent.marketing,
    })
  );
}

// Externe Icon-Fonts (Font Awesome / Remix Icon) kontrolliert nach Consent laden/entfernen
function toggleIconFonts(enabled: boolean) {
  if (typeof document === 'undefined') return;

  const head = document.head;

  const faId = 'cookie-fontawesome-css';
  const remixId = 'cookie-remixicon-css';

  const existingFa = document.getElementById(faId);
  const existingRemix = document.getElementById(remixId);

  if (enabled) {
    if (!existingFa) {
      const linkFa = document.createElement('link');
      linkFa.id = faId;
      linkFa.rel = 'stylesheet';
      linkFa.href =
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      linkFa.referrerPolicy = 'no-referrer';
      head.appendChild(linkFa);
    }
    if (!existingRemix) {
      const linkRemix = document.createElement('link');
      linkRemix.id = remixId;
      linkRemix.rel = 'stylesheet';
      linkRemix.href =
        'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
      linkRemix.referrerPolicy = 'no-referrer';
      head.appendChild(linkRemix);
    }
  } else {
    if (existingFa?.parentNode) existingFa.parentNode.removeChild(existingFa);
    if (existingRemix?.parentNode) existingRemix.parentNode.removeChild(existingRemix);
  }
}

// Consent global anwenden – hier können später auch gtag-Configs etc. ergänzt werden
function applyConsent(consent: ConsentState) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.dataset.analyticsConsent = consent.analytics ? 'granted' : 'denied';
  root.dataset.marketingConsent = consent.marketing ? 'granted' : 'denied';
  root.dataset.iconsConsent = 'granted'; // Icon-Fonts gelten als technisch notwendig

  toggleIconFonts(true);
}

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [isOpen, setIsOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Guard gegen doppelte Instanzen (sonst "2x klicken"-Effekt)
  const [isPrimaryInstance] = useState(() => {
    if (typeof window === 'undefined') return true;
    const w = window as any;
    if (w.__slickerCookieBannerMounted) return false;
    w.__slickerCookieBannerMounted = true;
    return true;
  });

  // Initial Consent laden
  useEffect(() => {
    const loaded = loadConsent();
    if (loaded) {
      setConsent(loaded);
      applyConsent(loaded);
      setIsOpen(false);
    } else {
      setConsent(DEFAULT_CONSENT);
      applyConsent(DEFAULT_CONSENT);
      setIsOpen(true);
    }
    setInitialized(true);
  }, []);

  // Guard-Cleanup
  useEffect(() => {
    if (!isPrimaryInstance) return;
    return () => {
      if (typeof window === 'undefined') return;
      const w = window as any;
      if (w.__slickerCookieBannerMounted) {
        w.__slickerCookieBannerMounted = false;
      }
    };
  }, [isPrimaryInstance]);

  // Event von Cookie-Seite: Banner öffnen
  useEffect(() => {
    const handler = () => setIsOpen(true);
    if (typeof window === 'undefined') return;
    window.addEventListener('slicker-open-cookie-banner', handler);
    return () => {
      window.removeEventListener('slicker-open-cookie-banner', handler);
    };
  }, []);

  if (!initialized || !isPrimaryInstance) return null;

  const handleAcceptAll = () => {
    const all: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(all);
    saveConsent(all);
    applyConsent(all);
    setIsOpen(false);
  };

  const handleOnlyNecessary = () => {
    const onlyNecessary: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(onlyNecessary);
    saveConsent(onlyNecessary);
    applyConsent(onlyNecessary);
    setIsOpen(false);
  };

  const handleToggle = (key: keyof Omit<ConsentState, 'necessary'>) => {
    const updated: ConsentState = { ...consent, [key]: !consent[key] };
    setConsent(updated);
    applyConsent(updated);
  };

  const handleSaveSelection = () => {
    saveConsent(consent);
    applyConsent(consent);
    setIsOpen(false);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CONSENT_KEY);
    }
    setConsent(DEFAULT_CONSENT);
    applyConsent(DEFAULT_CONSENT);
    setIsOpen(true);
  };

  const hasStoredConsent =
    typeof window !== 'undefined' && !!window.localStorage.getItem(CONSENT_KEY);

  return (
    <>
      {/* Widget unten rechts – überall sichtbar */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }}
        aria-label="Cookie-Einstellungen öffnen"
        className="fixed right-5 bottom-[calc(env(safe-area-inset-bottom)+20px)] sm:bottom-5 z-[9999] w-12 h-12 rounded-full border border-white/20 bg-black/55 backdrop-blur-xl shadow-[0_14px_40px_rgba(15,23,42,0.65)] hover:border-[#22d3ee]/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.55)] transition"
      >
        <span className="sr-only">Cookie-Einstellungen</span>
        <img
          src="/images/cookie.png"
          alt=""
          className="mx-auto h-6 w-6 opacity-95"
          draggable={false}
        />
      </button>

      {/* Banner-Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center bg-black/60">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-xl mx-4 mb-4 sm:mb-0 rounded-3xl backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--section-glass)] dark:bg-black/75 shadow-[0_24px_80px_rgba(15,23,42,0.14)] p-5 sm:p-6"
          >
            <h2
              className="text-base sm:text-lg font-semibold mb-4 text-[color:var(--page-fg)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cookies &amp; Datenschutz
            </h2>

            <p
              className="text-sm mb-6 text-[color:var(--page-fg)] opacity-80"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Wir verwenden technisch notwendige Cookies, um diese Webseite zu betreiben. Optionale Cookies für Statistik und Marketing setzen wir nur, wenn du zustimmst.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveSelection();
              }}
            >
              <div className="flex flex-col gap-4 mb-6">
                <label className="flex items-center gap-3 cursor-default select-none text-[color:var(--page-fg)]">
                  <input
                    type="checkbox"
                    checked={consent.necessary}
                    disabled
                    readOnly
                    aria-disabled="true"
                  />
                  <span>Technisch notwendige Cookies (immer aktiv)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none text-[color:var(--page-fg)]">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={() => handleToggle('analytics')}
                  />
                  <span>Statistik (Google Analytics, o.ä.)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none text-[color:var(--page-fg)]">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={() => handleToggle('marketing')}
                  />
                  <span>Marketing (Google Ads, Facebook Pixel, o.ä.)</span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={handleOnlyNecessary}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[rgba(15,23,42,0.14)] dark:border-white/30 text-[color:var(--page-fg)] bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[rgba(8,145,178,0.22)] dark:hover:bg-white/10 transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', touchAction: 'manipulation' }}
                >
                  Nur notwendige Cookies
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#22d3ee] text-[#06121f] shadow-[0_18px_40px_rgba(34,211,238,0.45)] hover:bg-[#38e0ff] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif', touchAction: 'manipulation' }}
                >
                  Alle akzeptieren
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="text-sm underline text-[color:var(--page-fg)] hover:text-[#22d3ee]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Auswahl speichern
                </button>
              </div>

              {hasStoredConsent && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm underline text-[color:var(--page-fg)] hover:text-[#22d3ee]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Auswahl zurücksetzen
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
