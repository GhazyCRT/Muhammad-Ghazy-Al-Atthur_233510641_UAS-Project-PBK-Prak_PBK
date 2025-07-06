# EventIX - Sistem Registrasi Peserta Event Online

EventIX adalah aplikasi web modern untuk mengelola registrasi peserta event secara online. Dibangun dengan Vue 3 dan teknologi web terkini, aplikasi ini menyediakan antarmuka yang elegan dan fungsionalitas lengkap untuk peserta dan administrator.

## 🎯 Deskripsi Proyek

EventIX adalah studi kasus sistem registrasi peserta event online yang menampilkan:

- **Nama Proyek**: EventIX
- **Teknologi Utama**: Vue 3 (Composition API), Vite, json-server, Pinia, Vitest, TailwindCSS, DaisyUI
- **Database**: json-server (development), Supabase (production - opsional)
- **Styling**: TailwindCSS + DaisyUI + Animate.css
- **Bahasa**: Dukungan bilingual (Bahasa Indonesia dan Inggris)

## 🚀 Fitur Unggulan

### Untuk Peserta:
- **Form Registrasi**: Formulir pendaftaran dengan validasi yang komprehensif
- **Dukungan Dua Bahasa**: Antarmuka tersedia dalam Bahasa Indonesia dan Inggris
- **Pembuatan QR Code**: Setiap peserta mendapatkan QR code unik
- **Dashboard Pribadi**: Halaman khusus untuk melihat informasi tiket dan detail event
- **Tampilan Responsif**: Optimal di semua perangkat (desktop, tablet, mobile)

### Untuk Administrator:
- **Panel Admin**: Dashboard lengkap untuk mengelola data peserta
- **Operasi CRUD**: Tambah, lihat, edit, dan hapus data peserta
- **Pencarian dan Filter**: Cari berdasarkan nama, email, institusi, tipe tiket, dan status check-in
- **Simulasi Check-in**: Fitur check-in peserta dengan pemindaian QR code
- **Ekspor Data**: Unduh data peserta dalam format CSV
- **Statistik Real-time**: Tampilan jumlah peserta, yang sudah check-in, dan yang masih pending

### Fitur Umum:
- **Toggle Dark/Light Mode**: Pilihan tema gelap dan terang
- **Animasi Modern**: Transisi dan efek visual yang menarik
- **Countdown Timer**: Hitung mundur ke tanggal acara (20 Agustus 2025)
- **Desain Responsif**: Optimal di semua ukuran layar

## 🧭 Navigasi Halaman

| Rute | Deskripsi |
|------|-----------|
| `/` | Beranda dengan informasi event dan countdown |
| `/register` | Formulir registrasi peserta |
| `/participant/:id` | Dashboard pribadi peserta dengan QR code |
| `/admin/login` | Halaman login administrator |
| `/admin` | Panel admin untuk manajemen peserta |
| `/admin/checkin` | Halaman check-in peserta |

## 🔌 Endpoint API

### json-server
```
GET    /participants     - Mendapatkan semua peserta
POST   /participants     - Membuat peserta baru
PATCH  /participants/:id - Update data peserta
DELETE /participants/:id - Menghapus peserta
```

## 🧪 Pengujian

Aplikasi ini menggunakan **Vitest** untuk pengujian unit dengan fokus pada:

- **Pinia Store Testing**: Pengujian state management dan actions
- **Component Testing**: Validasi komponen Vue
- **Filter Logic**: Pengujian logika pencarian dan filter
- **Authentication**: Pengujian sistem login admin

Contoh pengujian yang diimplementasikan:
```javascript
// Testing Pinia store
describe('ParticipantStore', () => {
  it('should filter participants correctly', () => {
    // Test search, ticket type, and status filters
  })
  
  it('should calculate stats correctly', () => {
    // Test totalParticipants, checkedInCount, pendingCount
  })
})
```

## ⚙️ Cara Menjalankan Proyek

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Instalasi
1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
1. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   ```
   
   Perintah ini akan menjalankan:
   - json-server di port 3001
   - Vite dev server di port 5173

2. Buka browser dan akses:
   - Aplikasi: http://localhost:5173
   - API: http://localhost:3001

### Testing
```bash
npm run test
```

### Build untuk Production
```bash
npm run build
```

### Kredensial Admin (Demo)
- Username: `admin`
- Password: `admin123`

## 🌐 Konfigurasi Bahasa

Aplikasi mendukung dua bahasa:

- **Bahasa Indonesia (ID)**: Bahasa default
- **English (EN)**: Bahasa alternatif

Pengguna dapat mengganti bahasa menggunakan toggle di navbar. Preferensi bahasa akan disimpan di localStorage.

## 🎨 Tema dan Desain

### Color System
- **Primary**: Biru (#3B82F6)
- **Secondary**: Teal (#14B8A6)
- **Accent**: Orange (#F97316)
- **Success**: Hijau
- **Warning**: Kuning
- **Error**: Merah

### Komponen UI
- **Framework**: TailwindCSS + DaisyUI
- **Animasi**: Animate.css
- **Icons**: Heroicons
- **Typography**: Font Inter
- **Spacing**: Sistem 8px

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen Vue yang dapat digunakan kembali
│   ├── RegistrationForm.vue
│   ├── ParticipantCard.vue
│   ├── QRDisplay.vue
│   ├── AdminTable.vue
│   ├── Navbar.vue
│   ├── ThemeToggle.vue
│   └── LanguageToggle.vue
├── views/              # Halaman utama aplikasi
│   ├── Home.vue
│   ├── Register.vue
│   ├── ParticipantDashboard.vue
│   ├── AdminLogin.vue
│   ├── AdminDashboard.vue
│   └── CheckIn.vue
├── stores/             # Pinia state management
│   └── participantStore.js
├── router/             # Vue Router configuration
│   └── index.js
├── i18n/              # Internationalization
│   └── index.js
├── composables/       # Vue composition functions
│   └── useCountdown.js
├── tests/             # Unit tests
│   └── ParticipantStore.test.js
├── App.vue
└── main.js
```

## 🔧 Teknologi yang Digunakan

- **Vue 3**: Framework JavaScript modern
- **Vite**: Build tool dan dev server
- **Pinia**: State management
- **Vue Router**: Routing
- **Vue I18n**: Internationalization
- **TailwindCSS**: Utility-first CSS framework
- **DaisyUI**: TailwindCSS component library
- **Animate.css**: CSS animations
- **Heroicons**: Icon library
- **json-server**: Mock REST API
- **Vitest**: Testing framework
- **Axios**: HTTP client