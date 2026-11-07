import React, { useState } from 'react';
import { CollectionItem } from '../types';
import { X, MessageCircle, ZoomIn } from 'lucide-react';
import { buildQuickWhatsAppInquiry } from '../utils/booking';

interface SignatureCollectionProps {
  onOpenConsultation: () => void;
}

const COLLECTION_DATA: CollectionItem[] = [
  {
    id: 'bridal-blouse-peacock',
    title: 'The Mayil Antique Zardosi Blouse',
    category: 'blouses',
    categoryName: 'Bridal Blouse',
    description:
      'High-relief peacock (Mayil) motif rendered in antique champagne gold zari, micro-pearls, and French bullion knots on rich crimson raw silk. Designed with a deep sweetheart neckline and padded contour support.',
    craftDetails: 'Over 64 artisan hours of intensive hand needlework; reinforced armscye and hand-finished piping.',
    fabric: 'Pure Raw Mulberry Silk & Antique Gold Zari',
    image: '/src/assets/images/bridal_blouse_embroidery_1793981342674.jpg',
    aspect: 'portrait',
  },
  {
    id: 'regal-bridal-lehenga',
    title: 'The Rajkumari Crimson Bridal Lehenga',
    category: 'lehengas',
    categoryName: 'Bridal Lehenga',
    description:
      'A majestic bridal ensemble in royal deep burgundy silk velvet and banarasi brocade. Features 24 hand-embroidered floral arch kalis paired with a shimmering golden organza dupatta veil.',
    craftDetails: 'Multi-layer flared can-can structure, custom kamarbandh waistband, and bespoke hanging latkan tassels.',
    fabric: 'Silk Velvet, Pure Banarasi Brocade & Metallic Tissue Dupatta',
    image: '/src/assets/images/luxury_bridal_lehenga_1793981343801.jpg',
    aspect: 'portrait',
  },
  {
    id: 'celestial-anarkali',
    title: 'The Chandrika Ivory Flared Anarkali',
    category: 'ethnic',
    categoryName: 'Anarkali Couture',
    description:
      'Ethereal floor-length flared silhouette in warm ivory georgette with cascading gold foil threadwork, delicate mukesh highlights, and gossamer scalloped dupatta.',
    craftDetails: '32 floor-skimming panels with lightweight crinoline hem tape for fluid twirling motion.',
    fabric: 'Fine Georgette, Mulmul Silk Lining & Gold Zari Scalloping',
    image: '/src/assets/images/designer_ethnic_anarkali_1793981344315.jpg',
    aspect: 'portrait',
  },
  {
    id: 'atelier-silk-craft',
    title: 'The Master Tailor’s Canvas',
    category: 'craft',
    categoryName: 'Atelier Craft',
    description:
      'An intimate glimpse inside the Ayelin atelier: pure South Indian raw silk drafted by hand with tailor’s chalk, brass shears, and gold zari spools before bespoke cut.',
    craftDetails: 'Individual measurement drafting ensuring zero shoulder slipping and seamless front-to-back symmetry.',
    fabric: 'Pure South Indian Handloom Raw Silk',
    image: '/src/assets/images/atelier_tailoring_craft_1793981346137.jpg',
    aspect: 'landscape',
  },
  {
    id: 'midnight-sapphire-gown',
    title: 'The Neelambari Midnight Sapphire Gown',
    category: 'gowns',
    categoryName: 'Party Wear Gown',
    description:
      'An exquisite Ayelin Boutique creation: sculpted sheer-illusion neckline embellished with shimmering midnight sequins and floral embroidery, puffed translucent tulle quarter-sleeves with scalloped cuffs, and a grand flared floor-sweeping organza skirt with an ornate embroidered border.',
    craftDetails: 'Handcrafted floral beadwork bodice with built-in bustier framing; scalloped hem embroidery with soft petticoat volume.',
    fabric: 'Midnight Blue French Tulle, Silk Crepe & Shimmer Organza',
    image: '/assets/aistudio/dress_1_70648e46.jpg',
    aspect: 'portrait',
  },
  {
    id: 'mother-daughter-ensemble',
    title: 'The Vatsalya Mother & Daughter Duo',
    category: 'matching',
    categoryName: 'Mother & Daughter',
    description:
      'Coordinated festive celebration attire in blush pink and warm ivory silk. Designed to harmonize embroidery themes while prioritizing gentle, itch-free comfort for the little one.',
    craftDetails: '100% soft cotton inner protective lining, growth-adjustable hems, and matching potli bag accessories.',
    fabric: 'Blush Chanderi Silk & Pure Cotton Lining',
    image: '/src/assets/images/mother_daughter_couture_1793981346242.jpg',
    aspect: 'landscape',
  },
];

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  onOpenConsultation,
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<CollectionItem | null>(null);

  const filteredItems =
    filter === 'all'
      ? COLLECTION_DATA
      : COLLECTION_DATA.filter((item) => item.category === filter);

  return (
    <section id="collection" className="py-24 lg:py-32 bg-[var(--theme-bg-subtle)]/30 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[var(--theme-accent)]/30 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-accent-dark)] mb-2">
              <span>Haute Couture Gallery</span>
              <span aria-hidden="true">·</span>
              <span>Medavakkam, Chennai</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--theme-text)]">
              Signature <span className="italic text-[var(--theme-primary)]">Collection</span>
            </h2>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--theme-bg)] border border-[var(--theme-accent)]/30">
            {[
              { id: 'all', label: 'All Creations' },
              { id: 'blouses', label: 'Bridal Blouses' },
              { id: 'lehengas', label: 'Royal Lehengas' },
              { id: 'gowns', label: 'Party Wear Gowns' },
              { id: 'ethnic', label: 'Anarkalis' },
              { id: 'matching', label: 'Mother & Daughter' },
              { id: 'craft', label: 'Atelier' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-sans font-medium tracking-[0.12em] uppercase transition-all duration-200 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[var(--theme-primary)] text-[var(--theme-bg)] shadow-sm'
                    : 'text-[var(--theme-text)]/70 hover:text-[var(--theme-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Gallery Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {filteredItems.map((item, idx) => {
            const isTall = item.aspect === 'portrait';
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`group relative bg-[var(--theme-bg)] border border-[var(--theme-accent)]/25 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  idx === 0 || idx === 1 ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Image Container with Smooth Hover Scale */}
                <div
                  className={`relative overflow-hidden bg-[var(--theme-primary)] ${
                    isTall ? 'h-[460px] sm:h-[520px]' : 'h-[360px] sm:h-[400px]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Top Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#060B18] bg-[var(--theme-primary)]/95 px-3 py-1 border border-[var(--theme-accent)]/50 shadow-sm">
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Zoom Hover Icon */}
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-[var(--theme-accent)] border border-[var(--theme-accent)]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Overlay Title & Subtitle */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-editorial text-2xl text-[#FBF8F2] font-normal leading-tight group-hover:text-[var(--theme-accent)] transition-colors mb-2 drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FBF8F2]/80 font-sans line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.16em] text-[var(--theme-accent)]">
                      <span>{item.fabric}</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        Explore Design →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Consult Prompt */}
        <div className="mt-16 text-center">
          <p className="font-editorial text-xl sm:text-2xl text-[var(--theme-text)] italic mb-4">
            "Have a custom blouse embroidery sketch or wedding silhouette in mind?"
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-3.5 text-xs font-sans font-medium tracking-[0.22em] uppercase text-[var(--theme-bg)] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] border border-[var(--theme-accent)]/50 transition-colors shadow-sm cursor-pointer"
          >
            Bring Your Dream Design to Life
          </button>
        </div>
      </div>

      {/* Full Screen Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative bg-[var(--theme-bg)] border border-[var(--theme-accent)]/60 max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 p-2 text-[var(--theme-text)] hover:text-[var(--theme-accent)] bg-[var(--theme-card)]/80 md:bg-transparent rounded-full cursor-pointer transition-colors"
              aria-label="Close image inspection"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: High-Res Image Showcase */}
            <div className="md:w-1/2 bg-[var(--theme-primary)] relative min-h-[320px] md:min-h-full">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right: Craftsmanship & Inquiry Details */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--theme-accent-dark)]">
                  {activeItem.categoryName} · Haute Couture
                </span>
                <h3 className="font-editorial text-3xl text-[var(--theme-primary)] font-normal mt-1 mb-4 leading-tight">
                  {activeItem.title}
                </h3>

                <p className="text-sm text-[var(--theme-text)]/85 font-sans leading-relaxed mb-6">
                  {activeItem.description}
                </p>

                {/* Craft Details Box */}
                <div className="bg-[var(--theme-bg-subtle)]/50 p-4 border border-[var(--theme-accent)]/30 mb-6">
                  <h4 className="text-xs font-sans uppercase tracking-[0.16em] text-[var(--theme-accent-dark)] font-semibold mb-1">
                    Artisan Craftsmanship:
                  </h4>
                  <p className="text-xs text-[var(--theme-text)]/80 font-sans leading-relaxed">
                    {activeItem.craftDetails}
                  </p>

                  <h4 className="text-xs font-sans uppercase tracking-[0.16em] text-[var(--theme-accent-dark)] font-semibold mt-3 mb-1">
                    Fabric Base:
                  </h4>
                  <p className="text-xs text-[var(--theme-text)]/80 font-sans">
                    {activeItem.fabric}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[var(--theme-accent)]/25 flex flex-col gap-3">
                <a
                  href={buildQuickWhatsAppInquiry(activeItem.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 text-center text-xs tracking-[0.2em] uppercase font-medium bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-[var(--theme-bg)] border border-[var(--theme-accent)]/40 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[var(--theme-accent)]" />
                  <span>Inquire About This Design on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setActiveItem(null);
                    onOpenConsultation();
                  }}
                  className="w-full py-2.5 text-center text-xs tracking-[0.16em] uppercase font-medium text-[var(--theme-primary)] hover:underline cursor-pointer"
                >
                  Book Fitting Appointment at Medavakkam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
