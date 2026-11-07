import React from 'react';
import { Sparkles, Scissors } from 'lucide-react';
import { IMAGES, handleImageFallback } from '../utils/imagePaths';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[var(--theme-bg-subtle)]/40 relative overflow-hidden transition-colors duration-500">
      {/* Subtle background divider */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atelier Craftsmanship Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Backing decorative frame offset */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[var(--theme-accent)]/40 pointer-events-none hidden sm:block" />

              {/* Main Atelier Image */}
              <div className="relative overflow-hidden shadow-2xl bg-[var(--theme-card)]">
                <img
                  src={IMAGES.atelierTailor}
                  alt="Ayelin Boutique master tailor measuring raw silk at the Chennai atelier"
                  className="w-full h-[440px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  onError={handleImageFallback}
                  referrerPolicy="no-referrer"
                />
                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating caption tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[var(--theme-card)]/95 border-l-2 border-[var(--theme-accent)] shadow-xl">
                  <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--theme-primary)] font-semibold">
                    The Medavakkam Atelier
                  </p>
                  <p className="font-editorial text-lg text-[var(--theme-text)] mt-0.5">
                    "Crafted with patience, precision, and soul."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Brand Story */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-primary)] mb-3 font-medium">
              <span>Heritage & Vision</span>
              <span aria-hidden="true">·</span>
              <span>Chennai, Tamil Nadu</span>
            </div>

            {/* Section Heading */}
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--theme-text)] leading-[1.15] mb-6">
              Where Every Stitch <br />
              <span className="italic text-[var(--theme-primary)]">Tells a Story.</span>
            </h2>

            {/* Core Brand Narrative */}
            <p className="font-editorial text-xl sm:text-2xl text-[var(--theme-primary)] font-normal leading-relaxed mb-6 italic">
              "At Ayelin Boutique, we believe every woman deserves an outfit that feels uniquely hers.
              Our passion for craftsmanship, attention to detail, and personalized tailoring transform
              beautiful fabrics into unforgettable creations."
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[var(--theme-text)]/80 font-sans font-light leading-relaxed mb-8">
              <p>
                Nestled on the vibrant Mambakkam–Medavakkam corridor in South Chennai, Ayelin Boutique
                bridges the sacred artistry of South Indian handlooms and intricate aari-zardosi
                embroidery with contemporary haute couture silhouettes.
              </p>
              <p>
                Whether crafting a bride's dream muhurtham blouse with hand-embroidered peacock
                motifs, tailoring a lightweight twirling lehenga, or designing coordinated mother-daughter
                festival wear, our master tailors work with anatomical precision so your garment flatters
                your silhouette effortlessly.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--theme-accent)]/30 mb-8">
              <div className="flex items-start gap-3">
                <Scissors className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-editorial text-lg text-[var(--theme-text)] font-medium">Bespoke Pattern Cut</h4>
                  <p className="text-xs text-[var(--theme-text)]/70 font-sans mt-0.5">
                    Individual canvas pattern drafted for your unique proportions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-editorial text-lg text-[var(--theme-text)] font-medium">Artisanal Zari Work</h4>
                  <p className="text-xs text-[var(--theme-text)]/70 font-sans mt-0.5">
                    Traditional aari, cutwork, and zardosi needlework by skilled artisans.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-[var(--theme-bg)] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] border border-[var(--theme-accent)]/40 transition-colors cursor-pointer"
              >
                <span>Experience Our Fitting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
