<template>
  <div class="flex items-center">
    <button
      @click="toggleTheme"
      class="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
      :class="{ 'bg-primary': isDark }"
    >
      <div
        class="w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center"
        :class="{ 'translate-x-7': isDark }"
      >
        <SunIcon v-if="!isDark" class="w-3 h-3 text-yellow-500" />
        <MoonIcon v-else class="w-3 h-3 text-blue-500" />
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = systemPrefersDark
  }
  
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>