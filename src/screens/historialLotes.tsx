// src/screens/HistorialLotes.tsx
import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, SafeAreaView, Alert, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/historialLotes.styles";
import Layout from "../components/layout";
import { useNavigation } from "@react-navigation/native";

export default function HistorialLotes() {
    const [lotes, setLotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "lotes"), (snapshot) => {
            const lotesData = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            // Filtrar solo los lotes COMPLETADOS
            const lotesCompletados = lotesData.filter(l => l.estado === "Completado");
            // Ordenar por fecha de salida (más reciente primero)
            lotesCompletados.sort((a, b) => {
                const dateA = new Date(a.fechaSalida || 0);
                const dateB = new Date(b.fechaSalida || 0);
                return dateB.getTime() - dateA.getTime();
            });
            setLotes(lotesCompletados);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const eliminarLote = (id: string, referencia: string) => {
        Alert.alert(
            "Confirmar eliminación",
            `¿Estás seguro de eliminar permanentemente el lote "${referencia}"? Esta acción no se puede deshacer.`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, "lotes", id));
                            setLotes((prev) => prev.filter(l => l.id !== id));
                            Alert.alert("Éxito", "Lote eliminado permanentemente");
                        } catch (err) {
                            console.error("Error eliminando lote:", err);
                            Alert.alert("Error", "No se pudo eliminar el lote");
                        }
                    },
                },
            ]
        );
    };

    const term = search.trim().toLowerCase();
    const lotesFiltrados = lotes.filter((lote) => {
        if (!term) return true;
        return (
            String(lote.cliente || "").toLowerCase().includes(term) ||
            String(lote.referenciaLote || "").toLowerCase().includes(term) ||
            String(lote.referenciaPrenda || "").toLowerCase().includes(term) ||
            String(lote.tipoPrenda || "").toLowerCase().includes(term)
        );
    });

    // Calcular solo ingresos totales
    const totalIngresoHistorial = lotes.reduce((sum, l) => sum + (l.totalLote || 0), 0);

    return (
        <Layout title="Historial de Lotes" scrollable>
            <SafeAreaView style={styles.container}>
                {/* Barra de búsqueda */}
                <TextInput
                    style={styles.searchBar}
                    placeholder="Buscar en historial..."
                    value={search}
                    onChangeText={setSearch}
                />

                {/* Estadísticas del historial - Solo 2 tarjetas */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{lotes.length}</Text>
                        <Text style={styles.statLabel}>Lotes Completados</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            ${(totalIngresoHistorial / 1000000).toFixed(1)}M
                        </Text>
                        <Text style={styles.statLabel}>Ingresos Totales</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Historial de Lotes Completados</Text>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Cargando historial...</Text>
                    </View>
                ) : lotesFiltrados.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {search
                                ? "No se encontraron lotes con ese criterio"
                                : "No hay lotes completados aún"}
                        </Text>
                        <Text style={[styles.emptyText, { fontSize: 14, marginTop: 10 }]}>
                            Los lotes aparecerán aquí cuando cambies su estado a "Completado"
                        </Text>
                    </View>
                ) : (
                    <ScrollView horizontal contentContainerStyle={styles.tableScrollContainer} showsHorizontalScrollIndicator>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={[styles.tableCell, styles.headerText, styles.colReferencia]}>Ref. Lote</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colCliente]}>Cliente</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colFecha]}>Fecha Salida</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colTipo]}>Tipo Prenda</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colCantidad]}>Cantidad</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colTotal]}>Total</Text>
                                <Text style={[styles.tableCell, styles.headerText, styles.colAcciones]}>Acciones</Text>
                            </View>

                            {lotesFiltrados.map((lote) => (
                                <View key={lote.id} style={styles.tableRow}>
                                    <Text style={[styles.tableCell, styles.colReferencia]}>
                                        {lote.referenciaLote || "Sin ref."}
                                    </Text>
                                    <Text style={[styles.tableCell, styles.colCliente]}>
                                        {lote.cliente || "Sin cliente"}
                                    </Text>
                                    <Text style={[styles.tableCell, styles.colFecha]}>
                                        {lote.fechaSalida || "Sin fecha"}
                                    </Text>
                                    <Text style={[styles.tableCell, styles.colTipo]}>
                                        {lote.tipoPrenda || "Sin tipo"}
                                    </Text>
                                    <Text style={[styles.tableCell, styles.colCantidad]}>
                                        {lote.totalPrendas || 0}
                                    </Text>
                                    <Text style={[styles.tableCell, styles.colTotal]}>
                                        ${(lote.totalLote || 0).toLocaleString("es-CO")}
                                    </Text>

                                    <View style={[styles.tableCell, styles.colAcciones]}>
                                        <View style={styles.accionesRow}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("LoteDetalles" as never, { lote } as never)}
                                            >
                                                <Text style={{ color: "#007AFF", marginRight: 10 }}>Ver</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => eliminarLote(lote.id, lote.referenciaLote)}
                                            >
                                                <Text style={{ color: "#FF3B30" }}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </Layout>
    );
}