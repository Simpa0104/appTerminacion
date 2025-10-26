// src/screens/LoteDetalles.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "../styles/loteDetalles.styles";

export default function LoteDetalles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lote }: any = route.params ?? { lote: null };

  if (!lote) {
    return (
      <ScrollView style={styles.scrollContent}>
        <Text>No hay datos del lote.</Text>
        <Button onPress={() => navigation.goBack()}>Volver</Button>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Text style={styles.title}>Detalles del Lote</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Referencia</Text>
            <Text style={styles.value}>{lote.referencia}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Cliente</Text>
            <Text style={styles.value}>{lote.cliente}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Fechas</Text>
            <Text style={styles.value}>Entrada: {lote.fechaEntrada}</Text>
            <Text style={styles.value}>Salida: {lote.fechaSalida}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Tipo de prenda</Text>
            <Text style={styles.value}>{lote.tipoPrenda}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Colores</Text>
            <Text style={styles.value}>{lote.colores}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Implementos</Text>
            <Text style={styles.value}>{lote.implementos}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Tallas</Text>
            <View style={styles.sizeContainer}>
              <View style={styles.sizeBox}>
                <Text style={styles.sizeText}>XS: {lote.xs}</Text>
              </View>
              <View style={styles.sizeBox}>
                <Text style={styles.sizeText}>S: {lote.s}</Text>
              </View>
              <View style={styles.sizeBox}>
                <Text style={styles.sizeText}>M: {lote.m}</Text>
              </View>
              <View style={styles.sizeBox}>
                <Text style={styles.sizeText}>L: {lote.l}</Text>
              </View>
              <View style={styles.sizeBox}>
                <Text style={styles.sizeText}>XL: {lote.xl}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Total de prendas</Text>
            <Text style={styles.value}>{lote.total}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Estado actual</Text>
            <Text style={styles.value}>{lote.estado}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              Volver al Dashboard
            </Button>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
