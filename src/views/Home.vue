<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 relative overflow-hidden">
    <!-- Animated background particles -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <!-- Main heading with gradient text -->
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span class="gradient-text">{{ $t('welcomeToEventIX') }}</span>
        </h1>
        
        <!-- Subtitle with animation -->
        <p class="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up font-light">
          {{ $t('eventSubtitle') }}
        </p>
        
        <!-- Description -->
        <p class="text-lg text-gray-700 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style="animation-delay: 0.2s">
          {{ $t('eventDescription') }}
        </p>
        
        <!-- CTA Button with glow effect -->
        <div class="animate-bounce-in" style="animation-delay: 0.4s">
          <router-link
            to="/register"
            class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg hover:shadow-glow-lg transform hover:-translate-y-2 transition-all duration-300 group"
          >
            <span>{{ $t('registerNow') }}</span>
            <ArrowRightIcon class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Event Info Section -->
    <section class="py-20 px-4 relative">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Event Details Card -->
          <div class="animate-slide-right">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20">
              <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 gradient-text">
                {{ $t('eventDetails') }}
              </h2>
              
              <div class="space-y-6">
                <div class="flex items-center space-x-4 group">
                  <div class="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                    <CalendarDaysIcon class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white text-lg">{{ $t('eventDate') }}</p>
                    <p class="text-gray-600 dark:text-gray-400">20 Agustus 2025 / August 20, 2025</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 group">
                  <div class="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                    <MapPinIcon class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white text-lg">{{ $t('eventVenue') }}</p>
                    <p class="text-gray-600 dark:text-gray-400">{{ $t('eventVenueLocation') }}</p>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4 group">
                  <div class="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                    <ClockIcon class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800 dark:text-white text-lg">Waktu / Time</p>
                    <p class="text-gray-600 dark:text-gray-400">09:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Countdown Card -->
          <div class="animate-slide-left">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20">
              <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 gradient-text text-center">
                {{ $t('countdownTitle') }}
              </h2>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 hover:shadow-glow transition-all duration-300">
                  <div class="text-4xl font-bold text-primary mb-2">{{ countdown.days }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $t('days') }}</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border border-secondary/20 hover:shadow-glow transition-all duration-300">
                  <div class="text-4xl font-bold text-secondary mb-2">{{ countdown.hours }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $t('hours') }}</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border border-accent/20 hover:shadow-glow transition-all duration-300">
                  <div class="text-4xl font-bold text-accent mb-2">{{ countdown.minutes }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $t('minutes') }}</div>
                </div>
                
                <div class="text-center p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl border border-purple-500/20 hover:shadow-glow transition-all duration-300">
                  <div class="text-4xl font-bold text-purple-500 mb-2">{{ countdown.seconds }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ $t('seconds') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 bg-white/50 dark:bg-dark-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16 gradient-text">
          Fitur Unggulan / Key Features
        </h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 card-hover h-full">
              <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-glow transition-all duration-300 floating">
                <UserGroupIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Networking Premium
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Bertemu dengan ribuan profesional teknologi terbaik di Indonesia dan bangun koneksi yang berharga
              </p>
            </div>
          </div>
          
          <div class="group">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 card-hover h-full">
              <div class="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-glow transition-all duration-300 floating" style="animation-delay: 0.5s">
                <AcademicCapIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Workshop Eksklusif
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Sesi pembelajaran praktis dengan mentor berpengalaman dan materi terdepan di industri
              </p>
            </div>
          </div>
          
          <div class="group">
            <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 card-hover h-full">
              <div class="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-glow transition-all duration-300 floating" style="animation-delay: 1s">
                <TrophyIcon class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Sertifikat Resmi
              </h3>
              <p class="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                Dapatkan sertifikat yang diakui industri untuk memperkuat portfolio profesional Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CalendarDaysIcon, MapPinIcon, ClockIcon, UserGroupIcon, AcademicCapIcon, TrophyIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let countdownInterval = null

const updateCountdown = () => {
  const eventDate = new Date('2025-08-20T09:00:00+07:00')
  const now = new Date()
  const difference = eventDate - now

  if (difference > 0) {
    countdown.value.days = Math.floor(difference / (1000 * 60 * 60 * 24))
    countdown.value.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    countdown.value.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    countdown.value.seconds = Math.floor((difference % (1000 * 60)) / 1000)
  } else {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
}

const getParticleStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>