<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-20 pb-12 px-4 relative overflow-hidden">
    <!-- Background particles -->
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="max-w-4xl mx-auto relative">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold gradient-text mb-4">{{ $t('checkinTitle') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 text-lg">{{ $t('checkinSubtitle') }}</p>
      </div>
      
      <!-- QR Scanner Simulation -->
      <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 mb-8 animate-scale-in">
        <div class="text-center mb-8">
          <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg floating">
            <QrCodeIcon class="w-12 h-12 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{{ $t('scanQRCode') }}</h2>
          <p class="text-gray-600 dark:text-gray-400">{{ $t('enterTicketId') }}</p>
        </div>
        
        <form @submit.prevent="handleCheckin" class="space-y-6 max-w-md mx-auto">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('ticketId') }}</span>
            </label>
            <div class="relative">
              <input
                v-model="ticketId"
                type="text"
                :placeholder="$t('ticketIdPlaceholder')"
                class="input input-bordered w-full text-center font-mono text-lg bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                :class="{ 'border-red-500 focus:border-red-500': error }"
                required
              />
              <TicketIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
          </div>
          
          <button
            type="submit"
            class="btn w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg py-4 h-auto"
            :class="{ 'loading': participantStore.loading }"
            :disabled="participantStore.loading"
          >
            <span v-if="!participantStore.loading" class="flex items-center justify-center">
              <CheckCircleIcon class="w-6 h-6 mr-2" />
              Check In Peserta
            </span>
          </button>
        </form>
        
        <div v-if="error" class="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center animate-shake">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
          <span class="text-red-700 dark:text-red-400">{{ error }}</span>
        </div>
        
        <div v-if="success" class="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center animate-bounce-in">
          <CheckCircleIcon class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
          <span class="text-green-700 dark:text-green-400">{{ success }}</span>
        </div>
      </div>
      
      <!-- Recent Check-ins -->
      <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 animate-slide-up">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center mr-4">
            <ClockIcon class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Check-in Terbaru</h2>
        </div>
        
        <div v-if="recentCheckins.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UsersIcon class="w-8 h-8 text-gray-400" />
          </div>
          <p class="text-gray-500 dark:text-gray-400">Belum ada check-in hari ini</p>
        </div>
        
        <div v-else class="space-y-4">
          <div
            v-for="participant in recentCheckins"
            :key="participant.id"
            class="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <UserIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <p class="font-semibold text-gray-800 dark:text-white">{{ participant.full_name }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ participant.email }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-500 font-mono">{{ participant.qr_code }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="badge badge-success">
                {{ $t('checkedIn') }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ formatTime(participant.updated_at || participant.created_at) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useParticipantStore } from '@/stores/participantStore'
import { QrCodeIcon, ExclamationTriangleIcon, CheckCircleIcon, ClockIcon, UsersIcon, UserIcon, TicketIcon } from '@heroicons/vue/24/outline'

const participantStore = useParticipantStore()

const ticketId = ref('')
const error = ref('')
const success = ref('')

const recentCheckins = computed(() => {
  return participantStore.participants
    .filter(p => p.checkin_status)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
})

onMounted(() => {
  participantStore.fetchParticipants()
})

const handleCheckin = async () => {
  error.value = ''
  success.value = ''
  
  if (!ticketId.value.trim()) {
    error.value = 'Masukkan ID tiket'
    return
  }
  
  try {
    const result = await participantStore.checkinParticipant(ticketId.value.trim())
    
    if (result) {
      success.value = `✅ Check-in berhasil! ${result.full_name}`
      ticketId.value = ''
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        success.value = ''
      }, 5000)
    } else {
      if (participantStore.error.includes('Already checked in')) {
        error.value = '⚠️ Peserta sudah check-in sebelumnya'
      } else if (participantStore.error.includes('not found')) {
        error.value = '❌ ID tiket tidak ditemukan'
      } else {
        error.value = '🔴 Terjadi kesalahan saat check-in'
      }
    }
  } catch (err) {
    error.value = '🔴 Terjadi kesalahan saat check-in'
  }
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('id-ID', {
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
</script>