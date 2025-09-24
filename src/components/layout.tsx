import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

type Props = {
    title: string;
    children: React.ReactNode;
}

export default function Layout({ title, children}: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>  
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        backgroundColor: '#007AFF',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});