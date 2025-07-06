import { ref, onMounted, onUnmounted } from 'vue'

export function useCountdown(targetDate) {
  const timeLeft = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  let interval = null

  const updateCountdown = () => {
    const now = new Date().getTime()
    const target = new Date(targetDate).getTime()
    const difference = target - now

    if (difference > 0) {
      timeLeft.value.days = Math.floor(difference / (1000 * 60 * 60 * 24))
      timeLeft.value.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      timeLeft.value.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      timeLeft.value.seconds = Math.floor((difference % (1000 * 60)) / 1000)
    } else {
      timeLeft.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  }

  onMounted(() => {
    updateCountdown()
    interval = setInterval(updateCountdown, 1000)
  })

  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })

  return timeLeft
}