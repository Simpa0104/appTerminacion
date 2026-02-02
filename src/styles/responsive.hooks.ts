// styles/responsive.hooks.ts
import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { getDeviceType, getScreenDimensions, isMobile, isTablet, isDesktop, responsive, responsiveValue } from './responsive.utils';

/**
 * Hook que devuelve las dimensiones actuales de la pantalla
 * y se actualiza cuando cambian (rotación, etc.)
 */
export const useScreenDimensions = () => {
  const [dimensions, setDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        setDimensions({ width: window.width, height: window.height });
      }
    );

    return () => subscription?.remove();
  }, []);

  return dimensions;
};

/**
 * Hook que devuelve el tipo de dispositivo actual
 * y se actualiza cuando cambia
 */
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(getDeviceType());

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      () => {
        setDeviceType(getDeviceType());
      }
    );

    return () => subscription?.remove();
  }, []);

  return deviceType;
};

/**
 * Hook que devuelve booleanos para cada tipo de dispositivo
 */
export const useResponsive = () => {
  const deviceType = useDeviceType();

  return {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    deviceType,
  };
};

/**
 * Hook que devuelve un valor responsive basado en el dispositivo
 * CORRECCIÓN: Ahora TypeScript puede inferir correctamente los tipos
 */
export function useResponsiveValue<M, T = M, D = T>(
  mobile: M,
  tablet?: T,
  desktop?: D
): M | T | D {
  const deviceType = useDeviceType();

  if (deviceType === 'desktop' && desktop !== undefined) {
    return desktop;
  }

  if (deviceType === 'tablet' && tablet !== undefined) {
    return tablet;
  }

  return mobile;
}

/**
 * Hook que devuelve un valor responsive usando un objeto
 * Ejemplo: const size = useResponsiveObject({ mobile: 16, tablet: 20, desktop: 24 })
 */
export const useResponsiveObject = <T,>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
}): T | undefined => {
  const deviceType = useDeviceType();
  return responsive(values);
};

/**
 * Hook que devuelve la orientación actual del dispositivo
 */
export const useOrientation = () => {
  const { width, height } = useScreenDimensions();
  return width > height ? 'landscape' : 'portrait';
};

/**
 * Hook para determinar el número de columnas en un grid
 */
export const useGridColumns = (customConfig?: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}) => {
  const deviceType = useDeviceType();

  if (customConfig) {
    if (deviceType === 'desktop' && customConfig.desktop) {
      return customConfig.desktop;
    }
    if (deviceType === 'tablet' && customConfig.tablet) {
      return customConfig.tablet;
    }
    if (customConfig.mobile) {
      return customConfig.mobile;
    }
  }

  // Valores por defecto
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
