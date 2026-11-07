import React from 'react';
import { Phone, MapPin, Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import { BOUTIQUE_PHONE, BOUTIQUE_DISPLAY_PHONE, BOUTIQUE_ADDRESS } from '../utils/booking';

interface FooterProps {
  onOpenConsultation: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--theme-footer-bg)] text-[var(--theme-text)] border-t border-[var(--theme-accent)]/30 relative overflow-hidden transition-colors duration-500">
      {/* Background ambient gold tint */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_bottom,_var(--theme-accent)_0%,_transparent_70%)] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/ayelin_boutiq_logo_c4a85613.jpg"
                alt="Ayelin Boutique Logo"
                className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/70 object-cover shadow-md"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/ayelin_boutiq_logo_c4a85613.jpg';
                }}
              />
              <span className="font-editorial text-2xl tracking-[0.24em] text-[var(--theme-text)] uppercase font-medium">
                AYELIN BOUTIQUE
              </span>
            </div>

            <p className="font-editorial text-xl italic text-[var(--theme-primary)] tracking-wide">
              "Crafted to Make You Unforgettable."
            </p>

            <p className="text-xs sm:text-sm text-[var(--theme-text-muted)] font-sans leading-relaxed max-w-sm">
              Premier designer boutique & bespoke atelier located in Medavakkam, Chennai.
              Specializing in bridal blouses, royal lehengas, party gowns, and custom embroidery.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BOUTIQUE_PHONE}?text=${encodeURIComponent(
                  'Hello Ayelin Boutique, I would like to schedule a custom tailoring consultation.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans tracking-[0.16em] uppercase font-medium bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#FFF4D4] border border-[#25D366]/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-primary)] font-semibold">
              Explore Atelier
            </h4>
            <ul className="space-y-2.5 text-xs font-sans tracking-[0.12em] uppercase text-[var(--theme-text-muted)]">
              <li>
                <a href="#about" className="hover:text-[var(--theme-primary)] transition-colors">
                  About Ayelin
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[var(--theme-primary)] transition-colors">
                  Bespoke Services
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[var(--theme-primary)] transition-colors">
                  Signature Collection
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[var(--theme-primary)] transition-colors">
                  The Art of Tailoring
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[var(--theme-primary)] transition-colors">
                  Contact & Location
                </a>
              </li>
              {onReplayIntro && (
                <li>
                  <button
                    onClick={onReplayIntro}
                    className="hover:text-[var(--theme-primary)] transition-colors text-left uppercase text-[11px] text-[var(--theme-accent-light)] cursor-pointer"
                  >
                    ✦ Replay Brand Story Intro
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Boutique Visit & Connect */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-sans tracking-[0.22em] uppercase text-[var(--theme-primary)] font-semibold">
              Visit The Boutique
            </h4>

            <div className="space-y-3 text-xs font-sans text-[var(--theme-text-muted)]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                <span className="text-[var(--theme-text)]">{BOUTIQUE_ADDRESS}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <a href={`tel:${BOUTIQUE_PHONE}`} className="hover:text-[var(--theme-primary)] transition-colors text-[var(--theme-text)]">
                  {BOUTIQUE_DISPLAY_PHONE}
                </a>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/ayelinboutique"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] text-[var(--theme-primary)] hover:text-white hover:bg-[var(--theme-accent)]/20 transition-colors rounded-sm"
                  title="Ayelin Boutique Instagram (@ayelinboutique)"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href={`https://wa.me/${BOUTIQUE_PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] text-[var(--theme-primary)] hover:text-white hover:bg-[var(--theme-accent)]/20 transition-colors rounded-sm"
                  title="Ayelin Boutique WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ayelin+Boutique+Medavakkam+Chennai"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] text-[var(--theme-primary)] hover:text-white hover:bg-[var(--theme-accent)]/20 transition-colors rounded-sm"
                  title="Find on Google Maps"
                  aria-label="Google Maps"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--theme-accent)]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[var(--theme-text-muted)]">
          <p>
            © {new Date().getFullYear()} Ayelin Boutique. All rights reserved. ·{' '}
            <a href="https://www.ayelins.com/" target="_blank" rel="noreferrer" className="text-[var(--theme-primary)] hover:underline">
              www.ayelins.com
            </a>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[var(--theme-primary)] hover:text-white transition-colors cursor-pointer uppercase tracking-[0.16em] text-[11px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
