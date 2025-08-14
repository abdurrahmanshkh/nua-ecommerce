<template>
  <div>
    <div class="flex items-center mb-6">
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3"
      >
        4
      </div>
      <h2 class="text-xl font-display font-semibold text-neutral-900">Review & Confirm</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Customer Info -->
      <section class="bg-white rounded-xl p-5 border border-neutral-100">
        <h3 class="font-semibold text-neutral-900 mb-2 text-md">Customer Information</h3>
        <div class="text-neutral-700 text-sm">
          <div>
            <span class="font-medium"
              >{{ checkoutStore.customerInfo.firstName }}
              {{ checkoutStore.customerInfo.lastName }}</span
            >
          </div>
          <div>{{ checkoutStore.customerInfo.email }}</div>
          <div v-if="checkoutStore.customerInfo.phone">+{{ checkoutStore.customerInfo.phone }}</div>
        </div>
      </section>

      <!-- Shipping Address -->
      <section class="bg-white rounded-xl p-5 border border-neutral-100">
        <h3 class="font-semibold text-neutral-900 mb-2 text-md">Shipping Address</h3>
        <div class="text-neutral-700 text-sm">
          <div>{{ checkoutStore.shippingAddress.address }}</div>
          <div>
            {{ checkoutStore.shippingAddress.city }}, {{ checkoutStore.shippingAddress.state }}
            {{ checkoutStore.shippingAddress.postalCode }}
          </div>
          <div>{{ checkoutStore.shippingAddress.country }}</div>
        </div>
      </section>

      <!-- Payment Method -->
      <section class="bg-white rounded-xl p-5 border border-neutral-100">
        <h3 class="font-semibold text-neutral-900 mb-2 text-md">Payment Method</h3>
        <div class="text-neutral-700 text-sm">
          <span v-if="checkoutStore.paymentMethod === 'card'"
            >Credit/Debit Card (ending in ****{{ cardLastFour }})</span
          >
          <span v-else-if="checkoutStore.paymentMethod === 'upi'">UPI</span>
          <span v-else-if="checkoutStore.paymentMethod === 'cod'">Cash on Delivery</span>
        </div>
      </section>

      <!-- Cart Items -->
      <section class="bg-white rounded-xl p-5 border border-neutral-100">
        <h3 class="font-semibold text-neutral-900 mb-2 text-md">Items Ordered</h3>
        <div class="divide-y divide-neutral-100">
          <div v-for="item in cartStore.items" :key="item.id" class="flex items-center py-3">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-12 h-12 object-contain rounded-lg mr-3 bg-wellness-cream"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-neutral-900 font-medium truncate">{{ item.title }}</p>
              <p class="text-xs text-neutral-600">Qty: {{ item.quantity }}</p>
            </div>
            <p class="text-sm text-neutral-800 font-medium">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </p>
          </div>
        </div>
      </section>

      <!-- Total & Confirmation -->
      <div class="flex justify-between items-center pt-5 border-t border-neutral-200">
        <div class="text-neutral-700 font-medium text-lg">
          Total: <span class="text-primary-600">${{ cartStore.totalPrice }}</span>
        </div>
        <button
          type="submit"
          :disabled="checkoutStore.loading"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
        >
          <span v-if="!checkoutStore.loading">Place Order</span>
          <span v-else>Placing Order...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const checkoutStore = useCheckoutStore()
const cartStore = useCartStore()
const router = useRouter()

const cardLastFour = computed(() => {
  // If you have cardNumber in your store, update accordingly
  // The demo assumes the card number is a string in checkoutStore
  const number = checkoutStore.cardNumber || ''
  return number ? number.slice(-4) : 'xxxx'
})

function handleSubmit() {
  // Final order placement: simulate and then redirect
  checkoutStore
    .submitOrder(cartStore.items, cartStore.totalPrice)
    .then(({ success, orderNumber }) => {
      if (success) {
        router.push({
          name: 'order-confirmation',
          query: { orderNumber },
        })
      }
    })
}
</script>
