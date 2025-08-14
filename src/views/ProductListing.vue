<template>
  <div class="min-h-screen bg-wellness-cream">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-wellness-sage/20 to-wellness-pink pt-8 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Wellness Essentials
          </h1>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Discover products designed with your comfort and well-being in mind. Zero irritation,
            maximum care.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="py-8 bg-white border-b border-wellness-pink">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row gap-6 items-center">
          <!-- Search -->
          <div class="relative flex-1 max-w-md">
            <MagnifyingGlassIcon
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
            />
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search products..."
              class="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <!-- Category Filter -->
          <div class="relative">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="appearance-none bg-white border border-neutral-200 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option v-for="category in productStore.categories" :key="category" :value="category">
                {{ formatCategory(category) }}
              </option>
            </select>
            <ChevronDownIcon
              class="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading State -->
        <div v-if="productStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"
          ></div>
          <p class="mt-2 text-neutral-600">Loading products...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="productStore.error" class="text-center py-12">
          <p class="text-red-600">{{ productStore.error }}</p>
          <button
            @click="productStore.fetchProducts()"
            class="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <ProductCard
            v-for="product in productStore.filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- No products found -->
        <div
          v-if="!productStore.loading && productStore.filteredProducts.length === 0"
          class="text-center py-12"
        >
          <p class="text-neutral-600 text-lg">No products found matching your criteria.</p>
          <button
            @click="clearFilters"
            class="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/product/ProductCard.vue'

const productStore = useProductStore()
const searchQuery = ref('')
const selectedCategory = ref('')

onMounted(async () => {
  await Promise.all([productStore.fetchProducts(), productStore.fetchCategories()])
})

const handleSearch = () => {
  productStore.setSearchQuery(searchQuery.value)
}

const handleCategoryChange = () => {
  productStore.setSelectedCategory(selectedCategory.value)
}

const formatCategory = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/'/g, "'")
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  productStore.setSearchQuery('')
  productStore.setSelectedCategory('')
}
</script>
