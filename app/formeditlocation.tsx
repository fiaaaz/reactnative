import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, update } from "firebase/database";
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';

const fasilitasList: string[] = [
    "Toilet",
    "Mushola",
    "Area Parkir",
    "Warung Makan",
    "Spot Foto",
    "Gazebo",
    "WiFi",
    "Akses Disabilitas"
];

const App = () => {
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: "Form Edit Lokasi",
            headerShown: true,
            headerStyle: { backgroundColor: "#355C7D" },
            headerTintColor: "#fff",
            headerTitleAlign: "center"
        });
    }, []);

    const params = useLocalSearchParams();

    const initialName = typeof params.name === 'string' ? params.name : "";
    const initialCoordinates = typeof params.coordinates === 'string' ? params.coordinates : "";
    const initialOpenHour = typeof params.openHour === 'string' ? params.openHour : "";
    const initialTicket = typeof params.ticketPrice === 'string' ? params.ticketPrice : "";
    const initialFacility = typeof params.facility === 'string'
        ? params.facility.split(",")
        : [];
    const initialContact = typeof params.contact === 'string' ? params.contact : "";
    const initialAccuration = typeof params.accuration === 'string' ? params.accuration : "";
    const id = typeof params.id === 'string' ? params.id : "";

    const [name, setName] = useState(initialName);
    const [location, setLocation] = useState(initialCoordinates);
    const [openHour, setOpenHour] = useState(initialOpenHour);
    const [ticketPrice, setTicketPrice] = useState(initialTicket);
    const [facility, setFacility] = useState<string[]>(initialFacility);
    const [contact, setContact] = useState(initialContact);
    const [accuration, setAccuration] = useState(initialAccuration);

    const toggleFacility = (item: string) => {
        if (facility.includes(item)) {
            setFacility(facility.filter(f => f !== item));
        } else {
            setFacility([...facility, item]);
        }
    };

    const getCoordinates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const coords = loc.coords.latitude + ',' + loc.coords.longitude;
        setLocation(coords);
        setAccuration(loc.coords.accuracy + " m");
    };

    // Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA8Eh2om9olbZ9SdRh_TpIsY-zTA0Zmjf8",
        authDomain: "reactnative-2025-3359b.firebaseapp.com",
        databaseURL: "https://reactnative-2025-3359b-default-rtdb.firebaseio.com",
        projectId: "reactnative-2025-3359b",
        storageBucket: "reactnative-2025-3359b.firebasestorage.app",
        messagingSenderId: "648080834591",
        appId: "1:648080834591:web:8ed7e9dbf6a84b118fd52a"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const handleUpdate = () => {
        if (!id) {
            Alert.alert("Error", "ID lokasi tidak ditemukan.");
            return;
        }

        const pointRef = ref(db, `lokasiWisata/${id}`);

        update(pointRef, {
            name,
            coordinates: location,
            jamOperasional: openHour,
            hargaTiketMasuk: ticketPrice,
            fasilitas: facility,
            kontakPengelola: contact,
            accuration
        })
            .then(() => {
                Alert.alert("Success", "Berhasil memperbarui data", [
                    { text: "OK", onPress: () => router.back() }
                ]);
            })
            .catch(() => {
                Alert.alert("Error", "Gagal memperbarui data");
            });
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#355C7D" }}>

                <Image
                    source={require("D:/kuliah/semester 5/PGPBL/reactnative/assets/images/mlg.png")}
                    style={styles.wallpaper}
                />

                {/* ⭐ KEYBOARD AVOIDING VIEW DITAMBAH DI SINI ⭐ */}
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={styles.card}>

                            <Text style={styles.inputTitle}>Nama Lokasi</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Nama lokasi"
                            />

                            <Text style={styles.inputTitle}>Koordinat</Text>
                            <TextInput
                                style={styles.input}
                                value={location}
                                onChangeText={setLocation}
                                placeholder="-7.12345,112.12345"
                            />

                            <Text style={styles.inputTitle}>Jam Operasional</Text>
                            <TextInput
                                style={styles.input}
                                value={openHour}
                                onChangeText={setOpenHour}
                                placeholder="08.00 - 17.00"
                            />

                            <Text style={styles.inputTitle}>Harga Tiket Masuk</Text>
                            <TextInput
                                style={styles.input}
                                value={ticketPrice}
                                onChangeText={setTicketPrice}
                                placeholder="Rp 10.000"
                            />

                            <Text style={styles.inputTitle}>Fasilitas</Text>

                            {fasilitasList.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.checkboxRow}
                                    onPress={() => toggleFacility(item)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            facility.includes(item) && styles.checkedBox
                                        ]}
                                    />
                                    <Text style={styles.checkboxLabel}>{item}</Text>
                                </TouchableOpacity>
                            ))}

                            <Text style={styles.inputTitle}>Kontak Pengelola</Text>
                            <TextInput
                                style={styles.input}
                                value={contact}
                                onChangeText={setContact}
                                placeholder="0812-3456-7890"
                            />

                            <Text style={styles.inputTitle}>Accuration</Text>
                            <TextInput
                                style={styles.input}
                                value={accuration}
                                onChangeText={setAccuration}
                                placeholder="5 m"
                            />

                            <View style={styles.button}>
                                <Button title="Get Current Location" onPress={getCoordinates} />
                            </View>

                            <View style={styles.button}>
                                <Button title="Save" onPress={handleUpdate} />
                            </View>

                        </View>

                        <View style={{ height: 40 }} />

                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    wallpaper: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        resizeMode: "cover",
        opacity: 0.5,
        zIndex: -1
    },
    card: {
        backgroundColor: "#725A7A",
        margin: 12,
        padding: 16,
        borderRadius: 14,
        shadowColor: "#ffffffff",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        opacity: 0.75,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#ffffffff',
    },
    inputTitle: {
        marginLeft: 12,
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        margin: 12
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: "#444",
        borderRadius: 5,
        marginRight: 12
    },
    checkedBox: {
        backgroundColor: "#fcbf49",
        borderColor: "#fcbf49"
    },
    checkboxLabel: {
        fontSize: 16
    }
});

export default App;