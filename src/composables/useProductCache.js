import { ref, computed } from 'vue'

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const STORAGE_KEY = 'nua_product_cache'

export function useProductCache() {
  const cache = ref(new Map())

  // Load cache from localStorage on initialization
  const loadCacheFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        Object.entries(parsed).forEach(([key, value]) => {
          if (value.timestamp && Date.now() - value.timestamp < CACHE_DURATION) {
            cache.value.set(key, value)
          }
        })
      }
    } catch (error) {
      console.warn('Failed to load cache from storage:', error)
    }
  }

  // Save cache to localStorage
  const saveCacheToStorage = () => {
    try {
      const cacheObject = {}
      cache.value.forEach((value, key) => {
        cacheObject[key] = value
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheObject))
    } catch (error) {
      console.warn('Failed to save cache to storage:', error)
    }
  }

  // Get item from cache
  const get = (key) => {
    const item = cache.value.get(key)
    if (item && Date.now() - item.timestamp < CACHE_DURATION) {
      return item.data
    }
    cache.value.delete(key)
    return null
  }

  // Set item in cache
  const set = (key, data) => {
    cache.value.set(key, {
      data,
      timestamp: Date.now(),
    })
    saveCacheToStorage()
  }

  // Clear expired items
  const clearExpired = () => {
    const now = Date.now()
    cache.value.forEach((value, key) => {
      if (now - value.timestamp >= CACHE_DURATION) {
        cache.value.delete(key)
      }
    })
    saveCacheToStorage()
  }

  // Initialize cache
  loadCacheFromStorage()

  return {
    get,
    set,
    clearExpired,
    cacheSize: computed(() => cache.value.size),
  }
}
