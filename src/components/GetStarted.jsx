import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

const styles = {
  goldText: 'text-[#D4AF37]',
};

// Random charset used during the scramble pass.
const SCRAMBLE_CHARS = 'ABCMOQRSTUVWX#$%&<>?/';

// Scramble a target word in-place over `duration` ms, returning a stop()
// function. Each frame picks a random unrevealed position and assigns it
// either a random char or the real char based on per-letter offsets, so
// the word appears to "lock in" from left to right while the rest keeps
// flickering.
function scrambleTo(target, onTick, duration = 600) {
  const length = target.length;
  const start = performance.now();
  let rafId;
  let locked = new Array(length).fill(false);
  const offsets = Array.from({ length }, () => Math.random() * 0.6);

  function frame(now) {
    const elapsed = now - start;
    const t = Math.min(1, elapsed / duration);
    let out = '';
    for (let i = 0; i < length; i += 1) {
      const revealAt = offsets[i];
      if (t > revealAt + 0.25 || locked[i]) {
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

export default function Download() {
  const items = useMemo(
    () => [
      'Investigators',
      'Intelligence',
      'Discovery',
      'Truth Seekers',
      'Analysts',
      'OSINT Professionals',
      'Journalists',
      'Threat Hunters',
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tick, setTick] = useState(false);

  // Scramble text state — current displayed (scrambled) string.
  const [displayed, setDisplayed] = useState(items[0]);
  const cancelScrambleRef = useRef(null);

  // Run a scramble on every index change, then pause before cycling.
  useEffect(() => {
    const full = items[index];
    setDisplayed(full);
    let cancelled = false;

    const tStart = setTimeout(() => {
      if (cancelled) return;
      setGlitchKey((k) => k + 1);
      cancelScrambleRef.current = scrambleTo(full, (v) => {
        if (!cancelled) setDisplayed(v);
      }, 650);
    }, 60);

    const tNext = setTimeout(() => {
      if (cancelled) return;
      setIndex((prev) => (prev + 1) % items.length);
    }, 2200); // total visible time per word

    return () => {
      cancelled = true;
      clearTimeout(tStart);
      clearTimeout(tNext);
      if (cancelScrambleRef.current) cancelScrambleRef.current();
    };
  }, [index, items]);

  const command = 'curl -fsSL https://xaloris.ai/install.sh | bash';

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setTick(true);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setTick(false);
      }, 900);
    } catch (e) {
      setCopied(false);
      setTick(false);
    }
  }

return (
    <section
      id="download"
className="relative bg-black text-white py-24 overflow-hidden" style={{ backgroundColor: '#000000' }}
      aria-label="Get started"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(212,175,55,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.18) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(60%_50%_at_50%_50%,rgba(212,175,55,0.12),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl flex flex-col items-start md:items-center mx-auto text-left md:text-center">
          <div className="flex items-baseline justify-center gap-3">
            <h2 className="font-sans font-extrabold text-white text-[26px] md:text-[44px] uppercase tracking-tight">
              Build for {'>'}
            </h2>

            {/* Gold shimmer word — uses gold-text-shimmer for a luxurious
                metallic gradient that flows across the text. No glitch,
                no RGB-split — pure premium gold. */}
            <div
              className="relative inline-block min-h-[44px]"
              style={{ fontFamily: '"Instrument Serif", "Times New Roman", serif', fontStyle: 'bold', fontWeight: 0 }}
            >
              {/* Main visible layer — gold shimmer */}
              <span
                className={`relative text-[26px] md:text-[44px] tracking-tight gold-text-shimmer inline-block leading-none`}
                style={{ fontFamily: '"Instrument Serif", "Times New Roman", serif', fontStyle: '', fontWeight:0}}
              >
                {displayed}
                <span
                  aria-hidden
                  className="inline-block ml-[2px] w-[2px] h-[1em] align-[-0.05em] bg-[#D4AF37] rounded-sm opacity-80"
                  style={{ animation: 'blink 1s steps(2, end) infinite' }}
                />
              </span>
            </div>
          </div>

          <p className="mt-6 text-white/80 text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
            Access XALORIS directly from your workflow. Investigate, correlate, and uncover intelligence faster with AI-powered OSINT built for modern research and analysis.
          </p>

          <div className="mt-10">
            {/* Install command shell — black-on-black hairline instead of
                white outline, so the box blends into the section instead of
                pulling focus away from the rotating word. */}
            <div className="group relative rounded-[1.5rem] bg-black/80 border border-black shadow-[inset_0_0_0_1px_rgba(212,175,55,0.12),0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    'linear-gradient(137deg, rgba(212,175,55,0.2) 0%, rgba(176,141,87,0.10) 45%, rgba(212,175,55,0.08) 100%)',
                }}
              />

              <div className="relative p-4 md:p-5">
                <div className="relative rounded-2xl bg-black/80 border border-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] px-4 md:px-5 py-4 md:py-5 flex items-center gap-3">
                  <code className="flex-1 block break-all text-white/90 font-mono text-[13px] leading-relaxed">
                    {command}
                  </code>

                  <button
                    type="button"
                    onClick={onCopy}
                    aria-label="Copy install command"
                    title="Copy"
                    className="shrink-0 h-10 md:h-11 px-6 rounded-[999px] border border-white/15 bg-white/[0.05] hover:bg-white/[0.08] transition-all duration-300 flex items-center justify-center"
                  >
                    {tick ? (
                      <span className="inline-flex items-center justify-center animate-[tickPop_600ms_ease-out]">
                        <Check className="w-4 h-4 text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.55)]" />
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-white/55 text-[12px] leading-relaxed max-w-2xl text-center md:text-center">
            <span className="text-white/70 font-bold">AI can be wrong.</span>{' '}
            While XALORIS strives to provide accurate and reliable intelligence, results may contain errors, omissions, or misinterpretations. Always verify important findings through independent sources before making decisions or taking action.
          </div>
        </div>
      </div>
    </section>
  );
}