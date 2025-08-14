<template>
  <div>
    <div class="flex items-center mb-6">
      <div
        class="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3"
      >
        1
      </div>
      <h2 class="text-xl font-display font-semibold text-neutral-900">Customer Information</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Name Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-neutral-700 mb-2">
            First Name *
          </label>
          <input
            id="firstName"
            :value="validation.form.firstName"
            @input="validation.handleFieldChange('firstName', $event.target.value)"
            @blur="validation.handleFieldBlur('firstName')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="getFieldClasses('firstName')"
            placeholder="Enter your first name"
          />
          <p
            v-if="validation.errors.firstName && validation.touched.firstName"
            class="mt-1 text-sm text-red-600"
          >
            {{ validation.errors.firstName }}
          </p>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-neutral-700 mb-2">
            Last Name *
          </label>
          <input
            id="lastName"
            :value="validation.form.lastName"
            @input="validation.handleFieldChange('lastName', $event.target.value)"
            @blur="validation.handleFieldBlur('lastName')"
            type="text"
            class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            :class="getFieldClasses('lastName')"
            placeholder="Enter your last name"
          />
          <p
            v-if="validation.errors.lastName && validation.touched.lastName"
            class="mt-1 text-sm text-red-600"
          >
            {{ validation.errors.lastName }}
          </p>
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
          Email Address *
        </label>
        <input
          id="email"
          :value="validation.form.email"
          @input="validation.handleFieldChange('email', $event.target.value)"
          @blur="validation.handleFieldBlur('email')"
          type="email"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          :class="getFieldClasses('email')"
          placeholder="Enter your email address"
        />
        <p
          v-if="validation.errors.email && validation.touched.email"
          class="mt-1 text-sm text-red-600"
        >
          {{ validation.errors.email }}
        </p>
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-neutral-700 mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          :value="validation.form.phone"
          @input="validation.handleFieldChange('phone', $event.target.value)"
          @blur="validation.handleFieldBlur('phone')"
          type="tel"
          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          :class="getFieldClasses('phone')"
          placeholder="Enter your phone number"
        />
        <p
          v-if="validation.errors.phone && validation.touched.phone"
          class="mt-1 text-sm text-red-600"
        >
          {{ validation.errors.phone }}
        </p>
      </div>

      <!-- Wellness Preferences -->
      <div class="bg-wellness-pink/10 rounded-lg p-6">
        <h3 class="text-lg font-display font-semibold text-neutral-900 mb-4">
          Your Wellness Preferences 🌸
        </h3>
        <p class="text-neutral-600 mb-4 text-sm">
          Help us personalize your experience and recommend products that align with your wellness
          journey.
        </p>

        <div class="space-y-3">
          <label class="flex items-center">
            <input
              v-model="wellnessPreferences.sustainabilityFocus"
              type="checkbox"
              class="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            />
            <span class="ml-3 text-sm text-neutral-700"
              >I prioritize sustainable and eco-friendly products</span
            >
          </label>

          <label class="flex items-center">
            <input
              v-model="wellnessPreferences.organicPreference"
              type="checkbox"
              class="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            />
            <span class="ml-3 text-sm text-neutral-700"
              >I prefer organic and natural ingredients</span
            >
          </label>

          <label class="flex items-center">
            <input
              v-model="wellnessPreferences.sensitivityConcerns"
              type="checkbox"
              class="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
            />
            <span class="ml-3 text-sm text-neutral-700"
              >I have sensitive skin or specific sensitivity concerns</span
            >
          </label>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="bg-wellness-sage/10 rounded-lg p-6">
        <label class="flex items-start">
          <input
            v-model="validation.form.subscribeNewsletter"
            type="checkbox"
            class="mt-0.5 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
          />
          <div class="ml-3">
            <span class="text-sm font-medium text-neutral-900">Stay connected with Nua</span>
            <p class="text-xs text-neutral-600 mt-1">
              Receive wellness tips, exclusive offers, and product updates. Unsubscribe anytime.
            </p>
          </div>
        </label>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between pt-6 border-t border-neutral-200">
        <router-link
          to="/cart"
          class="inline-flex items-center px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 mr-2" />
          Back to Cart
        </router-link>

        <button
          type="submit"
          :disabled="!canProceed"
          class="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Shipping
          <ArrowRightIcon class="w-4 h-4 ml-2" />
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { useFormValidation } from '@/composables/useFormValidation'
import { useCheckoutStore } from '@/stores/checkout'

const checkoutStore = useCheckoutStore()

// Form validation setup
const validation = useFormValidation(
  {
    firstName: checkoutStore.customerInfo.firstName,
    lastName: checkoutStore.customerInfo.lastName,
    email: checkoutStore.customerInfo.email,
    phone: checkoutStore.customerInfo.phone,
    subscribeNewsletter: checkoutStore.customerInfo.subscribeNewsletter,
  },
  {
    firstName: ['required'],
    lastName: ['required'],
    email: ['required', 'email'],
    phone: ['phone'],
  },
)

const wellnessPreferences = computed({
  get: () => checkoutStore.wellnessPreferences,
  set: (value) => checkoutStore.updateWellnessPreferences(value),
})

const canProceed = computed(() => {
  return (
    validation.form.firstName &&
    validation.form.lastName &&
    validation.form.email &&
    validation.isValid
  )
})

// Watch form changes and sync with store
watch(
  validation.form,
  (newForm) => {
    checkoutStore.updateCustomerInfo(newForm)
  },
  { deep: true },
)

const getFieldClasses = (fieldName) => {
  if (validation.errors[fieldName] && validation.touched[fieldName]) {
    return 'border-red-300 bg-red-50'
  }
  if (validation.touched[fieldName] && !validation.errors[fieldName]) {
    return 'border-green-300 bg-green-50'
  }
  return 'border-neutral-200'
}

const handleSubmit = () => {
  if (validation.validateForm() && canProceed.value) {
    checkoutStore.nextStep()
  }
}
</script>
