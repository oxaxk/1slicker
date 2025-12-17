import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';

const faqs = [
  {
    question: 'Wie läuft der Projektstart mit Slicker ab?',
    answer:
      'Wir starten mit einem kurzen Call, klären Ziele, Status quo und Budgetrahmen. Danach bekommst du eine klare Roadmap – welche Webauftritte, Automationen, Shops oder Setups wirklich sinnvoll sind.'
  },
  {
    question: 'Für wen sind eure Leistungen gedacht?',
    answer:
      'Für lokale Unternehmen, digitale Projekte und Teams, die ihre Prozesse mit KI und Automationen nach vorne bringen wollen – ohne dafür eine eigene Tech-Abteilung aufzubauen.'
  },
  {
    question: 'Mit welchen Technologien arbeitet ihr?',
    answer:
      'Moderne Web-Stacks wie React/Vite/Next.js, n8n für Automationen, KI-Tools, Analytics- und Tracking-Setups sowie E‑Commerce-Lösungen z. B. auf Shopify-Basis.'
  },
  {
    question: 'Wie schnell könnt ihr loslegen?',
    answer:
      'In der Regel melden wir uns innerhalb von 24 Stunden zurück. Je nach Umfang können erste Ergebnisse nach wenigen Tagen stehen, komplexere Setups planen wir transparent mit dir durch.'
  },
  {
    question: 'Gibt es eine Mindestlaufzeit oder feste Verträge?',
    answer:
      'Für viele Setups starten wir mit einem klar definierten Projektumfang. Für laufende Betreuung oder Automations-Monitoring arbeiten wir mit flexiblen Monats-Paketen ohne lange Laufzeiten.'
  },
  {
    question: 'Könnt ihr auch bestehende Systeme weiterentwickeln?',
    answer:
      'Ja. Wir steigen häufig in bestehende Webauftritte, n8n-Flows oder Tracking-Setups ein, räumen auf und erweitern sie Schritt für Schritt – statt alles „from scratch“ neu zu bauen.'
  },
  {
    question: 'Arbeitet ihr komplett remote oder auch vor Ort?',
    answer:
      'Die meisten Abstimmungen laufen remote über Calls und gemeinsame Boards. Für größere Projekte oder Workshops sind nach Absprache auch Vor-Ort-Termine möglich.'
  },
  {
    question: 'Was kostet ein typisches Projekt mit euch?',
    answer:
      'Das hängt stark vom Umfang ab. Einfache Landingpages starten im niedrigen vierstelligen Bereich, komplexere KI-Setups oder E‑Commerce-Projekte werden transparent geplant und vorab mit dir durchgerechnet.'
  }
];

