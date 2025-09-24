import React from "react";
import { Text } from "react-native";
import Layout from "../components/layout";

export default function facturacion() {
  return (
    <Layout title="Facturacion">
      <Text>
        En este modulo se harán los cálculos para tener la facturación completa
        y precisa, preguntara por lo básico de la factura y por las cantidades
        del lote para realizar los cálculos según la cantidad de tallas y
        colores. 
        
        Ejemplo: Se llenan los datos básicos de entrada, salida y
        cliente. La cantidad de colores de cada prenda es 2, por lo tanto debe
        se debe de hacer el conteo de las prendas por cada talla sumando las
        tallas de ambos colores. 
        
        Ejemplo: Si el lote trae dos colores y en la XS
        del color arena son 10 y en la del color crudo son 11 el total de talla
        XS serian 21 y ese seria la cantidad debe de poner en la parte de abajo
        para realizar el calculo preciso ya luego se selecciona el tipo de
        prenda y la referencia (La referencia seria la PK y se debe de encontrar
        en la base de datos, en dado caso que no se encuentre debe de
        registrarla en el primer modulo) 
        
        Ya se colocan las cantidades de cada
        talla y como ya se seleccionó la referencia la cantidad de cada talla se
        multiplicará por el precio de cada prenda guardada en la base de datos
        Además tendrá agregado el valor por las demás adiciones como pulido o
        puesta de botón
      </Text>
    </Layout>
  );
}
