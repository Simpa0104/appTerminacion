import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import checkOutLotes from "./src/screens/checkOutLotes";
import clientes from "./src/screens/clientes";
import facturacion from "./src/screens/facturacion";
import historialPrendas from "./src/screens/historialPrendas";
import registroLotes from "./src/screens/registroLotes";
import registroPrendas from "./src/screens/registroPrendas";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="CheckOutLotes" component={checkOutLotes} />
        <Tab.Screen name="RegistroLotes" component={registroLotes} />
        <Tab.Screen name="RegistroPrendas" component={registroPrendas} />
        <Tab.Screen name="HistorialPrendas" component={historialPrendas} />
        <Tab.Screen name="Clientes" component={clientes} />
        <Tab.Screen name="Facturación" component={facturacion} />
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}