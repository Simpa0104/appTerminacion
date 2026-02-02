// styles/helpers.ts

/**
 * Helper para convertir valores responsive a números
 * Útil cuando responsiveValue puede devolver string | number | undefined
 * y necesitas específicamente un número
 */
export const toNumber = (value: string | number | undefined): number | undefined => {
    if (value === undefined) {
      return undefined;
    }
    
    if (typeof value === 'string') {
      // Intentar parsear strings como "90%" o "700"
      const parsed = parseFloat(value);
      return isNaN(parsed) ? undefined : parsed;
    }
    
    return value;
  };
  
  /**
   * Helper para asegurar que un valor es string o number
   * (React Native acepta ambos para width/height)
   */
  export const toDimensionValue = (value: string | number | undefined): string | number | undefined => {
    return value;
  };
  
  // ==================== TYPE DEFINITIONS ====================
  
  /**
   * Tipos comunes de React Native que necesitan type assertions
   */
  
  export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
  
  export type AlignSelf = "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  
  export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  
  export type JustifyContent = 
    | "flex-start" 
    | "flex-end" 
    | "center" 
    | "space-between" 
    | "space-around" 
    | "space-evenly";
  
  export type TextAlign = "auto" | "left" | "right" | "center" | "justify";
  
  export type FontWeight = 
    | "normal" 
    | "bold" 
    | "100" 
    | "200" 
    | "300" 
    | "400" 
    | "500" 
    | "600" 
    | "700" 
    | "800" 
    | "900";
  
  /**
   * Helper para crear estilos responsive con tipado correcto
   */
  export const createResponsiveStyle = <T extends object>(style: T): T => {
    return style;
  };
  
  /**
   * Helper para verificar si un valor es un porcentaje
   */
  export const isPercentage = (value: string | number | undefined): value is string => {
    return typeof value === 'string' && value.includes('%');
  };
  
  /**
   * Helper para convertir un número a porcentaje string
   */
  export const toPercentage = (value: number): string => {
    return `${value}%`;
  };
  
  /**
   * Helper para extraer el número de un porcentaje
   */
  export const fromPercentage = (value: string): number => {
    return parseFloat(value.replace('%', ''));
  };
  
  /**
   * Ejemplo de uso:
   * 
   * import { toNumber, AlignSelf, FlexDirection } from './helpers';
   * 
   * const styles = StyleSheet.create({
   *   container: {
   *     maxWidth: toNumber(responsiveValue(undefined, 700, 800)),
   *     alignSelf: responsiveValue("stretch", "center", "center") as AlignSelf,
   *     flexDirection: responsiveValue("column", "row", "row") as FlexDirection,
   *   } as ViewStyle,
   * });
   */
  