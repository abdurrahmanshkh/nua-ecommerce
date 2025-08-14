<template>
  <div class="min-h-screen bg-wellness-cream">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Success Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-primary-500 text-white rounded-full mb-6"
        >
          <CheckCircleIcon class="w-10 h-10" />
        </div>

        <h1 class="text-4xl font-display font-bold text-neutral-900 mb-4">
          Thank You for Your Order! 🌸
        </h1>

        <p class="text-xl text-neutral-600 mb-2">
          Your wellness journey continues with order
          <span class="font-semibold text-primary-600">#{{ orderNumber }}</span>
        </p>

        <p class="text-neutral-600">
          A confirmation email has been sent to <span class="font-medium">{{ customerEmail }}</span>
        </p>
      </div>

      <!-- Order Summary Card -->
      <div class="bg-white rounded-2xl border border-neutral-100 p-8 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Order Details -->
          <div>
            <h3 class="text-lg font-display font-semibold text-neutral-900 mb-4">Order Details</h3>

            <div class="space-y-4">
              <div v-for="item in orderItems" :key="item.id" class="flex items-center space-x-4">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-16 h-16 object-contain bg-wellness-cream rounded-lg"
                />
                <div class="flex-1">
                  <p class="font-medium text-neutral-900">{{ item.title }}</p>
                  <p class="text-neutral-600 text-sm">Qty: {{ item.quantity }}</p>
                </div>
                <p class="font-medium text-neutral-900">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>

            <div class="border-t border-neutral-200 mt-6 pt-4">
              <div class="flex justify-between text-lg font-semibold text-neutral-900">
                <span>Total</span>
                <span>${{ orderTotal }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div>
            <h3 class="text-lg font-display font-semibold text-neutral-900 mb-4">
              Shipping Information
            </h3>

            <div class="bg-wellness-cream p-4 rounded-lg mb-4">
              <div class="flex items-center text-sm text-neutral-700 mb-2">
                <TruckIcon class="w-4 h-4 mr-2 text-primary-500" />
                <span
                  >Estimated Delivery:
                  <span class="font-medium">{{ estimatedDelivery }}</span></span
                >
              </div>
              <div class="text-xs text-neutral-600">
                We'll send tracking information once your order ships
              </div>
            </div>

            <div class="text-sm text-neutral-700 space-y-1">
              <p class="font-medium">
                {{ shippingAddress.firstName }} {{ shippingAddress.lastName }}
              </p>
              <p>{{ shippingAddress.address }}</p>
              <p>
                {{ shippingAddress.city }}, {{ shippingAddress.state }}
                {{ shippingAddress.postalCode }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wellness Tips & Next Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Wellness Tips Card -->
        <div class="bg-gradient-to-br from-wellness-sage/20 to-wellness-pink/20 rounded-2xl p-6">
          <div class="flex items-center mb-4">
            <HeartIcon class="w-6 h-6 text-primary-500 mr-2" />
            <h3 class="text-lg font-display font-semibold text-neutral-900">
              Your Wellness Journey
            </h3>
          </div>

          <div class="space-y-3 text-sm text-neutral-700">
            <p class="flex items-start">
              <span
                class="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"
              ></span>
              Track your wellness patterns and how products make you feel
            </p>
            <p class="flex items-start">
              <span
                class="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"
              ></span>
              Stay hydrated and maintain a balanced routine
            </p>
            <p class="flex items-start">
              <span
                class="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"
              ></span>
              Remember: your comfort and well-being always come first
            </p>
          </div>
        </div>

        <!-- Account Benefits Card -->
        <div class="bg-white rounded-2xl border border-neutral-100 p-6">
          <div class="flex items-center mb-4">
            <UserCircleIcon class="w-6 h-6 text-primary-500 mr-2" />
            <h3 class="text-lg font-display font-semibold text-neutral-900">Create Your Account</h3>
          </div>

          <p class="text-sm text-neutral-600 mb-4">
            Save your preferences, track orders, and get personalized recommendations.
          </p>

          <button
            @click="createAccount"
            class="w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
          >
            Create Account
          </button>
        </div>
      </div>

      <!-- Social Sharing & Newsletter -->
      <div class="bg-white rounded-2xl border border-neutral-100 p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Social Sharing -->
          <div>
            <h3 class="text-lg font-display font-semibold text-neutral-900 mb-4">
              Share Your Wellness Choice
            </h3>
            <p class="text-sm text-neutral-600 mb-4">
              Inspire others on their wellness journey by sharing Nua with friends.
            </p>

            <div class="flex space-x-3">
              <button
                class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                Share on Facebook
              </button>
              <button
                class="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors"
              >
                Share on Instagram
              </button>
            </div>
          </div>

          <!-- Newsletter -->
          <div v-if="!isSubscribed">
            <h3 class="text-lg font-display font-semibold text-neutral-900 mb-4">Stay Connected</h3>
            <p class="text-sm text-neutral-600 mb-4">
              Get wellness tips, exclusive offers, and be the first to know about new products.
            </p>

            <button
              @click="subscribeNewsletter"
              class="w-full bg-wellness-sage text-white py-2 px-4 rounded-lg hover:bg-wellness-sage/90 transition-colors text-sm font-medium"
            >
              Subscribe to Wellness Updates
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          @click="trackOrder"
          class="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <MagnifyingGlassIcon class="w-5 h-5 mr-2" />
          Track Your Order
        </button>

        <router-link
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Continue Shopping
        </router-link>
      </div>

      <!-- Help Section -->
      <div class="text-center mt-12 p-6 bg-wellness-pink/10 rounded-lg">
        <p class="text-neutral-600 mb-2">Need help with your order?</p>
        <p class="text-sm text-neutral-500">
          Contact our wellness support team at
          <a
            href="mailto:support@nuawoman.com"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            support@nuawoman.com
          </a>
          or call 1-800-NUA-CARE
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  CheckCircleIcon,
  TruckIcon,
  HeartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import { useCheckoutStore } from '@/stores/checkout'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const toast = useToast()

const orderNumber = ref(route.query.orderNumber || 'NUA-12345678')
const customerEmail = ref('customer@example.com')
const orderItems = ref([])
const orderTotal = ref('0.00')
const shippingAddress = ref({})
const isSubscribed = ref(false)

const estimatedDelivery = ref('')

onMounted(() => {
  // If no order data, redirect to home
  if (!route.query.orderNumber) {
    router.push('/')
    return
  }

  // Set delivery date
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(today.getDate() + 3)
  estimatedDelivery.value = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  // Clear cart after successful order
  setTimeout(() => {
    cartStore.clearCart()
  }, 2000)
})

const createAccount = () => {
  toast.success('Account creation feature coming soon! 🌸')
}

const subscribeNewsletter = () => {
  isSubscribed.value = true
  toast.success('Thank you for subscribing to our wellness updates! 📧')
}

const trackOrder = () => {
  toast.info('Order tracking will be available once your order ships! 📦')
}
</script>
