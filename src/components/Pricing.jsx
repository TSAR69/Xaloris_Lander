import { Zap, Monitor, DollarSign } from 'lucide-react';

function PricingCard({
  Icon,
  title,
  delay,
  price,
  period,
  description,
  gradient = 'linear-gradient(137deg, #D4AF37 0%, #B08D57 100%)',
  buttonText,
  buttonHref,
  bezel = true,
}) {
  return (
    <div
      className={`group relative rounded-[1.5rem] bg-black/60 overflow-hidden transition-all duration-300 ${
        bezel ? 'border border-gray-600/60 p-[1px]' : 'p-0 border-0'
      } hover:shadow-[0_0_0_1px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/30`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 blur-2xl group-hover:opacity-100"
        style={{ backgroundImage: gradient }}
      />

      <div className="relative rounded-[1.5rem] bg-black/80 backdrop-blur-xl p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-sans font-extrabold text-white text-[18px] tracking-tight">
              {title}
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-sans font-extrabold text-white text-[28px] leading-none">
                {price}
              </span>
              <span className="font-sans font-bold text-white/60 text-[12px] uppercase tracking-widest">
                {period}
              </span>
            </div>
          </div>

          <div
            className="grid place-items-center rounded-2xl border border-gray-600/70 w-12 h-12 transition-colors duration-300"
            style={{ backgroundImage: gradient }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        <p className="mt-4 text-white/80 text-[13.5px] leading-relaxed">{description}</p>

        <a
          href={buttonHref}
          className="mt-7 group/button relative block text-center rounded-full px-6 py-3 text-[13px] font-sans font-bold uppercase tracking-widest text-white border border-gray-600/70 bg-transparent transition-all duration-300 overflow-hidden"
          style={{ borderColor: undefined }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[1px] opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
            style={{
              backgroundImage: gradient,
              WebkitMaskImage: 'linear-gradient(#000,#000)',
              maskImage: 'linear-gradient(#000,#000)',
              borderRadius: '9999px',
              boxShadow: '0 0 18px rgba(212,175,55,0.35)',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300"
            style={{ backgroundImage: gradient }}
          />
          <span className="relative">{buttonText}</span>
        </a>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-black text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 className="font-sans font-extrabold text-[28px] md:text-[40px] uppercase tracking-tight leading-[1.1]">
            Pricing
          </h2>
          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-[#D4AF37] via-[#B08D57] to-transparent" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
          <PricingCard
            title="Free"
            Icon={Zap}
            delay={0.1}
            price="$0"
            period="for limited time"
            description="Experience AI-powered OSINT. Access core investigation tools. Perfect for learning and testing. Start uncovering insights today."
            gradient="linear-gradient(137deg, #000000 0%, #f72525 100%)"
            buttonText="Get Started"
            bezel={true}
          />

          {/* ARCHIVE (PAID CARD) - Commented out for future re-enable.
              <PricingCard
                title="Paid"
                Icon={DollarSign}
                delay={0.2}
                price="$199"
                period="per month"
                bezel={true}
                description="Unlock the full power of XALORIS. Faster investigations, deeper intelligence. Built for serious researchers and professionals."
                gradient="linear-gradient(137deg, #000000 0%, #5ed29c 100%)"
                buttonText="Get Access"
              />
          */}


          <PricingCard
            title="Your own customized"
            price="Contact us"
            bezel={true}
            Icon={Monitor}
            delay={0.3}
            description="Exclusive access. Custom capabilities. Your intelligence platform, your rules. Just made by us.  (For Enterprises and Govermnents only)"
            gradient="linear-gradient(137deg, #4361EE 0%, #000000 45%, #F72585 100%)"
            buttonText="Contact us"
          />
        </div>
      </div>
    </section>
  );
}

