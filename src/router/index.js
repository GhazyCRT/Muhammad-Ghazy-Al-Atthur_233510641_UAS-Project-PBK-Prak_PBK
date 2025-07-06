import { createRouter, createWebHistory } from 'vue-router'
import { useParticipantStore } from '@/stores/participantStore'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import ParticipantDashboard from '@/views/ParticipantDashboard.vue'
import AdminLogin from '@/views/AdminLogin.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import CheckIn from '@/views/CheckIn.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/participant/:id',
    name: 'ParticipantDashboard',
    component: ParticipantDashboard,
    props: true
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/checkin',
    name: 'CheckIn',
    component: CheckIn,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const participantStore = useParticipantStore()
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!participantStore.isAdmin) {
      next({ name: 'AdminLogin' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router