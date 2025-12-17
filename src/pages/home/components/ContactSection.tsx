import { useState, type FormEvent } from 'react';

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      subject: formData.get('subject')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
      consent: formData.get('privacy') === 'on',
      website: formData.get('website')?.toString().trim() || ''
    };

    // Basic validation, weil wir e.preventDefault() nutzen
    if (!payload.name || !payload.email || !payload.message || !payload.consent) {
      setSubmitStatus('error');
      setErrorMessage('Bitte Pflichtfelder ausfüllen und Datenschutzerklärung bestätigen.');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json().catch(() => null) : null;

      if (!res.ok) {
        const msg = (data && (data.error || data.message)) ? String(data.error || data.message) : `HTTP ${res.status}`;
        throw new Error(msg);
      }

      setSubmitStatus('success');
      setErrorMessage('');
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unbekannter Fehler';
      setErrorMessage(msg);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Icon = ({ name, className }: { name: 'message' | 'pin' | 'mail' | 'phone' | 'whatsapp'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
      case 'message':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-4.5 3V17H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        );
      case 'pin':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" fill="currentColor" />
          </svg>
        );
      case 'mail':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'phone':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M8 8.2c.8-1.1 1.6-1.6 2.6-1.1l1.2.6c.9.4 1.1 1 .7 1.8l-.5 1c-.4.8-.2 1.6.6 2.7.9 1.1 1.7 1.9 2.7 2.7 1.1.8 1.9 1 2.7.6l1-.5c.8-.4 1.4-.2 1.8.7l.6 1.2c.5 1-.1 1.8-1.1 2.6-.8.6-1.9.9-3.1.6-2.1-.5-4.6-2-7.2-4.6C5.5 13.8 4 11.3 3.4 9.2c-.3-1.2 0-2.3.6-3.1.7-.9 1.5-1.5 2.7-1.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 3a8.5 8.5 0 0 0-7.3 12.9L4 21l5.3-1.4A8.5 8.5 0 1 0 12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9.2 9.1c.2-.5.4-.6.8-.6h.7c.2 0 .5.1.6.4l.8 2c.1.2.1.5-.1.7l-.5.6c-.2.2-.2.5 0 .8.6 1.1 1.5 2 2.6 2.6.3.2.6.2.8 0l.6-.5c.2-.2.5-.2.7-.1l2 .8c.3.1.4.4.4.6v.7c0 .4-.1.6-.6.8-.7.3-1.9.5-3.9-.4-2-.9-3.7-2.6-4.6-4.6-.9-2-.7-3.2-.4-3.9Z" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="kontakt" className="py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/3 left-0 w-1/2 h-1/2 bg-primary/30 blur-[90px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-1/2 h-1/2 bg-primary/25 blur-[100px] rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Headline-Bereich */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div className="md:max-w-xl">
            <span className="inline-block text-primary font-semibold mb-4 tracking-[0.28em] uppercase text-xs">
              KONTAKT
            </span>
            <h2
              className="text-3xl md:text-[2.35rem] lg:text-[2.6rem] font-light text-white mb-4 leading-snug tracking-[0.08em] uppercase"
            >
              Kontakt für digitale
              <br className="hidden sm:block" />
              <span className="text-primary"> Projekte &amp; Systeme</span>
            </h2>
            <p className="text-base md:text-lg text-white/80">
              Anfragen zu Webauftritten, Automationen, Shops, SEO/SEA oder KI‑unterstützten Systemen: kurz
              skizzieren, was geplant ist – der Rest wird gemeinsam strukturiert.
            </p>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 flex md:justify-end">
            <div className="group w-20 h-20 flex items-center justify-center rounded-full border border-white/15 bg-[var(--card-glass)] backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-[#22d3ee] hover:shadow-[0_0_40px_rgba(34,211,238,0.9)]">
              <Icon name="message" className="w-9 h-9 text-white transition-colors duration-200 group-hover:text-[#22d3ee]" />
            </div>
          </div>
        </div>

        {/* Grid: Formular + Kontaktinfos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formularkarte */}
          <div>
            <div className="bg-[var(--section-glass)] backdrop-blur-2xl p-8 rounded-3xl shadow-[0_24px_80px_rgba(15,23,42,0.7)] border border-white/14 ring-1 ring-white/10">
              <h3
                className="text-2xl font-semibold text-white mb-6"
              >
                Schreiben Sie uns
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-gray-300 font-medium mb-2 text-sm md:text-base"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-white/12 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/70"
                    placeholder="Ihr vollständiger Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-gray-300 font-medium mb-2 text-sm md:text-base"
                  >
                    E-Mail <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-white/12 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/70"
                    placeholder="Ihre E-Mail-Adresse"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-300 font-medium mb-2 text-sm md:text-base"
                  >
                    Betreff
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 bg-black/60 border border-white/12 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/70"
                    placeholder="Worum geht es?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-gray-300 font-medium mb-2 text-sm md:text-base"
                  >
                    Nachricht <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-black/60 border border-white/12 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/70"
                    placeholder="Wie können wir Ihnen helfen?"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="contact-privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="w-4 h-4 bg-black/70 border border-white/25 rounded-full text-primary focus:ring-2 focus:ring-primary/70"
                    />
                  </div>
                  <label htmlFor="contact-privacy" className="ml-2 text-sm text-gray-300 leading-relaxed">
                    <span className="text-primary">*</span> Ich habe die{' '}
                    <a href="/datenschutz" className="text-primary hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-[0_0_26px_rgba(34,211,238,0.8)] hover:shadow-[0_0_38px_rgba(34,211,238,1)] transition-all duration-300 border border-primary bg-primary tracking-[0.22em] uppercase text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Wird gesendet…' : 'Nachricht senden'}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <p className="text-sm text-right text-emerald-300">
                    Ihre Nachricht wurde erfolgreich gesendet.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-right text-rose-300">
                    {errorMessage || 'Beim Senden ist ein Fehler aufgetreten. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.'}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Kontaktinfos + Schnellkontakt */}
          <div>
            <div className="bg-[var(--section-glass)] backdrop-blur-2xl p-8 rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.7)] border border-white/14 ring-1 ring-white/10 mb-8">
              <h3
                className="text-2xl font-semibold text-white mb-6"
              >
                Kontaktinformationen
              </h3>
              <div className="space-y-6">
                <div className="flex group">
                  <div className="w-12 h-12 flex items-center justify-center bg-[var(--card-glass)] border border-white/15 text-white rounded-full mr-4 shrink-0 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:text-[#22d3ee] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]">
                    <Icon name="pin" className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold text-white mb-1"
                    >
                      Adresse
                    </h4>
                    <p className="text-lg text-gray-300">
                      Saalmannstraße 9
                      <br />
                      13403 Berlin, Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex group">
                  <div className="w-12 h-12 flex items-center justify-center bg-[var(--card-glass)] border border-white/15 text-white rounded-full mr-4 shrink-0 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:text-[#22d3ee] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]">
                    <Icon name="mail" className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold text-white mb-1"
                    >
                      E-Mail
                    </h4>
                    <a
                      href="mailto:info@slicker.agency"
                      className="text-gray-300 hover:text-primary break-all"
                    >
                      info@slicker.agency
                    </a>
                  </div>
                </div>

                <div className="flex group">
                  <div className="w-12 h-12 flex items-center justify-center bg-[var(--card-glass)] border border-white/15 text-white rounded-full mr-4 shrink-0 transition-all duration-200 group-hover:border-[#22d3ee] group-hover:text-[#22d3ee] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.9)]">
                    <Icon name="phone" className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <h4
                      className="text-lg font-semibold text-white mb-1"
                    >
                      Telefon
                    </h4>
                    <a href="tel:+4915511207431" className="text-gray-300 hover:text-primary">
                      +49 0155 11207431
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--section-glass)] backdrop-blur-2xl p-8 rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.7)] border border-white/14 ring-1 ring-white/10">
              <h3
                className="text-2xl font-semibold text-white mb-3"
              >
                Schnellkontakt
              </h3>
              <p className="text-gray-300 mb-4">
                Für schnelle Abstimmungen können Sie uns per WhatsApp, E-Mail oder telefonisch erreichen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/4917688710561"
                  className="inline-flex items-center justify-center bg-[#25D366] hover:bg-[#25D366]/90 text-white px-5 py-3 rounded-full w-fit"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="w-5 h-5 flex items-center justify-center mr-2">
                    <Icon name="whatsapp" className="w-5 h-5" />
                  </span>
                  WhatsApp
                </a>

                <a
                  href="mailto:info@slicker.agency"
                  className="group inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.9)] text-white w-fit transition-all duration-200"
                >
                  <span className="w-5 h-5 flex items-center justify-center mr-2 text-white transition-colors duration-200 group-hover:text-[#22d3ee]">
                    <Icon name="mail" className="w-5 h-5" />
                  </span>
                  E-Mail
                </a>

                <a
                  href="tel:+4917688710561"
                  className="group inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_20px_rgba(34,211,238,0.9)] text-white w-fit transition-all duration-200"
                >
                  <span className="w-5 h-5 flex items-center justify-center mr-2 text-white transition-colors duration-200 group-hover:text-[#22d3ee]">
                    <Icon name="phone" className="w-5 h-5" />
                  </span>
                  Anrufen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
