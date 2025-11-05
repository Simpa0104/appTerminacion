import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Menu, Portal, Dialog } from "react-native-paper";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import styles from "../styles/historialLotes.styles";
import Layout from "../components/layout";
import { useNavigation } from "@react-navigation/native";

export default function HistorialLotes() {
    const [lotes, setLotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const [dialogoEliminar, setDialogoEliminar] = useState(false);
    const [loteAEliminar, setLoteAEliminar] = useState<any>(null);
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

    const actualizarEstado = async (id: string, nuevoEstado: string) => {
        try {
            await updateDoc(doc(db, "lotes", id), { estado: nuevoEstado });
            setLotes((prev) => prev.map((l) => (l.id === id ? { ...l, estado: nuevoEstado } : l)));
        } catch (err) {
            console.error("Error actualizando estado:", err);
        }
    };

    const confirmarEliminacion = (lote: any) => {
        setLoteAEliminar(lote);
        setDialogoEliminar(true);
    };

    const eliminarLote = async () => {
        if (!loteAEliminar) return;

        try {
            await deleteDoc(doc(db, "lotes", loteAEliminar.id));
            setLotes((prev) => prev.filter(l => l.id !== loteAEliminar.id));
            setDialogoEliminar(false);
            setLoteAEliminar(null);
        } catch (err) {
            console.error("Error eliminando lote:", err);
            alert("Error al eliminar el lote");
        }
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

                {/* Estadísticas del historial */}
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>{lotes.length}</Text>
                        <Text style={styles.statLabel}>Lotes Completados</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>
                            ${Math.floor(totalIngresoHistorial / 1000)}K
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
                                : "No hay lotes completados aun"}
                        </Text>
                        <Text style={[styles.emptyText, { fontSize: 14, marginTop: 10 }]}>
                            Los lotes apareceran aqui cuando cambies su estado a Completado
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
                                <Text style={[styles.tableCell, styles.headerText, styles.colEstado]}>Estado</Text>
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

                                    {/* Estado con dropdown */}
                                    <View style={[styles.tableCell, styles.colEstado]}>
                                        <Menu
                                            visible={menuVisible === lote.id}
                                            onDismiss={() => setMenuVisible(null)}
                                            anchor={
                                                <Button
                                                    mode="outlined"
                                                    onPress={() => setMenuVisible(menuVisible === lote.id ? null : lote.id)}
                                                    style={[
                                                        styles.estadoButton,
                                                        lote.estado === "Completado" && styles.estadoCompletado,
                                                        lote.estado === "En proceso" && styles.estadoProceso,
                                                    ]}
                                                >
                                                    {lote.estado || "Completado"}
                                                </Button>
                                            }
                                        >
                                            {["Recibido", "En proceso", "Completado"].map((estado) => (
                                                <Menu.Item
                                                    key={estado}
                                                    onPress={() => {
                                                        actualizarEstado(lote.id, estado);
                                                        setMenuVisible(null);
                                                    }}
                                                    title={estado}
                                                />
                                            ))}
                                        </Menu>
                                    </View>

                                    {/* Acciones */}
                                    <View style={[styles.tableCell, styles.colAcciones]}>
                                        <View style={styles.accionesRow}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("LoteDetalles" as never, { lote } as never)}
                                            >
                                                <Text style={styles.verButton}>Ver</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => confirmarEliminacion(lote)}
                                            >
                                                <Text style={styles.eliminarButton}>Eliminar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )}

                {/* Diálogo de confirmación de eliminación */}
                <Portal>
                    <Dialog
                        visible={dialogoEliminar}
                        onDismiss={() => setDialogoEliminar(false)}
                    >
                        <Dialog.Title>Confirmar eliminacion</Dialog.Title>
                        <Dialog.Content>
                            <Text>
                                Estas seguro de eliminar permanentemente el lote{" "}
                                <Text style={{ fontWeight: "bold" }}>
                                    {loteAEliminar?.referenciaLote}
                                </Text>
                                ? Esta accion no se puede deshacer.
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogoEliminar(false)}>Cancelar</Button>
                            <Button onPress={eliminarLote} textColor="#FF3B30">
                                Eliminar
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        </Layout>
    );
}