<template>
  <div class="bg-white rounded-2xl border border-neutral-100 p-6 flex flex-col sm:flex-row gap-6">
    <!-- Product Image -->
    <div class="flex-shrink-0">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-24 h-24 object-contain object-center bg-wellness-cream rounded-lg"
      />
    </div>

    <!-- Product Info -->
    <div class="flex-1 min-w-0">
      <h3 class="font-display font-semibold text-neutral-900 text-lg mb-2">
        {{ item.title }}
      </h3>
      <p class="text-2xl font-bold text-neutral-900 mb-4">${{ item.price }}</p>

      <!-- Quantity and Remove -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <label for="`quantity-${item.id}`" class="text-sm font-medium text-neutral-700">
            Qty:
          </label>
          <select
            :id="`quantity-${item.id}`"
            :value="item.quantity"
            @change="$emit('update-quantity', item.id, parseInt($event.target.value))"
            class="border border-neutral-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <button
          @click="$emit('remove', item.id)"
          class="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
        >
          <TrashIcon class="w-4 h-4" />
          <span>Remove</span>
        </button>
      </div>
    </div>

    <!-- Subtotal -->
    <div class="flex-shrink-0 text-right">
      <p class="text-sm text-neutral-600 mb-1">Subtotal</p>
      <p class="text-xl font-bold text-neutral-900">
        ${{ (item.price * item.quantity).toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

defineEmits(['update-quantity', 'remove'])
</script>
