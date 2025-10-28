// src/styles/loteDetalles.styles.ts
import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },

  // Estado vacío
  emptyState: {
    alignItems: "center",
    padding: 40,
  },

  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
  },

  // Encabezado con estado
  headerCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },

  estadoChip: {
    paddingHorizontal: 8,
  },

  // Cards de secciones
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadow.card,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 0,
  },

  // Información general
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },

  // Fechas
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },

  dateLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 4,
    fontWeight: "600",
  },

  dateValue: {
    fontSize: 14,
    color: theme.colors.text.primary,
    marginTop: 4,
    fontWeight: "500",
  },

  // Tallas
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  sizeBox: {
    width: "18%",
    backgroundColor: "#E3F2FD",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },

  sizeLabel: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "700",
    marginBottom: 4,
  },

  sizeValue: {
    fontSize: 20,
    color: theme.colors.text.primary,
    fontWeight: "bold",
  },

  // Costos
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
  },

  costLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },

  costValue: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },

  costLabelTotal: {
    fontSize: 18,
    color: theme.colors.text.primary,
    fontWeight: "700",
  },

  costValueTotal: {
    fontSize: 24,
    color: "#4CAF50",
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: theme.spacing.md,
  },

  // Insumos
  insumosText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },

  // Botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing.lg,
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },

  secondaryButton: {
    flex: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },

  backButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  },
});