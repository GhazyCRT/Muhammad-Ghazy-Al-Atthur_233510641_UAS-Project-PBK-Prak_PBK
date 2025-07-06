import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'

export const useParticipantStore = defineStore('participant', {
  state: () => ({
    participants: [],
    currentParticipant: null,
    loading: false,
    error: null,
    isAdmin: false,
    searchQuery: '',
    selectedTicketType: 'all',
    selectedStatus: 'all'
  }),

  getters: {
    filteredParticipants: (state) => {
      return state.participants.filter(participant => {
        const matchesSearch = participant.full_name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                             participant.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                             participant.institution.toLowerCase().includes(state.searchQuery.toLowerCase())
        
        const matchesTicketType = state.selectedTicketType === 'all' || 
                                 participant.ticket_type === state.selectedTicketType
        
        const matchesStatus = state.selectedStatus === 'all' || 
                             (state.selectedStatus === 'checked-in' && participant.checkin_status) ||
                             (state.selectedStatus === 'pending' && !participant.checkin_status)
        
        return matchesSearch && matchesTicketType && matchesStatus
      })
    },

    totalParticipants: (state) => state.participants.length,
    checkedInCount: (state) => state.participants.filter(p => p.checkin_status).length,
    pendingCount: (state) => state.participants.filter(p => !p.checkin_status).length
  },

  actions: {
    async fetchParticipants() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/participants`)
        this.participants = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching participants:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchParticipant(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/participants/${id}`)
        this.currentParticipant = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching participant:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    async createParticipant(participantData) {
      this.loading = true
      this.error = null
      try {
        const qrCode = `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        const newParticipant = {
          ...participantData,
          qr_code: qrCode,
          checkin_status: false,
          created_at: new Date().toISOString()
        }
        
        const response = await axios.post(`${API_BASE_URL}/participants`, newParticipant)
        this.participants.push(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error creating participant:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    async updateParticipant(id, participantData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.patch(`${API_BASE_URL}/participants/${id}`, participantData)
        const index = this.participants.findIndex(p => p.id === id)
        if (index !== -1) {
          this.participants[index] = response.data
        }
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error updating participant:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    async deleteParticipant(id) {
      this.loading = true
      this.error = null
      try {
        await axios.delete(`${API_BASE_URL}/participants/${id}`)
        this.participants = this.participants.filter(p => p.id !== id)
        return true
      } catch (error) {
        this.error = error.message
        console.error('Error deleting participant:', error)
        return false
      } finally {
        this.loading = false
      }
    },

    async checkinParticipant(ticketId) {
      this.loading = true
      this.error = null
      try {
        const participant = this.participants.find(p => p.qr_code === ticketId || p.id === ticketId)
        if (!participant) {
          throw new Error('Participant not found')
        }
        
        if (participant.checkin_status) {
          throw new Error('Already checked in')
        }
        
        const response = await axios.patch(`${API_BASE_URL}/participants/${participant.id}`, {
          checkin_status: true
        })
        
        const index = this.participants.findIndex(p => p.id === participant.id)
        if (index !== -1) {
          this.participants[index] = response.data
        }
        
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error checking in participant:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    login(credentials) {
      // Mock login - in real app, this would validate against a backend
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        this.isAdmin = true
        return true
      }
      return false
    },

    logout() {
      this.isAdmin = false
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setTicketTypeFilter(type) {
      this.selectedTicketType = type
    },

    setStatusFilter(status) {
      this.selectedStatus = status
    }
  }
})