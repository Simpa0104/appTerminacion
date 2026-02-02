// styles/theme.responsive.ts
import { getDeviceType, responsiveValue } from './responsive.utils';

/**
 * Función helper para obtener valores responsive del theme
 * CORRECCIÓN: Ahora TypeScript puede inferir correctamente el tipo de retorno
 */
const r = <M, T = M, D = T>(mobile: M, tablet?: T, desktop?: D): M | T | D => {
  return responsiveValue(mobile, tablet, desktop);
};

// Theme base con valores responsive
export const theme = {
  // Colores (sin cambios, son los mismos para todos los dispositivos)
  colors: {
    primary: "#007AFF",
    secondary: "#005BBB",
    
    // Estados
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#FF3B30",
    info: "#2196F3",
    
    // Backgrounds
    background: "#f5f5f5",
    backgroundAlt: "#F7F9FC",
    card: "#FFFFFF",
    overlay: "rgba(0, 0, 0, 0.6)",
    overlayLight: "rgba(0, 0, 0, 0.5)",
    
    // Borders
    border: "#e0e0e0",
    borderLight: "#f0f0f0",
    borderDark: "#d0d0d0",
    borderMedium: "#DDD",
    
    // Text
    text: {
      primary: "#1a1a1a",
      secondary: "#333",
      tertiary: "#666",
      quaternary: "#888",
      disabled: "#999",
      error: "#FF3B30",
      link: "#007AFF",
    },
    
    // Estados de componentes
    chip: {
      blue: { bg: "#E3F2FD", text: "#1565C0" },
      green: { bg: "#E8F5E9", text: "#2E7D32" },
      orange: { bg: "#FFF3E0", text: "#FF9800" },
      purple: { bg: "#EEF2FF", text: "#4F46E5" },
      gray: { bg: "#F9FAFB", text: "#374151" },
    },
    
    // Tablas
    table: {
      header: "#f8f9fa",
      row: "#fff",
      border: "#e6e6e6",
      hover: "#f5f7fa",
    },
  },

  // Espaciado responsive - CORRECCIÓN: r() devuelve el tipo correcto
  spacing: {
    xs: r(4, 5, 6) as number,
    sm: r(8, 10, 12) as number,
    md: r(12, 14, 16) as number,
    lg: r(16, 20, 24) as number,
    xl: r(20, 24, 28) as number,
    xxl: r(24, 28, 32) as number,
    xxxl: r(32, 38, 44) as number,
  },

  // Radios de borde
  borderRadius: {
    xs: 6,
    sm: 8,
    md: 10,
    lg: 12,
    xl: 14,
    xxl: 16,
    full: 9999,
  },

  // Tamaños de fuente responsive - CORRECCIÓN: r() devuelve el tipo correcto
  fontSize: {
    xs: r(11, 12, 13) as number,
    sm: r(12, 13, 14) as number,
    md: r(13, 14, 15) as number,
    base: r(14, 15, 16) as number,
    lg: r(15, 16, 17) as number,
    xl: r(16, 17, 18) as number,
    xxl: r(18, 19, 20) as number,
    xxxl: r(20, 22, 24) as number,
    display1: r(22, 24, 26) as number,
    display2: r(24, 26, 28) as number,
    display3: r(28, 30, 32) as number,
  },

  // Pesos de fuente
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },

  // Sombras (sin cambios)
  shadow: {
    none: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 10,
    },
  },

  // Anchos de borde
  borderWidth: {
    thin: 1,
    medium: 2,
    thick: 3,
  },

  // Alturas estándar responsive - CORRECCIÓN: r() devuelve el tipo correcto
  heights: {
    input: r(44, 48, 52) as number,
    inputSmall: r(40, 44, 48) as number,
    button: r(44, 48, 52) as number,
    buttonSmall: r(36, 40, 44) as number,
  },

  // Anchos de columnas de tabla responsive - CORRECCIÓN: r() devuelve el tipo correcto
  tableColumns: {
    narrow: r(100, 110, 130) as number,
    small: r(120, 132, 156) as number,
    medium: r(140, 154, 182) as number,
    large: r(150, 165, 195) as number,
    xlarge: r(220, 242, 286) as number,
    xxlarge: r(280, 308, 364) as number,
  },
};

// Tipos para TypeScript
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;
