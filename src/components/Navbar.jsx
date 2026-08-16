import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
// textlogo.png was removed from src/assets/, so we fall back to a transparent
// 1x1 placeholder. The original mobile overlay referenced this asset.
const textlogo = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Random charset used during the scramble pass — shared shape with the
// GetStarted section so the same glitch language is used across the site.
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>?/';

// scrambleTo: randomize each char of `target`, then settle each char in
// left-to-right. Returns a cancel function. Mirrors GetStarted.jsx.
function scrambleTo(target, onTick, duration = 450) {
  const length = target.length;
  const start = performance.now();
  let rafId;
  const locked = new Array(length).fill(false);
  const offsets = Array.from({ length }, () => Math.random() * 0.55);

  function frame(now) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    let out = '';
    for (let i = 0; i < length; i += 1) {
      const revealAt = offsets[i];
      if (t > revealAt + 0.3 || locked[i]) {
        locked[i] = true;
        out += target[i];
      } else {
        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    onTick(out);
    if (t < 1) {
      rafId = requestAnimationFrame(frame);
    } else {
      onTick(target);
    }
  }

  rafId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(rafId);
}

// ScrambleText: a button/span that runs the scramble animation on hover
// (then locks to the real text on mouse leave so it doesn't re-scramble).
// The scramble is brief (~450ms) so it reads as a "data wipe" flicker on
// the label rather than a permanent effect.
function ScrambleText({ text, className = '' }) {
  const [displayed, setDisplayed] = useState(text);
  const cancelRef = useRef(null);

  function run() {
    if (cancelRef.current) cancelRef.current();
    cancelRef.current = scrambleTo(text, setDisplayed, 450);
  }

  return (
    <span onMouseEnter={run} className={className}>
      {displayed}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Hide-on-scroll-down / show-on-scroll-up. Uses the Lenis instance if
  // available (window.__lenis), falls back to native scroll events.
  // - lastY: ref so we don't re-render on every wheel tick
  // - visible: only this triggers a re-render (cheap)
  const lastYRef = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const NEAR_TOP = 24; // force visible when close to top
    const DELTA = 6; // ignore micro-scrolls

    function handleScroll() {
      const y = window.scrollY;
      const delta = y - lastYRef.current;

      if (y < NEAR_TOP) {
        setVisible(true);
      } else if (delta > DELTA) {
        // scrolling down
        setVisible(false);
      } else if (delta < -DELTA) {
        // scrolling up
        setVisible(true);
      }

      lastYRef.current = y;
    }

    // Prefer Lenis scroll event (subscribes to its internal RAF-driven scroll)
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (lenis && typeof lenis.on === 'function') {
      lenis.on('scroll', handleScroll);
      return () => {
        if (typeof lenis.off === 'function') lenis.off('scroll', handleScroll);
      };
    }

    // Fallback for environments without Lenis
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
  className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50
               bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-150
               border border-[rgba(212,175,55,0.14)] rounded-full overflow-hidden
               w-max max-w-[98vw]
               shadow-[inset_0_1px_0_0_rgba(212,175,55,0.2),0_0_20px_rgba(212,175,55,0.05)]
               transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
               ${visible ? 'translate-y-0' : '-translate-y-[150px]'}`}
>
  {/* Grainy Texture Overlay - very subtle now */}
  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65536%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

  <div className="max-w-fit mx-auto px-8 h-14 flex items-center justify-between relative z-10 gap-[22rem]">
    {/* Minimalist White Logo — locked size so it doesn't shrink or disappear */}
    <a href="#" className="flex items-center gap-2 shrink-0">
      <img src={logo} alt="Xaloris Logo" className="w-9 h-9 object-contain rounded-lg duration-300" />
      {/* textlogo removed (per request) */}
    </a>

    {/* Desktop Menu: Compact Navigation — each label scrambles on hover. */}
    <nav className="hidden md:flex items-center">
      <div className="flex items-center gap-12">
        <a
          href="#download"
          className="text-[13px] text-gray-400 font-sans font-bold uppercase tracking-widest transition-colors duration-300 hover:text-white inline-flex"
        >
          <ScrambleText text="DOWNLOAD" />
        </a>
        <a
          href="#pricing"
          className="text-[13px] text-gray-400 font-sans font-bold uppercase tracking-widest transition-colors duration-300 hover:text-white inline-flex"
        >
          <ScrambleText text="PRICING" />
        </a>
        <a
          href="#about"
          className="text-[13px] text-gray-400 font-sans font-bold uppercase tracking-widest transition-colors duration-300 hover:text-white inline-flex"
        >
          <ScrambleText text="ABOUT" />
        </a>
      </div>
    </nav>

    {/* Action Buttons - Compact and Refined, persistent across breakpoints.
        Each label scrambles on hover. min-w locks the button width so the
        scramble text can't resize the button during the animation. */}
    <div className="flex items-center gap-4 shrink-0">
      <button className="brushed-metal px-6 py-2 min-w-[88px] rounded-full text-white font-sans font-bold text-[12px] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-95 whitespace-nowrap inline-flex items-center justify-center gold-glow">
        <ScrambleText text="Login" />
      </button>
      <button className="px-6 py-2 min-w-[120px] rounded-full bg-white/10 backdrop-blur-lg text-white font-sans font-bold text-[12px] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-white/15 hover:scale-[1.03] active:scale-95 whitespace-nowrap inline-flex items-center justify-center">
        <ScrambleText text="Get Started" />
      </button>
    </div>
  </div>

  {/* Hamburger Menu (Mobile) — pill shrinks to (logo + hamburger) on small screens */}
  <div className="md:hidden flex items-center justify-between gap-3 px-6 h-1 w-full">
    <a href="#" className="flex items-center gap-2 shrink-0">
      <img src={logo} alt="Xaloris Logo" className="w-9 h-9 object-contain rounded-lg duration-300" />
    </a>
    <button
      onClick={() => setIsOpen(true)}
      className="p-2 text-white focus:outline-none"
      aria-label="Open navigation menu"
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>

  {/* Full-screen dark overlay menu for Mobile */}
  {isOpen && (
    <div className="fixed inset-0 z-50 bg-[#070b0a]/90 backdrop-blur-xl flex flex-col justify-between p-6 md:hidden animate-fade-in">
      <div className="flex items-center justify-between h-28">
        {/* Logo inside mobile overlay */}
        <a href="#" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Xaloris Logo" className="w-9 h-9 object-contain rounded-lg" />
          <img src={textlogo} alt="Xaloris" className="h-9 object-contain" />
        </a>

        {/* Close button with X icon */}
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 text-white focus:outline-none"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Centered navigation links list */}
      <nav className="flex flex-col items-center justify-center gap-10 flex-1 py-12">
        <a
          href="#download"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-gray-200 font-sans uppercase tracking-[0.2em]"
        >
          <ScrambleText text="DOWNLOAD" />
        </a>
        <a
          href="#pricing"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-gray-200 font-sans uppercase tracking-[0.2em]"
        >
          <ScrambleText text="PRICING" />
        </a>
        <a
          href="#about"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold text-gray-200 font-sans uppercase tracking-[0.2em]"
        >
          <ScrambleText text="ABOUT" />
        </a>
      </nav>

      {/* Overlay Footer */}
      <div className="text-center text-xs text-gray-600 font-sans tracking-widest pb-6">
        © 2026 PROJECT X. ALL RIGHTS RESERVED.
        A TrustHack product.
      </div>
    </div>
  )}
</header>
  );
}