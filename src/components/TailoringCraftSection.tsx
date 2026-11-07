import React, { useState } from 'react';
import { Ruler, ShieldCheck, ZoomIn, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { IMAGES, handleImageFallback } from '../utils/imagePaths';

interface CraftStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  image: string;
  technique: string;
  tools: string[];
}

const STEPS: CraftStep[] = [
  {
    number: '01',
    title: 'Silhouette Consultation',
    subtitle: 'Draping & Proportion Analysis',
    description:
      'We study your body proportions, comfort preferences, neck depth comfort, and posture to advise on flattering neckline cuts and armhole balance.',
    metric: 'One-on-One Styling',
    image: IMAGES.craftDraping,
    technique: 'Anatomical drape mapping on tailor forms with midnight blue silk and pleated gold tissue fabrics.',
    tools: ['Silk Chiffon Drapes', 'Atelier Mannequins', 'Styling Swatches'],
  },
  {
    number: '02',
    title: '28-Point Master Measurements',
    subtitle: 'Anatomical Precision Mapping',
    description:
      'Far beyond standard bust-waist metrics. We map cross-back breadth, apex height, shoulder slope, and biceps circumference to prevent sleeve bunching and back gaping.',
    metric: 'Zero-Pinch Fit',
    image: IMAGES.craftMeasurements,
    technique: '28-point calibration ensuring zero shoulder-slipping and seamless underarm movement.',
    tools: ['Brass-Tipped Tape', 'Tailor’s French Curves', 'Chalk Drafting'],
  },
  {
    number: '03',
    title: 'Hand-Traced Stencil & Layout',
    subtitle: 'Perforation & Motifs Transfer',
    description:
      'Every embroidery pattern is traced onto the raw silk by hand using traditional perforation and chalk techniques before being framed onto wooden aari cots.',
    metric: 'Hand-Traced Motifs',
    image: IMAGES.craftStencil,
    technique: 'Artisan stencils transferred onto pure Mulberry silk with zinc powder and tailor’s chalk.',
    tools: ['Tracing Vellum', 'Peacock Stencils', 'Brass Spool Weights'],
  },
  {
    number: '04',
    title: 'Single-Artisan Needlework',
    subtitle: 'Authentic Aari & Zardosi Embroidery',
    description:
      'A dedicated master karigar embroiders each blouse from start to finish, ensuring consistent tension, delicate pearl anchoring, and flawless gold thread luster.',
    metric: 'Pure Metallic Zari',
    image: IMAGES.craftAari,
    technique: 'Over 48 artisan hours of delicate aari hooked-needle embroidery with micro-pearls and bullion knots.',
    tools: ['Wooden Aari Cot Frame', '24K Gold Zari Coils', 'Seed Pearls'],
  },
  {
    number: '05',
    title: 'Couture Assembly & Trial',
    subtitle: 'Hand-Piped Lining & Final Fitting',
    description:
      'Lined with premium pre-shrunk cotton, reinforced cup framing, soft French piping, and ample 2-inch side margins for easy lifelong alteration.',
    metric: 'Trial Guarantee',
    image: IMAGES.craftAssembly,
    technique: 'Hand-basted cotton canvas interlining with padded cup contouring and satin-piped hem finishing.',
    tools: ['Pre-shrunk Mulmul Cotton', 'French Piping', '2-Inch Future Margin'],
  },
];

