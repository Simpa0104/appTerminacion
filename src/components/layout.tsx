import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import styles from "../styles/layout.styles.responsive";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenContentWrapper } from "react-native-screens";

type Propiedades = {
  title: string;
  children: React.ReactNode;
};

export default function Layout({ title, children, scrollable = false }: Propiedades & { scrollable?: boolean }) {
  const ContentWrapper = scrollable ? ScrollView : View;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ContentWrapper style={styles.content}>{children}</ContentWrapper>
    </SafeAreaView>
  );
}
  