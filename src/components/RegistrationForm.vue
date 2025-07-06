<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('fullName') }}</span>
      </label>
      <div class="relative">
        <input
          v-model="form.full_name"
          type="text"
          :placeholder="$t('fullNamePlaceholder')"
          class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          :class="{ 'border-red-500 focus:border-red-500': errors.full_name }"
          required
        />
        <UserIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <label v-if="errors.full_name" class="label">
        <span class="label-text-alt text-red-500">{{ errors.full_name }}</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('email') }}</span>
      </label>
      <div class="relative">
        <input
          v-model="form.email"
          type="email"
          :placeholder="$t('emailPlaceholder')"
          class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          :class="{ 'border-red-500 focus:border-red-500': errors.email }"
          required
        />
        <EnvelopeIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <label v-if="errors.email" class="label">
        <span class="label-text-alt text-red-500">{{ errors.email }}</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('institution') }}</span>
      </label>
      <div class="relative">
        <input
          v-model="form.institution"
          type="text"
          :placeholder="$t('institutionPlaceholder')"
          class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          :class="{ 'border-red-500 focus:border-red-500': errors.institution }"
          required
        />
        <BuildingOfficeIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <label v-if="errors.institution" class="label">
        <span class="label-text-alt text-red-500">{{ errors.institution }}</span>
      </label>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('ticketType') }}</span>
      </label>
      <div class="relative">
        <select
          v-model="form.ticket_type"
          class="select select-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          :class="{ 'border-red-500 focus:border-red-500': errors.ticket_type }"
          required
        >
          <option value="">{{ $t('selectTicketType') }}</option>
          <option value="Regular">{{ $t('regular') }} - Rp 500.000</option>
          <option value="VIP">{{ $t('vip') }} - Rp 1.500.000</option>
          <option value="Student">{{ $t('student') }} - Rp 250.000</option>
        </select>
        <TicketIcon class="absolute right-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      <label v-if="errors.ticket_type" class="label">
        <span class="label-text-alt text-red-500">{{ errors.ticket_type }}</span>
      </label>
    </div>

    <button
      type="submit"
      class="btn w-full bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300 text-lg py-4 h-auto"
      :class="{ 'loading': loading }"
      :disabled="loading"
    >
      <span v-if="!loading" class="flex items-center justify-center">
        {{ $t('submit') }}
        <PaperAirplaneIcon class="w-5 h-5 ml-2" />
      </span>
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { UserIcon, EnvelopeIcon, BuildingOfficeIcon, TicketIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()

const emit = defineEmits(['submit'])

const form = reactive({
  full_name: '',
  email: '',
  institution: '',
  ticket_type: ''
})

const errors = ref({})
const loading = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!form.full_name.trim()) {
    errors.value.full_name = t('fieldRequired')
  }
  
  if (!form.email.trim()) {
    errors.value.email = t('fieldRequired')
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.value.email = t('invalidEmail')
  }
  
  if (!form.institution.trim()) {
    errors.value.institution = t('fieldRequired')
  }
  
  if (!form.ticket_type) {
    errors.value.ticket_type = t('fieldRequired')
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  loading.value = true
  try {
    await emit('submit', { ...form })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    loading.value = false
  }
}
</script>