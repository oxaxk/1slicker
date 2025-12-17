import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import TeamSection from './components/TeamSection';
import SpecialsSection from './components/SpecialsSection';
import ContactSection from './components/ContactSection';

import CookieBanner from '../../components/feature/CookieBanner';

const GLOWS = [
  {
    id: 'g1',
    baseTop: -8,
    left: '-18%',
    size: 150,
    darkColor: 'rgba(56, 189, 248, 0.5)',
    lightColor: 'rgba(34, 211, 238, 0.22)',
    darkOpacity: 0.9,
    lightOpacity: 0.75,
    mouseFactor: 8,
    scrollSpeed: -0.095
  },
  {
    id: 'g2',
    baseTop: 22,
    left: '106%',
    size: 150,
    darkColor: 'rgba(56, 189, 248, 0.46)',
    lightColor: 'rgba(34, 211, 238, 0.22)',
    darkOpacity: 0.9,
    lightOpacity: 0.75,
    mouseFactor: -9,
    scrollSpeed: -0.1
  },
  {
    id: 'g3',
    baseTop: 58,
    left: '-20%',
    size: 160,
    darkColor: 'rgba(56, 189, 248, 0.44)',
    lightColor: 'rgba(34, 211, 238, 0.22)',
    darkOpacity: 0.9,
    lightOpacity: 0.75,
    mouseFactor: 9,
    scrollSpeed: -0.11
  },
  {
    id: 'g4',
    baseTop: 96,
    left: '110%',
    size: 160,
    darkColor: 'rgba(56, 189, 248, 0.48)',
    lightColor: 'rgba(34, 211, 238, 0.22)',
    darkOpacity: 0.9,
    lightOpacity: 0.75,
    mouseFactor: -8,
    scrollSpeed: -0.105
  }
];

const Home: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const isDarkRef = useRef(true);

  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const timeRef = useRef(0);

  const glowEls = useRef<(HTMLDivElement | null)[]>([]);
  const glowCount = useMemo(() => GLOWS.length, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      mouseRef.current = { x, y };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY || 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    const readTheme = () => {
      const t = document.documentElement.getAttribute('data-theme');
      const nextIsDark = t !== 'light';
      isDarkRef.current = nextIsDark;
      setIsDark(nextIsDark);
    };

    readTheme();

    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let frameId: number;
    const animate = () => {
      // advance time
      timeRef.current = (timeRef.current + 0.016) % (Math.PI * 2);

      const time = timeRef.current;
      const scrollY = scrollRef.current;
      const mouse = mouseRef.current;
      const dark = isDarkRef.current;

      const minTop = -20;
      const maxTop = 140;
      const range = maxTop - minTop;

      for (let index = 0; index < glowCount; index++) {
        const glow = GLOWS[index];
        const el = glowEls.current[index];
        if (!el) continue;

        const waveX = Math.sin(time * (0.35 + index * 0.3)) * 6;
        const waveY = Math.cos(time * (0.55 + index * 0.26)) * 8;

        let animatedTop = glow.baseTop + scrollY * glow.scrollSpeed;
        while (animatedTop < minTop) animatedTop += range;
        while (animatedTop >= maxTop) animatedTop -= range;

        const offsetX = mouse.x * glow.mouseFactor + waveX;
        const offsetY = mouse.y * glow.mouseFactor + waveY;

        el.style.top = `${animatedTop}%`;
        el.style.background = dark ? glow.darkColor : glow.lightColor;
        el.style.opacity = String(dark ? glow.darkOpacity : glow.lightOpacity);
        el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        el.style.mixBlendMode = dark ? 'screen' : 'multiply';
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      mo.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [glowCount]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'var(--page-bg)',
        color: 'var(--page-fg)'
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        {GLOWS.map((glow, index) => (
          <div
            key={glow.id}
            ref={(el) => {
              glowEls.current[index] = el;
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              top: `${glow.baseTop}%`,
              left: glow.left,
              width: glow.size,
              height: glow.size,
              background: isDark ? glow.darkColor : glow.lightColor,
              opacity: isDark ? glow.darkOpacity : glow.lightOpacity,
              filter: 'blur(70px)',
              transform: 'translate3d(0,0,0)',
              transition: 'opacity 300ms ease-out'
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <section id="top" data-section="top">
            <HeroSection />
          </section>

          <section id="about" data-section="about">
            <AboutSection />
          </section>

          <section id="expertise" data-section="expertise">
            <ServicesSection />
          </section>

          <section id="projekte" data-section="projekte">
            <ProcessSection />
          </section>

          <section id="blog" data-section="blog">
            <TestimonialsSection />
          </section>

          <section id="team" data-section="team">
            <TeamSection />
          </section>

          <section id="specials" data-section="specials">
            <SpecialsSection />
          </section>

          <section id="kontakt" data-section="kontakt">
            <ContactSection />
          </section>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </div>
  );
};

export default Home;
