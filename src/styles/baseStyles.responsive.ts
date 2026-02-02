// styles/baseStyles.responsive.ts
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { theme } from "./theme.responsive";
import { responsiveValue } from "./responsive.utils";

// Helper para convertir valores responsive a número
const toNumber = (value: string | number | undefined): number | undefined => {
  if (typeof value === 'string') {
    return parseFloat(value);
  }
  return value;
};

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
    paddingBottom: toNumber(responsiveValue(40, 50, 60)),
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
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  } as ViewStyle,

  statCard: {
    flex: 1,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.xxl,
    borderRadius: theme.borderRadius.lg,
    alignItems: "center",
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.borderLight,
    ...theme.shadow.md,
    minWidth: toNumber(responsiveValue(undefined, 150, 180)),
  } as ViewStyle,

  statNumber: {
    fontSize: theme.fontSize.display3,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  } as TextStyle,

  statLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    fontWeight: theme.fontWeight.medium,
  } as TextStyle,

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
  } as TextStyle,

  labelLarge: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.md,
  } as TextStyle,

  // ==================== TÍTULOS ====================
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  } as TextStyle,

  titleCenter: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  } as TextStyle,

  sectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    marginVertical: theme.spacing.md,
    color: theme.colors.text.primary,
  } as TextStyle,

  subtitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text.secondary,
  } as TextStyle,

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
  } as TextStyle,

  // ==================== ESTADOS VACÍOS/CARGA ====================
  emptyContainer: {
    padding: toNumber(responsiveValue(50, 60, 70)),
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
    borderWidth: theme.borderWidth.thin,
    borderColor: theme.colors.border,
  } as ViewStyle,

  emptyText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text.tertiary,
    textAlign: "center",
    marginVertical: theme.spacing.md,
    lineHeight: toNumber(responsiveValue(24, 26, 28)),
  } as TextStyle,

  loadingContainer: {
    padding: toNumber(responsiveValue(50, 60, 70)),
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  loadingText: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.text.quaternary,
  } as TextStyle,

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
    width: responsiveValue("90%", "70%", 600),
    maxHeight: "80%",
    ...theme.shadow.xl,
  } as ViewStyle,

  modalContentLarge: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.xxl,
    width: responsiveValue("90%", "80%", "60%"),
    maxWidth: toNumber(responsiveValue(undefined, 700, 800)),
    maxHeight: "85%",
    ...theme.shadow.xl,
  } as ViewStyle,

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
  } as TextStyle,

  modalBody: {
    padding: theme.spacing.xxl,
    maxHeight: toNumber(responsiveValue(500, 600, 700)),
  } as ViewStyle,

  modalSectionTitle: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: theme.borderWidth.medium,
    borderBottomColor: theme.colors.primary,
  } as TextStyle,

  modalActions: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "flex-end",
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    borderTopWidth: theme.borderWidth.thin,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.table.header,
  } as ViewStyle,

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
    width: responsiveValue("90%", "80%", "60%"),
    maxWidth: toNumber(responsiveValue(undefined, 900, 1000)),
    maxHeight: "85%",
    borderRadius: theme.borderRadius.xxl,
    overflow: "hidden",
    backgroundColor: theme.colors.card,
    ...theme.shadow.xl,
  } as ViewStyle,

  overlayContent: {
    maxHeight: toNumber(responsiveValue(550, 650, 750)),
  } as ViewStyle,

  // ==================== BOTONES DE ACCIÓN ====================
  accionesRow: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "center",
    gap: theme.spacing.sm,
  } as ViewStyle,

  buttonText: {
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.base,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  } as TextStyle,

  buttonPrimary: {
    color: theme.colors.primary,
  } as TextStyle,

  buttonDanger: {
    color: theme.colors.error,
  } as TextStyle,

  buttonSecondary: {
    color: theme.colors.text.tertiary,
  } as TextStyle,

  // ==================== CHIPS/BADGES ====================
  chip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xl,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    overflow: "hidden",
  } as TextStyle,

  chipBlue: {
    backgroundColor: theme.colors.chip.blue.bg,
    color: theme.colors.chip.blue.text,
  } as TextStyle,

  chipGreen: {
    backgroundColor: theme.colors.chip.green.bg,
    color: theme.colors.chip.green.text,
  } as TextStyle,

  chipOrange: {
    backgroundColor: theme.colors.chip.orange.bg,
    color: theme.colors.chip.orange.text,
  } as TextStyle,

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
  } as TextStyle,

  // ==================== DIVIDER ====================
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },

  // ==================== HEADER ROW ====================
  headerRow: {
    flexDirection: responsiveValue("column", "row", "row"),
    justifyContent: "space-between",
    alignItems: responsiveValue("stretch", "center", "center"),
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  } as ViewStyle,
});

/**
 * Factory functions para crear estilos dinámicos
 */
export const createButtonStyle = (variant: "primary" | "secondary" | "danger" = "primary"): ViewStyle => {
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
    alignItems: "center",
    minWidth: toNumber(responsiveValue(undefined, 120, 150)),
  };
};

export const createChipStyle = (color: keyof typeof theme.colors.chip): TextStyle => {
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
