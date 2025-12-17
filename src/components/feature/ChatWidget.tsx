import React, { useEffect, useMemo, useRef, useState } from 'react';

type Msg = { id: string; role: 'user' | 'bot'; text: string; ts: number };

type Intent =
  | 'website'
  | 'ads'
  | 'seo'
  | 'automation'
  | 'support'
  | 'tracking'
  | 'performance'
  | 'design'
  | 'unknown';

type Lead = {
  intent: Intent;
  topic?: string;
  industry?: string;
  location?: string;
  offer?: string;
  goal?: string;
  budget?: string;
  timeline?: string;
  currentSetup?: string;
  traffic?: string;
  pain?: string;
  contact?: string;
  consent?: boolean;
};

type Step =
  | 'welcome'
  | 'intent'
  | 'industry'
  | 'location'
  | 'offer'
  | 'goal'
  | 'current'
  | 'traffic'
  | 'pain'
  | 'budget'
  | 'timeline'
  | 'contact'
  | 'summary'
  | 'final';

const nowId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .trim();
}

function detectIntent(input: string): Intent {
  const t = normalize(input);

  // Support / Kontakt
  if (/(kontakt|email|mail|telefon|anrufen|support|hilfe|problem|bug|fehler)/.test(t)) return 'support';

  // Website
  if (/(website|webseite|webseit|web seite|web-site|homepage|home page|onepager|one pager|landing|landingpage|seite|design|ui|ux|vite|react|next)/.test(t)) return 'website';

  // Ads
  if (/(ads|google ads|meta|facebook|instagram|kampagne|cpc|cpa|roas|tracking|conversion)/.test(t)) return 'ads';

  // SEO
  if (/(seo|ranking|google gefunden|keywords|gsc|sistrix|backlinks|local seo|google business)/.test(t)) return 'seo';

  // Automation
  if (/(automation|automatisierung|n8n|zapier|make|api|workflow|crm|webhook|supabase)/.test(t)) return 'automation';

  // Tracking / Datenschutz
  if (/(tracking|gtm|google tag manager|ga4|analytics|conversion|cookie|dsgvo|consent|cookiebanner)/.test(t)) return 'tracking';

  // Performance / Speed
  if (/(pagespeed|lighthouse|core web vitals|cls|lcp|fid|ttfb|langsam|performance|speed)/.test(t)) return 'performance';

  // Design
  if (/(branding|marke|logo|farben|typografie|design system|design|ui|ux|figma)/.test(t)) return 'design';

  return 'unknown';
}

function intentLabel(i: Intent) {
  switch (i) {
    case 'website':
      return 'Website';
    case 'ads':
      return 'Ads';
    case 'seo':
      return 'SEO';
    case 'automation':
      return 'Automation';
    case 'support':
      return 'Support';
    case 'tracking':
      return 'Tracking / DSGVO';
    case 'performance':
      return 'Performance';
    case 'design':
      return 'Design';
    default:
      return 'Unklar';
  }
}

const INTENT_ORDER: Record<Intent, Step[]> = {
  website: ['industry', 'location', 'offer', 'goal', 'budget', 'timeline', 'contact', 'summary'],
  seo: ['industry', 'location', 'offer', 'goal', 'current', 'budget', 'timeline', 'contact', 'summary'],
  ads: ['industry', 'location', 'offer', 'goal', 'traffic', 'budget', 'timeline', 'contact', 'summary'],
  automation: ['industry', 'offer', 'pain', 'budget', 'timeline', 'contact', 'summary'],
  tracking: ['current', 'goal', 'budget', 'timeline', 'contact', 'summary'],
  performance: ['current', 'goal', 'budget', 'timeline', 'contact', 'summary'],
  design: ['industry', 'offer', 'goal', 'budget', 'timeline', 'contact', 'summary'],
  support: ['goal', 'current', 'contact', 'summary'],
  unknown: ['intent'],
};

