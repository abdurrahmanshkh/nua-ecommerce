import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

// Toast configuration for better UX
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
  toastClassName: 'nua-toast',
  bodyClassName: ['nua-toast-body'],
  containerClassName: ['nua-toast-container'],
}

app.use(createPinia())
app.use(router)
app.use(Toast, toastOptions)

// Global error handler
app.config.errorHandler = (error, instance, info) => {
  console.error('Global error:', error, info)
}

// Performance monitoring
if (import.meta.env.PROD) {
  // Add performance monitoring in production
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'navigation') {
        console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart)
      }
    })
  }).observe({ entryTypes: ['navigation'] })
}

app.mount('#app')
