import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart') || '[]'),
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    },

    getItemById: (state) => {
      return (id) => state.items.find((item) => item.id === id)
    },
  },

  actions: {
    addItem(product, quantity = 1) {
      const toast = useToast()
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += quantity
        toast.success(`Added ${quantity} more ${product.title} to cart`)
      } else {
        this.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: quantity,
        })
        toast.success(`${product.title} added to cart`)
      }

      this.saveToStorage()
    },

    removeItem(productId) {
      const toast = useToast()
      const index = this.items.findIndex((item) => item.id === productId)

      if (index > -1) {
        const removedItem = this.items.splice(index, 1)[0]
        toast.info(`${removedItem.title} removed from cart`)
        this.saveToStorage()
      }
    },

    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId)

      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = Math.min(quantity, 10) // Max 10 as per requirement
          this.saveToStorage()
        }
      }
    },

    clearCart() {
      const toast = useToast()
      this.items = []
      this.saveToStorage()
      toast.success('Cart cleared')
    },

    saveToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
  },
})
