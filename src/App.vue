<template>
  <div id="app" class="min-h-screen">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '@/components/Navbar.vue'

const { locale } = useI18n()

onMounted(() => {
  // Load saved language preference
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', prefersDark)
  }
})
</script>

<style>
/* Remove any conflicting styles */
.router-link-active {
  color: rgb(59 130 246) !important;
  font-weight: 600;
}

.animate__animated {
  animation-duration: 0.8s;
}
</style>