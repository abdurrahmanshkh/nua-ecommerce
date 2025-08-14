import { createRouter, createWebHistory } from 'vue-router'
import ProductListing from '@/views/ProductListing.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ShoppingCart from '@/views/ShoppingCart.vue'
import Checkout from '@/views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: ProductListing,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetail,
      props: (route) => ({ id: parseInt(route.params.id) }),
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
