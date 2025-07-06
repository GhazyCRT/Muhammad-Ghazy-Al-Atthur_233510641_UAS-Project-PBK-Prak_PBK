<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 flex items-center justify-center py-12 px-4 relative overflow-hidden">
    <!-- Background particles -->
    <div class="particles">
      <div v-for="i in 10" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="max-w-md w-full relative">
      <div class="glass dark:glass-dark rounded-3xl p-8 shadow-glass border border-white/20 animate-scale-in">
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserCircleIcon class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-3xl font-bold gradient-text mb-2">{{ $t('adminLogin') }}</h1>
          <p class="text-gray-600 dark:text-gray-400">Masuk ke panel admin EventIX</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('username') }}</span>
            </label>
            <div class="relative">
              <input
                v-model="form.username"
                type="text"
                placeholder="Masukkan username"
                class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                :class="{ 'border-red-500 focus:border-red-500': error }"
                required
              />
              <UserIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('password') }}</span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                type="password"
                placeholder="Masukkan password"
                class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                :class="{ 'border-red-500 focus:border-red-500': error }"
                required
              />
              <LockClosedIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center">
            <ExclamationTriangleIcon class="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
            <span class="text-red-700 dark:text-red-400">{{ error }}</span>
          </div>
          
          <button
            type="submit"
            class="btn w-full bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg py-4 h-auto"
            :class="{ 'loading': loading }"
            :disabled="loading"
          >
            <span v-if="!loading" class="flex items-center justify-center">
              {{ $t('login') }}
              <ArrowRightOnRectangleIcon class="w-5 h-5 ml-2" />
            </span>
          </button>
        </form>
        
        <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <p class="text-sm text-gray-700 dark:text-gray-300 text-center mb-3">
            <strong>🔑 Demo Credentials:</strong>
          </p>
          <div class="space-y-2 text-center">
            <p class="text-sm">
              <span class="text-gray-600 dark:text-gray-400">Username:</span> 
              <code class="bg-white dark:bg-gray-800 px-2 py-1 rounded text-primary font-mono">admin</code>
            </p>
            <p class="text-sm">
              <span class="text-gray-600 dark:text-gray-400">Password:</span> 
              <code class="bg-white dark:bg-gray-800 px-2 py-1 rounded text-primary font-mono">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useParticipantStore } from '@/stores/participantStore'
import { UserCircleIcon, ExclamationTriangleIcon, UserIcon, LockClosedIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const participantStore = useParticipantStore()

const form = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const success = participantStore.login(form)
    if (success) {
      router.push('/admin')
    } else {
      error.value = 'Username atau password salah'
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan saat login'
  } finally {
    loading.value = false
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