import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';


// =====================================================
// OPTIONAL: TYPE (BIKIN LEBIH AMAN & RAPI)
// =====================================================
type MarkerType = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
};

// =====================================================
// Firebase Config
// =====================================================
const firebaseConfig = {
    apiKey: "AIzaSyA8Eh2om9olbZ9SdRh_TpIsY-zTA0Zmjf8",
    authDomain: "reactnative-2025-3359b.firebaseapp.com",
    databaseURL: "https://reactnative-2025-3359b-default-rtdb.firebaseio.com",
    projectId: "reactnative-2025-3359b",
    storageBucket: "reactnative-2025-3359b.firebasestorage.app",
    messagingSenderId: "648080834591",
    appId: "1:648080834591:web:8ed7e9dbf6a84b118fd52a"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// =====================================================
// Map Screen
// =====================================================
export default function MapScreen() {

    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const locationsRef = ref(db, 'lokasiWisata/');

        const unsubscribe = onValue(
            locationsRef,
            (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    const parsedMarkers: MarkerType[] = Object.keys(data)
                        .map((key) => {
                            const point = data[key];

                            // Validasi koordinat
                            if (
                                !point.coordinates ||
                                typeof point.coordinates !== "string" ||
                                point.coordinates.trim() === ""
                            ) {
                                return null;
                            }

                            const [latitude, longitude] = point.coordinates
                                .split(",")
                                .map(Number);

                            if (isNaN(latitude) || isNaN(longitude)) {
                                console.warn("Invalid coordinates:", point.coordinates);
                                return null;
                            }

                            return {
                                id: key,
                                name: point.name,
                                latitude,
                                longitude,
                            };
                        })
                        .filter((m): m is MarkerType => m !== null);

                    setMarkers(parsedMarkers);
                } else {
                    setMarkers([]);
                }

                setLoading(false);
            },
            (error) => {
                console.error(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);


    // Loading Screen
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading map data...</Text>
            </View>
        );
    }


    // =====================================================
    // RENDER MAP
    // =====================================================
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -7.977978,
                    longitude: 112.634138,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.01,
                }}
                zoomControlEnabled={true}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.name}
                        description={`Coords: ${marker.latitude}, ${marker.longitude}`}
                    />
                ))}
            </MapView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/forminputlocation")}
            >
                <FontAwesome name="plus" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}


// =====================================================
// STYLE
// =====================================================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    fab: {
        position: "absolute",
        width: 56,
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        left: 20,
        bottom: 20,
        backgroundColor: "#0275d8",
        borderRadius: 30,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
