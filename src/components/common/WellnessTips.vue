<template>
  <div class="bg-gradient-to-br from-wellness-sage/10 to-wellness-pink/10 rounded-2xl p-6">
    <div class="flex items-center mb-4">
      <SparklesIcon class="w-6 h-6 text-primary-500 mr-2" />
      <h3 class="text-lg font-display font-semibold text-neutral-900">Daily Wellness Tip</h3>
    </div>

    <div class="mb-4">
      <p class="text-neutral-700 mb-2">{{ currentTip.text }}</p>
      <p class="text-sm text-neutral-500 italic">{{ currentTip.category }}</p>
    </div>

    <button
      @click="getNewTip"
      class="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
    >
      <ArrowPathIcon class="w-4 h-4 mr-1" />
      Get New Tip
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SparklesIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

const wellnessTips = [
  {
    text: 'Listen to your body - it knows what it needs better than any external advice.',
    category: 'Self-Care',
  },
  {
    text: 'Stay hydrated throughout your cycle - it helps reduce discomfort and supports overall wellness.',
    category: 'Hydration',
  },
  {
    text: 'Gentle movement like walking or stretching can help ease period discomfort naturally.',
    category: 'Movement',
  },
  {
    text: 'Choose products that prioritize your comfort - you deserve zero irritation, always.',
    category: 'Product Choice',
  },
  {
    text: 'Track your patterns to better understand your unique cycle and needs.',
    category: 'Tracking',
  },
]

const currentTip = ref(wellnessTips[0])

const getNewTip = () => {
  const randomIndex = Math.floor(Math.random() * wellnessTips.length)
  currentTip.value = wellnessTips[randomIndex]
}

onMounted(() => {
  getNewTip()
})
</script>
