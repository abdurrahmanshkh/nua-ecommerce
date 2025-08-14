import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    currentProduct: null,
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: '',
  }),

  getters: {
    filteredProducts: (state) => {
      let filtered = state.products

      // Filter by search query
      if (state.searchQuery) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
        )
      }

      // Filter by category
      if (state.selectedCategory) {
        filtered = filtered.filter((product) => product.category === state.selectedCategory)
      }

      return filtered
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        this.products = response.data
        this.error = null
      } catch (error) {
        this.error = 'Failed to fetch products'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async fetchProduct(id) {
      this.loading = true
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        this.currentProduct = response.data
        this.error = null
      } catch (error) {
        this.error = 'Failed to fetch product'
        console.error('Error fetching product:', error)
      } finally {
        this.loading = false
      }
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    setSelectedCategory(category) {
      this.selectedCategory = category
    },
  },
})
