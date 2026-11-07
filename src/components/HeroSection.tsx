import React from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 lg:pt-28 pb-12 overflow-hidden bg-[var(--theme-bg)] transition-colors duration-500">
      {/* Opulent dark royal blue and gold ambient auras */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(30,60,130,0.35)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,_var(--theme-accent)_0%,_transparent_70%)] opacity-15 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Brand Story */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10">
            {/* Clean Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-primary)] font-semibold mb-4">
              <span>Medavakkam, Chennai</span>
              <span aria-hidden="true">·</span>
              <span>Haute Couture Atelier</span>
            </div>

            {/* Brand Title */}
            <h2 className="text-sm font-sans tracking-[0.3em] uppercase text-[var(--theme-primary)] font-semibold mb-2">
              AYELIN BOUTIQUE
            </h2>

            {/* Oversized Editorial Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[var(--theme-text)] font-light leading-[1.08] tracking-tight mb-6">
              Elegance, <br />
              <span className="italic font-normal text-[var(--theme-primary)]">Tailored</span> to You.
            </h1>

            {/* Subheading */}
            <p className="text-base text-[var(--theme-text)]/85 font-sans font-light leading-relaxed mb-8 max-w-lg">
              Discover the art of personalized fashion. From exquisite bridal blouses to
              beautifully crafted designer outfits, every creation is tailored around you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 text-xs font-sans font-medium tracking-[0.22em] uppercase text-[var(--theme-bg)] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] border border-[var(--theme-accent)]/50 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#collection"
                className="px-7 py-4 text-xs font-sans font-medium tracking-[0.2em] uppercase text-[var(--theme-primary)] bg-transparent hover:bg-[var(--theme-accent)]/10 border border-[var(--theme-primary)]/30 hover:border-[var(--theme-primary)] transition-all duration-300 text-center cursor-pointer"
              >
                Explore Collection
              </a>
            </div>

            {/* Atelier Key Highlights */}
            <div className="pt-6 border-t border-[var(--theme-accent)]/25 grid grid-cols-3 gap-4">
              <div>
                <p className="font-editorial text-2xl text-[var(--theme-primary)] font-normal">28+</p>
                <p className="text-[11px] font-sans tracking-[0.1em] uppercase text-[var(--theme-text-muted)] font-medium">Precision Points</p>
              </div>
              <div>
                <p className="font-editorial text-2xl text-[var(--theme-primary)] font-normal">100%</p>
                <p className="text-[11px] font-sans tracking-[0.1em] uppercase text-[var(--theme-text-muted)] font-medium">Custom Tailoring</p>
              </div>
              <div>
                <p className="font-editorial text-2xl text-[var(--theme-primary)] font-normal">Handmade</p>
                <p className="text-[11px] font-sans tracking-[0.1em] uppercase text-[var(--theme-text-muted)] font-medium">Aari & Zardosi</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Fashion Experience Canvas */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Ambient luxury frame accent */}
            <div className="absolute -inset-4 border border-[var(--theme-accent)]/20 pointer-events-none rounded-sm hidden lg:block" />
            <Hero3DCanvas />
          </div>
        </div>
      </div>
    </section>
  );
};
