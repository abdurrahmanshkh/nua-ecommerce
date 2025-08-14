<template>
  <div class="min-h-screen bg-wellness-cream">
    <!-- Redirect if cart is empty -->
    <div v-if="cartStore.items.length === 0" class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <ShoppingBagIcon class="w-16 h-16 text-neutral-300 mx-auto mb-4" />
        <h3 class="text-xl font-display font-semibold text-neutral-900 mb-2">Your cart is empty</h3>
        <p class="text-neutral-600 mb-6">Add some items to proceed with checkout</p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>

    <!-- Checkout Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-display font-bold text-neutral-900 mb-2">Secure Checkout</h1>
        <p class="text-neutral-600">Complete your wellness journey</p>
      </div>

      <!-- Progress Bar -->
      <div class="mb-12">
        <div class="flex items-center justify-between mb-4">
          <div
            v-for="step in checkoutSteps"
            :key="step.number"
            class="flex items-center"
            :class="{ 'flex-1': step.number < checkoutSteps.length }"
          >
            <!-- Step Circle -->
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-200"
              :class="getStepClasses(step.number)"
            >
              <CheckIcon v-if="step.number < checkoutStore.currentStep" class="w-5 h-5" />
              <span v-else>{{ step.number }}</span>
            </div>

            <!-- Step Label -->
            <span class="ml-3 text-sm font-medium text-neutral-600">{{ step.title }}</span>

            <!-- Progress Line -->
            <div
              v-if="step.number < checkoutSteps.length"
              class="flex-1 h-0.5 mx-6 transition-colors duration-200"
              :class="step.number < checkoutStore.currentStep ? 'bg-primary-500' : 'bg-neutral-200'"
            ></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl border border-neutral-100 p-8">
            <!-- Step 1: Customer Information -->
            <div v-show="checkoutStore.currentStep === 1">
              <CustomerInfoStep />
            </div>

            <!-- Step 2: Shipping Address -->
            <div v-show="checkoutStore.currentStep === 2">
              <ShippingAddressStep />
            </div>

            <!-- Step 3: Payment Method -->
            <div v-show="checkoutStore.currentStep === 3">
              <PaymentMethodStep />
            </div>

            <!-- Step 4: Order Review -->
            <div v-show="checkoutStore.currentStep === 4">
              <OrderReviewStep />
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <OrderSummaryCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingBagIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import CustomerInfoStep from '@/components/checkout/CustomerInfoStep.vue'
import ShippingAddressStep from '@/components/checkout/ShippingAddressStep.vue'
import PaymentMethodStep from '@/components/checkout/PaymentMethodStep.vue'
import OrderReviewStep from '@/components/checkout/OrderReviewStep.vue'
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard.vue'

const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

const checkoutSteps = [
  { number: 1, title: 'Customer Information' },
  { number: 2, title: 'Shipping Address' },
  { number: 3, title: 'Payment Method' },
  { number: 4, title: 'Review Order' },
]

const getStepClasses = (stepNumber) => {
  if (stepNumber < checkoutStore.currentStep) {
    return 'bg-primary-500 text-white'
  } else if (stepNumber === checkoutStore.currentStep) {
    return 'bg-primary-100 text-primary-700 border-2 border-primary-500'
  } else {
    return 'bg-neutral-100 text-neutral-500'
  }
}
</script>
