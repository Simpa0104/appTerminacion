import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import RegistroLotes from "./registroPrendas";
import styles from "../styles/historialPrendas.styles";
import Layout from "../components/layout";

export default function HistorialPrendas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <Layout title="Historial de Prendas" scrollable>
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
        style={styles.buttonCenter}
      >
        {mostrarFormulario ? "X" : "Agregar prenda"}
      </Button>
      {mostrarFormulario && (

        <Card style={styles.card}>
          <Card.Title title="Registro de prendas" />
          <Card.Content style={{ height: 400 }}>
            <ScrollView>
            <RegistroLotes />
            </ScrollView>
          </Card.Content>
        </Card>
      )}

    </View>
    </Layout>
  );
}
