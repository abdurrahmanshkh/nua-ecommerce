<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-wellness-pink">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">N</span>
          </div>
          <span class="text-2xl font-display font-semibold text-neutral-900">Nua Store</span>
        </router-link>

        <!-- Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            to="/"
            class="text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            :class="{ 'text-primary-600': $route.name === 'products' }"
          >
            Products
          </router-link>
          <router-link
            to="/cart"
            class="relative text-neutral-700 hover:text-primary-600 transition-colors duration-200 font-medium flex items-center"
            :class="{ 'text-primary-600': $route.name === 'cart' }"
          >
            <ShoppingBagIcon class="w-6 h-6 mr-1" />
            Cart
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden rounded-lg p-2 hover:bg-wellness-pink transition-colors"
        >
          <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden border-t border-wellness-pink mt-2 pt-2">
        <div class="flex flex-col space-y-2 pb-4">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-lg text-neutral-700 hover:bg-wellness-pink transition-colors"
          >
            Products
          </router-link>
          <router-link
            to="/cart"
            @click="mobileMenuOpen = false"
            class="flex items-center px-3 py-2 rounded-lg text-neutral-700 hover:bg-wellness-pink transition-colors"
          >
            <ShoppingBagIcon class="w-5 h-5 mr-2" />
            Cart ({{ cartStore.itemCount }})
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
</script>
