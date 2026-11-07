import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'sapphire' | 'burgundy' | 'emerald' | 'noir' | 'ivory_classic';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  isDark: boolean;
  swatchSilkId: 'sapphire' | 'burgundy' | 'emerald' | 'gold' | 'ivory';
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    primaryUltraDark: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    bg: string;
    bgSubtle: string;
    card: string;
    text: string;
    textMuted: string;
    footerBg: string;
    previewDotPrimary: string;
    previewDotAccent: string;
  };
}

export const THEME_CONFIGS: Record<ThemeId, ThemeConfig> = {
  sapphire: {
    id: 'sapphire',
    name: 'Dark Royal Blue & Gold',
    subtitle: 'Imperial Midnight Sapphire Couture',
    description: 'Deep velvety royal midnight navy, radiant 24K gold zari filigree, and luminous warm ivory typography.',
    isDark: true,
    swatchSilkId: 'sapphire',
    colors: {
      primary: '#DFBA63', // Radiant Royal Gold for titles/highlights
      primaryDark: '#C49E44',
      primaryLight: '#F5E1AB',
      primaryUltraDark: '#03060E',
      accent: '#DFBA63', // 24K Royal Gold
      accentLight: '#F7E6B8',
      accentDark: '#C49E44',
      bg: '#060B18', // Deep Royal Blue Background
      bgSubtle: '#0B132B', // Secondary Royal Navy Surface
      card: '#0F1A38', // Elevated Royal Sapphire Card
      text: '#FBF8F2', // Crisp Warm Ivory
      textMuted: '#CBD5E1', // Refined High-Contrast Silver-Blue
      footerBg: '#030712', // Midnight Couture Footer
      previewDotPrimary: '#0C1C42',
      previewDotAccent: '#DFBA63',
    },
  },
  burgundy: {
    id: 'burgundy',
    name: 'Dark Velvet Crimson & Gold',
    subtitle: 'Royal Muhurtham Night',
    description: 'Deep night wine velvet, molten champagne zari and warm candlelight gold.',
    isDark: true,
    swatchSilkId: 'burgundy',
    colors: {
      primary: '#E2BD6D',
      primaryDark: '#C59F49',
      primaryLight: '#F5E3B3',
      primaryUltraDark: '#0A0205',
      accent: '#E2BD6D',
      accentLight: '#F8E8C0',
      accentDark: '#C59F49',
      bg: '#0F0408',
      bgSubtle: '#1A070E',
      card: '#260B15',
      text: '#FBF7F2',
      textMuted: '#E2CCD4',
      footerBg: '#080104',
      previewDotPrimary: '#380F1F',
      previewDotAccent: '#E2BD6D',
    },
  },
  emerald: {
    id: 'emerald',
    name: 'Dark Temple Emerald & Gold',
    subtitle: 'South Indian Royal Heritage',
    description: 'Opulent dark forest emerald, antique temple bullion gold, and crisp gold lace borders.',
    isDark: true,
    swatchSilkId: 'emerald',
    colors: {
      primary: '#E2BD6D',
      primaryDark: '#C59F49',
      primaryLight: '#F5E3B3',
      primaryUltraDark: '#020A07',
      accent: '#E2BD6D',
      accentLight: '#F8E8C0',
      accentDark: '#C59F49',
      bg: '#040E0A',
      bgSubtle: '#091A14',
      card: '#0F261E',
      text: '#FBF8F3',
      textMuted: '#C2DDD2',
      footerBg: '#020806',
      previewDotPrimary: '#0F2E23',
      previewDotAccent: '#E2BD6D',
    },
  },
  noir: {
    id: 'noir',
    name: 'Dark Obsidian & Rose Gold',
    subtitle: 'Parisian Haute Joaillerie',
    description: 'Sculpted obsidian onyx, warm Parisian rose gold and tailored champagne bronze.',
    isDark: true,
    swatchSilkId: 'gold',
    colors: {
      primary: '#DFBA63',
      primaryDark: '#C49E44',
      primaryLight: '#F7E6B8',
      primaryUltraDark: '#050507',
      accent: '#DCA28E',
      accentLight: '#F2C6B6',
      accentDark: '#C48A77',
      bg: '#09090D',
      bgSubtle: '#121218',
      card: '#1A1A22',
      text: '#FBF8F4',
      textMuted: '#D5D4E0',
      footerBg: '#050507',
      previewDotPrimary: '#171720',
      previewDotAccent: '#DCA28E',
    },
  },
  ivory_classic: {
    id: 'ivory_classic',
    name: 'Classic Ivory & Champagne Gold',
    subtitle: 'Daytime Heritage Atelier',
    description: 'Traditional warm ivory raw silk, soft beige and rich burgundy embroidery.',
    isDark: false,
    swatchSilkId: 'ivory',
    colors: {
      primary: '#54252F',
      primaryDark: '#37151D',
      primaryLight: '#703340',
      primaryUltraDark: '#220A10',
      accent: '#C6A56B',
      accentLight: '#DFCA9B',
      accentDark: '#8C6D3B',
      bg: '#F7F2EA',
      bgSubtle: '#E9DED0',
      card: '#FAF8F5',
      text: '#211D1B',
      textMuted: '#5C524F',
      footerBg: '#37151D',
      previewDotPrimary: '#F7F2EA',
      previewDotAccent: '#C6A56B',
    },
  },
};

interface ThemeContextType {
  activeTheme: ThemeConfig;
  setTheme: (id: ThemeId) => void;
  allThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'ayelin_theme_selection_v2';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default is 'sapphire' (Dark Royal Blue & Gold)
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId;
      if (saved && THEME_CONFIGS[saved]) {
        return saved;
      }
    }
    return 'sapphire';
  });

  const activeTheme = THEME_CONFIGS[themeId] || THEME_CONFIGS.sapphire;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const { colors } = activeTheme;

    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-primary-dark', colors.primaryDark);
    root.style.setProperty('--theme-primary-light', colors.primaryLight);
    root.style.setProperty('--theme-primary-ultra-dark', colors.primaryUltraDark);
    root.style.setProperty('--theme-accent', colors.accent);
    root.style.setProperty('--theme-accent-light', colors.accentLight);
    root.style.setProperty('--theme-accent-dark', colors.accentDark);
    root.style.setProperty('--theme-bg', colors.bg);
    root.style.setProperty('--theme-bg-subtle', colors.bgSubtle);
    root.style.setProperty('--theme-card', colors.card);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-text-muted', colors.textMuted);
    root.style.setProperty('--theme-footer-bg', colors.footerBg);

    root.setAttribute('data-theme', activeTheme.id);
    if (activeTheme.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, activeTheme.id);
    } catch {
      // storage disabled / private mode
    }
  }, [activeTheme]);

  const handleSetTheme = (id: ThemeId) => {
    if (THEME_CONFIGS[id]) {
      setThemeId(id);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme: handleSetTheme,
        allThemes: Object.values(THEME_CONFIGS),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
