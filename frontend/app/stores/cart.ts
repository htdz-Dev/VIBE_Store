import { defineStore } from 'pinia'

export interface CartItem {
    id: string
    productId: number
    variantId?: number
    name: string
    variant?: string
    price: number
    quantity: number
    image?: string
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        items: [],
        isOpen: false,
    }),

    getters: {
        itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

        isEmpty: (state) => state.items.length === 0,
    },

    actions: {
        addItem(item: Omit<CartItem, 'id'>) {
            const id = `${item.productId}-${item.variantId || 'default'}`
            const existingItem = this.items.find((i) => i.id === id)

            if (existingItem) {
                existingItem.quantity += item.quantity
            } else {
                this.items.push({ ...item, id })
            }

            this.isOpen = true
            this.saveToStorage()
        },

        removeItem(id: string) {
            const index = this.items.findIndex((item) => item.id === id)
            if (index !== -1) {
                this.items.splice(index, 1)
                this.saveToStorage()
            }
        },

        increaseQuantity(id: string) {
            const item = this.items.find((i) => i.id === id)
            if (item) {
                item.quantity++
                this.saveToStorage()
            }
        },

        decreaseQuantity(id: string) {
            const item = this.items.find((i) => i.id === id)
            if (item) {
                if (item.quantity > 1) {
                    item.quantity--
                } else {
                    this.removeItem(id)
                }
                this.saveToStorage()
            }
        },

        updateQuantity(id: string, quantity: number) {
            const item = this.items.find((i) => i.id === id)
            if (item && quantity > 0) {
                item.quantity = quantity
                this.saveToStorage()
            }
        },

        clearCart() {
            this.items = []
            this.saveToStorage()
        },

        toggleCart() {
            this.isOpen = !this.isOpen
        },

        openCart() {
            this.isOpen = true
        },

        closeCart() {
            this.isOpen = false
        },

        saveToStorage() {
            if (import.meta.client) {
                localStorage.setItem('cart', JSON.stringify(this.items))
            }
        },

        loadFromStorage() {
            if (import.meta.client) {
                const stored = localStorage.getItem('cart')
                if (stored) {
                    try {
                        this.items = JSON.parse(stored)
                    } catch (e) {
                        this.items = []
                    }
                }
            }
        },
    },
})
