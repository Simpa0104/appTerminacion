export interface Lote {
    id: string;
    estado?: string;
    fechaEntrada?: string;
    fechaSalida?: string;
    referenciaLote?: string;
    cliente?: string;
    referenciaPrenda?: string;
    tipoPrenda?: string;
    totalPrendas?: number | string;
    totalLote?: number | string;
    colores?: string | number;
    xs?: string | number;
    s?: string | number;
    m?: string | number;
    l?: string | number;
    xl?: string | number;
    insumos?: string;
  }