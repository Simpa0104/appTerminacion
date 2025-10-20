import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LoteDetalles() {
  const navigation = useNavigation();
  const route = useRoute();
  const { lote }: any = route.params;

  return (
    <ScrollView style={{ padding: 16, backgroundColor: "#f4f4f4", flex: 1 }}>
      <Card style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
          Detalles del lote
        </Text>

        <Text>Referencia: {lote.referencia}</Text>
        <Text>Cliente: {lote.cliente}</Text>
        <Text>Fecha de entrada: {lote.fechaEntrada}</Text>
        <Text>Fecha de salida: {lote.fechaSalida}</Text>
        <Text>Tipo de prenda: {lote.tipoPrenda}</Text>
        <Text>Colores: {lote.colores}</Text>
        <Text>Implementos: {lote.implementos}</Text>
        <Text>XS: {lote.xs}</Text>
        <Text>S: {lote.s}</Text>
        <Text>M: {lote.m}</Text>
        <Text>L: {lote.l}</Text>
        <Text>XL: {lote.xl}</Text>
        <Text>Total de prendas: {lote.total}</Text>
        <Text>Estado actual: {lote.estado}</Text>

        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          Volver al Dashboard
        </Button>
      </Card>
    </ScrollView>
  );
}
