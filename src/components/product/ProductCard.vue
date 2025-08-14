<template>
  <div
    class="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-neutral-100"
  >
    <!-- Product Image -->
    <div class="relative aspect-square overflow-hidden bg-wellness-cream">
      <img
        :src="product.image"
        :alt="product.title"
        class="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 p-4"
        loading="lazy"
      />

      <!-- Quick Add Button -->
      <button
        @click="quickAdd"
        class="absolute bottom-4 right-4 bg-primary-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary-600"
        title="Quick Add to Cart"
      >
        <PlusIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-6">
      <!-- Category -->
      <p class="text-xs font-medium text-primary-600 uppercase tracking-wide mb-2">
        {{ formatCategory(product.category) }}
      </p>

      <!-- Title -->
      <h3 class="font-display font-semibold text-neutral-900 text-lg mb-2 line-clamp-2">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <StarIcon
            v-for="star in 5"
            :key="star"
            :class="
              star <= Math.floor(product.rating?.rate || 0) ? 'text-yellow-400' : 'text-neutral-200'
            "
            class="w-4 h-4"
          />
        </div>
        <span class="text-sm text-neutral-500 ml-2"> ({{ product.rating?.count || 0 }}) </span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold text-neutral-900"> ${{ product.price }} </span>

        <router-link
          :to="{ name: 'product-detail', params: { id: product.id } }"
          class="bg-wellness-sage text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wellness-sage/90 transition-colors"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { useCartStore } from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

const quickAdd = () => {
  cartStore.addItem(props.product, 1)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
