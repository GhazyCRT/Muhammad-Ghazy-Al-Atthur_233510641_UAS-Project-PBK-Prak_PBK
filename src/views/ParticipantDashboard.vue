<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-24 pb-12 px-4 relative overflow-hidden">
    <!-- Background particles -->
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="max-w-6xl mx-auto relative">
      <div v-if="loading" class="text-center">
        <div class="glass dark:glass-dark rounded-3xl p-12 shadow-glass border border-white/20 max-w-md mx-auto">
          <div class="loading-custom mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Memuat data peserta...</p>
        </div>
      </div>
      
      <div v-else-if="participant" class="animate-fade-in">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold gradient-text mb-4">
            {{ $t('participantDashboard') }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 text-lg">
            Selamat datang, {{ participant.full_name }}!
          </p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Participant Info -->
          <div class="animate-slide-right">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 mb-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mr-4">
                  <UserIcon class="w-6 h-6 text-white" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                  {{ $t('ticketInfo') }}
                </h2>
              </div>
              
              <!-- Participant Card -->
              <div class="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 border border-white/20">
                <div class="flex justify-between items-start mb-6">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ participant.full_name }}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-1">{{ participant.email }}</p>
                    <p class="text-gray-500 dark:text-gray-500">{{ participant.institution }}</p>
                  </div>
                  <div class="badge badge-lg" :class="getTicketBadgeClass(participant.ticket_type)">
                    {{ participant.ticket_type }}
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('ticketId') }}</p>
                    <p class="font-mono text-sm bg-white dark:bg-gray-800 p-2 rounded border">{{ participant.qr_code }}</p>
                  </div>
                  <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('status') }}</p>
                    <div class="badge" :class="getStatusBadgeClass(participant.checkin_status)">
                      {{ participant.checkin_status ? $t('checkedIn') : $t('notCheckedIn') }}
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('registrationDate') }}</p>
                  <p class="text-gray-800 dark:text-gray-200">{{ formatDate(participant.created_at) }}</p>
                </div>
              </div>
            </div>
            
            <!-- Event Details -->
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center mr-4">
                  <CalendarDaysIcon class="w-6 h-6 text-white" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                  {{ $t('eventDetails') }}
                </h2>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-center space-x-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                  <CalendarDaysIcon class="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white">{{ $t('eventDate') }}</p>
                    <p class="text-gray-600 dark:text-gray-400">20 Agustus 2025</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                  <MapPinIcon class="w-6 h-6 text-secondary flex-shrink-0" />
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white">{{ $t('eventVenue') }}</p>
                    <p class="text-gray-600 dark:text-gray-400">{{ $t('eventVenueLocation') }}</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                  <ClockIcon class="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white">Waktu</p>
                    <p class="text-gray-600 dark:text-gray-400">09:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- QR Code -->
          <div class="animate-slide-left">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 text-center sticky top-24">
              <div class="flex items-center justify-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <QrCodeIcon class="w-6 h-6 text-white" />
                </div>
                <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
                  {{ $t('yourTicket') }}
                </h2>
              </div>
              
              <!-- QR Code Display -->
              <div class="bg-white rounded-2xl p-8 mb-6 shadow-lg">
                <h3 class="text-xl font-bold mb-4 text-gray-800">{{ $t('qrCode') }}</h3>
                <div class="flex justify-center mb-4">
                  <div v-html="qrCodeSvg" class="qr-code border-4 border-gray-200 rounded-lg p-4"></div>
                </div>
                <p class="text-sm text-gray-600 font-mono bg-gray-100 p-3 rounded-lg">
                  {{ participant.qr_code }}
                </p>
              </div>
              
              <div class="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-6 border border-primary/20">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                  📱 Tunjukkan kode QR ini saat check-in
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  🌟 Show this QR code during check-in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center animate-bounce-in">
        <div class="glass dark:glass-dark rounded-3xl p-12 shadow-glass border border-white/20 max-w-md mx-auto">
          <ExclamationTriangleIcon class="w-16 h-16 text-warning mx-auto mb-6" />
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Peserta Tidak Ditemukan
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Maaf, data peserta tidak dapat ditemukan. Silakan periksa kembali link atau daftar ulang.
          </p>
          <router-link to="/register" class="btn btn-primary btn-lg">
            Daftar Sekarang
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useParticipantStore } from '@/stores/participantStore'
import { CalendarDaysIcon, MapPinIcon, ClockIcon, ExclamationTriangleIcon, UserIcon, QrCodeIcon } from '@heroicons/vue/24/outline'
import qrcode from 'qrcode-generator'

const route = useRoute()
const participantStore = useParticipantStore()

const participant = ref(null)
const loading = ref(true)

const qrCodeSvg = computed(() => {
  if (!participant.value) return ''
  const qr = qrcode(0, 'M')
  qr.addData(participant.value.qr_code)
  qr.make()
  return qr.createSvgTag(4, 0)
})

const getTicketBadgeClass = (type) => {
  const typeClasses = {
    'VIP': 'badge-primary',
    'Regular': 'badge-secondary',
    'Student': 'badge-accent'
  }
  return typeClasses[type] || 'badge-neutral'
}

const getStatusBadgeClass = (status) => {
  return status ? 'badge-success' : 'badge-warning'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getParticleStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

onMounted(async () => {
  const participantId = route.params.id
  participant.value = await participantStore.fetchParticipant(participantId)
  loading.value = false
})
</script>