// styles/responsive.utils.ts
import { Dimensions, Platform, PixelRatio } from 'react-native';

// ==================== DIMENSIONES Y BREAKPOINTS ====================

/**
 * Breakpoints para diferentes tamaños de pantalla
 * mobile: 0-767px
 * tablet: 768-1023px
 * desktop: 1024px+
 */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

/**
 * Obtiene las dimensiones actuales de la pantalla
 */
export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

/**
 * Determina el tipo de dispositivo basado en el ancho
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const { width } = getScreenDimensions();
  
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
};

/**
 * Verifica si el dispositivo es móvil
 */
export const isMobile = (): boolean => {
  return getDeviceType() === 'mobile';
};

/**
 * Verifica si el dispositivo es tablet
 */
export const isTablet = (): boolean => {
  return getDeviceType() === 'tablet';
};

/**
 * Verifica si el dispositivo es desktop
 */
export const isDesktop = (): boolean => {
  return getDeviceType() === 'desktop';
};

// ==================== ESCALADO RESPONSIVE ====================

/**
 * Escala un valor basado en el ancho de la pantalla
 * Útil para mantener proporciones en diferentes dispositivos
 */
export const scale = (size: number): number => {
  const { width } = getScreenDimensions();
  const baseWidth = 375; // iPhone 11 Pro como base
  return (width / baseWidth) * size;
};

/**
 * Escala vertical basada en la altura de la pantalla
 */
export const verticalScale = (size: number): number => {
  const { height } = getScreenDimensions();
  const baseHeight = 812; // iPhone 11 Pro como base
  return (height / baseHeight) * size;
};

/**
 * Escala moderada que combina scale con un factor
 * Útil para que no escale demasiado en pantallas grandes
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// ==================== FUNCIONES RESPONSIVE ====================

/**
 * Retorna valores diferentes según el tipo de dispositivo
 * VERSIÓN CORREGIDA: Devuelve el tipo correcto basado en los valores proporcionados
 */
export const responsive = <T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}): T | undefined => {
  const deviceType = getDeviceType();
  
  // Prioriza el valor específico del dispositivo
  if (values[deviceType] !== undefined) {
    return values[deviceType];
  }
  
  // Fallback a valores menores si no existe el específico
  if (deviceType === 'desktop' && values.tablet !== undefined) {
    return values.tablet;
  }
  
  return values.mobile;
};

/**
 * Versión mejorada de responsive con valores por defecto
 * CORRECCIÓN CRÍTICA: Esta función ahora devuelve el tipo de unión correcto
 */
export function responsiveValue<M, T = M, D = T>(
  mobile: M,
  tablet?: T,
  desktop?: D
): M | T | D {
  const deviceType = getDeviceType();
  
  if (deviceType === 'desktop' && desktop !== undefined) {
    return desktop;
  }
  
  if (deviceType === 'tablet' && tablet !== undefined) {
    return tablet;
  }
  
  return mobile;
}

// ==================== ESPACIADO RESPONSIVE ====================

/**
 * Calcula el espaciado responsive basado en el dispositivo
 */
export const getResponsiveSpacing = (base: number) => ({
  mobile: base,
  tablet: Math.round(base * 1.2),
  desktop: Math.round(base * 1.5),
});

/**
 * Calcula el tamaño de fuente responsive
 */
export const getResponsiveFontSize = (base: number) => ({
  mobile: base,
  tablet: Math.round(base * 1.1),
  desktop: Math.round(base * 1.2),
});

// ==================== LAYOUT HELPERS ====================

/**
 * Calcula el número de columnas para un grid responsive
 */
export const getGridColumns = (): number => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return 4;
    case 'tablet':
      return 3;
    case 'mobile':
    default:
      return 1;
  }
};

/**
 * Calcula el ancho de modal responsive
 */
export const getModalWidth = (): string | number => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return 600;
    case 'tablet':
      return '70%';
    case 'mobile':
    default:
      return '90%';
  }
};

/**
 * Calcula el padding responsive para contenedores
 */
export const getContainerPadding = (): number => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return 32;
    case 'tablet':
      return 24;
    case 'mobile':
    default:
      return 16;
  }
};

// ==================== TABLA RESPONSIVE ====================

/**
 * Calcula anchos de columna responsive para tablas
 */
export const getTableColumnWidth = (baseWidth: number): number => {
  const deviceType = getDeviceType();
  
  switch (deviceType) {
    case 'desktop':
      return baseWidth * 1.3;
    case 'tablet':
      return baseWidth * 1.1;
    case 'mobile':
    default:
      return baseWidth;
  }
};

/**
 * Determina si se debe mostrar la tabla en modo compacto
 */
export const useCompactTable = (): boolean => {
  return isMobile();
};

// ==================== ORIENTACIÓN ====================

/**
 * Verifica si el dispositivo está en modo horizontal
 */
export const isLandscape = (): boolean => {
  const { width, height } = getScreenDimensions();
  return width > height;
};

/**
 * Verifica si el dispositivo está en modo vertical
 */
export const isPortrait = (): boolean => {
  return !isLandscape();
};
