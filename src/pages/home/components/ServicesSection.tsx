import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/base/Button';

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  const services = [
    {
      iconKey: 'layout',
      title: 'Webauftritte & Interfaces',
      slug: 'webauftritte-interfaces',
      description:
        'Websites, Landingpages und Portale, die als zentrale Anlaufstelle für Kunden funktionieren – von der lokalen Dienstleistung bis zur digitalen Plattform.'
    },
    {
      iconKey: 'flow',
      title: 'Automationen & Workflows',
      slug: 'automationen-workflows',
      description:
        'Automatisierte Abläufe für Leads, Backoffice und Kommunikation – z. B. mit n8n, WhatsApp-Flows oder Marketing-Automationen, die im Alltag wirklich genutzt werden.'
    },
    {
      iconKey: 'bag',
      title: 'Shops & E‑Commerce',
      slug: 'shops-ecommerce',
      description:
        'Shopify-Shops und E‑Commerce-Setups, die eng mit Prozessen, Tracking und Automationen verbunden sind – statt isolierter Standard-Shops.'
    },
    {
      iconKey: 'search',
      title: 'SEO & Analytics',
      slug: 'seo-analytics',
      description:
        'Analysen, technische Checks und sauberes Tracking, damit klar wird, wo Sichtbarkeit, Funnel und Website strukturell verbessert werden können.'
    },
    {
      iconKey: 'megaphone',
      title: 'Ads & Performance',
      slug: 'ads-performance',
      description:
        'Kampagnen-Setups und Landingpages für Google Ads & Co., die direkt mit klaren Messpunkten und Systemen verbunden sind.'
    },
    {
      iconKey: 'film',
      title: 'Content & AI‑Media',
      slug: 'content-ai-media',
      description:
        'Bilder, Grafiken und KI-basierte Video-Formate für Social, Ads und Websites – inklusive technischer Umsetzung in bestehende Auftritte.'
    }
  ];

  const goToSlide = (index: number) => {
    const normalizedIndex = (index + services.length) % services.length;
    if (normalizedIndex === currentIndex) return;

    setCurrentIndex(normalizedIndex);

    const el = mobileScrollRef.current;
    if (el) {
      el.scrollTo({
        left: normalizedIndex * el.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    goToSlide(currentIndex + 1);
    setTimeout(() => setIsTransitioning(false), 350);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    goToSlide(currentIndex - 1);
    setTimeout(() => setIsTransitioning(false), 350);
  };

  // Touch/Mouse handlers for swipe functionality
  const handleStart = (clientX: number) => {
    if (isTransitioning) return;
    isDraggingRef.current = true;
    startXRef.current = clientX;
    currentXRef.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDraggingRef.current || isTransitioning) return;
    currentXRef.current = clientX;
  };

  const handleEnd = () => {
    if (!isDraggingRef.current || isTransitioning) return;
    
    const deltaX = currentXRef.current - startXRef.current;
    const threshold = 50;

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    isDraggingRef.current = false;
  };

  // Mobile scroll handler for snap carousel
  const handleMobileScroll = () => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const newIndex = Math.round(el.scrollLeft / el.clientWidth);
    if (newIndex !== currentIndex) setCurrentIndex(newIndex);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      const el = mobileScrollRef.current;
      if (!sectionEl || !el) return;

      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Nur reagieren, wenn Section im Viewport ist
      if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

      const sectionHeight = rect.height || 1;
      const distanceFromTop = Math.min(Math.max(-rect.top, 0), sectionHeight);
      const progress = distanceFromTop / sectionHeight; // 0 = oben, 1 = unten

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const targetScrollLeft = progress * maxScrollLeft;

      el.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });

      const maxIndex = services.length - 1;
      const targetIndex = Math.round(progress * maxIndex);
      if (targetIndex !== currentIndex) {
        setCurrentIndex(targetIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentIndex, services.length]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        handleEnd();
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const Icon = ({ name, className }: { name: 'layout' | 'flow' | 'bag' | 'search' | 'megaphone' | 'film' | 'arrowLeft' | 'arrowRight'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
      case 'arrowLeft':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'arrowRight':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
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
      case 'bag':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 7V6a5 5 0 0 1 10 0v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M6 7h12l-1 14H7L6 7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M9 11v2M15 11v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      case 'search':
        return (
          <svg {...common} aria-hidden="true">
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 11s1.2-1.8 3-1.8 3 1.8 3 1.8-1.2 1.8-3 1.8-3-1.8-3-1.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      case 'megaphone':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M4 11v2a2 2 0 0 0 2 2h1l3 4h2l-2-6h7l3-2V7l-3-2H8l-2-2H4v8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M20 9v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'film':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M5 6h14a2 2 0 0 1 2 2v10H3V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 6v12M17 6v12" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="expertise"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="py-24 scroll-mt-28 md:scroll-mt-32 relative overflow-hidden"
    >
      {/* Cyan Glows im Hintergrund */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-primary/20 blur-[70px] rounded-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p
                className="text-xs tracking-[0.28em] uppercase mb-3 text-cyan-300"
              >
                Leistungen &amp; Services
              </p>
              <h2
                className="text-[1.85rem] sm:text-[2.1rem] md:text-[2.35rem] lg:text-[2.5rem] font-light mb-3 lg:mb-0 tracking-[0.12em] uppercase text-[color:var(--page-fg)]"
              >
                Digitale &amp; technische Lösungen
                <br className="hidden sm:block" />
                <span className="text-cyan-300"> für Unternehmen</span>.
              </h2>
            </div>
            <p
              className="text-sm lg:text-base opacity-70 max-w-xl lg:text-right text-[color:var(--page-fg)]"
            >
              Vom lokalen Unternehmen bis zum digitalen Player: Webauftritte, Shops, Automationen, SEO/SEA und
              AI‑unterstützte Inhalte – gebündelt in Setups, die im Alltag nutzbar bleiben.
            </p>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">

          {/* Card Container in eigenem Panel */}
          <div className="w-full px-0 lg:px-4">
            <div
              ref={mobileScrollRef}
              className="w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 px-6 py-6 rounded-3xl backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--section-glass)] dark:bg-black/75 shadow-[0_24px_80px_rgba(15,23,42,0.14)]"
              onScroll={handleMobileScroll}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {services.map((svc) => (
                <div key={svc.title} className="shrink-0 w-[92%] md:w-[44%] lg:w-[34%] snap-center">
                  <div className="border border-[rgba(15,23,42,0.14)] dark:border-white/15 rounded-[1.8rem] bg-[var(--card-glass)] dark:bg-black/40 backdrop-blur-2xl shadow-[0_22px_70px_rgba(15,23,42,0.12)] transition-all duration-300 min-h-[310px] md:min-h-[270px] lg:min-h-[270px] flex flex-col px-6 pt-5 pb-6 hover:border-cyan-400/70 hover:shadow-[0_28px_90px_rgba(34,211,238,0.55)]">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[var(--card-glass)] dark:bg-white/5 border border-[rgba(15,23,42,0.14)] dark:border-white/20">
                        <Icon name={svc.iconKey} className="w-6 h-6 text-[color:var(--page-fg)]" />
                      </div>
                      <h3
                        className="text-base md:text-lg lg:text-xl font-semibold text-[color:var(--page-fg)] leading-tight"
                      >
                        {svc.title}
                      </h3>
                    </div>
                    <p
                      className="mt-1 opacity-70 leading-relaxed text-sm md:text-base text-[color:var(--page-fg)] flex-1"
                    >
                      {svc.description}
                    </p>
                    <div className="mt-4 flex flex-nowrap items-center gap-2">
                      <a
                        href={`/leistungen/${svc.slug}`}
                        className="inline-flex flex-1 min-w-0 items-center justify-center whitespace-nowrap px-2.5 py-1 md:px-3 md:py-1 rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/20 bg-[var(--card-glass)] dark:bg-white/5 text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.14em] text-[color:var(--page-fg)] hover:border-cyan-400 hover:bg-white/10 transition-all"
                      >
                        Mehr erfahren
                      </a>
                      <a
                        href="#kontakt"
                        className="inline-flex flex-1 min-w-0 items-center justify-center whitespace-nowrap px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-cyan-500/90 text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.14em] text-black border border-transparent hover:bg-cyan-400 transition-all"
                      >
                        Beratung anfragen
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Dots Navigation mit Pfeilen */}
          <div className="flex flex-col items-center justify-center mt-8 lg:mt-12 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/30 bg-[var(--card-glass)] dark:bg-black/60 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all duration-200 cursor-pointer disabled:opacity-40"
              >
                <Icon name="arrowLeft" className="w-5 h-5 text-[color:var(--page-fg)]" />
              </button>

              <div className="flex items-center gap-2">
                {services.slice(0, services.length - 1).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isTransitioning}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer disabled:opacity-50 ${
                      currentIndex === index
                        ? 'bg-[#22d3ee] scale-125 shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                        : 'bg-[#22d3ee]/30 hover:bg-[#22d3ee]/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.7)]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/30 bg-[var(--card-glass)] dark:bg-black/60 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all duration-200 cursor-pointer disabled:opacity-40"
              >
                <Icon name="arrowRight" className="w-5 h-5 text-[color:var(--page-fg)]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
