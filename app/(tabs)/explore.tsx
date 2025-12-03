import { View, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { ThemedText } from "@/components/themed-text";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* Wallpaper */}
      <Image
        source={require("D:/kuliah/semester 5/PGPBL/reactnative/assets/images/wp.png")}
        style={styles.wallpaper}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.centerContent} showsVerticalScrollIndicator={false}>

        {/* ======================= */}
        {/* JUDUL APP      */}
        {/* ======================= */}
        <View style={[styles.card, { alignItems: "center" }]}>
          <ThemedText type="title" style={styles.title}>
            <FontAwesome5 name="compass" size={30} color="#355C7D" /> MALING
          </ThemedText>

          <ThemedText style={styles.sectionTitleCenter}>
            MaLang Informasi Navigasi Guide (Kota Malang)
          </ThemedText>
        </View>

        {/* ======================= */}
        {/*  DESKRIPSI SINGKAT */}
        {/* ======================= */}
        <View style={[styles.card, { alignItems: "center" }]}>
          <ThemedText style={styles.descriptionTextCenter}>
            MALING adalah aplikasi guide pariwisata terpadu yang didedikasikan
            sepenuhnya untuk menjelajahi keunikan dan pesona Kota Malang.
          </ThemedText>
        </View>

        <Image
          source={require("D:/kuliah/semester 5/PGPBL/reactnative/assets/images/foto.png")}
          style={styles.foto}
        />

        <View style={[styles.card, { alignItems: "center" }]}>
          <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
            <ThemedText style={[styles.featureTitle, { textAlign: "center" }]}>
              Main Feature
            </ThemedText>
          </View>
        </View>

        {/* ======================================================== */}
        {/* FITUR - Tambah Titik Wisata */}
        {/* ======================================================== */}
        <View style={styles.card}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="plus-circle" size={18} color="#FF7582" style={styles.icon} />
            <View style={styles.textContainer}>
              <ThemedText style={styles.featureTitle}>
                Tambah Titik Wisata:
              </ThemedText>

              <ThemedText style={styles.descriptionText}>
                Pengguna dapat menambahkan lokasi wisata baru lengkap dengan nama, koordinat, jam operasional,
                dan informasi pendukung lainnya.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* FITUR - Edit Titik Wisata */}
        {/* ======================================================== */}
        <View style={styles.card}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="edit" size={18} color="#FF7582" style={styles.icon} />
            <View style={styles.textContainer}>
              <ThemedText style={styles.featureTitle}>
                Edit & Perbarui Informasi Lokasi:
              </ThemedText>

              <ThemedText style={styles.descriptionText}>
                Setiap titik wisata yang sudah ditambahkan dapat diperbarui kapan saja, termasuk perubahan
                deskripsi, fasilitas, HTM, atau koordinat.
              </ThemedText>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* FITUR - Hapus Titik Wisata */}
        {/* ======================================================== */}
        <View style={styles.card}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="trash-alt" size={18} color="#FF7582" style={styles.icon} />
            <View style={styles.textContainer}>
              <ThemedText style={styles.featureTitle}>
                Hapus Titik Wisata:
              </ThemedText>

              <ThemedText style={styles.descriptionText}>
                Lokasi yang tidak lagi relevan dapat dihapus dengan mudah, menjaga data tetap rapi dan akurat.
              </ThemedText>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },

  centerContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    gap: 15,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  title: {
    fontSize: 45,
    fontWeight: "800",
    color: "#355C7D",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    letterSpacing: 0.8,
    color: "#725A7A",
    fontWeight: "500",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF7582",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,117,130,0.5)",
    paddingBottom: 5,
    marginBottom: 10,
    width: "100%",
  },

  descriptionText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },

  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  icon: {
    marginRight: 15,
    marginTop: 3,
  },

  textContainer: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#355C7D",
    marginBottom: 5,
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
  sectionTitleCenter: {
    fontSize: 18,
    fontWeight: "700",
    color: "#355C7D",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 10,
  },

  descriptionTextCenter: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },
  foto: {
    width: 370,
    height: 320,
    resizeMode: "cover",
    borderRadius: 15,
    marginTop: 15,
    textAlign: "center",
    alignSelf: "center",
  },
});
