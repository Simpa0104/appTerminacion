// styles/theme.ts
export const theme = {
    // Colores
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
  
    // Espaciado
    spacing: {
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
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
  
    // Tamaños de fuente
    fontSize: {
      xs: 11,
      sm: 12,
      md: 13,
      base: 14,
      lg: 15,
      xl: 16,
      xxl: 18,
      xxxl: 20,
      display1: 22,
      display2: 24,
      display3: 28,
    },
  
    // Pesos de fuente
    fontWeight: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
  
    // Sombras
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
  
    // Alturas estándar
    heights: {
      input: 44,
      inputSmall: 40,
      button: 44,
      buttonSmall: 36,
    },
  
    // Anchos de columnas de tabla (reutilizables)
    tableColumns: {
      narrow: 100,
      small: 120,
      medium: 140,
      large: 150,
      xlarge: 220,
      xxlarge: 280,
    },
  };
  
  // Tipos para TypeScript
  export type Theme = typeof theme;
  export type ThemeColors = typeof theme.colors;
  export type ThemeSpacing = typeof theme.spacing;