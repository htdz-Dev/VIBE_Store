<template>
  <Transition name="slide">
    <div 
      v-if="cartStore.isOpen" 
      class="fixed inset-0 z-50"
    >
      <div 
        class="absolute inset-0 bg-black/50"
        @click="cartStore.closeCart"
      ></div>

      <div class="cart-sidebar-brutal">
        <div class="cart-header-brutal">
          <h2 class="cart-title-brutal">{{ $t('cart.title').toUpperCase() }}</h2>
          <button 
            @click="cartStore.closeCart"
            class="cart-close-brutal"
          >
            ✕
          </button>
        </div>

        <div class="flex-grow overflow-y-auto p-6">
          <div v-if="cartStore.items.length === 0" class="text-center py-12">
            <div class="empty-icon-brutal">🛒</div>
            <p class="text-[#525252] mt-4 font-bold">{{ $t('cart.empty') }}</p>
            <button 
              @click="cartStore.closeCart"
              class="btn btn-secondary mt-6"
            >
              {{ $t('cart.continueShopping') }}
            </button>
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="cart-item-brutal"
            >
              <div class="cart-item-image-brutal">
                <img 
                  v-if="item.image"
                  :src="item.image" 
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-[#525252] text-2xl">
                  📦
                </div>
              </div>

              <div class="flex-grow min-w-0">
                <h4 class="font-bold text-[#1a1a1a] truncate">{{ item.name }}</h4>
                <p v-if="item.variant" class="text-sm text-[#525252] mt-1">
                  {{ item.variant }}
                </p>
                <p class="font-bold text-[#ff5c00] mt-2 font-mono">
                  {{ formatPrice(item.price) }} {{ $t('common.currency') }}
                </p>
                
                <div class="flex items-center gap-2 mt-3">
                  <button 
                    @click="cartStore.decreaseQuantity(item.id)"
                    class="qty-btn-brutal"
                  >
                    −
                  </button>
                  <span class="font-bold w-8 text-center">{{ item.quantity }}</span>
                  <button 
                    @click="cartStore.increaseQuantity(item.id)"
                    class="qty-btn-brutal"
                  >
                    +
                  </button>
                </div>
              </div>

              <button 
                @click="cartStore.removeItem(item.id)"
                class="remove-btn-brutal"
              >
                🗑
              </button>
            </div>
          </div>
        </div>

        <div v-if="cartStore.items.length > 0" class="cart-footer-brutal">
          <div class="flex justify-between text-lg mb-2">
            <span class="font-bold">{{ $t('cart.subtotal').toUpperCase() }}</span>
            <span class="font-bold font-mono">{{ formatPrice(cartStore.totalPrice) }} {{ $t('common.currency') }}</span>
          </div>
          <p class="text-sm text-[#525252] mb-4">
            {{ $t('cart.shipping') }}
          </p>
          <NuxtLink 
            to="/checkout"
            @click="cartStore.closeCart"
            class="btn btn-primary w-full text-center block"
          >
            {{ $t('cart.checkout') }} →
          </NuxtLink>
          <button 
            @click="cartStore.closeCart"
            class="btn btn-ghost w-full mt-2"
          >
            {{ $t('cart.continueShopping') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { locale } = useI18n()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price)
}
</script>

<style scoped>
.cart-sidebar-brutal {
  @apply absolute right-0 top-0 bottom-0 w-full max-w-md flex flex-col;
  background: #fffef0;
  border-left: 3px solid #1a1a1a;
}

.cart-header-brutal {
  @apply flex items-center justify-between p-6;
  background: #facc15;
  border-bottom: 3px solid #1a1a1a;
}

.cart-title-brutal {
  @apply text-xl;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.cart-close-brutal {
  @apply w-10 h-10 flex items-center justify-center font-bold text-lg transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 2px 2px 0px #1a1a1a;
}

.cart-close-brutal:hover {
  background: #ff5c00;
  color: white;
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #1a1a1a;
}

.empty-icon-brutal {
  font-size: 4rem;
}

.cart-item-brutal {
  @apply flex gap-4 p-4;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.cart-item-image-brutal {
  @apply w-20 h-24 flex-shrink-0 overflow-hidden;
  background: #fef6e0;
  border: 2px solid #1a1a1a;
}

.qty-btn-brutal {
  @apply w-8 h-8 flex items-center justify-center font-bold transition-all duration-150;
  background: #facc15;
  border: 2px solid #1a1a1a;
  box-shadow: 2px 2px 0px #1a1a1a;
}

.qty-btn-brutal:hover {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #1a1a1a;
}

.remove-btn-brutal {
  @apply self-start text-xl transition-all duration-150;
}

.remove-btn-brutal:hover {
  transform: scale(1.2);
}

.cart-footer-brutal {
  @apply p-6;
  background: #fef6e0;
  border-top: 3px solid #1a1a1a;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-active > div:last-child,
.slide-leave-active > div:last-child {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from > div:last-child,
.slide-leave-to > div:last-child {
  transform: translateX(100%);
}
</style>
