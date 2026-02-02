// styles/historialLotes.styles.responsive.ts
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { theme } from "./theme.responsive";
import { baseStyles } from "./baseStyles.responsive";
import { responsiveValue } from "./responsive.utils";

// Helper para convertir valores responsive a número
const toNumber = (value: string | number | undefined): number | undefined => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

export default StyleSheet.create({
    container: baseStyles.container,
    searchBar: baseStyles.searchBar,
    statsRow: baseStyles.statsRow,
    statCard: baseStyles.statCard,
    statNumber: baseStyles.statNumber,
    statLabel: baseStyles.statLabel,
    sectionTitle: baseStyles.sectionTitle,
    loadingContainer: baseStyles.loadingContainer,
    loadingText: baseStyles.loadingText,
    emptyContainer: baseStyles.emptyContainer,
    emptyText: baseStyles.emptyText,
    tableContainer: baseStyles.tableContainer,
    tableHeader: baseStyles.tableHeader,
    tableRow: baseStyles.tableRow,
    tableCell: baseStyles.tableCell,
    headerText: baseStyles.headerText,
    accionesRow: baseStyles.accionesRow,
    overlay: baseStyles.overlay,
    overlayCard: baseStyles.overlayCard,
    overlayContent: baseStyles.overlayContent,
    modalOverlay: baseStyles.modalOverlay,
    modalContent: baseStyles.modalContent,
    modalHeader: baseStyles.modalHeader,
    modalTitle: baseStyles.modalTitle,
    modalSectionTitle: baseStyles.modalSectionTitle,
    modalBody: baseStyles.modalBody,
    modalActions: baseStyles.modalActions,
    card: baseStyles.card,

    // Tabla
    tableScrollContainer: {
        paddingBottom: toNumber(responsiveValue(10, 12, 15)),
    } as ViewStyle,

    // Columnas - responsive
    colReferencia: {
        width: toNumber(responsiveValue(120, 140, 160)),
        minWidth: 120,
    } as ViewStyle,

    colCliente: {
        width: toNumber(responsiveValue(130, 150, 180)),
        minWidth: 130,
    } as ViewStyle,

    colFecha: {
        width: toNumber(responsiveValue(100, 120, 140)),
        minWidth: 100,
    } as ViewStyle,

    colTipo: {
        width: toNumber(responsiveValue(120, 140, 160)),
        minWidth: 120,
    } as ViewStyle,

    colCantidad: {
        width: toNumber(responsiveValue(80, 100, 120)),
        minWidth: 80,
    } as ViewStyle,

    colTotal: {
        width: toNumber(responsiveValue(110, 130, 150)),
        fontWeight: "600",
        minWidth: 110,
    } as any, // Mezcla de View y Text styles

    colEstado: {
        width: toNumber(responsiveValue(120, 140, 160)),
        minWidth: 120,
    } as ViewStyle,

    colAcciones: {
        width: toNumber(responsiveValue(130, 150, 180)),
        minWidth: 130,
    } as ViewStyle,

    // Botones de estado - responsive
    estadoButton: {
        minWidth: toNumber(responsiveValue(100, 110, 120)),
        paddingHorizontal: theme.spacing.sm,
    } as ViewStyle,

    estadoCompletado: {
        borderColor: "#4CAF50",
        backgroundColor: "#E8F5E9",
    },

    estadoProceso: {
        borderColor: "#FF9800",
        backgroundColor: "#FFF3E0",
    },

    verButton: {
        color: "#007AFF",
        fontWeight: "600",
        marginRight: toNumber(responsiveValue(8, 10, 12)),
        fontSize: theme.fontSize.base,
    } as TextStyle,

    eliminarButton: {
        color: "#FF3B30",
        fontWeight: "600",
        fontSize: theme.fontSize.base,
    } as TextStyle,
});
