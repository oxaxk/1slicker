import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';

type HeroMessage = {
  title: ReactNode;
  subline: string;
  iconKey: 'brain' | 'layout' | 'flow' | 'cpu';
};

const MESSAGES: HeroMessage[] = [
  {
    title: (
      <>
        <span className="text-cyan-300">KI-native</span>{' '}
        Architekturen für digitale Unternehmen.
      </>
    ),
    subline:
      'Slicker entwirft und baut Systeme, in denen KI, Automatisierung und Web-Plattformen als Einheit funktionieren – von der internen Infrastruktur bis zum Kunden-Interface.',
    iconKey: 'brain'
  },
  {
    title: (
      <>
        Technische{' '}
        <span className="text-cyan-300">Plattformen</span>{' '}
        statt nur Webseiten.
      </>
    ),
    subline:
      'Im Fokus stehen skalierbare Kernsysteme: Interfaces, Datenflüsse und Automationen, die Geschäftsmodelle tragen – nicht nur einzelne Landingpages.',
    iconKey: 'layout'
  },
  {
    title: (
      <>
        <span className="text-cyan-300">Automatisierte Prozesse</span>, klar messbare Ergebnisse.
      </>
    ),
    subline:
      'Strukturierte Pipelines verbinden Frontend, Backend und KI-Module. Entscheidungen basieren auf Daten, nicht auf Bauchgefühl oder bunten Reports.',
    iconKey: 'flow'
  },
  {
    title: (
      <>
        <span className="text-cyan-300">Code</span>{' '}
        der Unternehmen auf den nächsten Level hebt.
      </>
    ),
    subline:
      'Schwerpunkte: KI-Modelle, Automationen, Web-Auftritte und technische Integrationen, die ohne Overhead im Alltag nutzbar bleiben.',
    iconKey: 'cpu'
  }
];

