import { ref, reactive, computed } from 'vue'

export function useFormValidation(initialState, rules) {
  const form = reactive({ ...initialState })
  const errors = reactive({})
  const touched = reactive({})
  const isSubmitting = ref(false)

  // Validation rules
  const validators = {
    required: (value) => {
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return 'This field is required'
      }
      return null
    },

    email: (value) => {
      if (!value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? null : 'Please enter a valid email address'
    },

    minLength: (min) => (value) => {
      if (!value) return null
      return value.length >= min ? null : `Must be at least ${min} characters`
    },

    phone: (value) => {
      if (!value) return null
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      return phoneRegex.test(value.replace(/\D/g, '')) ? null : 'Please enter a valid phone number'
    },

    postalCode: (value) => {
      if (!value) return null
      // US ZIP code pattern
      const zipRegex = /^\d{5}(-\d{4})?$/
      return zipRegex.test(value) ? null : 'Please enter a valid postal code'
    },
  }

  // Validate individual field
  const validateField = (fieldName, value) => {
    const fieldRules = rules[fieldName] || []

    for (const rule of fieldRules) {
      let validator
      let params = []

      if (typeof rule === 'string') {
        validator = validators[rule]
      } else if (typeof rule === 'object') {
        const [ruleName, ...ruleParams] = Object.keys(rule)
        validator = validators[ruleName]
        params = ruleParams.length ? ruleParams : [rule[ruleName]]
      } else if (typeof rule === 'function') {
        validator = rule
      }

      if (validator) {
        const result = params.length ? validator(...params)(value) : validator(value)
        if (result) {
          errors[fieldName] = result
          return result
        }
      }
    }

    delete errors[fieldName]
    return null
  }

  // Validate all fields
  const validateForm = () => {
    let isValid = true

    Object.keys(rules).forEach((fieldName) => {
      const error = validateField(fieldName, form[fieldName])
      if (error) {
        isValid = false
      }
      touched[fieldName] = true
    })

    return isValid
  }

  // Handle field change
  const handleFieldChange = (fieldName, value) => {
    form[fieldName] = value
    if (touched[fieldName]) {
      validateField(fieldName, value)
    }
  }

  // Handle field blur
  const handleFieldBlur = (fieldName) => {
    touched[fieldName] = true
    validateField(fieldName, form[fieldName])
  }

  // Computed properties
  const isValid = computed(() => {
    return Object.keys(errors).length === 0
  })

  const hasErrors = computed(() => {
    return Object.keys(errors).length > 0
  })

  return {
    form,
    errors,
    touched,
    isSubmitting,
    isValid,
    hasErrors,
    validateField,
    validateForm,
    handleFieldChange,
    handleFieldBlur,
  }
}
