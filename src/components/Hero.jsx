import { useEffect, useRef } from 'react';

import { ArrowRight } from 'lucide-react';
import Hls from 'hls.js';

export default function Hero() {
  const videoRef = useRef(null);

  // Background video is handled here (HLS streaming).

  useEffect(() => {
    let hls = null;
    const videoElement = videoRef.current;

    if (videoElement) {
      const streamUrl = 'https://stream.mux.com/r6pXRAJb3005XEEbl1hYU1x01RFJDSn7KQApwNGgAHHbU.m3u8'
      if (streamUrl.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          // hls.js setup with enableWorker: false for sandbox environment compatibility
          hls = new Hls({ enableWorker: false });
          hls.loadSource(streamUrl);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          // Safari fallback for native HLS support
          videoElement.src = streamUrl;
        }
      } else {
        // Standard MP4 or other video formats
        videoElement.src = streamUrl;
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
<section className="relative w-full min-h-screen flex flex-col bg-[#050505] overflow-hidden pt-80">

      {/* 1. Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
<video
          ref={videoRef}
          className="w-full h-full object-cover opacity-90" style={{ filter: 'saturate(120%) contrast(110%)' }}
          muted
          autoPlay
          playsInline
          loop
        />
      </div>

      {/* Molten Gold Hero Orb - Primary */}
      <div className="molten-orb" style={{ top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }} />

      {/* Molten Gold Secondary Orb */}
      <div className="molten-orb-secondary" style={{ top: '55%', left: '65%', transform: 'translate(-50%, -50%)' }} />

      {/* Floating Gold Particles */}
      <div className="gold-particle" style={{ top: '30%', left: '30%', animationDelay: '0s' }} />
      <div className="gold-particle" style={{ top: '40%', left: '70%', animationDelay: '1.5s', width: '3px', height: '3px' }} />
      <div className="gold-particle" style={{ top: '55%', left: '25%', animationDelay: '3s', width: '5px', height: '5px' }} />
      <div className="gold-particle" style={{ top: '35%', left: '60%', animationDelay: '4.5s', width: '2px', height: '2px' }} />
      <div className="gold-particle" style={{ top: '60%', left: '55%', animationDelay: '2s', width: '3px', height: '3px' }} />
      <div className="gold-particle" style={{ top: '25%', left: '45%', animationDelay: '5.5s', width: '4px', height: '4px' }} />

      {/* 5. Hero Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 z-20 flex flex-col items-center text-center md:items-start md:text-left justify-center">


        {/* Main Headline: 'OSINT with Ai' in Inter Extra Bold, uppercase, tracking-tight. Scale from 40px (mobile) to 72px (desktop). Final period must be gold (#D4AF37). */}
        <h1 className="font-sans font-extrabold text-[40px] md:text-[72px] uppercase tracking-tight text-white leading-[1.05] max-w-3xl mb-6 select-none animate-fade-in-up duration-500">
          OSINT with Ai<span className="text-[#D4AF37]">.</span>
        </h1>

        {/* Description: 'Because why not...' in Inter, 14px, 70% white opacity, max-width 512px. */}
        <p className="font-sans text-[14px] leading-relaxed text-white/70 max-w-[512px] mb-10 animate-fade-in-up duration-700">
          Because why not...
        </p>

        {/* Primary CTA: 'Get Started' button with an ArrowRight icon. Rounded-full, brushed metal gold finish. */}
        <div className="animate-fade-in-up duration-1000">
          <a
            href="#get-started"
            className="brushed-metal group inline-flex items-center gap-3 text-[#050505] font-sans font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg shadow-[rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 ease-out"
          >
            <span className="relative z-10 text-[#050505]">Get Started</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 text-[#050505]" />
          </a>
        </div>
      </div>
    </section>
  );
}
