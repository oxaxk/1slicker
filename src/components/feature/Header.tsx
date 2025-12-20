import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const Icon = ({ name, className }: { name: 'whatsapp' | 'mail' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'moon' | 'sun' | 'menu' | 'close' | 'phone' | 'arrowDown'; className?: string }) => {
    const common = {
      viewBox: '0 0 24 24',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className
    } as const;

    switch (name) {
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
            <path d="M8.5 3.5h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M7 5.5c0 8.3 3.2 11.5 11.5 11.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 8.2c.8-1.1 1.6-1.6 2.6-1.1l1.2.6c.9.4 1.1 1 .7 1.8l-.5 1c-.4.8-.2 1.6.6 2.7.9 1.1 1.7 1.9 2.7 2.7 1.1.8 1.9 1 2.7.6l1-.5c.8-.4 1.4-.2 1.8.7l.6 1.2c.5 1-.1 1.8-1.1 2.6-.8.6-1.9.9-3.1.6-2.1-.5-4.6-2-7.2-4.6C5.5 13.8 4 11.3 3.4 9.2c-.3-1.2 0-2.3.6-3.1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        );
      case 'arrowDown':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="m6 13 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'sun':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.6 3.6M20.4 20.4 19 19M19 5l1.4-1.4M3.6 20.4 5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        );
      case 'moon':
        return (
          <svg {...common} aria-hidden="true">
            <path
              d="M20.5 15.2A8.6 8.6 0 0 1 11.1 3.8a.8.8 0 0 0-1.1-.9A9.2 9.2 0 1 0 22.1 16a.8.8 0 0 0-1.6-.8Z"
              fill="currentColor"
              opacity="0.92"
            />
            <path
              d="M15.4 4.6a7 7 0 0 0 4.2 6.6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>
        );
      case 'menu':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        );
      case 'close':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg {...common} aria-hidden="true">
            <path
              d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L4 20.6l4.4-1.2A8.5 8.5 0 1 0 12 3.5Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M9.1 9.2c.2-.4.5-.5.9-.5h.6c.3 0 .5.1.6.4l.7 1.8c.1.3 0 .5-.1.7l-.5.5c-.2.2-.2.5 0 .8.6 1 1.4 1.8 2.4 2.4.3.2.6.2.8 0l.5-.5c.2-.2.5-.2.7-.1l1.8.7c.3.1.4.3.4.6v.6c0 .4-.2.7-.6.9-.7.3-2 .6-4.2-.4-2.1-1-3.9-2.7-4.9-4.9-1-2.2-.7-3.5-.4-4.2Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        );
      case 'tiktok':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M14 4c.6 2.2 2.4 3.8 4.7 4v3.1c-1.8-.1-3.4-.8-4.7-1.9V15a5 5 0 1 1-4.3-4.9v3.3a2 2 0 1 0 1.3 1.9V4h3Z" fill="currentColor" />
          </svg>
        );
      case 'instagram':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        );
      case 'facebook':
        return (
          <svg {...common} aria-hidden="true">
            <path d="M14 8h2V5h-2c-2 0-3.5 1.6-3.5 3.6V11H8v3h2.5v7H14v-7h2.5l.5-3H14V9c0-.6.3-1 1-1Z" fill="currentColor" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg {...common} aria-hidden="true">
            <path
              d="M6.8 10.2V18.6"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
            <path
              d="M6.8 7.2h.01"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M10.4 18.6v-4.8c0-1.8 1.1-3.1 2.9-3.1 1.7 0 2.5 1.1 2.5 3v4.9"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 18.6v-8.4"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const socialsBtnRef = useRef<HTMLButtonElement | null>(null);
  const [socialsPos, setSocialsPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const lastY = lastScrollYRef.current;
      const THRESHOLD = 10;

      if (Math.abs(currentY - lastY) < THRESHOLD) {
        return;
      }

      if (currentY > lastY && currentY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const storedTheme = window.localStorage.getItem('slicker-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setIsDarkMode(storedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', storedTheme);
      return;
    }

    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = prefersDark ? 'dark' : 'light';

    setIsDarkMode(initialTheme === 'dark');
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const scrollToHash = () => {
      const raw = window.location.hash || '';
      const id = raw.startsWith('#') ? raw.slice(1) : raw;
      if (!id) return;

      const targetId = decodeURIComponent(id);

      let attempts = 0;
      const maxAttempts = 20; // ~2s

      const tryScroll = () => {
        const el =
          document.getElementById(targetId) ||
          document.querySelector(`#${CSS.escape(targetId)}`) ||
          document.querySelector(`[data-section="${CSS.escape(targetId)}"]`) ||
          document.querySelector(`[data-anchor="${CSS.escape(targetId)}"]`);
        if (el instanceof HTMLElement) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setIsMenuOpen(false);
          setIsSocialsOpen(false);
          return;
        }

        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(tryScroll, 100);
        }
      };

      // Try immediately, then retry while the homepage mounts
      tryScroll();
    };

    // run on first load (e.g. after hard navigation to /#kontakt)
    scrollToHash();

    // also run on hash changes
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  useEffect(() => {
    if (!isSocialsOpen) {
      setSocialsPos(null);
      return;
    }
    if (typeof window === 'undefined') return;

    const update = () => {
      const btn = socialsBtnRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      // dropdown aligned to button right edge
      setSocialsPos({
        top: r.bottom + 12,
        left: Math.max(12, r.right - 240) // 240 ~ dropdown width
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [isSocialsOpen]);

  useEffect(() => {
    if (!isMenuOpen && !isSocialsOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (headerRef.current && target && !headerRef.current.contains(target)) {
        setIsMenuOpen(false);
        setIsSocialsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen, isSocialsOpen]);

  const toggleTheme = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    setIsDarkMode((prev) => {
      const nextIsDark = !prev;
      const nextTheme: 'dark' | 'light' = nextIsDark ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', nextTheme);
      window.localStorage.setItem('slicker-theme', nextTheme);

      return nextIsDark;
    });
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsSocialsOpen(false);
  };

  const handleContactButtonClick = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    // If we are not on the homepage, navigate to /#kontakt
    if (window.location.pathname !== '/') {
      window.location.assign('/#kontakt');
      return;
    }

    const target = document.querySelector('#kontakt');
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setIsMenuOpen(false);
    setIsSocialsOpen(false);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    // Always hard-navigate to the homepage
    window.location.assign('/');
  };

  const handleSmoothNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const [path, hash] = href.split('#');

    // Wenn ein echter Seitenwechsel notwendig ist (z. B. /faq), Browser normal arbeiten lassen
    if (!hash || (path && path !== '' && path !== '/')) {
      return;
    }

    event.preventDefault();

    const targetElement = document.getElementById(hash);

    // If the section isn't in the current DOM (e.g., we are on /impressum), navigate to /#hash
    if (!targetElement) {
      window.location.assign(`/#${hash}`);
      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setIsMenuOpen(false);
    setIsSocialsOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 max-w-6xl w-[95%] z-50 transition-transform duration-300 ${
        isHidden ? '-translate-y-[200%]' : 'translate-y-0'
      }`}
      role="banner"
      aria-label="Hauptnavigation"
    >
      <div
        className="relative w-full pl-5 pr-6 md:pl-7 md:pr-10 lg:pr-12 py-4 flex items-center justify-between gap-3 md:gap-6 backdrop-blur-2xl border border-white/10 rounded-full overflow-visible bg-[var(--section-glass)] dark:bg-black/35 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
      >
        {/* Logo */}
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center"
          aria-label="Startseite"
        >
          <div className="flex items-center gap-3">
            <img
              src={isDarkMode ? '/images/logo.png' : '/images/logo_dark.png'}
              alt="Slicker Logo"
              className="w-10 h-10 md:w-11 md:h-11 shrink-0 object-contain drop-shadow-[0_0_18px_rgba(56,224,255,0.4)]"
              draggable={false}
            />
            <div
              className="hidden md:block text-3xl md:text-4xl font-light uppercase whitespace-nowrap"
              role="heading"
              aria-level={2}
              style={{
                color: 'var(--page-fg)',
                letterSpacing: '0.26em'
              }}
            >
              {'SLICKER'.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-all duration-200 hover:text-[#38e0ff] hover:drop-shadow-[0_0_20px_rgba(56,224,255,1)]"
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* Navigation + Controls */}
        <div className="flex items-center ml-auto gap-2 lg:gap-4">
          {/* Desktop: Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm md:text-[15px] tracking-[0.12em] uppercase">
            <a
              href="/#about"
              onClick={(e) => handleSmoothNavClick(e, '/#about')}
              className="nav-link text-white/80 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="/#expertise"
              onClick={(e) => handleSmoothNavClick(e, '/#expertise')}
              className="nav-link text-white/80 hover:text-white transition-colors"
            >
              Expertise
            </a>
            <a
              href="/#projekte"
              onClick={(e) => handleSmoothNavClick(e, '/#projekte')}
              className="nav-link text-white/80 hover:text-white transition-colors"
            >
              Projekte
            </a>
            <a
              href="/#blog"
              onClick={(e) => handleSmoothNavClick(e, '/#blog')}
              className="nav-link text-white/80 hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="/#kontakt"
              onClick={(e) => handleSmoothNavClick(e, '/#kontakt')}
              className="nav-link text-white hover:text-cyan-300 transition-colors"
            >
              Kontakt
            </a>
            <div
              className="relative"
              onMouseEnter={() => setIsSocialsOpen(true)}
              onMouseLeave={() => setIsSocialsOpen(false)}
            >
              <button
                ref={socialsBtnRef}
                type="button"
                className="nav-link text-white/80 hover:text-[#22d3ee] transition-colors uppercase tracking-[0.12em]"
                onClick={() => setIsSocialsOpen((v) => !v)}
              >
                Socials
              </button>
            </div>
          </nav>

          {/* Desktop: Theme + FAQ rechts vom Menü */}
          <div className="hidden lg:flex items-center gap-2 ml-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:border-[#22d3ee] hover:bg-white/10 hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] text-white text-sm transition-colors duration-150"
            >
              <span className="relative w-[18px] h-[18px] flex items-center justify-center">
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform pointer-events-none ${
                    isDarkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
                  }`}
                >
                  <Icon name="moon" className="w-[18px] h-[18px]" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform pointer-events-none ${
                    isDarkMode ? 'opacity-0 scale-75 -rotate-90' : 'opacity-100 scale-100 rotate-0'
                  }`}
                >
                  <Icon name="sun" className="w-[18px] h-[18px]" />
                </span>
              </span>
            </button>
            <a
              href="/#faq"
              aria-label="FAQ"
              onClick={(e) => handleSmoothNavClick(e, '/#faq')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:border-[#22d3ee] hover:bg-white/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.8)] text-white text-sm transition-colors duration-150"
            >
              ?
            </a>
          </div>

          {/* Mobile: Theme + FAQ + Burger in einer Reihe */}
          <div className="flex items-center gap-2 ml-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:border-[#22d3ee] hover:bg-white/10 hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] text-white text-sm transition-colors duration-150"
            >
              <span className="relative w-[18px] h-[18px] flex items-center justify-center">
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform pointer-events-none ${
                    isDarkMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90'
                  }`}
                >
                  <Icon name="moon" className="w-[18px] h-[18px]" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out will-change-transform pointer-events-none ${
                    isDarkMode ? 'opacity-0 scale-75 -rotate-90' : 'opacity-100 scale-100 rotate-0'
                  }`}
                >
                  <Icon name="sun" className="w-[18px] h-[18px]" />
                </span>
              </span>
            </button>
            <a
              href="/#faq"
              aria-label="FAQ"
              onClick={(e) => handleSmoothNavClick(e, '/#faq')}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:border-[#22d3ee] hover:bg-white/10 hover:shadow-[0_0_16px_rgba(34,211,238,0.8)] text-white text-sm transition-colors duration-150"
            >
              ?
            </a>
            <button
              id="mobileMenuToggle"
              type="button"
              className="w-10 h-10 flex items-center justify-center text-white mr-1 rounded-full border border-white/25 bg-[var(--card-glass)] hover:bg-white/10 hover:border-[#22d3ee] hover:shadow-[0_0_26px_rgba(34,211,238,0.9)] transition-all duration-200"
              aria-label="Menü öffnen"
              aria-expanded={isMenuOpen}
              aria-controls="mobileMenu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <span className="relative w-5 h-5 flex items-center justify-center">
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out pointer-events-none ${
                    isMenuOpen ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'
                  }`}
                >
                  <Icon name="menu" className="w-5 h-5" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out pointer-events-none ${
                    isMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'
                  }`}
                >
                  <Icon name="close" className="w-5 h-5" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      {isSocialsOpen && socialsPos &&
        createPortal(
          <div
            className="fixed z-[9999]"
            style={{ top: socialsPos.top, left: socialsPos.left }}
            onMouseEnter={() => setIsSocialsOpen(true)}
            onMouseLeave={() => setIsSocialsOpen(false)}
          >
            <div className="rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_18px_40px_rgba(15,23,42,0.9)] px-4 py-3">
              <div className="flex gap-2">
                <a
                  href="https://wa.me/4915511207431"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366] hover:shadow-[0_0_14px_rgba(37,211,102,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="whatsapp" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="mailto:info@slicker.agency"
                  aria-label="E-Mail"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#22d3ee]/18 hover:border-[#22d3ee] hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="mail" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#ff0050]/18 hover:border-[#ff0050] hover:shadow-[0_0_14px_rgba(255,0,80,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="tiktok" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#E1306C]/18 hover:border-[#E1306C] hover:shadow-[0_0_14px_rgba(225,48,108,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="instagram" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#1877F2]/18 hover:border-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="facebook" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#0A66C2]/18 hover:border-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="linkedin" className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Mobile Dropdown Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden mt-3 mr-4 ml-auto w-[260px] rounded-2xl bg-[var(--section-glass)] dark:bg-black/35 backdrop-blur-2xl border border-[rgba(15,23,42,0.14)] dark:border-white/15 shadow-[0_18px_40px_rgba(15,23,42,0.16)] transform transition-transform duration-200">
          <div className="flex items-start justify-between px-4 pt-3 pb-2">
            <ul className="flex-1 flex flex-col gap-2 text-sm tracking-[0.12em] uppercase">
              <li>
                <a
                  href="/#about"
                  className="block pl-4 pr-2 py-1.5 text-white/80 hover:text-[#22d3ee] transition-colors duration-150"
                  onClick={(e) => handleSmoothNavClick(e, '/#about')}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#expertise"
                  className="block pl-4 pr-2 py-1.5 text-white/80 hover:text-[#22d3ee] transition-colors duration-150"
                  onClick={(e) => handleSmoothNavClick(e, '/#expertise')}
                >
                  Expertise
                </a>
              </li>
              <li>
                <a
                  href="/#projekte"
                  className="block pl-4 pr-2 py-1.5 text-white/80 hover:text-[#22d3ee] transition-colors duration-150"
                  onClick={(e) => handleSmoothNavClick(e, '/#projekte')}
                >
                  Projekte
                </a>
              </li>
              <li>
                <a
                  href="/#blog"
                  className="block pl-4 pr-2 py-1.5 text-white/80 hover:text-[#22d3ee] transition-colors duration-150"
                  onClick={(e) => handleSmoothNavClick(e, '/#blog')}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/#kontakt"
                  className="block pl-4 pr-2 py-1.5 text-white/90 hover:text-[#22d3ee] transition-colors duration-150"
                  onClick={(e) => handleSmoothNavClick(e, '/#kontakt')}
                >
                  Kontakt
                </a>
              </li>
            </ul>

            <div className="flex flex-col items-end gap-2 pl-2">
              <div className="flex flex-wrap justify-end gap-2 max-w-[150px]">
                <a
                  href="https://wa.me/4915511207431"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366] hover:shadow-[0_0_14px_rgba(37,211,102,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="whatsapp" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="mailto:info@slicker.agency"
                  aria-label="E-Mail"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#22d3ee]/18 hover:border-[#22d3ee] hover:shadow-[0_0_14px_rgba(34,211,238,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="mail" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#ff0050]/18 hover:border-[#ff0050] hover:shadow-[0_0_14px_rgba(255,0,80,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="tiktok" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#E1306C]/18 hover:border-[#E1306C] hover:shadow-[0_0_14px_rgba(225,48,108,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="instagram" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#1877F2]/18 hover:border-[#1877F2] hover:shadow-[0_0_14px_rgba(24,119,242,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="facebook" className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 hover:bg-[#0A66C2]/18 hover:border-[#0A66C2] hover:shadow-[0_0_14px_rgba(10,102,194,0.9)] text-white text-sm transition-colors duration-150"
                >
                  <Icon name="linkedin" className="w-[18px] h-[18px]" />
                </a>
                <button
                  type="button"
                  onClick={handleContactButtonClick}
                  aria-label="Kontaktbereich anzeigen"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.16)] dark:border-[#22d3ee] bg-[var(--card-glass)] dark:bg-[#22d3ee]/15 hover:bg-[rgba(8,145,178,0.26)] dark:hover:bg-[#22d3ee]/25 text-[color:var(--page-fg)] dark:text-[#e0fbff] shadow-[0_0_14px_rgba(34,211,238,0.45)] text-sm transition-colors duration-150"
                >
                  <Icon name="arrowDown" className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
