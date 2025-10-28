// src/styles/loteDetalles.styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // Estado vacío
  emptyState: {
    alignItems: "center",
    padding: 40,
  },

  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 24,
  },

  // Encabezado con estado
  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },

  headerSubtitle: {
    fontSize: 16,
    color: "#666",
  },

  estadoChip: {
    paddingHorizontal: 8,
  },

  // Cards de secciones
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cardHeaderIcon: {
    fontSize: 22,
    marginRight: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },

  // Información general
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  infoItem: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 16,
    color: "#333",
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
    backgroundColor: "#F5F7FA",
    padding: 16,
    borderRadius: 12,
  },

  dateIcon: {
    fontSize: 28,
    marginBottom: 4,
  },

  dateLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontWeight: "600",
  },

  dateValue: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
    fontWeight: "500",
  },

  dateArrow: {
    fontSize: 24,
    color: "#999",
    marginHorizontal: 12,
  },

  // Colores
  colorCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  colorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  colorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  colorTotal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4F46E5",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  colorSizesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  colorSizeBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    minWidth: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  colorSizeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 2,
  },

  colorSizeValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },

  // Tallas (vista antigua)
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  sizeBox: {
    width: "18%",
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
  },

  sizeLabel: {
    fontSize: 14,
    color: "#1976D2",
    fontWeight: "700",
    marginBottom: 4,
  },

  sizeValue: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
  },

  // Costos
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  costLabel: {
    fontSize: 14,
    color: "#666",
  },

  costValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },

  costLabelTotal: {
    fontSize: 18,
    color: "#333",
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
    marginVertical: 16,
  },

  // Procesos
  procesosTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },

  procesoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  procesoInfo: {
    flex: 1,
  },

  procesoNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },

  procesoProveedor: {
    fontSize: 12,
    color: "#666",
  },

  procesoCosto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2563EB",
  },

  procesoTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },

  procesoTotalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4F46E5",
  },

  procesoTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F46E5",
  },

  // Insumos
  insumosText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },

  // Botones
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 12,
  },

  secondaryButton: {
    flex: 1,
    borderColor: "#007bff",
    borderRadius: 12,
  },

  backButton: {
    backgroundColor: "#007bff",
    borderRadius: 12,
  },
});