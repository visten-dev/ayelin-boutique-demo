import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { useTheme, ThemeId } from '../theme/ThemeContext';
import { luxuryAudio } from '../utils/audio';

export const ThemeSelector: React.FC = () => {
  const { activeTheme, setTheme, allThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectTheme = (id: ThemeId) => {
    setTheme(id);
    setIsOpen(false);
    luxuryAudio.playThreadChime();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-sans tracking-[0.14em] uppercase text-[var(--theme-primary)] hover:text-[var(--theme-accent)] border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)] rounded-sm transition-all duration-300 bg-[var(--theme-bg)]/80 backdrop-blur-sm cursor-pointer shadow-xs"
        title="Change Haute Couture Theme Palette"
        aria-expanded={isOpen}
      >
        <span className="flex items-center -space-x-1 shrink-0">
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-xs"
            style={{ backgroundColor: activeTheme.colors.primary }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-xs"
            style={{ backgroundColor: activeTheme.colors.accent }}
          />
        </span>
        <span className="hidden sm:inline font-medium">Palette</span>
        <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 p-3 bg-[var(--theme-card)] border border-[var(--theme-accent)]/40 shadow-2xl z-50 animate-fade-in backdrop-blur-md">
          <div className="px-2 py-1.5 mb-2 border-b border-[var(--theme-accent)]/20 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--theme-accent-dark)] font-semibold">
                Haute Couture Themes
              </p>
              <p className="font-editorial text-sm text-[var(--theme-primary)]">
                Select Boutique Atmosphere
              </p>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          </div>

          <div className="space-y-1.5">
            {allThemes.map((t) => {
              const isSelected = t.id === activeTheme.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-full p-2.5 text-left rounded-sm transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 border ${
                    isSelected
                      ? 'bg-[var(--theme-accent)]/12 border-[var(--theme-accent)] text-[var(--theme-primary)] shadow-xs'
                      : 'border-transparent hover:bg-[var(--theme-bg-subtle)]/70 text-[var(--theme-text)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex items-center -space-x-1 shrink-0">
                      <div
                        className="w-4 h-4 rounded-full border border-white/80 shadow-xs"
                        style={{ backgroundColor: t.colors.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/80 shadow-xs"
                        style={{ backgroundColor: t.colors.accent }}
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-serif font-medium tracking-wide truncate text-[var(--theme-primary)]">
                        {t.name}
                      </p>
                      <p className="text-[10px] font-sans text-[var(--theme-text-muted)] truncate">
                        {t.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--theme-accent-dark)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-[var(--theme-accent)]/15 px-2 text-[10px] text-[var(--theme-text-muted)] flex items-center justify-between font-sans">
            <span>Coordinated with 3D Atelier</span>
            <span className="text-[var(--theme-accent-dark)] font-medium">Ayelin Medavakkam</span>
          </div>
        </div>
      )}
    </div>
  );
};
