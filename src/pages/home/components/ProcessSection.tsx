import React, { useState } from 'react';

export default function ProcessSection() {
  const posts = [
    {
      tag: 'KI-Systeme',
      date: '03. Mai 2025',
      title: 'Von klassischer Webseite zu KI‑gestützter Plattform',
      description:
        'Wie aus einer einfachen Landingpage ein modularer, KI‑gestützter Auftritt wird: klare Architektur, saubere Komponenten, strukturierte Inhalte und APIs, die sich später für Automationen, Dashboards oder weitere Frontends nutzen lassen.',
      iconKey: 'cpu'
    },
    {
      tag: 'Automation',
      date: '28. April 2025',
      title: 'Lead-Pipelines mit n8n & Webhooks',
      description:
        'Einblicke in Setups, bei denen Anfragen nicht einfach im Postfach landen, sondern automatisiert vorqualifiziert, geloggt und verteilt werden – von Formular über Webhooks in n8n bis hin zu strukturierten Datensätzen in CRM, Sheets oder Datenbanken.',
      iconKey: 'flow'
    },
    {
      tag: 'Webauftritte',
      date: '20. April 2025',
      title: 'Schnelle Landingpages ohne Template-Look',
      description:
        'Warum viele Seiten gleich aussehen – und wie man mit einem klaren Designsystem, Komponenten und sinnvollen Animationen Webseiten baut, die schnell laden, stabil laufen und trotzdem nicht wie ein Baukasten wirken.',
      iconKey: 'layout'
    },
    {
      tag: 'Tracking',
      date: '12. April 2025',
      title: 'DSGVO-sichere Tracking-Setups als Standard',
      description:
        'Wie Consent‑Banner, Tag‑Management, Server‑Side Tracking und Conversion‑Events so aufgesetzt werden, dass Marketing-Kanäle funktionieren, ohne rechtliche oder technische Risiken zu erzeugen.',
      iconKey: 'radar'
    },
    {
      tag: 'E-Commerce',
      date: '04. April 2025',
      title: 'Headless-Shop-Setups mit Fokus auf Performance',
      description:
        'Headless‑Ansätze mit Shopify, API‑Layern und eigenen Frontends: welche Teile wirklich etwas bringen, welche Komplexität vermeiden sollte und wie man trotzdem eine Basis baut, die in Zukunft skalierbar bleibt.',
      iconKey: 'bag'
    },
    {
      tag: 'Prozesse',
      date: '25. März 2025',
      title: 'Struktur statt Chaos in digitalen Projekten',
      description:
        'Was passiert, wenn man Projekte von Anfang an wie Systeme behandelt: klare Scopes, definierte Übergaben, dokumentierte Flows und ein Setup, das in sechs Monaten noch nachvollziehbar ist – auch wenn alle schon beim nächsten Thema sind.',
      iconKey: 'route'
    }
  ];
  const Icon = ({ name, className }: { name: 'cpu' | 'flow' | 'layout' | 'radar' | 'bag' | 'route' | 'arrowLeft' | 'arrowRight'; className?: string }) => {
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
            <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17" cy="12" r="2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M9 7h6a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 17h6a2 2 0 0 0 2-2v-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M9 7v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
      case 'radar':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 12l6-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 12V4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 12a4 4 0 1 0 0-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
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
      case 'route':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 7a2 2 0 1 0 0 .01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M17 17a2 2 0 1 0 0 .01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M8.5 7h4.5a3 3 0 0 1 3 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M16 14a3 3 0 0 1-3 3H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [wheelLocked, setWheelLocked] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
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

  return (
    <section
      id="blog"
      className="py-24 relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
    >
      {/* Cyan Glows im Hintergrund */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[100px] rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div className="md:max-w-xl">
            <p className="text-xs tracking-[0.28em] uppercase mb-3 text-primary">
              Insights &amp; Cases
            </p>
            <h2
              className="text-[2rem] md:text-[2.6rem] lg:text-[3rem] font-light text-white mb-4 leading-snug tracking-[0.18em] uppercase"
            >
              EINBLICKE IN PROJEKTE
              <br className="hidden sm:block" />
              <span className="text-primary">SYSTEME &amp; PROZESSE</span>
            </h2>
            <p className="text-base md:text-lg text-white/80">
              Ausgewählte Themen, Learnings und Beispiele aus Projekten rund um Webauftritte, Automationen,
              Daten und KI‑unterstützte Systeme.
            </p>
          </div>
        </div>

        {/* Posts-Karussell */}
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
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-black/70 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowLeft" className="w-5 h-5 text-white" />
              </button>

              {/* Slider-Container */}
              <div className="overflow-hidden w-full max-w-3xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {posts.map((post) => (
                    <div key={post.title} className="w-full flex-shrink-0 flex justify-center">
                      <article className="group w-full rounded-2xl border border-white/12 bg-black/60 backdrop-blur-2xl px-6 py-5 transition-all duration-200 hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)]">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/20 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]">
                            <Icon
                              name={post.iconKey}
                              className="w-5 h-5 text-white transition-colors duration-200 group-hover:text-[#22d3ee]"
                            />
                          </div>
                          <div className="flex flex-col mt-1">
                            <span className="text-gray-400 text-xs md:text-sm">
                              {post.date}
                            </span>
                            <span className="text-xs tracking-[0.16em] uppercase text-primary mt-0.5">
                              {post.tag}
                            </span>
                          </div>
                        </div>
                        <h3
                          className="text-lg md:text-xl font-semibold text-white mb-2"
                        >
                          {post.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                          {post.description}
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
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-black/70 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowRight" className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-3">
                {posts.map((post, index) => (
                  <button
                    key={post.title}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={post.title}
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

        {/* Placeholder CTA */}
        <div className="text-center mt-12">
          <span className="inline-block bg-black/70 border border-white/25 text-white/90 px-6 py-3 rounded-full font-medium backdrop-blur-xl whitespace-nowrap hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all duration-200">
            Bald folgen detaillierte Cases &amp; Artikel.
          </span>
        </div>
      </div>
    </section>
  );
}
