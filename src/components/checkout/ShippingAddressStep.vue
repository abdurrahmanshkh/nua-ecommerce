<template>
  <div>
    <div class="flex items-center mb-6">
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3"
      >
        2
      </div>
      <h2 class="text-xl font-display font-semibold text-neutral-900">Shipping Address</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="address" class="block text-sm font-medium text-neutral-700 mb-2"
            >Address *</label
          >
          <input
            id="address"
            :value="addressForm.address"
            @input="updateField('address', $event.target.value)"
            @blur="markTouched('address')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="inputClass('address')"
            placeholder="Street address"
          />
          <p v-if="fieldError('address')" class="mt-1 text-sm text-red-600">
            {{ fieldError('address') }}
          </p>
        </div>
        <div>
          <label for="city" class="block text-sm font-medium text-neutral-700 mb-2">City *</label>
          <input
            id="city"
            :value="addressForm.city"
            @input="updateField('city', $event.target.value)"
            @blur="markTouched('city')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="inputClass('city')"
            placeholder="City"
          />
          <p v-if="fieldError('city')" class="mt-1 text-sm text-red-600">
            {{ fieldError('city') }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="state" class="block text-sm font-medium text-neutral-700 mb-2">State *</label>
          <input
            id="state"
            :value="addressForm.state"
            @input="updateField('state', $event.target.value)"
            @blur="markTouched('state')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="inputClass('state')"
            placeholder="State"
          />
          <p v-if="fieldError('state')" class="mt-1 text-sm text-red-600">
            {{ fieldError('state') }}
          </p>
        </div>
        <div>
          <label for="postalCode" class="block text-sm font-medium text-neutral-700 mb-2"
            >Postal Code *</label
          >
          <input
            id="postalCode"
            :value="addressForm.postalCode"
            @input="updateField('postalCode', $event.target.value)"
            @blur="markTouched('postalCode')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="inputClass('postalCode')"
            placeholder="Postal code"
          />
          <p v-if="fieldError('postalCode')" class="mt-1 text-sm text-red-600">
            {{ fieldError('postalCode') }}
          </p>
        </div>
      </div>

      <div>
        <label for="country" class="block text-sm font-medium text-neutral-700 mb-2"
          >Country *</label
        >
        <select
          id="country"
          :value="addressForm.country"
          @input="updateField('country', $event.target.value)"
          @blur="markTouched('country')"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        >
          <option value="">Select country</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
        <p v-if="fieldError('country')" class="mt-1 text-sm text-red-600">
          {{ fieldError('country') }}
        </p>
      </div>

      <div class="flex justify-between pt-6 border-t border-neutral-200">
        <button
          @click="$emit('previous')"
          type="button"
          class="inline-flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useCheckoutStore } from '@/stores/checkout'

const checkoutStore = useCheckoutStore()

// Local form state
const addressForm = reactive({ ...checkoutStore.shippingAddress })
const touchedFields = reactive({})

// Validation functions
const validate = {
  address: (val) => (val?.trim() ? null : 'Address is required'),
  city: (val) => (val?.trim() ? null : 'City is required'),
  state: (val) => (val?.trim() ? null : 'State is required'),
  postalCode: (val) => (val?.trim() ? null : 'Postal code is required'),
  country: (val) => (val?.trim() ? null : 'Country is required'),
}

// Utilities
function updateField(field, value) {
  addressForm[field] = value
  if (touchedFields[field]) return validate[field](value)
}
function markTouched(field) {
  touchedFields[field] = true
}

function fieldError(field) {
  return touchedFields[field] ? validate[field](addressForm[field]) : null
}

function inputClass(field) {
  if (fieldError(field)) return 'border-red-300 bg-red-50'
  if (touchedFields[field] && !fieldError(field)) return 'border-green-300 bg-green-50'
  return 'border-neutral-200'
}

// Form validity
const isFormValid = computed(() => {
  return Object.keys(validate).every((field) => !validate[field](addressForm[field]))
})

// Sync local state back to store on change
watch(
  addressForm,
  (val) => {
    checkoutStore.updateShippingAddress(val)
  },
  { deep: true },
)

function handleSubmit() {
  Object.keys(validate).forEach(markTouched)
  if (!isFormValid.value) return
  checkoutStore.nextStep()
}
</script>
