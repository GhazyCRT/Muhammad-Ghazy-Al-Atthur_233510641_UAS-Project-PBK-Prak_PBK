<template>
  <div class="relative">
    <button
      @click="dropdownOpen = !dropdownOpen"
      class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/20"
    >
      <span class="text-sm font-medium">{{ currentLanguage.flag }}</span>
      <span class="text-sm font-medium hidden sm:block">{{ currentLanguage.name }}</span>
      <ChevronDownIcon class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 w-40 glass dark:glass-dark rounded-xl shadow-lg border border-white/20 overflow-hidden animate-scale-in z-50"
    >
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="setLanguage(lang.code)"
        class="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-white/10 transition-colors duration-200"
        :class="{ 'bg-primary/20 text-primary': currentLanguage.code === lang.code }"
      >
        <span class="text-lg">{{ lang.flag }}</span>
        <span class="font-medium">{{ lang.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

const { locale } = useI18n()
const dropdownOpen = ref(false)

const languages = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

const setLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('language', lang)
  dropdownOpen.value = false
}

const closeDropdown = (event) => {
  if (!event.target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>