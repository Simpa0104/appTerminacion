import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../styles/layout.styles";

type Propiedades = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children }: Propiedades) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
}
  