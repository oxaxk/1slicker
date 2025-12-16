import React, { useEffect, useState } from 'react';
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [time, setTime] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    const readTheme = () => {
      const t = document.documentElement.getAttribute('data-theme');
      setIsDark(t !== 'light');
    };

    readTheme();

    const mo = new MutationObserver(readTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let frameId: number;
    const animate = () => {
      setTime((prev) => (prev + 0.016) % (Math.PI * 2));
      frameId = window.requestAnimationFrame(animate);
    };
    frameId = window.requestAnimationFrame(animate);

    return () => {
      mo.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'var(--page-bg)',
        color: 'var(--page-fg)'
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        {GLOWS.map((glow, index) => {
          const waveX = Math.sin(time * (0.35 + index * 0.3)) * 6;
          const waveY = Math.cos(time * (0.55 + index * 0.26)) * 8;

          const minTop = -20;
          const maxTop = 140;
          const range = maxTop - minTop;

          let animatedTop = glow.baseTop + scrollY * glow.scrollSpeed;

          while (animatedTop < minTop) animatedTop += range;
          while (animatedTop >= maxTop) animatedTop -= range;

          const offsetX = mousePos.x * glow.mouseFactor + waveX;
          const offsetY = mousePos.y * glow.mouseFactor + waveY;

          return (
            <div
              key={glow.id}
              className="absolute rounded-full"
              style={{
                top: `${animatedTop}%`,
                left: glow.left,
                width: glow.size,
                height: glow.size,
                background: isDark ? glow.darkColor : glow.lightColor,
                opacity: isDark ? glow.darkOpacity : glow.lightOpacity,
                filter: 'blur(70px)',
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
                transition: 'transform 900ms ease-out, opacity 900ms ease-out',
                mixBlendMode: isDark ? 'screen' : 'multiply'
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProcessSection />
          <TestimonialsSection />
          <TeamSection />
          <SpecialsSection />
          <ContactSection />
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </div>
  );
};

export default Home;