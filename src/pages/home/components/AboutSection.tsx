import React, { useState } from 'react';

export default function AboutSection() {
  const benefits = [
    {
      iconKey: 'cpu',
      title: 'KI-Systemarchitektur',
      description:
        'Projekte werden von Beginn an als technische Systeme geplant – statt als lose Einzellösungen. Wichtig sind klare Schnittstellen, stabile Grundlagen und ein Setup, das erweiterbar bleibt.'
    },
    {
      iconKey: 'flow',
      title: 'Automationen & Pipelines',
      description:
        'Automationen werden überwiegend mit n8n und ähnlichen Tools umgesetzt. Ziel sind robuste, nachvollziehbare Abläufe, die Zeit sparen, Fehler reduzieren und transparent bleiben.'
    },
    {
      iconKey: 'layout',
      title: 'Moderne Tech-Stacks',
      description:
        'Es wird bewusst mit modernen, wartbaren Stacks gearbeitet – schlanke Frontends, klare APIs und Tooling, das sich in bestehende Infrastruktur integrieren lässt, statt sie zu blockieren.'
    },
    {
      iconKey: 'chart',
      title: 'Transparenz & Fairness',
      description:
        'Kommunikation, Preise und Umfänge werden klar gehalten. Ziel sind Setups, bei denen transparent ist, was technisch passiert, was es bringt – und was es kostet.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [wheelLocked, setWheelLocked] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % benefits.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + benefits.length) % benefits.length);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLocked) return;

    const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const threshold = 12;

    if (isHorizontal && Math.abs(event.deltaX) > threshold) {
      if (event.deltaX > 0) {
        nextSlide();
      } else if (event.deltaX < 0) {
        prevSlide();
      }

      setWheelLocked(true);
      setTimeout(() => {
        setWheelLocked(false);
      }, 400);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const x = event.touches[0]?.clientX;
    if (typeof x === 'number') {
      setTouchStartX(x);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const diff = endX - touchStartX;

    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStartX(null);
  };

  const Icon = ({ name }: { name: 'cpu' | 'flow' | 'layout' | 'chart' | 'arrowLeft' | 'arrowRight' }) => {
    const common = {
      width: 22,
      height: 22,
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg'
    } as const;

    switch (name) {
      case 'cpu':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 7h6a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M10 10h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        );
      case 'flow':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 5h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7 19h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7 12h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="18" cy="9" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="18" cy="15" r="2" stroke="currentColor" strokeWidth="1.7" />
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
      case 'chart':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M5 19V5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M5 19h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7 15l3-3 3 2 4-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="7" cy="15" r="1" fill="currentColor" />
            <circle cx="10" cy="12" r="1" fill="currentColor" />
            <circle cx="13" cy="14" r="1" fill="currentColor" />
            <circle cx="17" cy="9" r="1" fill="currentColor" />
          </svg>
        );
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
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Cyan Glows im Hintergrund */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-primary/20 blur-[70px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className="rounded-[28px] md:rounded-[32px] backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] shadow-[0_24px_80px_rgba(15,23,42,0.16)] px-6 sm:px-8 lg:px-10 py-10 md:py-12"
          style={{ background: 'var(--section-glass)' }}
        >
          {/* Headline & Icon */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-10 md:mb-12">
            <div className="lg:w-2/3">
              <p className="text-xs md:text-sm font-medium tracking-[0.28em] text-cyan-300 uppercase mb-3">
                SYSTEMS FIRST
              </p>
              <h2
                className="text-[1.85rem] sm:text-[2.1rem] md:text-[2.35rem] lg:text-[2.5rem] font-light text-[color:var(--page-fg)] leading-snug mb-4 tracking-[0.12em] uppercase"
                style={{
                  fontFamily:
                    'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  lineHeight: 1.2
                }}
              >
                <span className="text-cyan-300">Slicker</span> als
                <br className="hidden sm:block" />
                moderner technischer Partner.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[color:var(--page-fg)] opacity-75 max-w-2xl leading-relaxed">
                Slicker ist ein modernes, technikgetriebenes Setup mit Basis in Berlin. Im Fokus stehen
                KI-gestützte Entwicklung, Automationen und Web-Plattformen, die mit aktuellen Tools wie
                n8n, schlanken Stacks und klaren Prozessen umgesetzt werden – mit Lösungen, die
                bezahlbar bleiben und langfristig tragfähig sind.
              </p>
            </div>
          </div>

          {/* Benefit-Karussell */}
          <div className="mt-10">
            <div
              className="relative max-w-4xl mx-auto"
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex items-center justify-center gap-4">
                {/* Prev Arrow */}
                <button
                  type="button"
                  onClick={prevSlide}
                  className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-black/70 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
                >
                  <span className="text-[color:var(--page-fg)]">
                    <Icon name="arrowLeft" />
                  </span>
                </button>

                {/* Slider-Container */}
                <div className="overflow-hidden w-full max-w-3xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {benefits.map((benefit) => (
                      <div key={benefit.title} className="w-full flex-shrink-0 flex justify-center">
                        <article className="group w-full rounded-2xl px-5 py-6 border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--card-glass)] dark:bg-black/40 backdrop-blur-2xl transition-all duration-200 hover:border-[#22d3ee]">
                          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--card-glass)] dark:bg-white/5 border border-[rgba(15,23,42,0.14)] dark:border-white/20 mb-4 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]">
                            <span className="text-[color:var(--page-fg)] transition-colors duration-200 group-hover:text-[#22d3ee]">
                              <Icon name={benefit.iconKey} />
                            </span>
                          </div>
                          <h3
                            className="text-lg md:text-xl font-semibold text-[color:var(--page-fg)] mb-2"
                            style={{
                              fontFamily:
                                'Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                            }}
                          >
                            {benefit.title}
                          </h3>
                          <p className="text-sm md:text-base text-[color:var(--page-fg)] opacity-70 leading-relaxed">
                            {benefit.description}
                          </p>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Arrow */}
                <button
                  type="button"
                  onClick={nextSlide}
                  className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-black/70 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
                >
                  <span className="text-[color:var(--page-fg)]">
                    <Icon name="arrowRight" />
                  </span>
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center mt-6">
                <div className="flex items-center gap-3">
                  {benefits.map((benefit, index) => (
                    <button
                      key={benefit.title}
                      type="button"
                      onClick={() => setCurrentIndex(index)}
                      aria-label={benefit.title}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'bg-[#22d3ee] scale-125 shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                          : 'bg-[#22d3ee]/30 hover:bg-[#22d3ee]/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.7)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}