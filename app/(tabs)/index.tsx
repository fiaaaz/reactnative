import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* wallpaper */}
      <Image
        source={require("D:/kuliah/semester 5/PGPBL/reactnative/assets/images/wp.png")}
        style={styles.wallpaper}
      />

      {/* Konten */}
      <View style={styles.centerContent}>

        {/* === CARD BULAT UNTUK LOGO === */}
        <View style={styles.circleCard}>
          <Image
            source={require("D:/kuliah/semester 5/PGPBL/reactnative/assets/images/NGEMBEL2.png")}
            style={styles.logo}
          />
        </View>

        {/* CARD TULISAN */}
        <View style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            MALING
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            MaLang Informasi Navigasi Guide
          </ThemedText>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },

  // === KONTEN ===
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },

  // logo di dalam card bulat
  logo: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  // === CARD BULAT TAMBAHAN ===
  circleCard: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",

    // bayangan halus
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,

    marginBottom: 10,
  },

  // Warna title → Deep Blue
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#355C7D",
    marginBottom: 4,
  },

  // Subtitle → Violet Gray
  subtitle: {
    fontSize: 16,
    letterSpacing: 1.5,
    color: "#725A7A",
    fontWeight: "500",
  },

  wallpaper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    resizeMode: "cover",
    zIndex: -1,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    // shadow Android
    elevation: 6,
  },
});
