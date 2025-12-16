import { useEffect, useRef, useState, type TouchEvent, type RefObject } from 'react';

type Testimonial = {
  name: string;
  rating: number;
  text: string;
  image: string | null;
};

const testimonials: Testimonial[] = [
  {
    name: 'MYGUASHA – DTC Beauty Brand',
    rating: 5,
    text: 'Mit Slicker haben wir in kurzer Zeit einen performanten Shopify-Store mit klarer Markenlinie bekommen. Die Funnels sind messbar, Änderungen werden schnell umgesetzt und wir haben endlich eine stabile Basis für Skalierung.',
    image: null
  },
  {
    name: 'AbschleppDirekt24 – Abschleppdienst Berlin',
    rating: 5,
    text: 'Die neue Landingpage bringt konstant Anfragen rein. Struktur, Texte und Tracking sind so aufgesetzt, dass wir genau sehen, welche Kampagnen funktionieren – ohne komplizierte Tools.',
    image: null
  },
  {
    name: 'KIRAL BAU – Sanierungsbetrieb',
    rating: 5,
    text: 'Wir brauchten eine Seite, die seriös wirkt und Anfragen einfach einsammelt. Slicker hat Design, Struktur und Kontaktstrecken so gebaut, dass die Seite auch für Nicht-Techniker im Alltag funktioniert.',
    image: null
  },
  {
    name: 'Kosmetikstudio Berlin',
    rating: 5,
    text: 'Aus einer einfachen Instagram-Präsenz ist eine klare Marke mit Buchungs-Landingpage geworden. Die Seite lädt schnell, wirkt hochwertig und passt zu unserem Studio – ohne Baukasten-Look.',
    image: null
  },
  {
    name: 'E-Commerce Projekt (Nische)',
    rating: 5,
    text: 'Die Kombination aus Design, Tracking und schlanken Automationen ist der Unterschied. Wir konnten direkt mit kleinen Budgets testen und die Seite später ohne kompletten Relaunch erweitern.',
    image: null
  },
  {
    name: 'Agentur-Kooperation',
    rating: 5,
    text: 'Wir nutzen Slicker als technischen Partner für Web- und Automationsprojekte. Sauberer Code, klare Kommunikation und ein Verständnis für Performance statt nur Optik.',
    image: null
  }
];