function questionFor(step: Step, lead: Lead): string {
  switch (step) {
    case 'intent':
      return 'Worum geht’s genau? Du kannst z. B. Website, Ads, SEO, Automation, Tracking/DSGVO, Performance oder Support auswählen.';
    case 'industry':
      return 'Welche Branche? (z. B. Abschleppdienst, Beauty, Bau, E-Commerce)';
    case 'location':
      return 'Welche Stadt/Region? (für Local SEO/Ads wichtig)';
    case 'offer':
      return 'Was verkaufst du genau? 1–2 Hauptleistungen reichen.';
    case 'goal':
      return 'Was ist das Ziel in 30 Tagen? (z. B. +20 Anfragen, mehr Calls, ROAS >= 3)';
    case 'current':
      return 'Was ist der aktuelle Stand? (Website vorhanden? Tracking? Ads/SEO schon mal gemacht?)';
    case 'traffic':
      return 'Wie kommen aktuell Anfragen rein? (Google, Meta, Empfehlungen) + grob pro Woche?';
    case 'pain':
      return 'Was nervt am meisten im Prozess? (z. B. Leads gehen verloren, Nachfassen, Angebote, Terminierung)';
    case 'budget':
      return 'Budget-Rahmen? (einmalig oder monatlich; z. B. 300–800, 800–2000, 2000+)' ;
    case 'timeline':
      return 'Timing: diese Woche, 2–3 Wochen, 1–2 Monate?';
    case 'contact':
      return 'Kontakt: E-Mail oder WhatsApp?';
    case 'summary':
      return 'Alles klar. Ich fasse kurz zusammen und gebe dir einen konkreten Next-Step.';
    default:
      return 'Alles klar.';
  }
}

function nextStepFor(lead: Lead, current: Step): Step {
  const order = INTENT_ORDER[lead.intent] || ['intent'];
  const idx = order.indexOf(current);
  const next = idx >= 0 ? order[idx + 1] : order[0];
  return next || 'final';
}


function extractContact(input: string) {
  const t = input.trim();
  const email = t.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  if (email) return email;
  const phone = t.match(/(\+?\d[\d\s().-]{7,}\d)/)?.[0];
  if (phone) return phone.replace(/\s+/g, ' ').trim();
  return '';
}


