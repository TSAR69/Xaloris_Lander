import { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import logoPng from '../assets/logo.png';


function Footer() {
  const videoRef = useRef(null);
  const uid = useId();

  const [form, setForm] = useState({
    name: '',
    email: '',
    kind: 'General inquiry',
    message: '',
  });

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    let hls = null;
    const videoElement = videoRef.current;

    if (videoElement) {
      const streamUrl = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

      if (streamUrl.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          // Match Hero.jsx behavior
          hls = new Hls({ enableWorker: false });
          hls.loadSource(streamUrl);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
          videoElement.src = streamUrl;
        }
      } else {
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
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
className="bg-[#000000] w-full rounded-3xl overflow-hidden p-6 md:p-10 text-white mt-0 relative z-10"
    >
      {/* Contact Form (inlined from ContactForm.jsx) */}
      <section
        id="contact"
        className="relative bg-[#000000] text-white py-24 overflow-hidden -mx-6 md:-mx-10 px-6 md:px-10 rounded-[1.5rem] mt-6"
      >
        {/* Structure: black background -> hls video -> text */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none" style={{ backgroundColor: '#000000', zIndex: 0 }}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-90"
            style={{}}
            muted
            autoPlay
            playsInline
            loop
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-0" style={{ position: 'relative', zIndex: 10 }}>
          <div
            className="relative rounded-[1.5rem] overflow-hidden bg-transparent backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
            style={{ animation: 'float 6s ease-in-out infinite' }}
          >
            {/* Partitioned layout */}
            <div className="relative grid grid-cols-1 md:grid-cols-2">
              {/* LEFT */}
              <div className="p-8 md:p-12 flex items-center justify-center md:justify-start">
                <h2 className="font-sans font-extrabold text-[26px] md:text-[36px] uppercase tracking-tight leading-[1.1]">
                  We are here to answer every question of yours
                </h2>
              </div>

              {/* CENTER divider */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />

              {/* RIGHT (form fields) */}
              <div className="p-8 md:p-12">
                <form onSubmit={onSubmit} className="mt-2" aria-label="Contact form">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <div className="mt-6 grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor={`${uid}-name`} className="sr-only">
                        Name
                      </label>
                      <input
                        id={`${uid}-name`}
                        name="name"
                        value={form.name}
                        onChange={(e) => setField('name', e.target.value)}
                        placeholder="Name"
                        className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor={`${uid}-email`} className="sr-only">
                        Email
                      </label>
                      <input
                        id={`${uid}-email`}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setField('email', e.target.value)}
                        placeholder="Email"
                        className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20 transition-all duration-300"
                        required
                      />
                    </div>

                    {/* Custom chevron select — mirrors ContactForm.jsx so both
                        enquiry entry points feel identical. */}
                    <div className="relative group/select">
                      <label htmlFor={`${uid}-kind`} className="sr-only">
                        Kind of query
                      </label>
                      <select
                        id={`${uid}-kind`}
                        name="kind"
                        value={form.kind}
                        onChange={(e) => setField('kind', e.target.value)}
className="w-full appearance-none rounded-2xl bg-black/50 border border-white/10 pl-4 pr-12 py-3 text-white outline-none focus:border-[#D4AF37]/60 focus:ring-4 focus:ring-[#D4AF37]/15 hover:border-white/20 hover:bg-black/60 transition-all duration-300 cursor-pointer"
                      >
                        <option className="bg-[#050505] text-white">General inquiry</option>
                        <option className="bg-[#050505] text-white">Enterprise</option>
                        <option className="bg-[#050505] text-white">Government</option>
                        <option className="bg-[#050505] text-white">Partnership</option>
                        <option className="bg-[#050505] text-white">Support</option>
                      </select>

                      {/* Subtle gold shine on hover */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/select:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, rgba(212,175,55,0.10) 0%, transparent 45%, rgba(176,141,87,0.06) 100%)',
                        }}
                      />

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 group-hover/select:text-white transition-transform duration-300 ease-out group-focus-within/select:rotate-180 group-focus-within/select:text-[#D4AF37] pointer-events-none"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>

                    <div>
                      <label htmlFor={`${uid}-message`} className="sr-only">
                        Message
                      </label>
                      <textarea
                        id={`${uid}-message`}
                        name="message"
                        value={form.message}
                        onChange={(e) => setField('message', e.target.value)}
                        placeholder="Message"
                        rows={4}
                        className="w-full rounded-2xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#D4AF37]/60 focus:ring-2 focus:ring-[#D4AF37]/20 resize-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <button
                      type="submit"
                      className="brushed-metal group inline-flex items-center gap-2 text-[#050505] font-sans font-extrabold text-sm uppercase tracking-widest px-7 py-3 rounded-full shadow-lg shadow-[rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all duration-300 ease-out"
                    >
                      <span className="relative z-10 text-[#050505]">Send</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Layout - Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
        {/* Links Section (right on desktop) */}
        <div className="md:col-span-7 md:order-2">
          <div className="grid grid-cols-1">
            <div>
              <h3 className="hidden md:block text-sm uppercase tracking-wider text-white font-medium mb-4">
                {/* Concierge title removed */}
              </h3>
              <div className="flex flex-col">
                {['Get in Touch', 'Legal Privacy', 'User Agreement', 'Report Concern'].map((label) => (
                  <a
                    key={label}
                    href="#"
                    className="text-xs space-y-2 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* First column (left on desktop) */}
        <div className="md:col-span-5 md:order-1">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logoPng}
              alt="Xaloris Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="text-xl font-medium">XALORIS</span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed max-w-sm">OSINT with AI, Because why not</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          A TrustHack Corp Product
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Join the Revolution</span>

          <div className="flex flex-row items-center gap-3">
            {/* Twitter/X */}
            <a
              href="#"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Twitter"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.78L23 22h-6.6l-4.1-5.3L7.6 22H4.5l7.4-8.47L1 2h6.7l3.7 4.7L18.9 2zm-1.2 19h1.7L6.2 3H4.4l13.3 18z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-3.2a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
