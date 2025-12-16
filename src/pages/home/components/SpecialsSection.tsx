import React, { useState } from 'react';

export default function SpecialsSection() {
  const projects = [
    {
      iconKey: 'sparkles',
      tag: 'DTC-Brand',
      title: 'MYGUASHA',
      description:
        'Cleanes DTC-Label mit Fokus auf Skin-Tools & Content-Commerce. Aufbau von Shop, Content-Ops und Funnel-Automationen.',
      hrefDetail: '/referenzen/myguasha',
      hrefView: '/referenzen'
    },
    {
      iconKey: 'truck',
      tag: 'Dienstleistung',
      title: 'AbschleppDirekt24',
      description:
        'Privater Abschleppdienst in Berlin – 24/7 Notdienst, Landingpage-Setup, Lead-Funnel, Tracking & Automationen.',
      hrefDetail: '/referenzen/abschlepp-direkt24',
      hrefView: '/referenzen'
    },
    {
      iconKey: 'community',
      tag: 'Bau',
      title: 'KIRAL BAU',
      description:
        'Digitale Angebots- und Projektplattform für Bau & Sanierung – Anfragen, Kalkulation, Status-Updates und saubere Lead-Erfassung.',
      hrefDetail: '/referenzen/kiral-bau',
      hrefView: '/referenzen'
    },
    {
      iconKey: 'clean',
      tag: 'Dienstleistung',
      title: 'MyCleanService',
      description:
        'Reinigungsdienst-Setup – klare Landingpage, Kontaktstrecken und technische Basis für saubere Leads.',
      hrefDetail: '/referenzen/mycleanservice-abschleppdienst',
      hrefView: '/referenzen'
    },
    {
      iconKey: 'truck',
      tag: 'Dienstleistung',
      title: 'Abschleppdienst Goldmann',
      description:
        'Spezialisierter Abschleppdienst – Webauftritt, Notdienst-Kommunikation und Tracking für eingehende Anfragen.',
      hrefDetail: '/referenzen/abschleppdienst-goldmann',
      hrefView: '/referenzen'
    },
    {
      iconKey: 'truck',
      tag: 'Dienstleistung',
      title: 'Abschleppdienst Schiek',
      description:
        'Regionale Abschleppmarke mit fokussiertem Auftritt – Landingpage, Anfrage-Formulare und technische Basis für Ads & SEO.',
      hrefDetail: '/referenzen/abschleppdienst-schick',
      hrefView: '/referenzen'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [wheelLocked, setWheelLocked] = useState(false);

  const totalProjects = projects.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Pro Geste nur einen Slide, aber sensibler als vorher
    if (wheelLocked) return;

    const isHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const threshold = 12; // kleiner, damit normale Zwei-Finger-Swipes erkannt werden

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

  const Icon = ({ name, className }: { name: 'sparkles' | 'truck' | 'community' | 'clean' | 'arrowLeft' | 'arrowRight'; className?: string }) => {
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
      case 'sparkles':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 2l1.2 4.2L17 7l-3.8 1.1L12 12l-1.2-3.9L7 7l3.8-.8L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M19 11l.7 2.3L22 14l-2.3.7L19 17l-.7-2.3L16 14l2.3-.7L19 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M4 12l.6 1.8L7 14.4l-2.4.6L4 17.4l-.6-2.4L1 14.4l2.4-.6L4 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        );
      case 'truck':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M3 7h11v10H3V7Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 10h4l3 3v4h-7v-7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M6.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17.5 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 13h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'community':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 20v-1.5a4.5 4.5 0 0 1 3-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M19 20v-1.5a4.5 4.5 0 0 0-3-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        );
      case 'clean':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M8 21h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 3v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M10 6h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7 13c2 1.5 8 1.5 10 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 14l-1 5M15 14l1 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M18.5 7.5l1-1M19.5 10l1.5-.5M17.8 10.8l.7 1.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="projekte"
      className="py-24 relative scroll-mt-28 md:scroll-mt-32"
    >
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-8">
          <div className="md:max-w-xl">
            <p className="text-xs tracking-[0.28em] uppercase mb-3 text-primary">
              Eigene Marken &amp; Plattformen
            </p>
            <h2
              className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-light text-white mb-4 leading-snug tracking-[0.08em] uppercase"
            >
              Portfolio aus
              <br className="hidden sm:block" />
              <span className="text-primary"> Marken, Services &amp; Cases</span>
            </h2>
            <p className="text-base md:text-lg text-white/80">
              Ausgewählte Projekte von DTC-Brand über lokale Dienstleistung bis Plattform – mit Fokus auf
              Webauftritt, Funnel, Automationen und skalierbare Struktur.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-4">
          <div
            className="relative max-w-5xl mx-auto"
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center gap-4">
              {/* Prev Arrow links neben der Karte */}
              <button
                type="button"
                onClick={prevSlide}
                className="relative z-20 w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-black/70 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowLeft" className="w-5 h-5 text-white" />
              </button>

              {/* Slider-Container */}
              <div className="overflow-hidden w-full max-w-4xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {projects.map((project) => (
                    <div key={project.title} className="w-full flex-shrink-0 flex justify-center">
                      <article className="w-full max-w-4xl rounded-2xl overflow-hidden border border-transparent bg-black/60 backdrop-blur-2xl transition-all duration-300">
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/20">
                              <Icon
                                name={project.iconKey}
                                className={`w-[18px] h-[18px] text-white ${project.title === 'MyCleanService' ? 'animate-pulse' : ''}`}
                              />
                            </div>
                            <span className="mt-1 bg-primary/15 text-primary text-xs px-3 py-1 rounded-full">
                              {project.tag}
                            </span>
                          </div>
                          <h3
                            className="text-xl font-semibold text-white mb-2"
                          >
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-sm md:text-base flex-1">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <a
                              href={project.hrefDetail}
                              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[0.7rem] md:text-xs uppercase tracking-[0.16em] text-white hover:bg-white/10 transition-all duration-200"
                            >
                              Mehr erfahren
                            </a>
                            <a
                              href={project.hrefView}
                              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 bg-white/5 text-[0.7rem] md:text-xs uppercase tracking-[0.16em] text-white hover:bg-white/10 transition-all duration-200"
                            >
                              Jetzt ansehen
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Arrow rechts neben der Karte */}
              <button
                type="button"
                onClick={nextSlide}
                className="relative z-20 w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-black/70 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowRight" className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Dots unter dem Slider, zentriert */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-3">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={project.title}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-[#22d3ee] shadow-[0_0_18px_rgba(34,211,238,1)] scale-125'
                        : 'bg-[#22d3ee]/35 shadow-[0_0_10px_rgba(34,211,238,0.7)] hover:bg-[#22d3ee]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