const MobileFaqCard = memo(function MobileFaqCard({
  question,
  answer,
  isOpen,
  onToggle,
  Icon
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  Icon: ({ name, className }: { name: 'calendar' | 'layout' | 'chevDown'; className?: string }) => JSX.Element | null;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const measuredHeightRef = useRef<number>(0);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (!isOpen) {
      setContentHeight(0);
      return;
    }

    // Use cached height if already measured
    if (measuredHeightRef.current > 0) {
      setContentHeight(measuredHeightRef.current);
      return;
    }

    const measure = () => {
      const h = el.scrollHeight;
      measuredHeightRef.current = h;
      setContentHeight(h);
    };

    // Measure after layout settles (mobile can be late due to font wrap)
    requestAnimationFrame(measure);
    const t = window.setTimeout(measure, 60);
    return () => window.clearTimeout(t);
  }, [isOpen, answer]);

  return (
    <button
      type="button"
      onClick={onToggle}
      style={{ contain: 'layout paint' }}
      className="w-full text-left group rounded-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--card-glass)] dark:bg-black/60 backdrop-blur-none md:backdrop-blur-2xl px-5 py-4 transition-all duration-200 transform-gpu md:hover:border-[#22d3ee] md:hover:shadow-[0_0_22px_rgba(34,211,238,0.9)]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium text-[color:var(--page-fg)] text-sm mt-1">{question}</p>
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              onToggle();
            }
          }}
          className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 text-[color:var(--page-fg)] text-xs mt-1 transition-all duration-200 md:group-hover:border-[#22d3ee] md:group-hover:shadow-[0_0_16px_rgba(34,211,238,0.9)]"
        >
          <Icon
            name="chevDown"
            className={`w-[18px] h-[18px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </div>

      <div
        className={
          'mt-2 overflow-hidden will-change-[height,opacity] transition-[height,opacity] duration-420 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none ' +
          (isOpen ? 'opacity-100' : 'opacity-0')
        }
        style={{ height: isOpen ? contentHeight : 0 }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="text-xs text-[color:var(--page-fg)] opacity-70 leading-relaxed pt-1">
          <p>{answer}</p>
        </div>
      </div>
    </button>
  );
});

const TeamSection = () => {

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentFaqPage, setCurrentFaqPage] = useState(0);
  const faqsPerPageMobile = 4;
  const totalFaqPages = Math.ceil(faqs.length / faqsPerPageMobile);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

  const Icon = ({ name, className }: { name: 'calendar' | 'layout' | 'chevDown'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
      case 'calendar':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 3v3M17 3v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M4 7h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 11h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 15h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M14 11h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M14 15h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
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
      case 'chevDown':
        return (
          <svg {...common} aria-hidden="true">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="faq"
      className="py-24 relative overflow-hidden"
    >
      {/* Cyan Glows im Hintergrund */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[110px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          className="rounded-[28px] md:rounded-[32px] backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/10 shadow-[0_24px_80px_rgba(15,23,42,0.16)] px-6 sm:px-10 lg:px-12 py-10 md:py-12"
          style={{ background: 'var(--section-glass)' }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-14">
            {/* Textblock */}
            <div className="flex-1">
              <p className="text-xs tracking-[0.28em] uppercase mb-3 text-primary">
                Nächster Schritt
              </p>
              <h2
                className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-light text-[color:var(--page-fg)] mb-4 leading-snug tracking-[0.08em] uppercase"
              >
                Digitale Roadmap
                <br className="hidden sm:block" />
                <span className="text-primary"> statt Einmal‑Projekt</span>
              </h2>
              <p className="text-sm md:text-base text-[color:var(--page-fg)] opacity-75 max-w-xl leading-relaxed">
                Kurzgespräch, klare Einordnung, dann ein schlanker technischer Plan: welche Webauftritte,
                Automationen, Shops oder Analysen wirklich Sinn machen – und was man sich sparen kann.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-[color:var(--page-fg)] opacity-70">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-[color:var(--page-fg)]">Fokus auf Praxis</p>
                    <p className="text-xs mt-1">
                      Lösungen, die im Alltag genutzt werden – nicht nur auf Slides gut aussehen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-[color:var(--page-fg)]">Tech‑Stack aktuell</p>
                    <p className="text-xs mt-1">
                      Moderne Stacks, n8n, KI‑Tools und Tracking – ohne Tool‑Zoo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-[color:var(--page-fg)]">Transparente Kosten</p>
                    <p className="text-xs mt-1">
                      Klarer Rahmen statt versteckter Posten – von Einzelprojekt bis laufendem Setup.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA-Block */}
            <div className="w-full lg:w-auto flex flex-col items-stretch lg:items-end gap-4">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[var(--card-glass)] dark:bg-white/8 border border-[rgba(15,23,42,0.14)] dark:border-white/20 backdrop-blur-xl text-[color:var(--page-fg)] text-[0.78rem] md:text-sm uppercase tracking-[0.2em] shadow-[0_18px_40px_rgba(15,23,42,0.8)] hover:bg-white/12 hover:border-primary hover:shadow-[0_24px_60px_rgba(34,211,238,0.6)] transition-all"
              >
                <Icon name="calendar" className="w-[18px] h-[18px] mr-2" />
                Gespräch anfragen
              </a>
              <a
                href="#expertise"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[var(--card-glass)] dark:bg-black/80 border border-[rgba(15,23,42,0.14)] dark:border-white/24 backdrop-blur-xl text-[color:var(--page-fg)] opacity-85 text-[0.78rem] md:text-sm uppercase tracking-[0.2em] hover:text-[color:var(--page-fg)] hover:border-primary hover:bg-[rgba(8,145,178,0.26)] dark:hover:bg-black/90 transition-all"
              >
                <Icon name="layout" className="w-[18px] h-[18px] mr-2" />
                Leistungen ansehen
              </a>
              <p className="text-xs text-[color:var(--page-fg)] opacity-55 mt-1 max-w-xs text-left lg:text-right">
                Antwort in der Regel innerhalb von 24 Stunden an Werktagen.
              </p>
            </div>
          </div>

          <div id="faq-section" className="mt-12 pt-10 border-t border-white/10">
            <h3
              className="text-[1.9rem] md:text-[2.3rem] lg:text-[2.5rem] font-light text-[color:var(--page-fg)] mb-4 leading-snug tracking-[0.08em] uppercase"
            >
              FAQ
            </h3>
            <div className="space-y-3 md:space-y-4">
              {/* Mobile: Carousel mit 2 Seiten à 4 FAQs (Swipe-Feeling via translateX) */}
              <div className="md:hidden overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{ transform: `translateX(-${currentFaqPage * 100}%)` }}
                >
                  {Array.from({ length: totalFaqPages }).map((_, pageIndex) => (
                    <div key={pageIndex} className="w-full shrink-0 space-y-3">
                      {faqs
                        .slice(
                          pageIndex * faqsPerPageMobile,
                          pageIndex * faqsPerPageMobile + faqsPerPageMobile
                        )
                        .map((faq, index) => {
                          const realIndex = pageIndex * faqsPerPageMobile + index;
                          const isOpen = openFaqIndex === realIndex;
                          return (
                            <MobileFaqCard
                              key={faq.question}
                              question={faq.question}
                              answer={faq.answer}
                              isOpen={isOpen}
                              onToggle={() => toggleFaq(realIndex)}
                              Icon={Icon}
                            />
                          );
                        })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: Dots für die zwei FAQ-Seiten */}
              <div className="md:hidden flex justify-center mt-2">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalFaqPages }).map((_, pageIndex) => (
                    <button
                      key={pageIndex}
                      type="button"
                      onClick={() => setCurrentFaqPage(pageIndex)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        currentFaqPage === pageIndex
                          ? 'bg-[#22d3ee] scale-125 shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                          : 'bg-[#22d3ee]/30 hover:bg-[#22d3ee]/60 hover:shadow-[0_0_12px_rgba(34,211,238,0.7)]'
                      }`}
                      aria-label={`FAQ Seite ${pageIndex + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop: 2 Spalten Grid mit allen 8 FAQs */}
              <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:gap-5">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <button
                      key={faq.question}
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left group rounded-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/12 bg-[var(--card-glass)] dark:bg-black/60 backdrop-blur-2xl px-6 py-4 hover:border-[#22d3ee] hover:shadow-[0_0_22px_rgba(34,211,238,0.9)] transition-all duration-200"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium text-[color:var(--page-fg)] text-sm md:text-[0.95rem] mt-1">
                          {faq.question}
                        </p>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenFaqIndex(isOpen ? null : index);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              setOpenFaqIndex(isOpen ? null : index);
                            }
                          }}
                          className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full border border-[rgba(15,23,42,0.14)] dark:border-white/25 bg-[var(--card-glass)] dark:bg-white/5 text-[color:var(--page-fg)] text-xs md:text-sm mt-1 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.9)]"
                        >
                          <Icon
                            name="chevDown"
                            className={`w-[18px] h-[18px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </span>
                      </div>
                      <div
                        className={
                          "mt-2 grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-reduce:transition-none " +
                          (isOpen ? "opacity-100" : "opacity-0")
                        }
                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                        aria-hidden={!isOpen}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="text-xs md:text-sm text-[color:var(--page-fg)] opacity-70 leading-relaxed pt-1">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
