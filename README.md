# 🗺️ **MALING — Mobile Pemetaan Wisata Malang**

## 📌 **1. Nama Produk**

**MALING (Malang Location Mapping App)**
Aplikasi mobile untuk pemetaan lokasi wisata di Kota Malang berbasis React Native dan Firebase.

---

## 📘 **2. Deskripsi Produk**

MALING adalah aplikasi yang bertujuan untuk memudahkan pengguna dalam melihat, menambah, mengedit, dan menghapus data lokasi wisata di Kota Malang. Aplikasi ini menggunakan **Firebase Realtime Database** sebagai penyimpanan data dan menyediakan fitur integrasi **GPS** untuk pengambilan koordinat otomatis serta akses cepat menuju lokasi melalui **Google Maps**.

Fitur-fitur utama:

* Daftar lokasi wisata (real-time)
* Tambah lokasi wisata baru
* Edit dan hapus data lokasi
* Integrasi GPS (latitude, longitude, akurasi)
* Navigasi langsung ke Google Maps
* Tampilan UI modern dengan card komponen

---

## 🧩 **3. Komponen Pembangun Produk**

### **A. Frontend**

* **React Native (Expo)**
* **Expo Router**
* **React Native Maps**
* **Expo Location**
* **FontAwesome5 Icons**
* Komponen custom:

  * `ThemedText`
  * `ThemedView`

### **B. Backend**

* **Firebase Realtime Database**

### **C. Fitur Teknis**

* CRUD Data Lokasi Wisata
* Realtime Listener dengan `onValue()`
* Fetch Koordinat Otomatis (Expo Location)
* Navigasi ke Google Maps (`Linking.openURL`)

---

## 🗃️ **4. Sumber Data**

Data diperoleh dari:

1. **Input pengguna** melalui form aplikasi
2. **Firebase Realtime Database**, dengan struktur utama:

```
lokasiWisata/
   ┣ idLokasi1/
   ┃   ┣ name
   ┃   ┣ coordinates
   ┃   ┣ jamOperasional
   ┃   ┣ hargaTiketMasuk
   ┃   ┣ fasilitas
   ┃   ┣ kontakPengelola
   ┃   ┗ accuration
   ┗ idLokasi2/
```

---

## 🖼️ **5. Tangkapan Layar Komponen Penting**

###  **Landing page**
<img width="180" alt="image" src="https://github.com/user-attachments/assets/ce29ec6f-231b-4615-9e11-42b4d8f79cfc" />

### 📍 **About**
<img width="180" alt="image" src="https://github.com/user-attachments/assets/6ffc0472-ab0f-4c6d-989d-5df2392ce13cb" />

### 📍 **Beranda – Daftar Lokasi Wisata**

<img width="180" alt="image" src="https://github.com/user-attachments/assets/662422fd-2885-46ab-87ac-36b42366406b" />

### ➕ **Form Tambah Lokasi**

<img width="180" alt="image" src="https://github.com/user-attachments/assets/5dc00001-90fb-4594-b537-62e792d03705" />

### ✏️ **Form Edit Lokasi**

<img width="180" alt="image" src="https://github.com/user-attachments/assets/cf96f5f7-5376-4dcc-846d-83eb362adfc5" />

### 🗺️ **Halaman Peta**

<img width="180" alt="image" src="https://github.com/user-attachments/assets/a30172a9-6774-4e99-af2f-ff2a1c2db7c0" />

---
