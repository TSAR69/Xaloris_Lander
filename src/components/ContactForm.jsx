import { useId, useState } from 'react';

function ChevronDown({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function ContactForm() {
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

  return (
    <section id="contact" className="relative bg-black text-white py-24 overflow-hidden">
      {/* Blur only (no grain) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(65%_45%_at_50%_50%,rgba(212,175,55,0.18),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div
          className="relative rounded-[1.5rem] border border-[rgba(212,175,55,0.14)] overflow-hidden bg-black/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(212,175,55,0.18),0_30px_90px_rgba(0,0,0,0.65)]"
          style={{ animation: 'float 6s ease-in-out infinite' }}
        >
          {/* Partitioned layout */}
          <div className="relative grid grid-cols-1 md:grid-cols-2">
            {/* LEFT */}
            <div className="p-8 md:p-12 flex items-center justify-center md:justify-start">
              <h2 className="font-sans font-extrabold text-[26px] md:text-[36px] uppercase tracking-tight leading-[1.1]">
                Wanna say something
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

                  {/* Custom chevron select */}
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

                    {/* Custom chevron */}
                    <ChevronDown
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60 group-hover/select:text-white transition-transform duration-300 ease-out group-focus-within/select:rotate-180 group-focus-within/select:text-[#D4AF37] pointer-events-none"
                    />
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
  );
}