<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-20 pb-12 px-4 relative overflow-hidden">
    <!-- Background particles -->
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="max-w-6xl mx-auto relative">
      <div v-if="!registrationSuccess" class="grid lg:grid-cols-2 gap-12 items-start">
        <!-- Left side - Form -->
        <div class="animate-slide-right">
          <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20">
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <UserPlusIcon class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-3xl font-bold gradient-text mb-2">
                {{ $t('registrationTitle') }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                {{ $t('registrationSubtitle') }}
              </p>
            </div>
            
            <RegistrationForm @submit="handleRegistration" />
          </div>
        </div>
        
        <!-- Right side - Benefits -->
        <div class="animate-slide-left">
          <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 sticky top-24">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-8 gradient-text">
              Mengapa Mendaftar EventIX?
            </h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                  <CheckCircleIcon class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white text-lg mb-1">Akses Eksklusif</p>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Dapatkan akses ke semua sesi dan workshop premium dengan pembicara terbaik</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                  <GiftIcon class="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white text-lg mb-1">Goodie Bag Premium</p>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Merchandise eksklusif, gadget teknologi, dan hadiah menarik senilai jutaan rupiah</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                  <UsersIcon class="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white text-lg mb-1">Networking Elite</p>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Bertemu dengan CEO, CTO, dan profesional terbaik di industri teknologi Indonesia</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 group">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-glow transition-all duration-300">
                  <DocumentTextIcon class="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white text-lg mb-1">Sertifikat Bergengsi</p>
                  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Sertifikat kehadiran yang diakui industri untuk memperkuat CV dan LinkedIn profile</p>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="mt-8 pt-8 border-t border-white/20">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-primary">5000+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Peserta</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-secondary">50+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Pembicara</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-accent">20+</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Workshop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Success Message -->
      <div v-else class="text-center animate-bounce-in">
        <div class="glass dark:glass-dark rounded-3xl p-12 shadow-glass border border-white/20 max-w-lg mx-auto">
          <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg animate-pulse">
            <CheckCircleIcon class="w-10 h-10 text-white" />
          </div>
          
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4 gradient-text">
            {{ $t('registrationSuccess') }}
          </h2>
          
          <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {{ $t('registrationSuccessMessage') }}
          </p>
          
          <router-link
            :to="`/participant/${newParticipantId}`"
            class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg hover:shadow-glow-lg transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <span>{{ $t('viewTicket') }}</span>
            <ArrowRightIcon class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useParticipantStore } from '@/stores/participantStore'
import RegistrationForm from '@/components/RegistrationForm.vue'
import { CheckCircleIcon, GiftIcon, UsersIcon, DocumentTextIcon, UserPlusIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const participantStore = useParticipantStore()

const registrationSuccess = ref(false)
const newParticipantId = ref(null)

const handleRegistration = async (formData) => {
  try {
    const newParticipant = await participantStore.createParticipant(formData)
    if (newParticipant) {
      newParticipantId.value = newParticipant.id
      registrationSuccess.value = true
    }
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const getParticleStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}
</script>