export const TailoringCraftSection: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<CraftStep | null>(null);

  return (
    <section id="craftsmanship" className="py-24 lg:py-32 bg-[var(--theme-bg)] relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] uppercase text-[var(--theme-accent-dark)] mb-3">
            <span>The Art of Tailoring</span>
            <span aria-hidden="true">·</span>
            <span>Atelier Standards</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[var(--theme-text)] leading-[1.15]">
            Designed Around You. <br />
            <span className="italic text-[var(--theme-primary)]">Crafted with Love.</span>
          </h2>
          <p className="mt-4 text-base text-[var(--theme-text)]/75 font-sans font-light leading-relaxed">
            At Ayelin Boutique, tailoring is not an assembly line. It is a slow, respectful dialogue
            between your dreams, the drape of silk, and the steady hand of master Chennai craftsmen.
          </p>
        </div>

        {/* 5-Step Visual Craft Journey Cards with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {STEPS.map((step) => (
            <div
              key={step.number}
              onClick={() => setSelectedStep(step)}
              className="bg-[var(--theme-card)] border border-[var(--theme-accent)]/30 overflow-hidden flex flex-col justify-between hover:border-[var(--theme-primary)] hover:shadow-2xl transition-all duration-500 relative group cursor-pointer"
            >
              {/* Step Image with Scrim and Hover Zoom */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[var(--theme-footer-bg)]">
                <img
                  src={step.image}
                  alt={`${step.title} - Ayelin Boutique atelier craft`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={handleImageFallback}
                  referrerPolicy="no-referrer"
                />
                {/* Deep Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Step Number Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="font-editorial text-xs font-semibold tracking-[0.16em] uppercase px-2.5 py-1 bg-[var(--theme-primary)] text-[#060B18] shadow-sm border border-[var(--theme-accent)]/40">
                    Step {step.number}
                  </span>
                </div>

                {/* Zoom Icon Hover Prompt */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>

                {/* Subtitle tag at bottom of image */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[var(--theme-accent)] block truncate drop-shadow-sm font-medium">
                    {step.subtitle}
                  </span>
                </div>
              </div>

              {/* Card Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg text-[var(--theme-text)] font-normal leading-snug mb-2 group-hover:text-[var(--theme-primary)] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--theme-text)]/75 font-sans leading-relaxed line-clamp-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--theme-accent)]/20 flex items-center justify-between text-[11px] font-sans">
                  <span className="uppercase tracking-[0.16em] text-[var(--theme-primary)] font-semibold">
                    {step.metric}
                  </span>
                  <span className="text-[var(--theme-primary)] group-hover:translate-x-1 transition-transform">
                    Inspect →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Craftsmanship Banner */}
        <div className="bg-gradient-to-br from-[var(--theme-card)] via-[var(--theme-bg-subtle)] to-[var(--theme-card)] text-[var(--theme-text)] p-8 sm:p-12 border-2 border-[var(--theme-accent)]/50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,_var(--theme-accent)_0%,_transparent_70%)] opacity-20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--theme-primary)] font-bold block mb-2">
                Our Guarantee of Comfort & Longevity
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-light text-[var(--theme-text)] mb-4">
                The Ayelin <span className="italic text-[var(--theme-primary)]">Perfect-Fit Promise</span>
              </h3>
              <p className="text-sm text-[var(--theme-text-muted)] font-sans leading-relaxed max-w-2xl">
                We know the anxiety of big event dates. That’s why we offer complimentary trial
                fittings, guaranteed delivery schedules, and lifetime alteration allowances on all custom
                bridal and festive outfits.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <div className="flex items-center gap-3 bg-[var(--theme-bg)]/80 p-3.5 border border-[var(--theme-accent)]/40 text-[var(--theme-text)] backdrop-blur-xs">
                <ShieldCheck className="w-5 h-5 text-[var(--theme-primary)] shrink-0" />
                <span className="text-xs font-sans tracking-wide font-medium">Complimentary Fitting Adjustments</span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--theme-bg)]/80 p-3.5 border border-[var(--theme-accent)]/40 text-[var(--theme-text)] backdrop-blur-xs">
                <Ruler className="w-5 h-5 text-[var(--theme-primary)] shrink-0" />
                <span className="text-xs font-sans tracking-wide font-medium">2-Inch Hidden Margin for Future Sizing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Craft Detail Lightbox Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative bg-[var(--theme-bg)] border border-[var(--theme-accent)]/60 max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 z-20 p-2 text-[var(--theme-text)] hover:text-[var(--theme-accent)] bg-[var(--theme-card)]/80 md:bg-transparent rounded-full cursor-pointer transition-colors"
              aria-label="Close craft detail modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Big Photograph */}
            <div className="md:w-1/2 bg-[var(--theme-footer-bg)] relative min-h-[280px] md:min-h-full">
              <img
                src={selectedStep.image}
                alt={selectedStep.title}
                className="w-full h-full object-cover"
                onError={handleImageFallback}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 z-10 md:hidden">
                <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold">
                  Step {selectedStep.number} · {selectedStep.metric}
                </span>
              </div>
            </div>

            {/* Right: Craft Details & Techniques */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--theme-accent-dark)] font-medium">
                    Atelier Standard {selectedStep.number}
                  </span>
                  <span className="text-xs text-[var(--theme-accent)]">·</span>
                  <span className="text-xs font-sans text-[var(--theme-accent)] font-medium uppercase tracking-wider">
                    {selectedStep.metric}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl sm:text-3xl text-[var(--theme-primary)] font-normal leading-tight mb-2">
                  {selectedStep.title}
                </h3>
                <p className="text-xs font-sans uppercase tracking-[0.14em] text-[var(--theme-accent-dark)] mb-4">
                  {selectedStep.subtitle}
                </p>

                <p className="text-sm text-[var(--theme-text)]/85 font-sans leading-relaxed mb-6">
                  {selectedStep.description}
                </p>

                {/* Artisan Technique Details */}
                <div className="bg-[var(--theme-card)] p-4 border border-[var(--theme-accent)]/30 mb-6 space-y-3">
                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.16em] text-[var(--theme-accent-dark)] font-semibold mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                      <span>Artisan Technique:</span>
                    </h4>
                    <p className="text-xs text-[var(--theme-text)]/80 font-sans leading-relaxed">
                      {selectedStep.technique}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-sans uppercase tracking-[0.16em] text-[var(--theme-accent-dark)] font-semibold mb-1.5">
                      Atelier Tools Utilized:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStep.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-sans px-2.5 py-1 bg-[var(--theme-bg)] border border-[var(--theme-accent)]/30 text-[var(--theme-text)]/80 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[var(--theme-accent)]" />
                          <span>{tool}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--theme-accent)]/20">
                <a
                  href="#contact"
                  onClick={() => setSelectedStep(null)}
                  className="w-full py-3.5 px-4 text-center text-xs tracking-[0.2em] uppercase font-medium bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[#060B18] border border-[var(--theme-accent)]/40 transition-colors block shadow-md cursor-pointer"
                >
                  Experience This Craft in Person
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