const Icon = ({ name, className }: { name: 'star' | 'arrowLeft' | 'arrowRight'; className?: string }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className
  } as const;

  switch (name) {
    case 'star':
      return (
        <svg {...common} aria-hidden="true">
          <path
            d="M12 2.8l2.7 5.7 6.3.9-4.6 4.5 1.1 6.3L12 17.7 6.5 20.2l1.1-6.3L3 9.4l6.3-.9L12 2.8Z"
            fill="currentColor"
          />
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

function TestimonialCard({
  testimonial,
  className = ''
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <article
      className={`relative flex flex-col h-full rounded-3xl bg-[var(--section-glass)] dark:bg-black/70 border border-[rgba(15,23,42,0.14)] dark:border-white/12 backdrop-blur-2xl shadow-[0_22px_70px_rgba(15,23,42,0.16)] px-6 py-6 md:px-7 md:py-7 overflow-hidden hover:border-[#22d3ee] transition-all duration-300 ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/5 dark:from-white/6 via-transparent to-transparent" />
      <div className="flex items-center gap-4 mb-4">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-[var(--card-glass)] dark:bg-white/5 border border-[rgba(15,23,42,0.14)] dark:border-white/30 flex items-center justify-center text-sm font-semibold text-[color:var(--page-fg)]">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{testimonial.name.charAt(0)}</span>
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-lg md:text-xl font-semibold leading-snug text-[color:var(--page-fg)]">
            {testimonial.name}
          </h4>
          <div className="mt-1 flex items-center gap-1.5">
            {Array.from({ length: testimonial.rating }).map((_, idx) => (
              <Icon key={idx} name="star" className="w-[14px] h-[14px] text-[#FBBF24]" />
            ))}
          </div>
        </div>
      </div>

      <p className="text-sm md:text-[0.95rem] leading-relaxed italic text-[color:var(--page-fg)] opacity-75">
        “{testimonial.text}”
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef<number | null>(null);
  const lastScrollAtRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 768) return;

      setActiveIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        const container = mobileScrollRef.current;
        if (container) {
          const width = container.clientWidth;
          container.scrollTo({
            left: next * width,
            behavior: 'smooth'
          });
        }
        return next;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 768) return;

      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

      const currentY = window.scrollY || window.pageYOffset;
      const now = Date.now();

      const COOLDOWN = 400;
      if (now - lastScrollAtRef.current < COOLDOWN) {
        lastScrollYRef.current = currentY;
        return;
      }

      if (lastScrollYRef.current === null) {
        lastScrollYRef.current = currentY;
        return;
      }

      const diff = currentY - lastScrollYRef.current;
      const THRESHOLD = 120;

      if (Math.abs(diff) < THRESHOLD) {
        return;
      }

      if (diff > 0) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % testimonials.length;
          const container = mobileScrollRef.current;
          if (container) {
            const width = container.clientWidth;
            container.scrollTo({
              left: next * width,
              behavior: 'smooth'
            });
          }
          return next;
        });
      } else {
        setActiveIndex((prev) => {
          const next = (prev - 1 + testimonials.length) % testimonials.length;
          const container = mobileScrollRef.current;
          if (container) {
            const width = container.clientWidth;
            container.scrollTo({
              left: next * width,
              behavior: 'smooth'
            });
          }
          return next;
        });
      }

      lastScrollYRef.current = currentY;
      lastScrollAtRef.current = now;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    isDraggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current || startXRef.current === null || currentXRef.current === null) {
      isDraggingRef.current = false;
      startXRef.current = null;
      currentXRef.current = null;
      return;
    }

    const diff = currentXRef.current - startXRef.current;
    const THRESHOLD = 50;

    if (Math.abs(diff) > THRESHOLD) {
      if (diff < 0) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % testimonials.length;
          const container = mobileScrollRef.current;
          if (container) {
            const width = container.clientWidth;
            container.scrollTo({
              left: next * width,
              behavior: 'smooth'
            });
          }
          return next;
        });
      } else {
        setActiveIndex((prev) => {
          const next = (prev - 1 + testimonials.length) % testimonials.length;
          const container = mobileScrollRef.current;
          if (container) {
            const width = container.clientWidth;
            container.scrollTo({
              left: next * width,
              behavior: 'smooth'
            });
          }
          return next;
        });
      }
    }

    isDraggingRef.current = false;
    startXRef.current = null;
    currentXRef.current = null;
  };

  const handleHorizontalScroll = () => {
    const container = mobileScrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;
    if (!clientWidth) return;

    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
    >
      {/* Cyan Glows im Hintergrund */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-25%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[110px] rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.28em] uppercase mb-4 text-primary">
              Kundenstimmen
            </p>
            <h2 className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-light mb-4 leading-snug tracking-[0.08em] uppercase text-[color:var(--page-fg)]">
              Was Kund:innen über Slicker sagen
            </h2>
          </div>
          <p className="text-sm md:text-base max-w-xl leading-relaxed text-[color:var(--page-fg)] opacity-70">
            Ob lokales Unternehmen oder Online-Brand – entscheidend ist, dass Webseiten, Shops und Automationen im Alltag
            funktionieren. Genau das spiegeln die Rückmeldungen unserer Kund:innen wider.
          </p>
        </div>

        {/* Mobile: Scroll-/Auto-Carousel im Service-Style */}
        <div className="mt-10 md:hidden">
          <div className="relative overflow-hidden">
            <div
              ref={mobileScrollRef}
              className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onScroll={handleHorizontalScroll}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-center px-1">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-3 md:hidden">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  const container = mobileScrollRef.current;
                  if (container) {
                    const width = container.clientWidth;
                    container.scrollTo({
                      left: idx * width,
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label={t.name}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'bg-[#22d3ee] scale-125'
                    : 'bg-[#22d3ee]/30 hover:bg-[#22d3ee]/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Karussell mit einer Karte, Pfeilen und Dots */}
        <div className="mt-10 hidden md:block">
          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              {/* Prev Arrow */}
              <button
                type="button"
                onClick={prevSlide}
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-black/70 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowLeft" className="w-5 h-5 text-[color:var(--page-fg)]" />
              </button>

              {/* Aktive Karte */}
              <div className="w-full max-w-3xl">
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </div>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={nextSlide}
                className="relative z-10 w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-black/70 hover:bg-[rgba(8,145,178,0.20)] dark:hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              >
                <Icon name="arrowRight" className="w-5 h-5 text-[color:var(--page-fg)]" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-3">
                {testimonials.map((t, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={t.name}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-[#22d3ee] scale-125'
                        : 'bg-[#22d3ee]/30 hover:bg-[#22d3ee]/60'
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
