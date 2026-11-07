import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { luxuryAudio } from '../utils/audio';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Check if ?skipIntro=true is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('skipIntro') === 'true') {
      onComplete();
      return;
    }

    const isDebug = urlParams.get('debugIntro') === 'true';
    if (isDebug) {
      setStep(4);
      setProgress(100);
      return;
    }

    // Sequence progression:
    // Step 0: Ambient dark royal sapphire canvas
    // Step 1 (0.2s): Golden embroidery thread emerges & draws geometric couture crest
    const t1 = setTimeout(() => {
      setStep(1);
      luxuryAudio.playThreadChime();
    }, 200);

    // Step 2 (0.9s): Emblem illuminates with glowing golden ring & stardust
    const t2 = setTimeout(() => {
      setStep(2);
    }, 950);

    // Step 3 (1.7s): Brand typography reveals with golden light sweep
    const t3 = setTimeout(() => {
      setStep(3);
    }, 1700);

    // Step 4 (2.3s): Tagline reveals: "CRAFTED TO MAKE YOU UNFORGETTABLE"
    const t4 = setTimeout(() => {
      setStep(4);
    }, 2300);

    // Step 5 (3.4s): Smooth transition into the main boutique homepage
    const t5 = setTimeout(() => {
      sessionStorage.setItem('ayelin_intro_seen', 'true');
      onComplete();
    }, 3400);

    // Progress bar animation interval (3400ms total)
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / 3400) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 30);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(interval);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    sessionStorage.setItem('ayelin_intro_seen', 'true');
    setTimeout(() => {
      onComplete();
    }, 180);
  };

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050914] text-[#FBF8F2] overflow-hidden select-none"
        >
          {/* Atmospheric Radial Gradient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,_rgba(223,186,99,0.12)_0%,_rgba(6,11,24,0.85)_55%,_#03060E_100%)] pointer-events-none" />

          {/* Golden Floating Stardust Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { top: '22%', left: '18%', size: 3, delay: 0 },
              { top: '35%', left: '78%', size: 4, delay: 0.4 },
              { top: '65%', left: '25%', size: 2.5, delay: 0.2 },
              { top: '72%', left: '72%', size: 3.5, delay: 0.6 },
              { top: '15%', left: '60%', size: 2, delay: 0.3 },
              { top: '80%', left: '45%', size: 3, delay: 0.5 },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 0.7, 0.2],
                  y: [-10, -35],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full bg-[#DFBA63] shadow-[0_0_8px_#DFBA63]"
                style={{
                  top: p.top,
                  left: p.left,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
          </div>

          {/* Skip Intro Button in Top-Right */}
          <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-30 flex items-center gap-2">
            <button
              onClick={handleSkip}
              className="px-3.5 py-1.5 text-[11px] font-sans tracking-[0.25em] text-[#DFBA63] hover:text-[#FFF4D4] uppercase transition-all duration-200 cursor-pointer border border-[#DFBA63]/30 hover:border-[#DFBA63] bg-black/40 backdrop-blur-xs flex items-center gap-2"
              aria-label="Skip introductory brand animation"
            >
              <span>Skip</span>
              <span className="text-[10px] text-[#DFBA63]/60">→</span>
            </button>
          </div>

          {/* Central Logo Animation Showcase */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto px-6 text-center">
            {/* The Golden Needle & Emblem Frame Container */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 mb-6 sm:mb-8 relative flex items-center justify-center">
              {/* Outer Golden Aura Pulse */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: step >= 2 ? [1, 1.08, 1] : 0.8,
                  opacity: step >= 2 ? [0.4, 0.7, 0.4] : 0,
                }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(223,186,99,0.35)_0%,_transparent_70%)] pointer-events-none"
              />

              {/* Animated Sacred Embroidery Thread Circle (SVG Path Drawing) */}
              <svg
                viewBox="0 0 160 160"
                className="absolute inset-0 w-full h-full drop-shadow-[0_0_18px_rgba(223,186,99,0.55)] pointer-events-none"
                fill="none"
              >
                {/* Outer Filigree Thread Ring */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="74"
                  stroke="#DFBA63"
                  strokeWidth="1.2"
                  strokeDasharray="465"
                  initial={{ strokeDashoffset: 465 }}
                  animate={{ strokeDashoffset: step >= 1 ? 0 : 465 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Inner Thread Stitches Circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="#E8C676"
                  strokeWidth="0.7"
                  strokeDasharray="6 4"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{
                    opacity: step >= 1 ? 0.8 : 0,
                    rotate: step >= 1 ? 0 : -90,
                  }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  style={{ transformOrigin: '80px 80px' }}
                />

                {/* Four Cardinal Gold Beads */}
                {[
                  { cx: 80, cy: 6 },
                  { cx: 154, cy: 80 },
                  { cx: 80, cy: 154 },
                  { cx: 6, cy: 80 },
                ].map((pt, idx) => (
                  <motion.circle
                    key={idx}
                    cx={pt.cx}
                    cy={pt.cy}
                    r="2.5"
                    fill="#DFBA63"
                    initial={{ scale: 0 }}
                    animate={{ scale: step >= 2 ? 1 : 0 }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                  />
                ))}
              </svg>

              {/* Official AYELIN BOUTIQUE Logo Emblem with Luxurious Gold Rim */}
              <motion.div
                initial={{ opacity: 0, scale: 0.65, rotate: -15 }}
                animate={{
                  opacity: step >= 2 ? 1 : 0,
                  scale: step >= 2 ? 1 : 0.65,
                  rotate: step >= 2 ? 0 : -15,
                }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#DFBA63] shadow-[0_0_32px_rgba(223,186,99,0.45)] bg-black flex items-center justify-center relative group"
              >
                <img
                  src="/assets/aistudio/ayelin_boutiq_logo_c4a85613.jpg"
                  alt="Ayelin Boutique Official Emblem"
                  className="w-full h-full object-cover"
                />

                {/* Golden Light Shimmer Sweep across the Emblem */}
                {step >= 3 && (
                  <motion.div
                    initial={{ x: '-150%', opacity: 0 }}
                    animate={{ x: '180%', opacity: [0, 0.8, 0] }}
                    transition={{ duration: 1.3, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF8E7]/40 to-transparent skew-x-25 pointer-events-none"
                  />
                )}
              </motion.div>
            </div>

            {/* Brand Title: AYELIN BOUTIQUE with Editorial Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 22 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden py-1 mb-2"
            >
              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.26em] text-[#FBF8F2] uppercase drop-shadow-sm">
                AYELIN BOUTIQUE
              </h1>

              {/* Gilded Light Sweep Across Wordmark */}
              {step >= 3 && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.15 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DFBA63]/30 to-transparent skew-x-12 pointer-events-none"
                />
              )}
            </motion.div>

            {/* Tagline: "CRAFTED TO MAKE YOU UNFORGETTABLE" */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 12 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <p className="text-xs sm:text-sm font-sans uppercase font-medium tracking-[0.32em] text-[#DFBA63]">
                “CRAFTED TO MAKE YOU UNFORGETTABLE”
              </p>

              {/* Location & Atelier Subtitle */}
              <div className="mt-2.5 flex items-center gap-2 text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#FBF8F2]/60">
                <span>Haute Couture Atelier</span>
                <span className="text-[#DFBA63]">·</span>
                <span>Medavakkam, Chennai</span>
              </div>

              {/* Decorative Gold Filament Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: step >= 4 ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#DFBA63] to-transparent mt-5"
              />
            </motion.div>
          </div>

          {/* Bottom Elegant Progress Hairline */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#DFBA63] via-[#FFF4D4] to-[#DFBA63] transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
