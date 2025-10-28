// src/screens/LoteDetalles.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card, Chip } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/loteDetalles.styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoteDetalles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lote }: any = route.params ?? { lote: null };

  if (!lote) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="alert-circle-outline" size={64} color="#999" />
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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Encabezado con estado */}
        <Card style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>Lote #{lote.referenciaLote || "Sin referencia"}</Text>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons name="information-outline" size={20} color="#333" style={{ marginRight: 8 }} />
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
              <Text style={styles.infoLabel}>Colores</Text>
              <Text style={styles.infoValue}>{lote.colores || 0}</Text>
            </View>
          </View>
        </Card>

        {/* Fechas */}
        <Card style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons name="calendar-range" size={20} color="#333" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>Fechas</Text>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateBox}>
              <MaterialCommunityIcons name="calendar-import" size={24} color="#2196F3" />
              <Text style={styles.dateLabel}>Entrada</Text>
              <Text style={styles.dateValue}>{lote.fechaEntrada || "Sin fecha"}</Text>
            </View>
            <MaterialCommunityIcons name="arrow-right" size={24} color="#999" />
            <View style={styles.dateBox}>
              <MaterialCommunityIcons name="calendar-export" size={24} color="#4CAF50" />
              <Text style={styles.dateLabel}>Salida</Text>
              <Text style={styles.dateValue}>{lote.fechaSalida || "Sin fecha"}</Text>
            </View>
          </View>
        </Card>

        {/* Tallas */}
        <Card style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons name="hanger" size={20} color="#333" style={{ marginRight: 8 }} />
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

        {/* Resumen de costos */}
        <Card style={styles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <MaterialCommunityIcons name="calculator" size={20} color="#333" style={{ marginRight: 8 }} />
            <Text style={styles.sectionTitle}>Resumen de costos</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Total de prendas:</Text>
            <Text style={styles.costValue}>{lote.totalPrendas || 0} unidades</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <Text style={styles.costLabelTotal}>Total del lote:</Text>
            <Text style={styles.costValueTotal}>
              ${(lote.totalLote || 0).toLocaleString("es-CO")}
            </Text>
          </View>
        </Card>

        {/* Insumos */}
        {lote.insumos && (
          <Card style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <MaterialCommunityIcons name="package-variant" size={20} color="#333" style={{ marginRight: 8 }} />
              <Text style={styles.sectionTitle}>Insumos</Text>
            </View>
            <Text style={styles.insumosText}>{lote.insumos}</Text>
          </Card>
        )}

        {/* Botones de acción */}
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            icon="arrow-left"
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            Volver
          </Button>
          <Button
            mode="contained"
            icon="printer"
            style={styles.primaryButton}
            onPress={() => {
              console.log("Imprimir lote:", lote);
            }}
          >
            Imprimir
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}