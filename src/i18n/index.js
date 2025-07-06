import { createI18n } from 'vue-i18n'

const messages = {
  id: {
    // Navigation
    home: 'Beranda',
    register: 'Daftar',
    admin: 'Admin',
    checkin: 'Check-in',
    logout: 'Keluar',
    
    // Common
    name: 'Nama',
    email: 'Email',
    institution: 'Institusi',
    ticketType: 'Tipe Tiket',
    submit: 'Kirim',
    cancel: 'Batal',
    edit: 'Edit',
    delete: 'Hapus',
    save: 'Simpan',
    search: 'Cari',
    filter: 'Filter',
    all: 'Semua',
    actions: 'Aksi',
    status: 'Status',
    checkedIn: 'Sudah Check-in',
    notCheckedIn: 'Belum Check-in',
    
    // Home Page
    welcomeToEventIX: 'Selamat Datang di EventIX',
    eventSubtitle: 'Konferensi Teknologi Terbesar 2025',
    eventDescription: 'Bergabunglah dengan ribuan profesional teknologi dalam acara yang akan mengubah cara Anda melihat inovasi digital.',
    eventDate: 'Tanggal Acara',
    eventVenue: 'Tempat',
    eventVenueLocation: 'Jakarta Convention Center, Indonesia',
    countdownTitle: 'Hitung Mundur Acara',
    registerNow: 'Daftar Sekarang',
    days: 'Hari',
    hours: 'Jam',
    minutes: 'Menit',
    seconds: 'Detik',
    
    // Registration
    registrationTitle: 'Formulir Pendaftaran EventIX',
    registrationSubtitle: 'Isi formulir berikut untuk mendaftar ke acara kami',
    fullName: 'Nama Lengkap',
    fullNamePlaceholder: 'Masukkan nama lengkap Anda',
    emailPlaceholder: 'Masukkan alamat email Anda',
    institutionPlaceholder: 'Masukkan nama institusi Anda',
    selectTicketType: 'Pilih tipe tiket',
    regular: 'Regular',
    vip: 'VIP',
    student: 'Mahasiswa',
    registrationSuccess: 'Pendaftaran Berhasil!',
    registrationSuccessMessage: 'Terima kasih telah mendaftar. Klik tombol di bawah untuk melihat tiket Anda.',
    viewTicket: 'Lihat Tiket',
    registrationError: 'Gagal mendaftar. Silakan coba lagi.',
    
    // Participant Dashboard
    participantDashboard: 'Dashboard Peserta',
    yourTicket: 'Tiket Anda',
    ticketInfo: 'Informasi Tiket',
    qrCode: 'Kode QR',
    ticketId: 'ID Tiket',
    registrationDate: 'Tanggal Pendaftaran',
    eventDetails: 'Detail Acara',
    
    // Admin Dashboard
    adminDashboard: 'Dashboard Admin',
    participantManagement: 'Manajemen Peserta',
    totalParticipants: 'Total Peserta',
    checkedInCount: 'Sudah Check-in',
    pendingCount: 'Menunggu Check-in',
    addParticipant: 'Tambah Peserta',
    editParticipant: 'Edit Peserta',
    deleteParticipant: 'Hapus Peserta',
    confirmDelete: 'Apakah Anda yakin ingin menghapus peserta ini?',
    exportData: 'Ekspor Data',
    
    // Check-in
    checkinTitle: 'Check-in Peserta',
    checkinSubtitle: 'Simulasi pemindaian kode QR untuk check-in peserta',
    scanQRCode: 'Pindai Kode QR',
    enterTicketId: 'Masukkan ID Tiket',
    ticketIdPlaceholder: 'Masukkan ID tiket peserta',
    checkinSuccess: 'Check-in berhasil!',
    checkinError: 'ID tiket tidak ditemukan.',
    alreadyCheckedIn: 'Peserta sudah check-in sebelumnya.',
    
    // Validation
    fieldRequired: 'Field ini wajib diisi',
    invalidEmail: 'Format email tidak valid',
    
    // Theme
    toggleTheme: 'Ganti Tema',
    toggleLanguage: 'Ganti Bahasa',
    
    // Login
    adminLogin: 'Login Admin',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    loginError: 'Username atau password salah',
    
    // Time units
    timeUnits: {
      days: 'hari',
      hours: 'jam',
      minutes: 'menit',
      seconds: 'detik'
    }
  },
  en: {
    // Navigation
    home: 'Home',
    register: 'Register',
    admin: 'Admin',
    checkin: 'Check-in',
    logout: 'Logout',
    
    // Common
    name: 'Name',
    email: 'Email',
    institution: 'Institution',
    ticketType: 'Ticket Type',
    submit: 'Submit',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    actions: 'Actions',
    status: 'Status',
    checkedIn: 'Checked In',
    notCheckedIn: 'Not Checked In',
    
    // Home Page
    welcomeToEventIX: 'Welcome to EventIX',
    eventSubtitle: 'The Biggest Tech Conference 2025',
    eventDescription: 'Join thousands of tech professionals in an event that will change how you see digital innovation.',
    eventDate: 'Event Date',
    eventVenue: 'Venue',
    eventVenueLocation: 'Jakarta Convention Center, Indonesia',
    countdownTitle: 'Event Countdown',
    registerNow: 'Register Now',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    
    // Registration
    registrationTitle: 'EventIX Registration Form',
    registrationSubtitle: 'Fill out the form below to register for our event',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    emailPlaceholder: 'Enter your email address',
    institutionPlaceholder: 'Enter your institution name',
    selectTicketType: 'Select ticket type',
    regular: 'Regular',
    vip: 'VIP',
    student: 'Student',
    registrationSuccess: 'Registration Successful!',
    registrationSuccessMessage: 'Thank you for registering. Click the button below to view your ticket.',
    viewTicket: 'View Ticket',
    registrationError: 'Registration failed. Please try again.',
    
    // Participant Dashboard
    participantDashboard: 'Participant Dashboard',
    yourTicket: 'Your Ticket',
    ticketInfo: 'Ticket Information',
    qrCode: 'QR Code',
    ticketId: 'Ticket ID',
    registrationDate: 'Registration Date',
    eventDetails: 'Event Details',
    
    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    participantManagement: 'Participant Management',
    totalParticipants: 'Total Participants',
    checkedInCount: 'Checked In',
    pendingCount: 'Pending Check-in',
    addParticipant: 'Add Participant',
    editParticipant: 'Edit Participant',
    deleteParticipant: 'Delete Participant',
    confirmDelete: 'Are you sure you want to delete this participant?',
    exportData: 'Export Data',
    
    // Check-in
    checkinTitle: 'Participant Check-in',
    checkinSubtitle: 'QR code scanning simulation for participant check-in',
    scanQRCode: 'Scan QR Code',
    enterTicketId: 'Enter Ticket ID',
    ticketIdPlaceholder: 'Enter participant ticket ID',
    checkinSuccess: 'Check-in successful!',
    checkinError: 'Ticket ID not found.',
    alreadyCheckedIn: 'Participant already checked in.',
    
    // Validation
    fieldRequired: 'This field is required',
    invalidEmail: 'Invalid email format',
    
    // Theme
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'Toggle Language',
    
    // Login
    adminLogin: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    loginError: 'Invalid username or password',
    
    // Time units
    timeUnits: {
      days: 'days',
      hours: 'hours',
      minutes: 'minutes',
      seconds: 'seconds'
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'id',
  fallbackLocale: 'en',
  globalInjection: true,
  messages
})

export default i18n