function quickRecommendation(lead: Lead) {
  const loc = lead.location ? ` (${lead.location})` : '';
  const offer = lead.offer || 'deine Hauptleistung';
  const goal = lead.goal || 'mehr Anfragen';
  const setup = lead.currentSetup || 'unbekannt';

  if (lead.intent === 'ads') {
    return [
      `Plan für Ads${loc}:`,
      `1) Struktur: 1 Kampagne pro Intent/Service (z. B. ${offer}).`,
      `2) Tracking: Call + Formular als Conversions, sonst skalierst du blind.`,
      `3) Landing: 1 Ziel, 1 CTA, keine Ablenkung.`,
      `4) Optimierung: Suchbegriffe hart filtern, negatives rein, Budget nach CPA.`
    ].join('\n');
  }

  if (lead.intent === 'seo') {
    return [
      `Plan für SEO${loc}:`,
      `1) Google Business: Services, Bilder, Posts, Bewertungen (wöchentlich).`,
      `2) Seiten: pro Leistung + Ort 1 Seite (z. B. ${offer}${loc}).`,
      `3) Technik: schnelle Ladezeit + saubere Struktur (H1/H2, Schema).`,
      `4) Conversion: WhatsApp/Call sticky + Tracking.`
    ].join('\n');
  }

  if (lead.intent === 'website') {
    return [
      'Plan für Website:',
      `1) Hero: klares Versprechen + 1 CTA (${goal}).`,
      `2) Leistungen: 3–6 Cards, jeweils CTA, keine Roman-Texte.`,
      '3) Vertrauen: Cases/Reviews, klare Prozesse, FAQ.',
      '4) Basis-SEO + Performance, damit es ranken kann.'
    ].join('\n');
  }

  if (lead.intent === 'automation') {
    return [
      'Plan für Automation:',
      `1) Prozess definieren: Input → Verarbeitung → Output (dein Pain: ${lead.pain || '—'}).`,
      '2) MVP: 1 Flow stabil bauen (z. B. Lead → CRM → WhatsApp Follow-up).',
      '3) Logging/Fehlerfälle + Rechte/DSGVO von Anfang an.'
    ].join('\n');
  }

  if (lead.intent === 'tracking') {
    return [
      'Plan für Tracking/DSGVO:',
      `1) Consent: Tags erst nach Opt-in feuern (GTM/GA4/Ads).`,
      `2) Conversions: Call/Form/WhatsApp messbar machen.`,
      `3) Audit: aktuell: ${setup} → Lücken schließen.`
    ].join('\n');
  }

  if (lead.intent === 'performance') {
    return [
      'Plan für Performance:',
      '1) CLS/LCP fixen (Images, Fonts, Layout).',
      '2) JS reduzieren, lazy-load, caching.',
      `3) Ziel: Lighthouse 90+ mobil, passend zu ${goal}.`
    ].join('\n');
  }

  if (lead.intent === 'design') {
    return [
      'Plan für Design:',
      '1) Mini-Designsystem: Farben, Typo, Buttons, Cards.',
      '2) 3 Sektionen neu: Hero, Services, Trust.',
      `3) Ziel: Look & Feel passend zu ${offer}.`
    ].join('\n');
  }

  return 'Schreib 1 Satz Kontext + Ziel, dann mache ich dir einen konkreten Plan.';
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [step, setStep] = useState<Step>('welcome');
  const [lead, setLead] = useState<Lead>({ intent: 'unknown' });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: nowId(),
      role: 'bot',
      text: 'Hi! Wie kann ich dir weiterhelfen?',
      ts: Date.now()
    }
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, 60);
  }, [open, messages.length]);

  useEffect(() => {
    const read = () => {
      const t = document.documentElement.getAttribute('data-theme');
      // treat everything that is not explicit 'dark' as light
      setIsLight(t !== 'dark');
    };

    read();

    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => mo.disconnect();
  }, []);

  const canSend = useMemo(() => input.trim().length >= 1 && !busy, [input, busy]);

  // Queued bot message sequence (busy only released after last)
  const pushBotSeq = (texts: string[]) => {
    const base = 650;
    const jitter = 550;

    texts.forEach((text, idx) => {
      const delay = base + Math.floor(Math.random() * jitter) + idx * 450;
      window.setTimeout(() => {
        const botMsg: Msg = { id: nowId(), role: 'bot', text, ts: Date.now() };
        setMessages((m) => [...m, botMsg]);
        // only release busy after the last message in the sequence
        if (idx === texts.length - 1) setBusy(false);
      }, delay);
    });
  };

  // Reception/advisory helpers
  const setIntentAndAsk = (intent: Intent, topic?: string) => {
    const updated: Lead = { ...lead, intent, topic: topic || lead.topic };
    setLead(updated);

    // pick a gentle first question per intent
    let first: Step = 'goal';
    if (intent === 'website' || intent === 'seo' || intent === 'ads' || intent === 'design') first = 'industry';
    if (intent === 'tracking' || intent === 'performance') first = 'current';
    if (intent === 'support') first = 'goal';
    if (intent === 'automation') first = 'pain';

    setStep(first);

    pushBotSeq([
      `Alles klar — Thema: ${intentLabel(intent)}.`,
      questionFor(first, updated)
    ]);
  };

  const generalReception = (lastBotText: string) => {
    // prevent loops where we repeat the same welcome over and over
    if (lastBotText.startsWith('Wie kann ich dir weiterhelfen')) {
      return ['Sag mir kurz: Branche + Stadt/Region + Ziel, dann gebe ich dir die passenden nächsten Schritte.'];
    }

    return [
      'Wie kann ich dir weiterhelfen?',
      'Beschreibe kurz dein Anliegen oder nutze die Buttons oben (Website, Ads, SEO, Automation, Support).'
    ];
  };

  const helpfulAnswer = (text: string, currentLead: Lead): string[] => {
    const intent = currentLead.intent;

    // If user asks generally without selecting an intent
    if (intent === 'unknown') {
      const detected = detectIntent(text);
      if (detected !== 'unknown') {
        // move into intent flow without sounding salesy
        setIntentAndAsk(detected, text);
        return [];
      }
      const lastBot = [...messages].reverse().find((m) => m.role === 'bot')?.text || '';
      return generalReception(lastBot);
    }

    // Provide helpful guidance without forcing full qualification
    if (intent === 'support') {
      return [
        'Okay. Sag mir kurz: Was genau funktioniert nicht (und auf welcher Seite/Komponente)?',
        'Wenn du eine Fehlermeldung hast, kopier sie hier rein.'
      ];
    }

    if (intent === 'tracking') {
      return [
        'Tracking/DSGVO: Wichtig ist, dass GTM/GA4/Ads erst nach Opt-in feuern.',
        'Sag mir kurz: Nutzt du GTM oder direkt gtag/GA4? Und welche Conversions willst du messen (Call, Formular, WhatsApp)?'
      ];
    }

    if (intent === 'performance') {
      return [
        'Performance: Häufige Ursachen sind Bilder ohne feste Größen, zu viel JS und Fonts, die Layout verschieben.',
        'Sag mir: Was ist gerade das Problem (mobil langsam, CLS, LCP)? Wenn du einen Lighthouse-Wert hast, nenn ihn kurz.'
      ];
    }

    if (intent === 'ads') {
      return [
        'Ads: Ich helfe dir beim Setup/Optimieren, ohne dass unnötige Suchanfragen reinkommen.',
        'Was ist dein Ziel: Calls, Formular-Leads oder Shop-Käufe? Und welche Region?' 
      ];
    }

    if (intent === 'seo') {
      return [
        'SEO: Für lokale Dienstleister sind Google Business + Service-Seiten pro Leistung/Ort der Hebel.',
        'Welche Stadt/Region und welche 1–2 Hauptleistungen?'
      ];
    }

    if (intent === 'website' || intent === 'design') {
      return [
        'Website/Design: Ich gebe dir Struktur + Inhalte, die klar konvertieren und technisch sauber bleiben.',
        'Welche Branche und was soll die Seite primär erreichen (Anfragen, Terminbuchung, Vertrauen)?'
      ];
    }

    if (intent === 'automation') {
      return [
        'Automation: Wir automatisieren nur das, was wirklich Zeit spart (ohne Fragilität).',
        'Was ist der konkrete Prozess (z. B. Lead → Follow-up → Termin) und wo hakt es gerade am meisten?'
      ];
    }

    return ['Alles klar. Erzähl mir kurz 1–2 Sätze Kontext, dann helfe ich dir konkret weiter.'];
  };

  const handleUserText = (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    // user message
    const userMsg: Msg = { id: nowId(), role: 'user', text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);

    // If user clicks a quick chip like "Website" etc., treat as intent selection
    const chipIntent = detectIntent(text);
    if (['website', 'ads', 'seo', 'automation', 'support', 'tracking', 'performance', 'design'].includes(chipIntent)) {
      if (step === 'welcome' || lead.intent === 'unknown') {
        setIntentAndAsk(chipIntent, lead.topic);
        return;
      }
    }

    // Step-based light qualification (only when already inside a flow)
    if (lead.intent !== 'unknown' && step !== 'welcome' && step !== 'final') {
      if (step === 'industry') {
        const updated = { ...lead, industry: text };
        setLead(updated);
        const next: Step = updated.intent === 'ads' || updated.intent === 'seo' || updated.intent === 'website' || updated.intent === 'design' ? 'location' : 'goal';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'location') {
        const updated = { ...lead, location: text };
        setLead(updated);
        const next: Step = updated.intent === 'ads' || updated.intent === 'seo' ? 'offer' : 'goal';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'offer') {
        const updated = { ...lead, offer: text };
        setLead(updated);
        const next: Step = 'goal';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'pain') {
        const updated = { ...lead, pain: text };
        setLead(updated);
        const next: Step = 'current';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'current') {
        const updated = { ...lead, currentSetup: text };
        setLead(updated);
        const next: Step = updated.intent === 'ads' ? 'traffic' : 'goal';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'traffic') {
        const updated = { ...lead, traffic: text };
        setLead(updated);
        const next: Step = 'goal';
        setStep(next);
        pushBotSeq([questionFor(next, updated)]);
        return;
      }

      if (step === 'goal') {
        const updated = { ...lead, goal: text };
        setLead(updated);

        // Stop here: provide advisory plan (no forced budget/timeline)
        setStep('final');
        pushBotSeq([
          'Verstanden. Hier ist ein sinnvoller nächster Schritt:',
          quickRecommendation(updated),
          'Wenn du willst, sag noch Budget-Rahmen + Timing, dann kann ich es noch genauer zuschneiden.'
        ]);
        return;
      }
    }

    // Default: advisory reception behavior
    const replies = helpfulAnswer(text, lead);
    if (replies.length) pushBotSeq(replies);
  };

  const send = () => {
    const text = input.trim();
    if (!text || busy) return;

    setInput('');
    setBusy(true);
    handleUserText(text);
  };

  const quickSend = (text: string) => {
    if (busy) return;
    setBusy(true);
    setOpen(true);
    handleUserText(text);
  };

  return (
    <>
      {/* Bubble */}
      <button
        type="button"
        aria-label={open ? 'Chat schließen' : 'Chat öffnen'}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[84px] right-5 z-[10000] w-12 h-12 rounded-full border border-white/20 bg-black/55 backdrop-blur-xl shadow-[0_14px_40px_rgba(15,23,42,0.65)] hover:border-[#22d3ee]/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.55)] transition flex items-center justify-center"
      >
        <img src="/images/logo2.gif" alt="" className="h-6 w-6 opacity-95" draggable={false} />
      </button>

      {/* Window */}
      {open && (
        <div
          className={`fixed bottom-[148px] right-5 z-[9999] w-[320px] max-w-[calc(100vw-40px)] rounded-2xl border backdrop-blur-2xl overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.35)] ${
            isLight
              ? 'border-slate-900/10 bg-[#eaf7ff]/85'
              : 'border-white/15 bg-black/70'
          }`}
        >
          <div className={`px-4 py-3 border-b flex items-center justify-between ${isLight ? 'border-slate-900/10' : 'border-white/10'}`}>
            <div className="flex items-center gap-2">
              <span
                className={
                  isLight
                    ? 'inline-flex h-2 w-2 rounded-full bg-slate-900/70 shadow-[0_0_10px_rgba(15,23,42,0.25)]'
                    : 'inline-flex h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_14px_rgba(34,211,238,0.9)]'
                }
              />
              <div className={`${isLight ? 'text-slate-900' : 'text-white/90'} text-sm font-semibold`}>Renard</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`${isLight ? 'text-slate-700 hover:text-slate-900' : 'text-white/70 hover:text-white'} text-sm`}
            >
              Schließen
            </button>
          </div>

          <div className={`px-3 py-2 border-b flex flex-wrap gap-2 ${isLight ? 'border-slate-900/10' : 'border-white/10'}`}>
            <button type="button" onClick={() => quickSend('Website')} className={`px-3 py-1.5 rounded-full text-[12px] border ${
              isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'
            } ${isLight ? 'text-slate-800' : 'text-white/85'} hover:border-[#22d3ee]/40`}>Website</button>
            <button type="button" onClick={() => quickSend('Ads')} className={`px-3 py-1.5 rounded-full text-[12px] border ${
              isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'
            } ${isLight ? 'text-slate-800' : 'text-white/85'} hover:border-[#22d3ee]/40`}>Ads</button>
            <button type="button" onClick={() => quickSend('SEO')} className={`px-3 py-1.5 rounded-full text-[12px] border ${
              isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'
            } ${isLight ? 'text-slate-800' : 'text-white/85'} hover:border-[#22d3ee]/40`}>SEO</button>
            <button type="button" onClick={() => quickSend('Automation')} className={`px-3 py-1.5 rounded-full text-[12px] border ${
              isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'
            } ${isLight ? 'text-slate-800' : 'text-white/85'} hover:border-[#22d3ee]/40`}>Automation</button>
            <button type="button" onClick={() => quickSend('Support')} className={`px-3 py-1.5 rounded-full text-[12px] border ${
              isLight ? 'border-slate-900/10 bg-white/70' : 'border-white/10 bg-white/5'
            } ${isLight ? 'text-slate-800' : 'text-white/85'} hover:border-[#22d3ee]/40`}>Support</button>
          </div>
          <div ref={listRef} className="h-[320px] overflow-auto px-3 py-3 space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    m.role === 'user'
                      ? `max-w-[85%] rounded-2xl px-3 py-2 border ${
                          isLight ? 'bg-[#c9edf9]/80 border-slate-900/10' : 'bg-[#22d3ee]/18 border-[#22d3ee]/30'
                        } ${isLight ? '!text-slate-900' : 'text-white/90'}`
                      : `max-w-[85%] rounded-2xl px-3 py-2 border ${
                          isLight ? 'bg-white/70 border-slate-900/10' : 'bg-white/5 border-white/10'
                        } ${isLight ? '!text-slate-900' : 'text-white/85'}`
                  }
                >
                  <div className={`text-[13px] leading-relaxed whitespace-pre-wrap ${isLight ? '!text-slate-900' : ''}`}>{m.text}</div>
                </div>
              </div>
            ))}

            {busy && (
              <div className="flex justify-start">
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 border text-[13px] ${
                  isLight ? 'bg-white/70 border-slate-900/10 text-slate-700' : 'bg-white/5 border-white/10 text-white/70'
                }`}>
                  schreibt…
                </div>
              </div>
            )}
          </div>

          <div className={`px-3 py-3 border-t ${isLight ? 'border-slate-900/10' : 'border-white/10'}`}>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
                placeholder="Nachricht schreiben…"
                className={`flex-1 rounded-xl border px-3 py-2 text-[13px] ${
                  isLight ? 'border-slate-900/10 bg-white/80 text-slate-900 placeholder:text-slate-500' : 'border-white/10 bg-white/5 text-white/90 placeholder:text-white/40'
                } outline-none focus:border-[#22d3ee]/50`}
              />
              <button
                type="button"
                onClick={send}
                disabled={!canSend}
                className={`rounded-xl px-3 py-2 text-[13px] font-semibold border border-[#22d3ee]/30 bg-[#22d3ee]/18 ${
                  isLight ? 'text-slate-900' : 'text-white/90'
                } disabled:opacity-40`}
              >
                Senden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}