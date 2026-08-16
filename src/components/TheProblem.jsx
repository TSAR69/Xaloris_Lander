

export default function TheProblem() {
  return (
    <section
      id="problem"
      className="relative bg-black text-white py-24 overflow-hidden"
    >
      {/*
        Premium layout idea:
        - Keep the section background pitch black
        - Add a single letter-type box (lighter black) centered
        - Writing goes inside the box (white text with violet hints)
      */}

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="rounded-[1.5rem] bg-black/50 border border-[rgba(212,175,55,0.14)] shadow-[0_0_0_1px_rgba(212,175,55,0.18),0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden">
          {/* Gold edge accent */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

          <div className="p-10 md:p-12">
            <h2 className="font-sans font-extrabold text-[28px] md:text-[40px] uppercase tracking-tight leading-[1.1]">
              The <span className="text-[#D4AF37]">Problem</span>
            </h2>
            <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-[#D4AF37] via-[#B08D57] to-transparent" />

            {/* TODO: Add your writing paragraph(s) here */}
            <p className="mt-8 text-white/85 text-[15px] leading-relaxed font-sans">
              <span className="text-white">OSINT</span> hasn't changed much in years. Investigators still spend countless hours searching websites, switching between tools, verifying information, and manually connecting scattered pieces of data. The internet grows exponentially every day, but the workflows used to analyze it remain largely manual.
              <br />
              <br />
              {/* (Removed invalid JSX placeholder span that broke compilation) */}
              This creates a bottleneck where finding intelligence is often slower than the speed at which information is created.

              <br />
              <br />
              <span className="font-sans font-extrabold text-white" style={{ fontFamily: 'Instrument Serif, serif' }}>
                The future isn’t more searching.
              </span>{' '}
              It’s smarter analysis—where AI-powered automation processes public data at scale, uncovers hidden connections, and delivers actionable insights in seconds rather than hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

