import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CheckOutLotes from "./src/screens/checkOutLotes";
import Clientes from "./src/screens/clientes";
import Facturacion from "./src/screens/facturacion";
import HistorialPrendas from "./src/screens/historialPrendas";
import RegistroLotes from "./src/screens/registroLotes";
import RegistroPrendas from "./src/screens/registroPrendas";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="CheckOutLotes" component={CheckOutLotes} />
        <Tab.Screen name="RegistroLotes" component={RegistroLotes} />
        <Tab.Screen name="RegistroPrendas" component={RegistroPrendas} />
        <Tab.Screen name="HistorialPrendas" component={HistorialPrendas} />
        <Tab.Screen name="Clientes" component={Clientes} />
        <Tab.Screen name="Facturación" component={Facturacion} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}