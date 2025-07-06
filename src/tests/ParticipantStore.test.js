import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useParticipantStore } from '@/stores/participantStore'

describe('ParticipantStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty participants array', () => {
    const store = useParticipantStore()
    expect(store.participants).toEqual([])
    expect(store.totalParticipants).toBe(0)
  })

  it('should filter participants correctly', () => {
    const store = useParticipantStore()
    
    // Add some test participants
    store.participants = [
      {
        id: '1',
        full_name: 'John Doe',
        email: 'john@example.com',
        institution: 'Tech University',
        ticket_type: 'VIP',
        checkin_status: true
      },
      {
        id: '2',
        full_name: 'Jane Smith',
        email: 'jane@example.com',
        institution: 'Business School',
        ticket_type: 'Regular',
        checkin_status: false
      }
    ]

    // Test search filter
    store.setSearchQuery('john')
    expect(store.filteredParticipants).toHaveLength(1)
    expect(store.filteredParticipants[0].full_name).toBe('John Doe')

    // Test ticket type filter
    store.setSearchQuery('')
    store.setTicketTypeFilter('VIP')
    expect(store.filteredParticipants).toHaveLength(1)
    expect(store.filteredParticipants[0].ticket_type).toBe('VIP')

    // Test status filter
    store.setTicketTypeFilter('all')
    store.setStatusFilter('checked-in')
    expect(store.filteredParticipants).toHaveLength(1)
    expect(store.filteredParticipants[0].checkin_status).toBe(true)
  })

  it('should calculate stats correctly', () => {
    const store = useParticipantStore()
    
    store.participants = [
      { id: '1', checkin_status: true },
      { id: '2', checkin_status: false },
      { id: '3', checkin_status: true }
    ]

    expect(store.totalParticipants).toBe(3)
    expect(store.checkedInCount).toBe(2)
    expect(store.pendingCount).toBe(1)
  })

  it('should handle admin login correctly', () => {
    const store = useParticipantStore()
    
    // Test valid credentials
    const validLogin = store.login({ username: 'admin', password: 'admin123' })
    expect(validLogin).toBe(true)
    expect(store.isAdmin).toBe(true)

    // Test invalid credentials
    store.logout()
    const invalidLogin = store.login({ username: 'wrong', password: 'wrong' })
    expect(invalidLogin).toBe(false)
    expect(store.isAdmin).toBe(false)
  })
})