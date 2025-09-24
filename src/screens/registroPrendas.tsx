import React from "react";
import { Text } from "react-native";
import Layout from "../components/layout";

export default function RegistroPrendas() {
  return (
    <Layout title="Registro Prendas">
      <Text>
        Donde habrá un formulario donde se puedan registrar prendas que se
        guardaran en la base de datos y tendrá las siguientes preguntas: 
        tipo de prenda 
        Marca 
        Referencia
        Precio por XS/EP/ECG 
        Precio por S/P/CH 
        Precio por M/M/M 
        Precio por L/G/G 
        Precio por XL/EG/E 
        Tendrá adiciones? Si?
        Precio por abotonar? 
        Cantidad de botones 
        Se debe de pulir?
      </Text>
    </Layout>
  );
}
