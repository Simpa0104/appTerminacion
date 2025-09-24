import React from "react";
import { Text } from "react-native";
import Layout from "../components/layout";

export default function checkOutLotes() {
  return (
    <Layout title="CheckOutLotes">
      <Text>
        Este seria el home donde se veria el checkOut de los lotes, se podran
        chulear si se hizo o no el lote y mostrar la facturacion del que se
        elija.
      </Text>
    </Layout>
  );
}
