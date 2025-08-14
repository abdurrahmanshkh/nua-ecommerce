<template>
  <div class="min-h-screen bg-wellness-cream">
    <!-- Loading State -->
    <div v-if="productStore.loading" class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"
        ></div>
        <p class="text-neutral-600">Loading product details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="productStore.error" class="flex items-center justify-center min-h-96">
      <div class="text-center">
        <p class="text-red-600 mb-4">{{ productStore.error }}</p>
        <button
          @click="fetchProduct"
          class="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex items-center space-x-2 text-sm mb-8">
        <router-link to="/" class="text-primary-600 hover:text-primary-700"> Products </router-link>
        <ChevronRightIcon class="w-4 h-4 text-neutral-400" />
        <span class="text-neutral-600">{{ formatCategory(product.category) }}</span>
        <ChevronRightIcon class="w-4 h-4 text-neutral-400" />
        <span class="text-neutral-900 font-medium">{{ product.title }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="aspect-square bg-white rounded-2xl border border-neutral-100 overflow-hidden">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-contain object-center p-8"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Category -->
          <div
            class="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium"
          >
            {{ formatCategory(product.category) }}
          </div>

          <!-- Title -->
          <h1 class="text-3xl lg:text-4xl font-display font-bold text-neutral-900">
            {{ product.title }}
          </h1>

          <!-- Rating -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <StarIcon
                v-for="star in 5"
                :key="star"
                :class="
                  star <= Math.floor(product.rating?.rate || 0)
                    ? 'text-yellow-400'
                    : 'text-neutral-200'
                "
                class="w-5 h-5"
              />
            </div>
            <span class="text-neutral-600">
              {{ product.rating?.rate || 0 }} ({{ product.rating?.count || 0 }} reviews)
            </span>
          </div>

          <!-- Price -->
          <div class="text-4xl font-bold text-neutral-900">${{ product.price }}</div>

          <!-- Description -->
          <div class="prose prose-neutral max-w-none">
            <p class="text-neutral-600 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <!-- Add to Cart Section -->
          <div class="space-y-4 p-6 bg-white rounded-2xl border border-neutral-100">
            <div class="flex items-center space-x-4">
              <label for="quantity" class="text-sm font-medium text-neutral-700"> Quantity: </label>
              <select
                id="quantity"
                v-model="selectedQuantity"
                class="border border-neutral-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>

            <button
              @click="addToCart"
              :disabled="isAdding"
              class="w-full bg-primary-500 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingBagIcon class="w-6 h-6" />
              <span v-if="!isAdding">Add to Cart</span>
              <span v-else>Adding...</span>
            </button>

            <!-- Trust Indicators -->
            <div
              class="flex items-center justify-between text-sm text-neutral-600 pt-4 border-t border-neutral-100"
            >
              <div class="flex items-center space-x-2">
                <ShieldCheckIcon class="w-4 h-4 text-primary-500" />
                <span>Zero Irritation Promise</span>
              </div>
              <div class="flex items-center space-x-2">
                <TruckIcon class="w-4 h-4 text-primary-500" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>

          <!-- Product Features -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="text-center p-4 bg-wellness-pink/20 rounded-lg">
              <HeartIcon class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <p class="text-sm font-medium text-neutral-900">Wellness First</p>
            </div>
            <div class="text-center p-4 bg-wellness-sage/20 rounded-lg">
              <ShieldCheckIcon class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <p class="text-sm font-medium text-neutral-900">Quality Assured</p>
            </div>
            <div class="text-center p-4 bg-wellness-warm/20 rounded-lg">
              <SparklesIcon class="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <p class="text-sm font-medium text-neutral-900">Comfort Focused</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  StarIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  HeartIcon,
  SparklesIcon,
} from '@heroicons/vue/24/solid'
import { useProductStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
})

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const selectedQuantity = ref(1)
const isAdding = ref(false)

const product = computed(() => productStore.currentProduct)

onMounted(() => {
  fetchProduct()
})

const fetchProduct = async () => {
  await productStore.fetchProduct(props.id)
}

const formatCategory = (category) => {
  return category?.charAt(0).toUpperCase() + category?.slice(1).replace(/'/g, "'")
}

const addToCart = async () => {
  if (!product.value) return

  isAdding.value = true

  // Simulate a brief loading state for better UX
  setTimeout(() => {
    cartStore.addItem(product.value, selectedQuantity.value)
    isAdding.value = false
  }, 300)
}
</script>
