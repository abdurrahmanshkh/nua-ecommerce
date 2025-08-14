<template>
  <div>
    <div class="flex items-center mb-6">
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3"
      >
        3
      </div>
      <h2 class="text-xl font-display font-semibold text-neutral-900">Payment Method</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Payment Method Options -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <label
          v-for="option in paymentOptions"
          :key="option.value"
          class="cursor-pointer flex flex-col justify-between p-6 rounded-2xl border transition-colors duration-200"
          :class="
            checkoutStore.paymentMethod === option.value
              ? 'border-primary-500 bg-primary-50'
              : 'border-neutral-200 bg-white'
          "
        >
          <input
            type="radio"
            name="paymentMethod"
            class="sr-only"
            :value="option.value"
            v-model="checkoutStore.paymentMethod"
          />
          <div class="flex items-center space-x-3">
            <component :is="option.icon" class="w-6 h-6" :class="option.iconColor" />
            <span class="text-lg font-medium text-neutral-900">{{ option.label }}</span>
          </div>
          <p class="mt-2 text-sm text-neutral-600">{{ option.description }}</p>
        </label>
      </div>

      <!-- Card Details (if by card) -->
      <div
        v-if="checkoutStore.paymentMethod === 'card'"
        class="mt-6 bg-white rounded-xl p-6 border border-neutral-200"
      >
        <h3 class="text-md font-semibold text-neutral-900 mb-4">Card Details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="card-number" class="block text-sm font-medium text-neutral-700 mb-2"
              >Card Number *</label
            >
            <input
              id="card-number"
              v-model="cardForm.cardNumber"
              maxlength="16"
              type="text"
              autocomplete="cc-number"
              required
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              :class="cardInputClass('cardNumber')"
              placeholder="xxxx xxxx xxxx xxxx"
            />
          </div>
          <div>
            <label for="card-name" class="block text-sm font-medium text-neutral-700 mb-2"
              >Name on Card *</label
            >
            <input
              id="card-name"
              v-model="cardForm.cardName"
              type="text"
              autocomplete="cc-name"
              required
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              :class="cardInputClass('cardName')"
              placeholder="Full name"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label for="card-expiry" class="block text-sm font-medium text-neutral-700 mb-2"
              >Expiry *</label
            >
            <input
              id="card-expiry"
              v-model="cardForm.cardExpiry"
              type="text"
              autocomplete="cc-exp"
              required
              maxlength="5"
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              :class="cardInputClass('cardExpiry')"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label for="card-cvc" class="block text-sm font-medium text-neutral-700 mb-2"
              >CVC *</label
            >
            <input
              id="card-cvc"
              v-model="cardForm.cardCvc"
              maxlength="4"
              type="password"
              autocomplete="cc-csc"
              required
              class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              :class="cardInputClass('cardCvc')"
              placeholder="CVC"
            />
          </div>
        </div>
      </div>

      <!-- Payment Step Navigation -->
      <div class="flex justify-between pt-6 border-t border-neutral-200 mt-8">
        <button
          @click="$emit('previous')"
          type="button"
          class="inline-flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors rounded-lg"
        >
          Back
        </button>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Review
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'
import { CreditCardIcon, CurrencyRupeeIcon, BanknotesIcon } from '@heroicons/vue/24/outline'

const checkoutStore = useCheckoutStore()

// Local payment options
const paymentOptions = [
  {
    value: 'card',
    label: 'Credit/Debit Card',
    description: 'Pay securely using your card — encrypted for safety.',
    icon: CreditCardIcon,
    iconColor: 'text-primary-500',
  },
  {
    value: 'upi',
    label: 'UPI',
    description: 'Pay instantly using your UPI app.',
    icon: CurrencyRupeeIcon,
    iconColor: 'text-primary-500',
  },
  {
    value: 'cod',
    label: 'Cash On Delivery',
    description: 'Pay when you receive your products.',
    icon: BanknotesIcon,
    iconColor: 'text-wellness-sage',
  },
]

// Card form validation (demo only)
const cardForm = reactive({
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvc: '',
})
const touchedFields = reactive({})
function cardInputClass(field) {
  if (!isCardFieldValid(field) && touchedFields[field]) return 'border-red-300 bg-red-50'
  if (isCardFieldValid(field) && touchedFields[field]) return 'border-green-300 bg-green-50'
  return 'border-neutral-200'
}
function isCardFieldValid(field) {
  const val = cardForm[field]
  if (field === 'cardNumber') return /^\d{16}$/.test(val)
  if (field === 'cardName') return !!val.trim()
  if (field === 'cardExpiry') return /^\d{2}\/\d{2}$/.test(val)
  if (field === 'cardCvc') return /^\d{3,4}$/.test(val)
  return true
}
const isFormValid = computed(() => {
  if (checkoutStore.paymentMethod === 'card') {
    return ['cardNumber', 'cardName', 'cardExpiry', 'cardCvc'].every(isCardFieldValid)
  }
  return !!checkoutStore.paymentMethod
})
watch(
  cardForm,
  () => {
    // Sync card details to store if needed for actual payment
  },
  { deep: true },
)

function handleSubmit() {
  if (!isFormValid.value) {
    Object.keys(cardForm).forEach((field) => (touchedFields[field] = true))
    return
  }
  checkoutStore.nextStep()
}
</script>
