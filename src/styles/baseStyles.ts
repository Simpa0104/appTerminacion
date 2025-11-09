// styles/baseStyles.ts
import { StyleSheet } from "react-native";
import { theme } from "./theme";

/**
 * Estilos base reutilizables para toda la aplicación
 * Importa estos estilos en lugar de duplicar código
 */
export const baseStyles = StyleSheet.create({
  // ==================== CONTENEDORES ====================
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },

  containerAlt: {
    flex: 1,
    backgroundColor: theme.colors.backgroundAlt,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
  },

  scrollContent: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },

  // ==================== CARDS ====================
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    ...theme.shadow.md,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },

  // ==================== ESTADÍSTICAS ====================
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },

  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderLight,
    ...theme.shadow.md,
  },

  statNumber: {
    fontSize: theme.fontSize.display3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },

  statLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    fontWeight: theme.fontWeight.medium,
  },

  // ==================== INPUTS ====================
  input: {
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderDark,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.card,
    fontSize: theme.fontSize.lg,
    height: theme.heights.input,
  },

  inputSmall: {
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    fontSize: theme.fontSize.base,
    height: theme.heights.inputSmall,
  },

  searchBar: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
    fontSize: theme.fontSize.base,
    height: theme.heights.input,
  },

  // ==================== LABELS ====================
  label: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },

  labelLarge: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },

  // ==================== TÍTULOS ====================
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  },

  titleCenter: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },

  sectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    marginVertical: theme.spacing.md,
    color: theme.colors.text.primary,
  },

  subtitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.secondary,
  },

  // ==================== TABLAS ====================
  tableContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: "hidden",
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: theme.colors.table.header,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.border,
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: theme.colors.table.row,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.borderLight,
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },

  tableCell: {
    paddingHorizontal: theme.spacing.md,
    justifyContent: "center",
  },

  headerText: {
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize.base,
    color: theme.colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // ==================== ESTADOS VACÍOS/CARGA ====================
  emptyContainer: {
    padding: 50,
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  },

  emptyText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    marginVertical: theme.spacing.md,
    lineHeight: 24,
  },

  loadingContainer: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text.quaternary,
  },

  // ==================== MODALS ====================
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xxl,
    width: "90%",
    maxHeight: "80%",
    ...theme.shadow.xl,
  },

  modalContentLarge: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xxl,
    width: "90%",
    maxWidth: 600,
    maxHeight: "85%",
    ...theme.shadow.xl,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxl,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.table.header,
  },

  modalTitle: {
    fontSize: theme.fontSize.display1,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
  },

  modalBody: {
    padding: theme.spacing.xxl,
    maxHeight: 500,
  },

  modalSectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    borderTopWidth: theme.borderWidth.thin,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.table.header,
  },

  // ==================== OVERLAY (Portal) ====================
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    backgroundColor: theme.colors.overlay,
  },

  overlayCard: {
    width: "90%",
    maxWidth: 800,
    maxHeight: "85%",
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    backgroundColor: theme.colors.card,
    ...theme.shadow.xl,
  },

  overlayContent: {
    maxHeight: 550,
  },

  // ==================== BOTONES DE ACCIÓN ====================
  accionesRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: theme.spacing.sm,
  },

  buttonText: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.base,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  },

  buttonPrimary: {
    color: theme.colors.primary,
  },

  buttonDanger: {
    color: theme.colors.error,
  },

  buttonSecondary: {
    color: theme.colors.text.tertiary,
  },

  // ==================== CHIPS/BADGES ====================
  chip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    overflow: "hidden",
  },

  chipBlue: {
    backgroundColor: theme.colors.chip.blue.bg,
    color: theme.colors.chip.blue.text,
  },

  chipGreen: {
    backgroundColor: theme.colors.chip.green.bg,
    color: theme.colors.chip.green.text,
  },

  chipOrange: {
    backgroundColor: theme.colors.chip.orange.bg,
    color: theme.colors.chip.orange.text,
  },

  // ==================== FILAS DE FORMULARIO ====================
  formRow: {
    marginBottom: theme.spacing.md,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
    borderBottomWidth: theme.borderWidth.thin,
    borderBottomColor: theme.colors.borderLight,
  },

  // ==================== ERRORES ====================
  errorText: {
    color: theme.colors.text.error,
    fontSize: theme.fontSize.sm,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },

  // ==================== DIVIDER ====================
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },

  // ==================== HEADER ROW ====================
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
});

/**
 * Factory functions para crear estilos dinámicos
 */
export const createButtonStyle = (variant: "primary" | "secondary" | "danger" = "primary") => {
  const colors = {
    primary: theme.colors.primary,
    secondary: theme.colors.text.tertiary,
    danger: theme.colors.error,
  };

  return {
    backgroundColor: colors[variant],
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    alignItems: "center" as const,
  };
};

export const createChipStyle = (color: keyof typeof theme.colors.chip) => {
  return {
    backgroundColor: theme.colors.chip[color].bg,
    color: theme.colors.chip[color].text,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
  };
};