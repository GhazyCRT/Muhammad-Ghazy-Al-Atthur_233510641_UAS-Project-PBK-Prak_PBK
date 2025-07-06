<template>
  <div class="card bg-base-100 shadow-xl animate__animated animate__fadeIn">
    <div class="card-body">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h2 class="card-title text-2xl">{{ participant.full_name }}</h2>
          <p class="text-gray-600">{{ participant.email }}</p>
          <p class="text-gray-500">{{ participant.institution }}</p>
        </div>
        <div class="badge badge-lg" :class="ticketBadgeClass">
          {{ participant.ticket_type }}
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">{{ $t('ticketId') }}</p>
          <p class="font-mono text-sm bg-gray-100 p-2 rounded">{{ participant.qr_code }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">{{ $t('status') }}</p>
          <div class="badge" :class="statusBadgeClass">
            {{ participant.checkin_status ? $t('checkedIn') : $t('notCheckedIn') }}
          </div>
        </div>
      </div>
      
      <div class="card-actions justify-end">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  participant: {
    type: Object,
    required: true
  }
})

const ticketBadgeClass = computed(() => {
  const typeClasses = {
    'VIP': 'badge-primary',
    'Regular': 'badge-secondary',
    'Student': 'badge-accent'
  }
  return typeClasses[props.participant.ticket_type] || 'badge-neutral'
})

const statusBadgeClass = computed(() => {
  return props.participant.checkin_status ? 'badge-success' : 'badge-warning'
})
</script>