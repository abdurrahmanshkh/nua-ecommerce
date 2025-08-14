import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    currentStep: 1,
    totalSteps: 4,
    customerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subscribeNewsletter: false,
    },
    shippingAddress: {
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    },
    paymentMethod: 'card',
    orderNotes: '',
    loading: false,
    orderPlaced: false,
    orderNumber: null,
    wellnessPreferences: {
      sustainabilityFocus: false,
      organicPreference: false,
      sensitivityConcerns: false,
    },
  }),

  getters: {
    canProceedToNext: (state) => {
      switch (state.currentStep) {
        case 1: // Customer Info
          return (
            state.customerInfo.firstName && state.customerInfo.lastName && state.customerInfo.email
          )
        case 2: // Shipping Address
          return (
            state.shippingAddress.address &&
            state.shippingAddress.city &&
            state.shippingAddress.state &&
            state.shippingAddress.postalCode
          )
        case 3: // Payment Method
          return state.paymentMethod
        default:
          return true
      }
    },

    isFirstStep: (state) => state.currentStep === 1,
    isLastStep: (state) => state.currentStep === state.totalSteps,

    progressPercentage: (state) => {
      return Math.round((state.currentStep / state.totalSteps) * 100)
    },
  },

  actions: {
    nextStep() {
      if (this.currentStep < this.totalSteps && this.canProceedToNext) {
        this.currentStep++
      }
    },

    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },

    goToStep(step) {
      if (step >= 1 && step <= this.totalSteps) {
        this.currentStep = step
      }
    },

    updateCustomerInfo(info) {
      this.customerInfo = { ...this.customerInfo, ...info }
    },

    updateShippingAddress(address) {
      this.shippingAddress = { ...this.shippingAddress, ...address }
    },

    updatePaymentMethod(method) {
      this.paymentMethod = method
    },

    updateWellnessPreferences(preferences) {
      this.wellnessPreferences = { ...this.wellnessPreferences, ...preferences }
    },

    async submitOrder(cartItems, total) {
      const toast = useToast()
      this.loading = true

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Generate order number
        this.orderNumber = `NUA-${Date.now().toString().slice(-8)}`
        this.orderPlaced = true

        // Clear form after successful submission
        setTimeout(() => {
          this.resetCheckout()
        }, 100)

        toast.success('Order placed successfully! 🌸')

        return {
          success: true,
          orderNumber: this.orderNumber,
        }
      } catch (error) {
        toast.error('Failed to place order. Please try again.')
        return {
          success: false,
          error: error.message,
        }
      } finally {
        this.loading = false
      }
    },

    resetCheckout() {
      this.currentStep = 1
      this.customerInfo = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subscribeNewsletter: false,
      }
      this.shippingAddress = {
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
      }
      this.paymentMethod = 'card'
      this.orderNotes = ''
      this.wellnessPreferences = {
        sustainabilityFocus: false,
        organicPreference: false,
        sensitivityConcerns: false,
      }
      this.orderPlaced = false
      this.orderNumber = null
    },
  },
})
