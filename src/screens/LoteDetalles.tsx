// src/screens/LoteDetalles.tsx
import React, { useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Button, Card, Chip, Menu } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/loteDetalles.styles";
import PDFShiftService from "../services/pdfShiftService";

export default function LoteDetalles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lote }: any = route.params ?? { lote: null };

  const [isGenerating, setIsGenerating] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  if (!lote) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay datos del lote</Text>
              <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                Volver al Dashboard
              </Button>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Completado":
        return "#4CAF50";
      case "En proceso":
        return "#FF9800";
      case "Recibido":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setMenuVisible(false);
    try {
      await PDFShiftService.generateAndSharePDF(lote);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateOnly = async () => {
    setIsGenerating(true);
    setMenuVisible(false);
    try {
      await PDFShiftService.printPDF(lote);
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado con estado */}
        <Card style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>
                Lote #{lote.referenciaLote || "Sin referencia"}
              </Text>
              <Text style={styles.headerSubtitle}>{lote.cliente || "Sin cliente"}</Text>
            </View>
            <Chip
              mode="flat"
              style={[styles.estadoChip, { backgroundColor: getEstadoColor(lote.estado) }]}
              textStyle={{ color: "#fff", fontWeight: "bold" }}
            >
              {lote.estado || "Recibido"}
            </Chip>
          </View>
        </Card>

        {/* Información general */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Información General</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cliente</Text>
              <Text style={styles.infoValue}>{lote.cliente || "Sin cliente"}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Tipo de prenda</Text>
              <Text style={styles.infoValue}>{lote.tipoPrenda || "Sin tipo"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Ref. Prenda</Text>
              <Text style={styles.infoValue}>{lote.referenciaPrenda || "Sin ref."}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Total colores</Text>
              <Text style={styles.infoValue}>{lote.colores || 0}</Text>
            </View>
          </View>
        </Card>

        {/* Fechas */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Fechas</Text>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Entrada</Text>
              <Text style={styles.dateValue}>{lote.fechaEntrada || "Sin fecha"}</Text>
            </View>
            <Text style={styles.dateArrow}>→</Text>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>Salida</Text>
              <Text style={styles.dateValue}>{lote.fechaSalida || "Sin fecha"}</Text>
            </View>
          </View>
        </Card>

        {/* Colores y cantidades */}
        {lote.cantidadesPorColor && lote.cantidadesPorColor.length > 0 && (
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Distribución por color</Text>
            </View>

            {lote.cantidadesPorColor.map((color: any, index: number) => {
              const totalColor =
                Number(color.xs || 0) +
                Number(color.s || 0) +
                Number(color.m || 0) +
                Number(color.l || 0) +
                Number(color.xl || 0);

              return (
                <View key={index} style={styles.colorCard}>
                  <View style={styles.colorHeader}>
                    <Text style={styles.colorName}>{color.nombreColor}</Text>
                    <Text style={styles.colorTotal}>{totalColor} prendas</Text>
                  </View>

                  <View style={styles.colorSizesContainer}>
                    {["xs", "s", "m", "l", "xl"].map((talla) => {
                      const cantidad = Number(color[talla] || 0);
                      if (cantidad === 0) return null;

                      return (
                        <View key={talla} style={styles.colorSizeBox}>
                          <Text style={styles.colorSizeLabel}>{talla.toUpperCase()}</Text>
                          <Text style={styles.colorSizeValue}>{cantidad}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </Card>
        )}

        {/* Tallas totales */}
        {(!lote.cantidadesPorColor || lote.cantidadesPorColor.length === 0) && (
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Distribución por tallas</Text>
            </View>

            <View style={styles.sizeContainer}>
              {["xs", "s", "m", "l", "xl"].map((talla) => (
                <View key={talla} style={styles.sizeBox}>
                  <Text style={styles.sizeLabel}>{talla.toUpperCase()}</Text>
                  <Text style={styles.sizeValue}>{lote[talla] || 0}</Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Resumen de costos */}
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>Resumen de costos</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Total de prendas</Text>
            <Text style={styles.costValue}>{lote.totalPrendas || 0} unidades</Text>
          </View>

          {lote.procesos && lote.procesos.length > 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.procesosTitle}>Costos por proceso</Text>

              {lote.procesos.map((proceso: any, index: number) => (
                <View key={index} style={styles.procesoRow}>
                  <View style={styles.procesoInfo}>
                    <Text style={styles.procesoNombre}>{proceso.nombre}</Text>
                    {proceso.proveedor && (
                      <Text style={styles.procesoProveedor}>{proceso.proveedor}</Text>
                    )}
                  </View>
                  <Text style={styles.procesoCosto}>
                    ${(proceso.costo || 0).toLocaleString("es-CO")}
                  </Text>
                </View>
              ))}

              <View style={styles.procesoTotal}>
                <Text style={styles.procesoTotalLabel}>Subtotal procesos</Text>
                <Text style={styles.procesoTotalValue}>
                  ${lote.procesos
                    .reduce((sum: number, p: any) => sum + (Number(p.costo) || 0), 0)
                    .toLocaleString("es-CO")}
                </Text>
              </View>
            </>
          )}

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <Text style={styles.costLabelTotal}>Total del lote</Text>
            <Text style={styles.costValueTotal}>
              ${(lote.totalLote || 0).toLocaleString("es-CO")}
            </Text>
          </View>
        </Card>

        {/* Insumos */}
        {lote.insumos && (
          <Card style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Insumos</Text>
            </View>
            <Text style={styles.insumosText}>{lote.insumos}</Text>
          </Card>
        )}

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
            disabled={isGenerating}
          >
            Volver
          </Button>

          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="contained"
                style={styles.primaryButton}
                onPress={() => setMenuVisible(true)}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  "Generar Factura PDF"
                )}
              </Button>
            }
          >
            <Menu.Item
              onPress={handleGeneratePDF}
              title="Generar y Compartir"
              leadingIcon="share-variant"
            />
            <Menu.Item
              onPress={handleGenerateOnly}
              title="Solo Generar"
              leadingIcon="file-pdf-box"
            />
          </Menu>
        </View>
      </ScrollView>
    </View>
  );
}
