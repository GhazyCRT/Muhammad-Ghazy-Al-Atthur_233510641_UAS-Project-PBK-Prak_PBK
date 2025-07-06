<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 pt-20 pb-12 px-4 relative overflow-hidden">
    <!-- Background particles -->
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <div class="max-w-7xl mx-auto relative">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-4xl font-bold gradient-text mb-2">{{ $t('adminDashboard') }}</h1>
          <p class="text-gray-600 dark:text-gray-400">Kelola peserta dan pantau statistik event</p>
        </div>
        <button
          @click="showAddModal = true"
          class="btn bg-gradient-to-r from-primary to-secondary text-white border-none hover:shadow-glow-lg transform hover:-translate-y-1 transition-all duration-300"
        >
          <UserPlusIcon class="w-5 h-5 mr-2" />
          {{ $t('addParticipant') }}
        </button>
      </div>
      
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="glass dark:glass-dark rounded-2xl p-6 shadow-glass border border-white/20 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('totalParticipants') }}</p>
              <p class="text-3xl font-bold text-gray-800 dark:text-white">{{ participantStore.totalParticipants }}</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
              <UsersIcon class="w-7 h-7 text-primary" />
            </div>
          </div>
        </div>
        
        <div class="glass dark:glass-dark rounded-2xl p-6 shadow-glass border border-white/20 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('checkedInCount') }}</p>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ participantStore.checkedInCount }}</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center">
              <CheckCircleIcon class="w-7 h-7 text-green-500" />
            </div>
          </div>
        </div>
        
        <div class="glass dark:glass-dark rounded-2xl p-6 shadow-glass border border-white/20 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ $t('pendingCount') }}</p>
              <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{{ participantStore.pendingCount }}</p>
            </div>
            <div class="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-2xl flex items-center justify-center">
              <ClockIcon class="w-7 h-7 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Filters -->
      <div class="glass dark:glass-dark rounded-2xl p-6 shadow-glass border border-white/20 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('search') }}</span>
            </label>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari nama, email, atau institusi..."
                class="input input-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <MagnifyingGlassIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('ticketType') }}</span>
            </label>
            <select v-model="selectedTicketType" class="select select-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary transition-all duration-300">
              <option value="all">{{ $t('all') }}</option>
              <option value="Regular">{{ $t('regular') }}</option>
              <option value="VIP">{{ $t('vip') }}</option>
              <option value="Student">{{ $t('student') }}</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('status') }}</span>
            </label>
            <select v-model="selectedStatus" class="select select-bordered w-full bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600 focus:border-primary transition-all duration-300">
              <option value="all">{{ $t('all') }}</option>
              <option value="checked-in">{{ $t('checkedIn') }}</option>
              <option value="pending">{{ $t('notCheckedIn') }}</option>
            </select>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">&nbsp;</span>
            </label>
            <button
              @click="exportData"
              class="btn btn-secondary w-full hover:shadow-lg transition-all duration-300"
            >
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              {{ $t('exportData') }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Participants Table -->
      <div class="glass dark:glass-dark rounded-2xl p-6 shadow-glass border border-white/20">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">{{ $t('participantManagement') }}</h2>
        
        <div v-if="participantStore.loading" class="text-center py-12">
          <div class="loading-custom mx-auto mb-4"></div>
          <p class="text-gray-600 dark:text-gray-400">Memuat data peserta...</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr class="border-gray-200 dark:border-gray-700">
                <th class="text-gray-700 dark:text-gray-300">{{ $t('name') }}</th>
                <th class="text-gray-700 dark:text-gray-300">{{ $t('email') }}</th>
                <th class="text-gray-700 dark:text-gray-300">{{ $t('institution') }}</th>
                <th class="text-gray-700 dark:text-gray-300">{{ $t('ticketType') }}</th>
                <th class="text-gray-700 dark:text-gray-300">{{ $t('status') }}</th>
                <th class="text-gray-700 dark:text-gray-300">{{ $t('actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="participant in participantStore.filteredParticipants" :key="participant.id" class="hover:bg-white/50 dark:hover:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                <td>
                  <div class="font-bold text-gray-800 dark:text-white">{{ participant.full_name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 font-mono">{{ participant.qr_code }}</div>
                </td>
                <td class="text-gray-700 dark:text-gray-300">{{ participant.email }}</td>
                <td class="text-gray-700 dark:text-gray-300">{{ participant.institution }}</td>
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
                      @click="editParticipant(participant)"
                      class="btn btn-sm btn-primary hover:shadow-lg transition-all duration-300"
                    >
                      <PencilIcon class="w-4 h-4" />
                    </button>
                    <button
                      @click="deleteParticipant(participant.id)"
                      class="btn btn-sm btn-error hover:shadow-lg transition-all duration-300"
                    >
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Modal -->
    <dialog :class="{ 'modal-open': showAddModal || showEditModal }" class="modal">
      <div class="modal-box bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-white">
          {{ editingParticipant ? $t('editParticipant') : $t('addParticipant') }}
        </h3>
        
        <form @submit.prevent="saveParticipant" class="space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('fullName') }}</span>
            </label>
            <input
              v-model="participantForm.full_name"
              type="text"
              class="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('email') }}</span>
            </label>
            <input
              v-model="participantForm.email"
              type="email"
              class="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('institution') }}</span>
            </label>
            <input
              v-model="participantForm.institution"
              type="text"
              class="input input-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ $t('ticketType') }}</span>
            </label>
            <select
              v-model="participantForm.ticket_type"
              class="select select-bordered w-full bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white"
              required
            >
              <option value="">{{ $t('selectTicketType') }}</option>
              <option value="Regular">{{ $t('regular') }}</option>
              <option value="VIP">{{ $t('vip') }}</option>
              <option value="Student">{{ $t('student') }}</option>
            </select>
          </div>
          
          <div class="modal-action">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-ghost"
            >
              {{ $t('cancel') }}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :class="{ 'loading': participantStore.loading }"
            >
              {{ $t('save') }}
            </button>
          </div>
        </form>
      </div>
    </dialog>
    
    <!-- Delete Confirmation Modal -->
    <dialog :class="{ 'modal-open': showDeleteModal }" class="modal">
      <div class="modal-box bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h3 class="font-bold text-lg mb-4 text-gray-800 dark:text-white">{{ $t('deleteParticipant') }}</h3>
        <p class="mb-6 text-gray-600 dark:text-gray-400">{{ $t('confirmDelete') }}</p>
        
        <div class="modal-action">
          <button
            @click="showDeleteModal = false"
            class="btn btn-ghost"
          >
            {{ $t('cancel') }}
          </button>
          <button
            @click="confirmDelete"
            class="btn btn-error"
            :class="{ 'loading': participantStore.loading }"
          >
            {{ $t('delete') }}
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useParticipantStore } from '@/stores/participantStore'
import { UsersIcon, CheckCircleIcon, ClockIcon, UserPlusIcon, MagnifyingGlassIcon, ArrowDownTrayIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const participantStore = useParticipantStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const editingParticipant = ref(null)
const participantToDelete = ref(null)

const participantForm = reactive({
  full_name: '',
  email: '',
  institution: '',
  ticket_type: ''
})

const searchQuery = computed({
  get: () => participantStore.searchQuery,
  set: (value) => participantStore.setSearchQuery(value)
})

const selectedTicketType = computed({
  get: () => participantStore.selectedTicketType,
  set: (value) => participantStore.setTicketTypeFilter(value)
})

const selectedStatus = computed({
  get: () => participantStore.selectedStatus,
  set: (value) => participantStore.setStatusFilter(value)
})

onMounted(() => {
  participantStore.fetchParticipants()
})

const resetForm = () => {
  participantForm.full_name = ''
  participantForm.email = ''
  participantForm.institution = ''
  participantForm.ticket_type = ''
}

const editParticipant = (participant) => {
  editingParticipant.value = participant
  participantForm.full_name = participant.full_name
  participantForm.email = participant.email
  participantForm.institution = participant.institution
  participantForm.ticket_type = participant.ticket_type
  showEditModal.value = true
}

const deleteParticipant = (participantId) => {
  participantToDelete.value = participantId
  showDeleteModal.value = true
}

const saveParticipant = async () => {
  try {
    if (editingParticipant.value) {
      await participantStore.updateParticipant(editingParticipant.value.id, participantForm)
    } else {
      await participantStore.createParticipant(participantForm)
    }
    closeModal()
  } catch (error) {
    console.error('Error saving participant:', error)
  }
}

const confirmDelete = async () => {
  try {
    await participantStore.deleteParticipant(participantToDelete.value)
    showDeleteModal.value = false
    participantToDelete.value = null
  } catch (error) {
    console.error('Error deleting participant:', error)
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingParticipant.value = null
  resetForm()
}

const exportData = () => {
  const csvContent = [
    ['Name', 'Email', 'Institution', 'Ticket Type', 'Status', 'Registration Date'],
    ...participantStore.filteredParticipants.map(p => [
      p.full_name,
      p.email,
      p.institution,
      p.ticket_type,
      p.checkin_status ? 'Checked In' : 'Pending',
      new Date(p.created_at).toLocaleDateString()
    ])
  ]
  
  const csvString = csvContent.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvString], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'participants.csv'
  a.click()
  URL.revokeObjectURL(url)
}

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

const getParticleStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 20}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }
}
</script>