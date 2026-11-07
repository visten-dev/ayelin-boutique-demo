import React, { useState } from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import { CinematicIntro } from './components/CinematicIntro';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SignatureCollection } from './components/SignatureCollection';
import { TailoringCraftSection } from './components/TailoringCraftSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

function AppContent() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      // Allows testing or direct bypass with ?skipIntro=true or ?autostart=1
      if (urlParams.get('skipIntro') === 'true' || urlParams.get('autostart') === '1') {
        return false;
      }
      return true;
    }
    return true;
  });

  const [introKey, setIntroKey] = useState(0);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string>('Designer Blouse Stitching');

  const handleOpenConsultation = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForModal(serviceTitle);
    }
    setIsConsultationModalOpen(true);
  };

  const handleReplayIntro = () => {
    setIntroKey((prev) => prev + 1);
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] font-sans antialiased relative selection:bg-[var(--theme-primary)] selection:text-[var(--theme-bg)] transition-colors duration-500">
      {/* Cinematic Opening Intro Animation (2.5–3s) */}
      {showIntro && (
        <CinematicIntro
          key={introKey}
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      )}

      {/* Primary Top Navigation Bar with Theme Palette Selector */}
      <Navigation
        onOpenConsultation={() => handleOpenConsultation()}
        onReplayIntro={handleReplayIntro}
      />

      {/* Main Content Layout */}
      <main id="main-content">
        {/* 3D Fashion Experience Hero */}
        <HeroSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* About the Boutique & Atelier Story */}
        <AboutSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* Explore Our Craft - 8 Categories */}
        <ServicesSection
          onSelectServiceForBooking={(serviceTitle) => handleOpenConsultation(serviceTitle)}
        />

        {/* Signature Collection Asymmetrical Gallery */}
        <SignatureCollection onOpenConsultation={() => handleOpenConsultation()} />

        {/* The Art of Tailoring & 5-Step Craft Journey */}
        <TailoringCraftSection />

        {/* Authentic Customer Testimonials */}
        <TestimonialsSection />

        {/* Contact & Appointment Booking Section */}
        <ContactSection preselectedService={selectedServiceForModal} />
      </main>

      {/* Minimal Luxury Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onReplayIntro={handleReplayIntro}
      />

      {/* Quick Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialService={selectedServiceForModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
