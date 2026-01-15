import { useCartStore } from '~/stores/cart'

export default defineNuxtPlugin(() => {
    const cartStore = useCartStore()

    // Load persisted cart data on client side
    if (import.meta.client) {
        cartStore.loadFromStorage()
    }
})

