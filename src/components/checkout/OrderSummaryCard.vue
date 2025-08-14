<template>
  <div class="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-8">
    <h3 class="text-xl font-display font-semibold text-neutral-900 mb-6">Order Summary</h3>

    <!-- Order Items -->
    <div class="space-y-4 mb-6">
      <div v-for="item in cartStore.items" :key="item.id" class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-16 h-16 object-contain object-center bg-wellness-cream rounded-lg"
          />
        </div>

        <div class="flex-1 min-w-0">
          <p class="font-medium text-neutral-900 text-sm">{{ item.title }}</p>
          <p class="text-neutral-600 text-sm">Qty: {{ item.quantity }}</p>
        </div>

        <div class="text-right">
          <p class="font-medium text-neutral-900">${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <hr class="border-neutral-200 mb-6" />

    <!-- Pricing Breakdown -->
    <div class="space-y-3 mb-6">
      <div class="flex justify-between text-neutral-600">
        <span>Subtotal</span>
        <span>${{ cartStore.totalPrice }}</span>
      </div>

      <div class="flex justify-between text-neutral-600">
        <span>Shipping</span>
        <span class="text-primary-600">Free</span>
      </div>

      <div class="flex justify-between text-neutral-600">
        <span>Tax</span>
        <span>${{ taxAmount }}</span>
      </div>

      <!-- Wellness Discount -->
      <div v-if="wellnessDiscount > 0" class="flex justify-between text-primary-600">
        <span class="flex items-center">
          <HeartIcon class="w-4 h-4 mr-1" />
          Wellness Discount
        </span>
        <span>-${{ wellnessDiscount }}</span>
      </div>
    </div>

    <hr class="border-neutral-200 mb-6" />

    <!-- Total -->
    <div class="flex justify-between text-xl font-bold text-neutral-900 mb-6">
      <span>Total</span>
      <span>${{ finalTotal }}</span>
    </div>

    <!-- Trust Indicators -->
    <div class="bg-wellness-cream rounded-lg p-4">
      <h4 class="font-medium text-neutral-900 mb-3">Your Wellness Promise</h4>
      <div class="space-y-2 text-sm text-neutral-600">
        <div class="flex items-center">
          <ShieldCheckIcon class="w-4 h-4 text-primary-500 mr-2" />
          Zero Irritation Guarantee
        </div>
        <div class="flex items-center">
          <TruckIcon class="w-4 h-4 text-primary-500 mr-2" />
          Free & Discreet Shipping
        </div>
        <div class="flex items-center">
          <LockClosedIcon class="w-4 h-4 text-primary-500 mr-2" />
          Secure 256-bit SSL
        </div>
        <div class="flex items-center">
          <ArrowPathIcon class="w-4 h-4 text-primary-500 mr-2" />
          30-Day Money Back
        </div>
      </div>
    </div>

    <!-- Estimated Delivery -->
    <div class="mt-4 p-4 bg-wellness-sage/10 rounded-lg">
      <div class="flex items-center text-sm">
        <CalendarIcon class="w-4 h-4 text-wellness-sage mr-2" />
        <span class="text-neutral-700">
          Estimated delivery: <span class="font-medium">{{ estimatedDelivery }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  HeartIcon,
  ShieldCheckIcon,
  TruckIcon,
  LockClosedIcon,
  ArrowPathIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const taxAmount = computed(() => {
  const subtotal = parseFloat(cartStore.totalPrice)
  return (subtotal * 0.08).toFixed(2) // 8% tax
})

const wellnessDiscount = computed(() => {
  const subtotal = parseFloat(cartStore.totalPrice)
  // 5% wellness discount for orders over $50
  return subtotal > 50 ? (subtotal * 0.05).toFixed(2) : '0.00'
})

const finalTotal = computed(() => {
  const subtotal = parseFloat(cartStore.totalPrice)
  const tax = parseFloat(taxAmount.value)
  const discount = parseFloat(wellnessDiscount.value)
  return (subtotal + tax - discount).toFixed(2)
})

const estimatedDelivery = computed(() => {
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + 3) // 3 days from now

  return deliveryDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
})
</script>
