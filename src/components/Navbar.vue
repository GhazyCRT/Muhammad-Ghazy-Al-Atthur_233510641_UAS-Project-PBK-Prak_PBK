<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass dark:glass-dark border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 group">
            <div class="relative">
              <div class="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                <span class="text-white font-bold text-lg">E</span>
              </div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
            </div>
            <div class="hidden sm:block">
              <span class="text-xl font-bold gradient-text">Event</span>
              <span class="text-xl font-bold text-secondary">IX</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="item in navigationItems" 
            :key="item.path"
            :to="item.path" 
            class="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-primary group"
            :class="$route.path === item.path ? 'text-primary' : 'text-gray-600 dark:text-gray-300'"
          >
            {{ $t(item.label) }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
          </router-link>
        </div>

        <!-- Right side controls -->
        <div class="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageToggle />
          
          <!-- Logout button for admin -->
          <button 
            v-if="isAdmin" 
            @click="logout" 
            class="btn btn-sm btn-ghost hover:btn-error transition-all duration-300"
          >
            <ArrowRightOnRectangleIcon class="w-4 h-4 mr-1" />
            {{ $t('logout') }}
          </button>

          <!-- Mobile menu button -->
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden glass dark:glass-dark border-t border-white/10 animate-slide-down"
    >
      <div class="px-4 py-4 space-y-2">
        <router-link 
          v-for="item in navigationItems" 
          :key="item.path"
          :to="item.path" 
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10"
          :class="$route.path === item.path ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-300'"
        >
          {{ $t(item.label) }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useParticipantStore } from '@/stores/participantStore'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const participantStore = useParticipantStore()
const mobileMenuOpen = ref(false)

const isAdmin = computed(() => participantStore.isAdmin)

const navigationItems = computed(() => {
  const baseItems = [
    { path: '/', label: 'home' },
    { path: '/register', label: 'register' }
  ]
  
  if (isAdmin.value) {
    baseItems.push(
      { path: '/admin', label: 'admin' },
      { path: '/admin/checkin', label: 'checkin' }
    )
  } else {
    baseItems.push({ path: '/admin/login', label: 'admin' })
  }
  
  return baseItems
})

const logout = () => {
  participantStore.logout()
  router.push('/')
  mobileMenuOpen.value = false
}
</script>