export default function HeroSection() {
  const handleHeroLinkClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    if (typeof document === 'undefined') return;

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const fadeTimeoutRef = useRef<number | null>(null);
  const cycleIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (MESSAGES.length <= 1) return;

    const startCycle = () => {
      const id = window.setInterval(() => {
        // Erst rausfaden, dann Inhalt wechseln, dann wieder einfaden
        if (fadeTimeoutRef.current !== null) {
          window.clearTimeout(fadeTimeoutRef.current);
        }

        setIsFading(true);

        fadeTimeoutRef.current = window.setTimeout(() => {
          setIndex((prev) => (prev + 1) % MESSAGES.length);
          setIsFading(false);
        }, 850);
      }, 7000);

      cycleIntervalRef.current = id;
    };

    startCycle();

    return () => {
      if (cycleIntervalRef.current !== null) {
        window.clearInterval(cycleIntervalRef.current);
      }
      if (fadeTimeoutRef.current !== null) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  const current = MESSAGES[index];

  const Icon = ({ name, className }: { name: 'brain' | 'layout' | 'flow' | 'cpu' | 'arrowDown'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
      case 'brain':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9 4a3 3 0 0 0-3 3v.2A3 3 0 0 0 4 10v1a3 3 0 0 0 2 2.8V16a3 3 0 0 0 3 3h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 4a3 3 0 0 1 3 3v.2A3 3 0 0 1 20 10v1a3 3 0 0 1-2 2.8V16a3 3 0 0 1-3 3h-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 7.5c.6-.8 1.3-1.2 2-1.2s1.4.4 2 1.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9.5 12c.8 0 1.5.7 1.5 1.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M14.5 12c-.8 0-1.5.7-1.5 1.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'layout':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M4 6a2 2 0 0 1 2-2h5v7H4V6Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M13 4h5a2 2 0 0 1 2 2v5h-7V4Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M4 13h7v7H6a2 2 0 0 1-2-2v-5Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M13 13h7v5a2 2 0 0 1-2 2h-5v-7Z" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        );
      case 'flow':
        return (
          <svg {...common} aria-hidden="true">
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M9 7h6a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 17h6a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 7v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      case 'cpu':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 7h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10 10h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        );
      case 'arrowDown':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="m6 13 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const headlineClasses =
    'text-left text-[1.85rem] sm:text-[2.1rem] md:text-[2.35rem] lg:text-[2.5rem] font-light text-white leading-snug mb-4 transition-all w-full tracking-[0.16em] uppercase transform-gpu will-change-transform will-change-opacity';
  const sublineClasses =
    'text-left text-base sm:text-lg md:text-xl text-gray-200 mb-8 transition-all w-full transform-gpu will-change-transform will-change-opacity';
  const iconWrapperClasses =
    'relative w-full flex justify-start lg:justify-center transition-all transform-gpu will-change-transform will-change-opacity';
  const fadeStateClasses = isFading ? ' opacity-0 translate-y-2' : ' opacity-100 translate-y-0';

  return (
    <section
      id="hero"
      className="min-h-[80vh] flex items-start pt-36 pb-16 md:pt-40 md:pb-24 relative overflow-hidden"
    >
      {/* Glowing background blob */}
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/40 blur-[80px] rounded-full" />
      <div className="absolute -bottom-1/3 -left-1/4 w-1/2 h-1/2 bg-primary/40 blur-[90px] rounded-full" />
      <div className="absolute top-1/3 -left-1/5 w-1/3 h-1/3 bg-primary/30 blur-[70px] rounded-full" />

      <div className="max-w-6xl w-[95%] mx-auto px-4 md:px-6 w-full relative">
        {/* Glas-Container */}
        <div
          className="relative backdrop-blur-2xl border border-white/10 rounded-[28px] md:rounded-[32px] shadow-[0_24px_80px_rgba(15,23,42,0.18)] px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12 overflow-hidden"
          style={{ background: 'var(--section-glass)' }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-10">
            {/* Text / Headline */}
            <div className="lg:w-1/2">
              <div
                id="hero-lock"
                className="relative w-full max-w-[820px] sm:max-w-[860px] md:max-w-[900px] mx-0 contain-layout"
              >
                <h1
                  id="rotating-headline"
                  className={headlineClasses + fadeStateClasses}
                  style={{
                    transition: 'opacity 850ms ease, transform 850ms ease',
                    lineHeight: 1.2
                  }}
                >
                  {current.title}
                </h1>
                <p
                  id="rotating-subline"
                  className={sublineClasses + fadeStateClasses}
                  style={{
                    transition: 'opacity 850ms ease, transform 850ms ease'
                  }}
                >
                  {current.subline}
                </p>

                <div
                  id="hero-ctas"
                  className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
                >
                  <a
                    href="#kontakt"
                    onClick={(e) => handleHeroLinkClick(e, 'kontakt')}
                    className="hero-cta fx-btn fx-animated inline-flex items-center justify-center px-8 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-xl text-xs sm:text-[0.78rem] md:text-[0.8rem] font-medium uppercase tracking-[0.22em] text-[color:var(--page-fg)] hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all md:min-w-[240px] lg:min-w-[260px] xl:min-w-[280px]"
                  >
                    Gespräch anfragen
                  </a>
                  <a
                    href="#expertise"
                    onClick={(e) => handleHeroLinkClick(e, 'expertise')}
                    className="hero-cta fx-btn fx-animated inline-flex items-center justify-center px-8 py-3 rounded-full bg-[var(--card-glass)] border border-white/15 backdrop-blur-xl text-xs sm:text-[0.78rem] md:text-[0.8rem] font-medium uppercase tracking-[0.22em] text-[color:var(--page-fg)] hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all md:min-w-[240px] lg:min-w-[260px] xl:min-w-[280px]"
                  >
                    Leistungen ansehen
                  </a>
                </div>
              </div>
            </div>

            {/* Icon-Visual statt Bild */}
            <div className="lg:w-1/2">
              <div
                className={iconWrapperClasses}
                style={{ transition: 'opacity 850ms ease, transform 850ms ease' }}
              >
                <div
                  className="group w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-[32px] border border-white/18 backdrop-blur-2xl flex items-center justify-center bg-[var(--card-glass)] shadow-[0_22px_70px_rgba(15,23,42,0.16)] hover:border-[#22d3ee] hover:shadow-[0_0_40px_rgba(34,211,238,0.95)] transition-[background-color,border-color,box-shadow,transform] duration-400 ease-out transform-gpu will-change-transform"
                >
                  <Icon
                    name={current.iconKey}
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-[color:var(--page-fg)] transition-[opacity,transform,color] duration-850 ease-out ${
                      isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 scroll-indicator">
          <div className="w-8 h-8 flex items-center justify-center text-primary">
            <Icon name="arrowDown" className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>
    </section>
  );
}