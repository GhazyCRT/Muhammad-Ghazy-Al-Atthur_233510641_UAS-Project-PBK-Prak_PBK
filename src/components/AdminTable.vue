<template>
  <div class="overflow-x-auto">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('email') }}</th>
          <th>{{ $t('institution') }}</th>
          <th>{{ $t('ticketType') }}</th>
          <th>{{ $t('status') }}</th>
          <th>{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participants" :key="participant.id" class="hover">
          <td>
            <div class="font-bold">{{ participant.full_name }}</div>
            <div class="text-sm text-gray-500">{{ participant.qr_code }}</div>
          </td>
          <td>{{ participant.email }}</td>
          <td>{{ participant.institution }}</td>
          <td>
            <div class="badge" :class="getTicketBadgeClass(participant.ticket_type)">
              {{ participant.ticket_type }}
            </div>
          </td>
          <td>
            <div class="badge" :class="getStatusBadgeClass(participant.checkin_status)">
              {{ participant.checkin_status ? $t('checkedIn') : $t('notCheckedIn') }}
            </div>
          </td>
          <td>
            <div class="flex space-x-2">
              <button
                @click="$emit('edit', participant)"
                class="btn btn-sm btn-primary"
              >
                {{ $t('edit') }}
              </button>
              <button
                @click="$emit('delete', participant.id)"
                class="btn btn-sm btn-error"
              >
                {{ $t('delete') }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  participants: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const getTicketBadgeClass = (type) => {
  const typeClasses = {
    'VIP': 'badge-primary',
    'Regular': 'badge-secondary',
    'Student': 'badge-accent'
  }
  return typeClasses[type] || 'badge-neutral'
}

const getStatusBadgeClass = (status) => {
  return status ? 'badge-success' : 'badge-warning'
}
</script>