// styles/loteDetalles.styles.responsive.ts
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

  scrollContent: {
    padding: theme.spacing.xl,
    paddingBottom: toNumber(responsiveValue(40, 50, 60)),
  } as ViewStyle,

  // Estado vacío - responsive
  emptyState: {
    alignItems: "center",
    padding: toNumber(responsiveValue(40, 50, 60)),
  } as ViewStyle,

  emptyIcon: {
    fontSize: toNumber(responsiveValue(64, 72, 80)),
    marginBottom: theme.spacing.lg,
  } as TextStyle,

  // Encabezado con estado - responsive
  headerCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    ...theme.shadow.md,
  },

  headerContent: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    alignItems: responsiveValue("flex-start", "center", "center") as "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    gap: toNumber(responsiveValue(theme.spacing.md, 0, 0)),
  } as ViewStyle,

  headerTitle: {
    fontSize: theme.fontSize.display1,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  headerSubtitle: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.tertiary,
  } as TextStyle,

  estadoChip: {
    paddingHorizontal: theme.spacing.sm,
    alignSelf: responsiveValue("flex-start", "auto", "auto") as "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
  } as ViewStyle,

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },

  cardHeaderIcon: {
    fontSize: theme.fontSize.display1,
    marginRight: theme.spacing.sm,
  } as TextStyle,

  // Información general - responsive
  infoRow: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    marginBottom: theme.spacing.lg,
    gap: toNumber(responsiveValue(theme.spacing.md, 0, 0)),
  } as ViewStyle,

  infoItem: {
    flex: 1,
    marginBottom: toNumber(responsiveValue(theme.spacing.sm, 0, 0)),
  } as ViewStyle,

  infoLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.fontWeight.semibold,
  } as TextStyle,

  infoValue: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  } as TextStyle,

  // Fechas - responsive
  dateContainer: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    alignItems: "center",
    gap: toNumber(responsiveValue(theme.spacing.md, 0, 0)),
  } as ViewStyle,

  dateBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.colors.backgroundAlt,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    minWidth: toNumber(responsiveValue(undefined, 150, 180)),
  } as ViewStyle,

  dateIcon: {
    fontSize: toNumber(responsiveValue(28, 32, 36)),
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  dateLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.xs,
    fontWeight: theme.fontWeight.semibold,
  } as TextStyle,

  dateValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  } as TextStyle,

  dateArrow: {
    fontSize: toNumber(responsiveValue(24, 28, 32)),
    color: theme.colors.text.quaternary,
    marginHorizontal: theme.spacing.md,
    display: responsiveValue("none", "flex", "flex") as "none" | "flex",
  } as any, // display puede ser tanto de View como de Text

  // Colores - responsive
  colorCard: {
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  },

  colorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },

  colorName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
  } as TextStyle,

  colorTotal: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: "#4F46E5",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.lg,
  } as TextStyle,

  colorSizesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },

  colorSizeBox: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    minWidth: toNumber(responsiveValue(60, 70, 80)),
    alignItems: "center",
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  } as ViewStyle,

  colorSizeLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.fontWeight.semibold,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  colorSizeValue: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  // Tallas (vista antigua) - responsive
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },

  sizeBox: {
    width: responsiveValue("30%", "22%", "18%"),
    backgroundColor: "#E3F2FD",
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  } as ViewStyle,

  sizeLabel: {
    fontSize: theme.fontSize.base,
    color: "#1976D2",
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  sizeValue: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  // Costos - responsive
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },

  costLabel: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.tertiary,
  } as TextStyle,

  costValue: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.medium,
  } as TextStyle,

  costLabelTotal: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text.secondary,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  costValueTotal: {
    fontSize: theme.fontSize.display2,
    color: theme.colors.success,
    fontWeight: theme.fontWeight.bold,
  } as TextStyle,

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },

  // Procesos - responsive
  procesosTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  } as TextStyle,

  procesoRow: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    alignItems: responsiveValue("stretch", "center", "center") as "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
    backgroundColor: theme.colors.backgroundAlt,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    gap: toNumber(responsiveValue(theme.spacing.sm, 0, 0)),
  } as ViewStyle,

  procesoInfo: {
    flex: 1,
  },

  procesoNombre: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  procesoProveedor: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.tertiary,
  } as TextStyle,

  procesoCosto: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: "#2563EB",
    textAlign: responsiveValue("right", "right", "right") as "auto" | "left" | "right" | "center" | "justify",
  } as TextStyle,

  procesoTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.sm,
  },

  procesoTotalLabel: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.bold,
    color: "#4F46E5",
  } as TextStyle,

  procesoTotalValue: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: "#4F46E5",
  } as TextStyle,

  // Insumos
  insumosText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: toNumber(responsiveValue(20, 22, 24)),
  } as TextStyle,

  // Botones - responsive
  buttonContainer: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  } as ViewStyle,

  primaryButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    minHeight: theme.heights.button,
  } as ViewStyle,

  secondaryButton: {
    flex: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    minHeight: theme.heights.button,
  } as ViewStyle,

  backButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    minHeight: theme.heights.button,
    minWidth: toNumber(responsiveValue(undefined, 150, 200)),
  } as ViewStyle,
});
