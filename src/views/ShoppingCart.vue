<template>
  <div class="min-h-screen bg-wellness-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-display font-bold text-neutral-900 mb-2">Shopping Cart</h1>
        <p class="text-neutral-600">
          {{ cartStore.itemCount }} {{ cartStore.itemCount === 1 ? 'item' : 'items' }} in your cart
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2">
          <!-- Empty Cart -->
          <div
            v-if="cartStore.items.length === 0"
            class="text-center py-16 bg-white rounded-2xl border border-neutral-100"
          >
            <ShoppingBagIcon class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h3 class="text-xl font-display font-semibold text-neutral-900 mb-2">
              Your cart is empty
            </h3>
            <p class="text-neutral-600 mb-6">Add some wellness essentials to get started</p>
            <router-link
              to="/"
              class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Continue Shopping
            </router-link>
          </div>

          <!-- Cart Items List -->
          <div v-else class="space-y-4">
            <CartItem
              v-for="item in cartStore.items"
              :key="item.id"
              :item="item"
              @update-quantity="updateQuantity"
              @remove="removeItem"
            />
          </div>
        </div>

        <!-- Order Summary -->
        <div v-if="cartStore.items.length > 0" class="lg:col-span-1">
          <div class="bg-white rounded-2xl border border-neutral-100 p-6 sticky top-8">
            <h3 class="text-xl font-display font-semibold text-neutral-900 mb-6">Order Summary</h3>

            <div class="space-y-4">
              <!-- Subtotal -->
              <div class="flex justify-between">
                <span class="text-neutral-600">Subtotal</span>
                <span class="font-medium">${{ cartStore.totalPrice }}</span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between">
                <span class="text-neutral-600">Shipping</span>
                <span class="font-medium text-primary-600">Free</span>
              </div>

              <!-- Wellness Discount -->
              <div class="flex justify-between text-primary-600">
                <span>Wellness Discount</span>
                <span>-${{ wellnessDiscount }}</span>
              </div>

              <hr class="border-neutral-200" />

              <!-- Total -->
              <div class="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${{ finalTotal }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <router-link
              to="/checkout"
              class="w-full bg-primary-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2 mt-6"
            >
              <span>Proceed to Checkout</span>
              <ChevronRightIcon class="w-5 h-5" />
            </router-link>

            <!-- Trust Indicators -->
            <div class="mt-6 pt-6 border-t border-neutral-100">
              <div class="flex items-center space-x-4 text-sm text-neutral-600">
                <div class="flex items-center space-x-2">
                  <LockClosedIcon class="w-4 h-4 text-primary-500" />
                  <span>Secure Checkout</span>
                </div>
                <div class="flex items-center space-x-2">
                  <ShieldCheckIcon class="w-4 h-4 text-primary-500" />
                  <span>Zero Irritation Promise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  ShoppingBagIcon,
  ChevronRightIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/cart/CartItem.vue'

const cartStore = useCartStore()

const wellnessDiscount = computed(() => {
  // 5% wellness discount for orders over $50
  const total = parseFloat(cartStore.totalPrice)
  return total > 50 ? (total * 0.05).toFixed(2) : '0.00'
})

const finalTotal = computed(() => {
  const total = parseFloat(cartStore.totalPrice)
  const discount = parseFloat(wellnessDiscount.value)
  return (total - discount).toFixed(2)
})

const updateQuantity = (itemId, quantity) => {
  cartStore.updateQuantity(itemId, quantity)
}

const removeItem = (itemId) => {
  cartStore.removeItem(itemId)
}
</script>
