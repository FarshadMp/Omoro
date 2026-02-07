import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          {/* Fallback image if video fails or is loading */}
          <img
            src="/img/banner.jpg" // Keeping original fallback
            alt="Security Banner"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/20" /> {/* Lighter overlay */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col items-start md:items-center justify-center text-left md:text-center">
        <h1 className="text-[35px] md:text-[65px] font-medium tracking-tight leading-[1.1] mb-8 md:mb-12 max-w-5xl">
          Smart & Innovative Lighting Solutions
        </h1>

        {/* CTA Button */}
        {/* CTA Button */}
        <a
          href="tel:+919947073112"
          className="flex items-stretch group cursor-pointer shadow-lg"
        >
          <div className="bg-[#04AFE2] hover:bg-[#04AFE2] text-white px-4 md:px-6 py-3 text-[15px] md:text-base font-normal transition-colors duration-300 flex items-center">
            Book A Discovery Call
          </div>
          <div className="bg-[#04AFE2] hover:bg-[#04AFE2] text-white px-4 md:px-4 py-3 text-[15px] md:text-base flex items-center justify-center border-l border-white/20 transition-colors duration-300">
            <ArrowUpRight className="w-5 md:w-6 h-5 md:h-6" />
          </div>
        </a>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-10 left-0 right-0 z-20 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-end justify-between">
        {/* Bottom Left Text */}
        <div className="max-w-xl text-left mb-0 md:mb-0">
          <p className="text-[14px] md:text-base font-normal leading-relaxed text-white/90 drop-shadow-md">
            Welcome to a new era of lighting innovation. High-precision lighting
            systems arrive installation-ready, allowing you to illuminate spaces
            and deliver value months sooner.
          </p>
        </div>
      </div>
    </section>
  );
}
