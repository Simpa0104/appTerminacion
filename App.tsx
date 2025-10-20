import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper"; // ← 👈 Importante

import CheckOutLotes from "./src/screens/dashBoard";
import LoteDetalles from "./src/screens/LoteDetalles";
import Facturacion from "./src/screens/facturacion";
import HistorialPrendas from "./src/screens/historialPrendas";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="CheckOutLotes" component={CheckOutLotes} />
      <Tab.Screen name="HistorialPrendas" component={HistorialPrendas} />
      <Tab.Screen name="Facturación" component={Facturacion} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    // 👇 ENVUELVE TODO CON EL PROVIDER DE react-native-paper
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="LoteDetalles" component={LoteDetalles} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}