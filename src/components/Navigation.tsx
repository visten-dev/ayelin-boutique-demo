import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Sparkles, Instagram } from 'lucide-react';
import { luxuryAudio } from '../utils/audio';
import { ThemeSelector } from './ThemeSelector';

interface NavigationProps {
  onOpenConsultation: () => void;
  onReplayIntro?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenConsultation,
  onReplayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    luxuryAudio.isMuted = next;
    if (!next) {
      luxuryAudio.playThreadChime();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--theme-bg)]/95 border-b border-[var(--theme-accent)]/20 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md'
          : 'bg-gradient-to-b from-[var(--theme-bg)]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark with Official Emblem */}
        <a
          href="#"
          className="group flex items-center gap-3 text-xl sm:text-2xl font-editorial tracking-[0.22em] text-[var(--theme-primary)] hover:text-[var(--theme-accent)] transition-colors whitespace-nowrap shrink-0 uppercase"
        >
          <img
            src="/assets/aistudio/ayelin_boutiq_logo_c4a85613.jpg"
            alt="Ayelin Boutique Emblem"
            className="w-8 h-8 rounded-full border border-[var(--theme-accent)]/60 object-cover shadow-sm group-hover:scale-105 transition-transform"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/ayelin_boutiq_logo_c4a85613.jpg';
            }}
          />
          <span>AYELIN BOUTIQUE</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.18em] text-[var(--theme-text)]/80 uppercase">
          <a
            href="#about"
            className="hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--theme-accent)] hover:after:w-full after:transition-all after:duration-300"
          >
            About
          </a>
          <a
            href="#services"
            className="hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--theme-accent)] hover:after:w-full after:transition-all after:duration-300"
          >
            Services
          </a>
          <a
            href="#collection"
            className="hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--theme-accent)] hover:after:w-full after:transition-all after:duration-300"
          >
            Signature Collection
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--theme-accent)] hover:after:w-full after:transition-all after:duration-300"
          >
            The Atelier
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--theme-primary)] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--theme-accent)] hover:after:w-full after:transition-all after:duration-300"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Haute Couture Theme Palette Selector */}
          <ThemeSelector />

          {/* Instagram Official Channel */}
          <a
            href="https://www.instagram.com/ayelinboutique"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex p-1.5 sm:p-2 text-[var(--theme-primary)] hover:text-[#E1306C] transition-colors rounded-full cursor-pointer"
            title="Ayelin Boutique Instagram (@ayelinboutique)"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Sound Atmosphere Toggle */}
          <button
            onClick={toggleSound}
            className="p-1.5 sm:p-2 text-[var(--theme-primary)] hover:text-[var(--theme-accent-light)] transition-colors rounded-full cursor-pointer"
            title={isMuted ? 'Turn Sound On' : 'Mute Atmospheric Chimes'}
            aria-label={isMuted ? 'Turn Sound On' : 'Mute Atmospheric Chimes'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Replay Intro Trigger */}
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-sans tracking-[0.14em] uppercase text-[var(--theme-primary)] hover:text-[var(--theme-accent-light)] transition-colors border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] rounded-sm cursor-pointer"
              title="Experience Brand Intro"
            >
              <Sparkles className="w-3 h-3 text-[var(--theme-accent)]" />
              <span>Intro</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            onClick={onOpenConsultation}
            className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-sans font-medium tracking-[0.2em] uppercase text-[var(--theme-bg)] bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] transition-all duration-300 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Book Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--theme-primary)] lg:hidden focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--theme-bg)] border-b border-[var(--theme-accent)]/30 px-6 py-6 transition-all duration-300 shadow-xl">
          <div className="flex flex-col gap-4 text-sm font-medium tracking-[0.2em] uppercase text-[var(--theme-text)]">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--theme-accent)]/15 hover:text-[var(--theme-primary)]"
            >
              About the Boutique
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--theme-accent)]/15 hover:text-[var(--theme-primary)]"
            >
              Our Craft & Services
            </a>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--theme-accent)]/15 hover:text-[var(--theme-primary)]"
            >
              Signature Collection
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[var(--theme-accent)]/15 hover:text-[var(--theme-primary)]"
            >
              The Art of Tailoring
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[var(--theme-primary)]"
            >
              Visit & Contact
            </a>

            <div className="pt-4 border-t border-[var(--theme-accent)]/30 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 text-center text-xs tracking-[0.2em] uppercase font-medium bg-[var(--theme-primary)] text-[var(--theme-bg)] border border-[var(--theme-accent)]/40 cursor-pointer"
              >
                Book Your Consultation
              </button>
              <a
                href="https://wa.me/919361602235?text=Hello%20Ayelin%20Boutique%2C%20I%20would%20like%20to%20inquire%20about%20custom%20stitching%20and%20appointments."
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 text-center text-xs tracking-[0.16em] uppercase font-medium bg-[var(--theme-accent)]/15 text-[var(--theme-primary)] border border-[var(--theme-accent)]/30"
              >
                Chat on WhatsApp (+91 93616 02235)
              </a>

              <a
                href="https://www.instagram.com/ayelinboutique"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 text-center text-xs tracking-[0.16em] uppercase font-medium bg-[var(--theme-card)] hover:bg-[var(--theme-accent)]/10 text-[var(--theme-text)] border border-[var(--theme-accent)]/30 flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <span>Follow on Instagram (@ayelinboutique)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
