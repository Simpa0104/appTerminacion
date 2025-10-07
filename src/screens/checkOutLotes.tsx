import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import RegistroLotes from "./registroLotes";
import styles from "../styles/checkOutLotes.styles";
import Layout from "../components/layout";

export default function CheckOutLotes() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <Layout title="CheckOutLotes">
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => setMostrarFormulario(!mostrarFormulario)}
        style={styles.buttonCenter}
      >
        {mostrarFormulario ? "X" : "Agregar Lote"}
      </Button>
      {mostrarFormulario && (

        <Card style={styles.card}>
          <Card.Title title="Registro de Lotes" />
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
