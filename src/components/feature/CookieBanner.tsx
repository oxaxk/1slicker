import React, { useEffect, useState } from 'react';

type ConsentStatus = 'accepted' | 'rejected' | 'unset';

const STORAGE_KEY = 'cookie-consent-v1';

// Platzhalter-IDs für späteres Tracking: Google Ads & Google Analytics
// WICHTIG: Wenn du echte IDs einträgst, entferne "XXXX" aus den Strings.
const GOOGLE_ADS_ID = 'AW-XXXXXXXXX';
const GOOGLE_ANALYTICS_ID = 'G-XXXXXXXXXX';

let __cookieBannerActiveInstance = false;

function hasRealId(id: string | undefined): boolean {
  if (!id) return false;
  return !id.includes('XXXX');
}

function loadTrackingScripts() {
  if (typeof window === 'undefined') return;

  const hasAds = hasRealId(GOOGLE_ADS_ID);
  const hasAnalytics = hasRealId(GOOGLE_ANALYTICS_ID);

  // Wenn noch keine echten IDs gesetzt sind, nichts laden.
  if (!hasAds && !hasAnalytics) return;

  if ((window as any).slickerTrackingLoaded) {
    return;
  }

  (window as any).slickerTrackingLoaded = true;

  const baseId = hasAds ? GOOGLE_ADS_ID : GOOGLE_ANALYTICS_ID;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${baseId}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    ${hasAds ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
    ${hasAnalytics ? `gtag('config', '${GOOGLE_ANALYTICS_ID}');` : ''}
  `;
  document.head.appendChild(inline);
}

function getInitialStatus(): ConsentStatus {
  if (typeof window === 'undefined') return 'unset';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'accepted' || stored === 'rejected') return stored;
    return 'unset';
  } catch {
    return 'unset';
  }
}

export default function CookieBanner() {
  // Consent-Status (accepted / rejected / unset)
  const [status, setStatus] = useState<ConsentStatus>(() => getInitialStatus());
  // Sichtbarkeit des Banners separat steuern
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (__cookieBannerActiveInstance) {
      setIsActive(false);
      return;
    }

    __cookieBannerActiveInstance = true;

    return () => {
      __cookieBannerActiveInstance = false;
    };
  }, []);

  useEffect(() => {
    const initial = getInitialStatus();
    setStatus(initial);
    setIsOpen(initial === 'unset');
  }, []);

  // Tracking-Skripte automatisch laden, wenn Consent akzeptiert wurde
  useEffect(() => {
    if (status === 'accepted') {
      loadTrackingScripts();
    }
  }, [status]);

  useEffect(() => {
    const onOpen = () => {
      setIsOpen(true);
      setIsVisible(true);
    };
    window.addEventListener('open-cookie-banner', onOpen);
    return () => window.removeEventListener('open-cookie-banner', onOpen);
  }, []);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore storage errors
    }
    setStatus('accepted');
    setIsOpen(false);
  };

  const handleReject = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'rejected');
    } catch {
      // ignore storage errors
    }
    setStatus('rejected');
    setIsOpen(false);
    // Hier sicherstellen: keine optionalen Cookies / Tracker laden.
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isActive) return null;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/60 dark:bg-black/60"
      onClick={handleClose}
    >
      <div
        className="w-full sm:max-w-xl mx-4 mb-4 sm:mb-0 rounded-3xl backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--section-glass)] dark:bg-black/75 shadow-[0_24px_80px_rgba(15,23,42,0.14)] p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-base sm:text-lg font-semibold mb-2 text-[color:var(--page-fg)]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Cookies &amp; Datenschutz
        </h2>
        <p
          className="text-xs sm:text-sm mb-4 text-[color:var(--page-fg)] opacity-75"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Wir verwenden technisch notwendige Cookies, um diese Webseite zu betreiben. 
          Optionale Cookies für Statistik oder Marketing setzen wir nur, wenn du zustimmst. 
          Details findest du in unserer&nbsp;
          <a href="/datenschutz" className="underline hover:no-underline text-[color:var(--page-fg)] hover:opacity-100">
            Datenschutzerklärung
          </a>
          &nbsp;und in den&nbsp;
          <a href="/cookie" className="underline hover:no-underline text-[color:var(--page-fg)] hover:opacity-100">
            Cookie-Einstellungen
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleReject();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[rgba(15,23,42,0.14)] dark:border-white/30 text-[color:var(--page-fg)] bg-[var(--card-glass)] dark:bg-white/5 hover:bg-[rgba(8,145,178,0.22)] dark:hover:bg-white/10 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', touchAction: 'manipulation' }}
          >
            Nur notwendige Cookies
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAccept();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#22d3ee] text-[#06121f] shadow-[0_18px_40px_rgba(34,211,238,0.45)] hover:bg-[#38e0ff] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', touchAction: 'manipulation' }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
