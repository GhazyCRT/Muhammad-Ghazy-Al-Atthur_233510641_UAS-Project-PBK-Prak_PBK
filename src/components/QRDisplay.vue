<template>
  <div class="bg-white p-6 rounded-lg shadow-lg text-center animate__animated animate__fadeIn">
    <h3 class="text-xl font-bold mb-4 text-gray-800">{{ $t('qrCode') }}</h3>
    <div class="flex justify-center mb-4">
      <div v-html="qrCodeSvg" class="qr-code border-4 border-gray-200 rounded-lg p-4"></div>
    </div>
    <p class="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
      {{ ticketId }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import qrcode from 'qrcode-generator'

const props = defineProps({
  ticketId: {
    type: String,
    required: true
  }
})

const qrCodeSvg = computed(() => {
  const qr = qrcode(0, 'M')
  qr.addData(props.ticketId)
  qr.make()
  return qr.createSvgTag(4, 0)
})
</script>