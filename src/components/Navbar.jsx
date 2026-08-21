import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
const textlogo = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>?/';

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-150 border-b border-[rgba(212,175,55,0.14)] shadow-[inset_0_1px_0_0_rgba(212,175,55,0.2),0_0_20px_rgba(212,175,55,0.05)]"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65536%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-10">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Xaloris Logo" className="w-9 h-9 object-contain rounded-lg duration-300" />
        </a>

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

        <div className="flex items-center gap-4 shrink-0">
          <button className="brushed-metal px-6 py-2 min-w-[88px] rounded-full text-white font-sans font-bold text-[12px] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-95 whitespace-nowrap inline-flex items-center justify-center gold-glow">
            Login
          </button>
          <button className="px-6 py-2 min-w-[120px] rounded-full bg-white/10 backdrop-blur-lg text-white font-sans font-bold text-[12px] uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:bg-white/15 hover:scale-[1.03] active:scale-95 whitespace-nowrap inline-flex items-center justify-center">
            Get Started
          </button>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between gap-3 px-6 h-14">
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

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#070b0a]/90 backdrop-blur-xl flex flex-col justify-between p-6 md:hidden animate-fade-in">
          <div className="flex items-center justify-between h-28">
            <a href="#" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
              <img src={logo} alt="Xaloris Logo" className="w-9 h-9 object-contain rounded-lg" />
              <img src={textlogo} alt="Xaloris" className="h-9 object-contain" />
            </a>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white focus:outline-none"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

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

          <div className="text-center text-xs text-gray-600 font-sans tracking-widest pb-6">
            © 2026 PROJECT X. ALL RIGHTS RESERVED.
            A TrustHack product.
          </div>
        </div>
      )}
    </header>
  );
}
