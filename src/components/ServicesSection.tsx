import React, { useState } from 'react';
import { ServiceCategory } from '../types';
import { ArrowUpRight, Clock, X, Check, Calendar } from 'lucide-react';
import { buildQuickWhatsAppInquiry } from '../utils/booking';
import { IMAGES, handleImageFallback } from '../utils/imagePaths';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'blouse',
    title: 'Designer Blouse Stitching',
    tagline: 'Sculpted fits, aari zardosi mastery & seamless cup comfort',
    description:
      'The signature craft of Ayelin Boutique. We specialize in deep necklines, princess cuts, padded cup alignments, boat necks, sheer illusion backs, and intricate maggam work tailored to complement your Kanchipuram silk and bridal sarees.',
    highlights: [
      'Anatomical 28-point measurement for zero-crease armhole fit',
      'Handcrafted peacock, temple, and floral zardosi embroidery',
      'Invisible seam finishing, soft cotton lining & reinforced stays',
      'Express bridal stitching available for urgent wedding deadlines',
    ],
    timeline: '3 to 7 working days',
    recommendedFor: 'Muhurtham silk sarees, wedding receptions, festive celebrations',
    image: IMAGES.bridalBlouse,
  },
  {
    id: 'bridal',
    title: 'Bridal Wear & Trousseau',
    tagline: 'Regal bridal ensembles tailored for your grandest moments',
    description:
      'Complete bespoke bridal styling from engagement to reception. We design custom bridal blouses, dupatta drapes, veil attachments, and coordinating accessories curated to harmonize with your jewelry and venue aesthetic.',
    highlights: [
      'Comprehensive one-on-one bridal design consultation',
      'Two intermediate canvas fittings to guarantee absolute perfection',
      'Custom color-matched can-can skirts and weight-balanced drapes',
      'Coordination with groom and bridal party hues',
    ],
    timeline: '14 to 25 working days',
    recommendedFor: 'Bridal muhurtham, grand sangeet, reception gala',
    image: IMAGES.craftAssembly,
  },
  {
    id: 'lehenga',
    title: 'Lehenga Customization',
    tagline: 'Voluminous 360° flairs, custom kalis & royal banarasi textures',
    description:
      'Bespoke lehengas engineered for movement and majesty. From heavy embroidered bridal kalis to featherlight organza dance lehengas, each skirt is weighted and lined to twirl effortlessly.',
    highlights: [
      'Custom kali panel drafting from 16 to 32 flares',
      'Multi-tiered padded can-can structuring for dramatic silhouette',
      'Designer kamarbandh and bespoke heavy latkan tassels',
      'Customized sleeve lengths and back neckline depth',
    ],
    timeline: '10 to 20 working days',
    recommendedFor: 'Sangeet nights, destination weddings, milestone birthdays',
    image: IMAGES.bridalLehenga,
  },
  {
    id: 'anarkali',
    title: 'Anarkali & Ethnic Wear',
    tagline: 'Graceful floor-length flairs, angrakhas & festive shararas',
    description:
      'Timeless elegance blending Mughal-inspired silhouettes with modern Chennai chic. Crafted in pure georgette, raw silk, chanderi, and organza with delicate gota patti and thread embroidery.',
    highlights: [
      'Full-circle floor-length kalidar cuts with gossamer dupattas',
      'Comfortable breathable mulmul inner linings',
      'Custom neckline detailing and potli button embellishments',
      'Coordinated churidars, palazzos, or flared sharara bottoms',
    ],
    timeline: '5 to 10 working days',
    recommendedFor: 'Diwali, Eid, family pujas, intimate engagements',
    image: IMAGES.anarkali,
  },
  {
    id: 'gowns',
    title: 'Party Wear Gowns',
    tagline: 'Contemporary red-carpet evening drapery and western silhouettes',
    description:
      'Indo-western fusion gowns featuring structured corsetry, cowl backs, mermaid flares, cape sleeves, and hand-beaded shimmer designed for unforgettable evening presence.',
    highlights: [
      'Built-in internal boning and corset support for a sculpted waist',
      'High-slit, cape sleeve, and draped trail options',
      'Delicate micro-sequin and glass bead embellishments',
      'Premium crepe, satin, and pleated metallic fabrics',
    ],
    timeline: '7 to 14 working days',
    recommendedFor: 'Cocktail evenings, reception parties, anniversary celebrations',
    image: IMAGES.dressHero,
  },
  {
    id: 'kids',
    title: "Kids' Designer Wear",
    tagline: 'Gentle, itch-free festive couture for little princes and princesses',
    description:
      'Traditional pattu pavadais, miniature lehengas, and festive frocks crafted with sensitive child-friendly finishing: soft pure cotton inner linings, covered seams, and adjustable waistbands.',
    highlights: [
      '100% soft cotton anti-rash protective inner layering',
      'Growth-friendly hidden seam margins for future alteration',
      'Lightweight festive embellishments that allow easy play',
      'Matching hair accessories and potli bags available',
    ],
    timeline: '4 to 7 working days',
    recommendedFor: 'Ear-piercing ceremonies, first birthdays, temple visits',
    image: IMAGES.motherDaughter,
  },
  {
    id: 'mom-daughter',
    title: 'Mom & Daughter Collections',
    tagline: 'Harmonious twin couture celebrating the sacred maternal bond',
    description:
      'Unforgettable coordinated ensembles customized in complementary colors and motifs. We balance age-appropriate comfort for daughters with sophisticated couture styling for mothers.',
    highlights: [
      'Synchronized silk weaves, border trims, and embroidery themes',
      'Customized neckline and fit tailored for each generation',
      'Coordinated photo-ready color palettes (pastels, jewel tones)',
      'Cherished heirloom outfits designed for keepsake memories',
    ],
    timeline: '10 to 15 working days',
    recommendedFor: 'First birthdays, family portraits, Diwali, weddings',
    image: IMAGES.craftDraping,
  },
  {
    id: 'embroidery',
    title: 'Custom Embroidery & Aari Work',
    tagline: 'Sacred hand zardosi, thread work, pearls and metallic filigree',
    description:
      'In-house master embroidery artisans meticulously craft bespoke designs. From traditional bridal peacocks, mango bootis, and temple borders to contemporary 3D floral cutwork.',
    highlights: [
      'Pure metallic antique gold and silver zari thread work',
      'Swarovski crystals, seed pearls, and genuine cut beads',
      'Custom monogramming (bride and groom initials embroidered)',
      'Design sketches presented and approved prior to needlework',
    ],
    timeline: '5 to 12 working days',
    recommendedFor: 'Blouse sleeves, veil borders, lehenga waistbands',
    image: IMAGES.craftAari,
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeModalService, setActiveModalService] = useState<ServiceCategory | null>(null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-[var(--theme-bg)] relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--theme-accent)]/30 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-accent-dark)] mb-2">
              <span>Atelier Services</span>
              <span aria-hidden="true">·</span>
              <span>Bespoke Tailoring</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--theme-text)]">
              Explore Our <span className="italic text-[var(--theme-primary)]">Craft</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--theme-text)]/75 font-sans font-light leading-relaxed">
            Every garment begins with your personal vision. We translate opulent silks and
            designer fabrics into heirloom silhouettes crafted to flatter you.
          </p>
        </div>

        {/* 8 Categories Editorial Visual Grid with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group relative bg-[var(--theme-card)] border border-[var(--theme-accent)]/25 overflow-hidden flex flex-col justify-between hover:border-[var(--theme-primary)] hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Card Image Header with Scrim */}
              <div className="relative h-44 overflow-hidden bg-[var(--theme-footer-bg)]">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                    onError={handleImageFallback}
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-card)] via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Index Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="font-editorial text-xs px-2.5 py-1 bg-[var(--theme-primary)] text-[#060B18] font-bold shadow-xs border border-[var(--theme-accent)]/40">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Service Title & Tagline */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="mb-4">
                  <h3 className="font-editorial text-xl sm:text-2xl text-[var(--theme-text)] group-hover:text-[var(--theme-primary)] transition-colors font-normal leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[var(--theme-primary)] font-sans font-semibold tracking-wide uppercase line-clamp-2">
                    {service.tagline}
                  </p>
                </div>

                {/* Bottom Row: Timeline & Explore Link */}
                <div className="pt-4 border-t border-[var(--theme-accent)]/20 flex items-center justify-between text-xs text-[var(--theme-text)]/75 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    <span>{service.timeline.split(' ')[0]} - {service.timeline.split(' ')[2]} days</span>
                  </span>
                  <span className="text-[var(--theme-primary)] group-hover:underline font-medium uppercase tracking-[0.1em] text-[11px]">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal Drawer */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative bg-[var(--theme-bg)] border border-[var(--theme-accent)]/60 max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 z-20 p-2 text-[var(--theme-text)] hover:text-[var(--theme-accent)] bg-[var(--theme-card)]/80 md:bg-transparent rounded-full cursor-pointer transition-colors"
              aria-label="Close service details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Showcase */}
            {activeModalService.image && (
              <div className="relative h-48 sm:h-56 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 overflow-hidden bg-[var(--theme-footer-bg)]">
                <img
                  src={activeModalService.image}
                  alt={activeModalService.title}
                  className="w-full h-full object-cover"
                  onError={handleImageFallback}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--theme-bg)] via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6 sm:left-8 z-10">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--theme-accent)] font-semibold drop-shadow-sm">
                    Atelier Service · Bespoke Tailoring
                  </span>
                </div>
              </div>
            )}

            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <h3 className="font-editorial text-3xl sm:text-4xl text-[var(--theme-primary)] font-light mt-1">
                {activeModalService.title}
              </h3>
              <p className="text-sm font-sans text-[var(--theme-accent-dark)] font-medium mt-1">
                {activeModalService.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--theme-text)]/85 font-sans leading-relaxed mb-6">
              {activeModalService.description}
            </p>

            {/* Craft Highlights */}
            <div className="mb-6 bg-[var(--theme-card)] p-5 border border-[var(--theme-accent)]/30">
              <h4 className="font-editorial text-lg text-[var(--theme-text)] mb-3 font-medium">
                Couture Craftsmanship Standards
              </h4>
              <ul className="space-y-2.5">
                {activeModalService.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--theme-text)]/80 font-sans">
                    <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metadata Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[var(--theme-text)]/80 mb-8 pt-4 border-t border-[var(--theme-accent)]/25">
              <div>
                <span className="uppercase text-[var(--theme-accent-dark)] font-medium tracking-wider block mb-1">
                  Turnaround Timeline:
                </span>
                <span className="text-sm font-medium text-[var(--theme-text)]">{activeModalService.timeline}</span>
              </div>
              <div>
                <span className="uppercase text-[var(--theme-accent-dark)] font-medium tracking-wider block mb-1">
                  Recommended For:
                </span>
                <span className="text-sm font-medium text-[var(--theme-text)]">{activeModalService.recommendedFor}</span>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const title = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForBooking(title);
                }}
                className="flex-1 py-3.5 text-center text-xs tracking-[0.2em] uppercase font-medium bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[#060B18] border border-[var(--theme-accent)]/40 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm font-semibold"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Fitting for This Service</span>
              </button>
              <a
                href={buildQuickWhatsAppInquiry(activeModalService.title)}
                target="_blank"
                rel="noreferrer"
                className="py-3.5 px-6 text-center text-xs tracking-[0.16em] uppercase font-medium bg-[var(--theme-accent)]/20 hover:bg-[var(--theme-accent)]/30 text-[var(--theme-primary)] border border-[var(--theme-accent)]/40 transition-colors"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
