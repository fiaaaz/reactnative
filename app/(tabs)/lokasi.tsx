import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Linking, RefreshControl, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

// Mendefinisikan interface untuk item data lokasi
interface PointItem {
    id: string;
    name: string;
    coordinates: string;
    jamOperasional?: string;
    hargaTiketMasuk?: string;
    fasilitas?: string[];
    kontakPengelola?: string;
    accuration?: string;
}

export default function LokasiScreen() {
    // Menggunakan array data tunggal karena SectionList tidak lagi diperlukan
    const [dataLokasi, setDataLokasi] = useState<PointItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const router = useRouter();

    // Konfigurasi Firebase Anda (Sama seperti di kode asli)
    const firebaseConfig = {
        apiKey: "AIzaSyA8Eh2om9olbZ9SdRh_TpIsY-zTA0Zmjf8",
        authDomain: "reactnative-2025-3359b.firebaseapp.com",
        databaseURL: "https://reactnative-2025-3359b-default-rtdb.firebaseio.com",
        projectId: "reactnative-2025-3359b",
        storageBucket: "reactnative-2025-3359b.firebasestorage.app",
        messagingSenderId: "648080834591",
        appId: "1:648080834591:web:8ed7e9dbf6a84b118fd52a"
    };

    // Inisialisasi Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Fungsi untuk membuka koordinat di Google Maps
    const handlePress = (coordinates: string) => {
        const [latitude, longitude] = coordinates.split(',').map(c => c.trim());
        const url = `https://maps.google.com/?q=${latitude},${longitude}`;
        Linking.openURL(url);
    };

    // Fungsi untuk navigasi ke halaman edit lokasi
    const handleEdit = (item: PointItem) => {
        router.push({
            pathname: "/formeditlocation",
            params: {
                id: item.id,
                name: item.name,
                coordinates: item.coordinates,
                jamOperasional: item.jamOperasional || '',
                hargaTiketMasuk: item.hargaTiketMasuk || '',
                fasilitas: JSON.stringify(item.fasilitas || []),
                kontakPengelola: item.kontakPengelola || '',
                accuration: item.accuration || ''
            }
        });
    };

    // Fungsi untuk menghapus lokasi
    const handleDelete = (id: string) => {
        Alert.alert(
            "Hapus Lokasi",
            "Apakah Anda yakin ingin menghapus lokasi ini?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Hapus",
                    onPress: () => remove(ref(db, `lokasiWisata/${id}`)),
                    style: "destructive"
                }
            ]
        );
    };

    // Hook useEffect untuk mengambil data dari Firebase saat komponen dimuat
    useEffect(() => {
        const locationsRef = ref(db, 'lokasiWisata/');

        const unsubscribe = onValue(locationsRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                const arr = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key],
                    fasilitas: data[key].fasilitas || []
                }));
                // Data langsung disimpan ke state dataLokasi
                setDataLokasi(arr);
            } else {
                setDataLokasi([]);
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup function
    }, []);

    // Callback untuk fitur refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    // Tampilkan Activity Indicator saat loading
    if (loading) {
        return (
            <ThemedView style={styles.containerLoading}>
                <ActivityIndicator size="large" />
            </ThemedView>
        );
    }

    // Komponen untuk me-render satu item lokasi wisata (Card)
    const renderLocationCard = ({ item }: { item: PointItem }) => (
        // BAGIAN CARD UTAMA PER LOKASI
        <View style={styles.cardContainer}>
            {/* Bagian Informasi Lokasi (Bisa di-klik untuk Maps) */}
            <TouchableOpacity
                onPress={() => handlePress(item.coordinates)}
                style={styles.infoSection}
            >
                <ThemedText style={styles.title}>{item.name}</ThemedText>
                <ThemedText style={styles.small}>Koordinat: {item.coordinates}</ThemedText>

                {item.jamOperasional && <ThemedText style={styles.small}>Jam: {item.jamOperasional}</ThemedText>}
                {item.hargaTiketMasuk && <ThemedText style={styles.small}>HTM: {item.hargaTiketMasuk}</ThemedText>}
                {/* Menampilkan fasilitas dengan dipisahkan koma */}
                {item.fasilitas && item.fasilitas.length > 0 &&
                    <ThemedText style={styles.small}>Fasilitas: {item.fasilitas.join(", ")}</ThemedText>
                }
                {item.kontakPengelola && <ThemedText style={styles.small}>Kontak: {item.kontakPengelola}</ThemedText>}
                {item.accuration && <ThemedText style={styles.small}>Akurasi: {item.accuration}</ThemedText>}
            </TouchableOpacity>

            {/* Baris Tombol Aksi (Edit dan Hapus) */}
            <View style={styles.actionRow}>
                {/* Tombol Edit */}
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                    <FontAwesome5 name="pencil-alt" size={16} color="#f17a42ff" />
                    <ThemedText style={styles.actionText}>Edit</ThemedText>
                </TouchableOpacity>

                {/* Garis pemisah tipis */}
                <View style={styles.separator} />

                {/* Tombol Hapus */}
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.actionButton}>
                    <FontAwesome5 name="trash" size={16} color="#ea0c0cff" />
                    <ThemedText style={styles.actionText}>Hapus</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Header yang dipindahkan ke dalam FlatList (di luar perulangan data)
    const ListHeader = () => (
        <View style={styles.headerCard}>
            <ThemedText style={styles.globalHeader}>Lokasi Wisata</ThemedText>
        </View>
    );

    return (
        <ImageBackground
            source={require('@/assets/images/mlg.png')}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                {dataLokasi.length > 0 ? (
                    <FlatList
                        data={dataLokasi}
                        keyExtractor={(item) => item.id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        renderItem={renderLocationCard}
                        // Tambahkan header card di sini
                        ListHeaderComponent={ListHeader}
                        // Menambahkan padding di bawah FlatList
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    // Tampilan jika tidak ada data
                    <ThemedView style={styles.containerNoData}>
                        <ThemedText style={styles.title}>Tidak ada data lokasi wisata.</ThemedText>
                    </ThemedView>
                )}
            </View>
        </ImageBackground>
    );
}

// Gaya (Styles) untuk komponen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingTop: 40,
    },

    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerNoData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },

    // *** STYLE BARU: HEADER YANG DIPINDAHKAN KE DALAM LIST ***
    globalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'rgba(53,92,125,0.92)',
        color: '#fff',
        padding: 14,
        paddingLeft: 20,
        marginBottom: 5, // Sedikit jarak dari card pertama
    },

    // STYLE UNTUK CARD LOKASI
    cardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
    },

    // Bagian Info dalam Card
    infoSection: {
        padding: 16,
        backgroundColor: 'rgba(53,92,125,0.92)',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: "#fff"
    },

    small: {
        fontSize: 13,
        marginTop: 2,
        color: "#E0E0E0"
    },

    // STYLE BARIS TOMBOL AKSI DI BAWAH CARD 
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },

    actionButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },

    actionText: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
        color: '#000',
    },

    separator: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    headerCard: {
        backgroundColor: '#355C7D',
        marginHorizontal: 12,
        marginTop: 10,
        marginBottom: 6,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
        alignItems: 'center',       // Biar teks header center
    },
});