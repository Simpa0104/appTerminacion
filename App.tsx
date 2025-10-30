// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import DashBoard from "./src/screens/dashBoard";
import LoteDetalles from "./src/screens/LoteDetalles";
import HistorialPrendas from "./src/screens/historialPrendas";
import HistorialLotes from "./src/screens/historialLotes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#007AFF",
    accent: "#caa2ff",
    background: "#ffffff",
    surface: "#ffffff",
    text: "#111827",
  },
};

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="DashBoard" component={DashBoard} />
      <Tab.Screen name="HistorialPrendas" component={HistorialPrendas} />
      <Tab.Screen name="HistorialLotes" component={HistorialLotes} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="LoteDetalles" component={LoteDetalles} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
