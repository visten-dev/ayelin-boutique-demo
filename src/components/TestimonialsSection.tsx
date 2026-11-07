import React from 'react';
import { Star, ExternalLink, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      review:
        'The staff at Ayelin Boutique are exceptionally warm, patient, and responsive. They took the time to understand my bridal saree colors and suggested an exquisite peacock aari work pattern that looked stunning. The stitching fit was spot on without needing any readjustment!',
      highlight: 'Perfect first-time bridal blouse fit',
      tag: 'Bridal Blouse & Aari Work',
      neighborhood: 'Medavakkam, Chennai',
    },
    {
      id: '2',
      review:
        'Finding an honest designer boutique with transparent, genuine pricing for intricate hand embroidery in Chennai is rare. Ayelin gave me a clear upfront quotation with no surprise charges. The neatness of the threadwork and padded finish exceeded my expectations.',
      highlight: 'Transparent pricing & flawless finishing',
      tag: 'Custom Silk Saree Blouse',
      neighborhood: 'Pallikaranai, Chennai',
    },
    {
      id: '3',
      review:
        'I ordered matching festival outfits for myself and my 4-year-old daughter. The fabrics were so comfortable and soft for my child, and we received non-stop compliments from our entire family during Diwali. Truly personalized tailoring!',
      highlight: 'Unforgettable compliments at our family celebration',
      tag: 'Mother & Daughter Ensemble',
      neighborhood: 'Velachery, Chennai',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[var(--theme-bg-subtle)]/40 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--theme-accent)]/30 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-accent-dark)] mb-2">
              <span>Client Voices</span>
              <span aria-hidden="true">·</span>
              <span>Medavakkam Community</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[var(--theme-text)]">
              Reflections of <span className="italic text-[var(--theme-primary)]">Gratitude</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[var(--theme-accent)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--theme-accent)] text-[var(--theme-accent)]" />
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ayelin+Boutique+Medavakkam+Chennai"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium uppercase tracking-[0.16em] text-[var(--theme-primary)] hover:text-[var(--theme-accent-dark)] border-b border-[var(--theme-primary)] pb-0.5"
            >
              <span>View Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[var(--theme-bg)] border border-[var(--theme-accent)]/30 p-8 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 relative"
            >
              <div className="mb-6">
                {/* Clean unboxed tag */}
                <div className="flex items-center justify-between text-xs font-sans text-[var(--theme-accent-dark)] mb-4">
                  <span className="uppercase tracking-[0.15em] font-medium">{item.tag}</span>
                  <div className="flex text-[var(--theme-accent)]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[var(--theme-accent)]" />
                    ))}
                  </div>
                </div>

                <p className="font-editorial text-lg text-[var(--theme-primary)] italic mb-3">
                  "{item.highlight}"
                </p>

                <p className="text-xs sm:text-sm text-[var(--theme-text)]/80 font-sans leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--theme-bg-subtle)] flex items-center justify-between text-xs font-sans text-[var(--theme-text)]/60">
                <span className="flex items-center gap-1 text-[var(--theme-accent-dark)]">
                  <CheckCircle className="w-3 h-3 text-[var(--theme-accent)]" />
                  <span>Verified Google Review</span>
                </span>
                <span>{item.neighborhood}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
