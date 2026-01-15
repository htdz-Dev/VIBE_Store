<template>
  <div class="bg-[#fef6e0] min-h-screen">
    <div class="container-custom py-12">
      <div v-if="route.query.error || error" class="error-banner-brutal mb-8">
        <span class="error-icon">⚠️</span>
        <span>{{ error || $t('checkout.paymentFailed') }}</span>
      </div>

      <h1 class="page-title-brutal">{{ $t('checkout.title').toUpperCase() }}</h1>

      <div v-if="cartStore.isEmpty" class="empty-cart-brutal">
        <span class="empty-icon">🛒</span>
        <h2 class="text-xl font-bold mb-4 text-[#1a1a1a]">{{ $t('cart.empty') }}</h2>
        <NuxtLink to="/shop" class="btn btn-primary">
          {{ $t('cart.continueShopping') }} →
        </NuxtLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <form @submit.prevent="placeOrder" class="space-y-6">
            <div class="section-brutal">
              <h2 class="section-heading-brutal">📦 {{ $t('checkout.shippingInfo').toUpperCase() }}</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                  <label class="label-brutal">{{ $t('auth.name') }} *</label>
                  <input 
                    v-model="form.shipping_name"
                    type="text"
                    class="input"
                    :placeholder="$t('auth.name')"
                    required
                  />
                </div>

                <div>
                  <label class="label-brutal">{{ $t('checkout.phone') }} *</label>
                  <input 
                    v-model="form.shipping_phone"
                    type="tel"
                    class="input"
                    placeholder="0XXX XXX XXX"
                    required
                  />
                </div>

                <div>
                  <label class="label-brutal">{{ $t('checkout.wilaya') }} *</label>
                  <select 
                    v-model="form.shipping_wilaya"
                    class="input"
                    required
                  >
                    <option value="">{{ $t('checkout.selectWilaya') }}</option>
                    <option v-for="wilaya in wilayas" :key="wilaya" :value="wilaya">
                      {{ wilaya }}
                    </option>
                  </select>
                </div>

                <div>
                  <label class="label-brutal">{{ $t('checkout.city') }} *</label>
                  <input 
                    v-model="form.shipping_city"
                    type="text"
                    class="input"
                    :placeholder="$t('checkout.city')"
                    required
                  />
                </div>

                <div>
                  <label class="label-brutal">{{ $t('checkout.postalCode') }}</label>
                  <input 
                    v-model="form.shipping_postal_code"
                    type="text"
                    class="input"
                    placeholder="XXXXX"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="label-brutal">{{ $t('checkout.address') }} *</label>
                  <textarea 
                    v-model="form.shipping_address"
                    class="input min-h-[100px]"
                    :placeholder="$t('checkout.address')"
                    required
                  ></textarea>
                </div>

                <div class="md:col-span-2">
                  <label class="label-brutal">{{ $t('checkout.orderNotes') }}</label>
                  <textarea 
                    v-model="form.notes"
                    class="input min-h-[80px]"
                    :placeholder="locale === 'ar' ? 'أي تعليمات خاصة...' : 'Any special instructions...'"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="section-brutal">
              <h2 class="section-heading-brutal">💳 {{ $t('checkout.paymentMethod').toUpperCase() }}</h2>
              
              <div class="space-y-4">
                <label class="payment-option-brutal" :class="{ 'selected': form.payment_method === 'cod' }">
                  <input 
                    type="radio" 
                    value="cod" 
                    v-model="form.payment_method"
                    class="payment-radio"
                  />
                  <div>
                    <span class="font-bold">💵 {{ $t('checkout.cod') }}</span>
                    <p class="text-sm text-[#525252]">{{ $t('checkout.codDescription') }}</p>
                  </div>
                </label>

                <label class="payment-option-brutal" :class="{ 'selected': form.payment_method === 'chargily' }">
                  <input 
                    type="radio" 
                    value="chargily" 
                    v-model="form.payment_method"
                    class="payment-radio"
                  />
                  <div>
                    <span class="font-bold">💳 {{ $t('checkout.onlinePayment') }}</span>
                    <p class="text-sm text-[#525252]">{{ $t('checkout.onlinePaymentDescription') }}</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Turnstile Bot Protection -->
            <div class="section-brutal">
              <NuxtTurnstile v-model="turnstileToken" />
            </div>

            <button 
              type="submit"
              :disabled="isSubmitting || !turnstileToken"
              class="lg:hidden btn btn-primary w-full text-lg py-4"
            >
              <span v-if="isSubmitting">{{ $t('common.loading') }}</span>
              <span v-else>{{ $t('checkout.placeOrder') }} - {{ formatPrice(cartStore.totalPrice) }} {{ $t('common.currency') }}</span>
            </button>
          </form>
        </div>

        <div class="lg:col-span-1">
          <div class="summary-brutal sticky top-28">
            <h2 class="section-heading-brutal">📋 {{ $t('checkout.orderSummary').toUpperCase() }}</h2>

            <div class="space-y-4 mb-6">
              <div 
                v-for="item in cartStore.items" 
                :key="item.id"
                class="cart-item-summary"
              >
                <div class="item-image">
                  <img 
                    v-if="item.image"
                    :src="item.image" 
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  />
                  <span v-else class="text-2xl">📦</span>
                </div>
                <div class="flex-grow min-w-0">
                  <h4 class="font-bold truncate text-[#1a1a1a]">{{ item.name }}</h4>
                  <p v-if="item.variant" class="text-sm text-[#525252]">{{ item.variant }}</p>
                  <p class="text-sm text-[#525252]">{{ $t('checkout.qty') }}: {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <span class="font-bold font-mono text-[#1a1a1a]">{{ formatPrice(item.price * item.quantity) }} {{ $t('common.currency') }}</span>
                </div>
              </div>
            </div>

            <div class="summary-totals">
              <div class="flex justify-between text-[#525252]">
                <span>{{ $t('cart.subtotal') }}</span>
                <span>{{ formatPrice(cartStore.totalPrice) }} {{ $t('common.currency') }}</span>
              </div>
              <div class="flex justify-between text-[#525252]">
                <span>{{ locale === 'ar' ? 'الشحن' : 'Shipping' }}</span>
                <span class="text-green-600 font-bold">{{ locale === 'ar' ? 'مجاني' : 'FREE' }}</span>
              </div>
              <div class="flex justify-between text-xl font-bold pt-3 border-t-3 border-[#1a1a1a]">
                <span>{{ $t('checkout.total').toUpperCase() }}</span>
                <span class="text-[#ff5c00] font-mono">{{ formatPrice(cartStore.totalPrice) }} {{ $t('common.currency') }}</span>
              </div>
            </div>

            <button 
              @click="placeOrder"
              :disabled="isSubmitting || !turnstileToken"
              class="hidden lg:block btn btn-primary w-full text-lg py-4 mt-6"
            >
              <span v-if="isSubmitting">{{ $t('common.loading') }}</span>
              <span v-else>{{ $t('checkout.placeOrder') }} →</span>
            </button>

            <p class="text-sm text-[#525252] text-center mt-4">
              {{ $t('checkout.termsAgreement') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const authStore = useAuthStore()
const { locale, t } = useI18n()

const isSubmitting = ref(false)
const error = ref('')
const turnstileToken = ref('')

const form = reactive({
  shipping_name: authStore.user?.name || '',
  shipping_phone: authStore.user?.phone || '',
  shipping_address: authStore.user?.address || '',
  shipping_city: authStore.user?.city || '',
  shipping_wilaya: authStore.user?.wilaya || '',
  shipping_postal_code: '',
  notes: '',
  payment_method: 'cod',
})

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar',
  'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger',
  'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma',
  'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla', 'Oran', 'El Bayadh',
  'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued',
  'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent',
  'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès',
  'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Meniaa'
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price)
}

const placeOrder = async () => {
  if (cartStore.isEmpty) {
    error.value = t('checkout.emptyCartError')
    return
  }

  isSubmitting.value = true
  error.value = ''

  try {
    const items = cartStore.items.map(item => ({
      product_id: item.productId,
      variant_id: item.variantId,
      quantity: item.quantity,
    }))

    const endpoint = authStore.isAuthenticated 
      ? `${config.public.apiBase}/checkout`
      : `${config.public.apiBase}/checkout/guest`

    const headers: Record<string, string> = {}
    if (authStore.token) {
      headers['Authorization'] = `Bearer ${authStore.token}`
    }

    const response = await $fetch<{ data: any; checkout_url?: string }>(endpoint, {
      method: 'POST',
      headers,
      body: {
        items,
        ...form,
      },
    })

    if (response.checkout_url) {
      window.location.href = response.checkout_url
      return
    }

    cartStore.clearCart()
    router.push(`/order-success?order=${response.data.order_number}`)

  } catch (err: any) {
    error.value = err.data?.message || err.message || t('common.error')
  } finally {
    isSubmitting.value = false
  }
}

watch(() => authStore.user, (user) => {
  if (user) {
    form.shipping_name = user.name || form.shipping_name
    form.shipping_phone = user.phone || form.shipping_phone
    form.shipping_address = user.address || form.shipping_address
    form.shipping_city = user.city || form.shipping_city
    form.shipping_wilaya = user.wilaya || form.shipping_wilaya
  }
}, { immediate: true })

useSeoMeta({
  title: () => `${t('checkout.title')} - VIBE`,
  description: () => t('checkout.title'),
})
</script>

<style scoped>
.page-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
}

.error-banner-brutal {
  @apply p-4 flex items-center gap-3 font-bold;
  background: #fee2e2;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  color: #dc2626;
}

.empty-cart-brutal {
  @apply text-center py-16;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.section-brutal {
  @apply p-6;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.section-heading-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.label-brutal {
  @apply block text-sm font-bold mb-2;
  font-family: 'Space Mono', monospace;
}

.payment-option-brutal {
  @apply flex items-center gap-4 p-4 cursor-pointer transition-all duration-150;
  background: #fffef0;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.payment-option-brutal:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #1a1a1a;
}

.payment-option-brutal.selected {
  background: #facc15;
}

.payment-radio {
  @apply w-5 h-5;
  accent-color: #ff5c00;
}

.summary-brutal {
  @apply p-6;
  background: #fef6e0;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.cart-item-summary {
  @apply flex gap-4;
}

.item-image {
  @apply w-16 h-20 flex-shrink-0 flex items-center justify-center;
  background: white;
  border: 2px solid #1a1a1a;
  overflow: hidden;
}

.summary-totals {
  @apply space-y-3 pt-4;
  border-top: 3px solid #1a1a1a;
}

.border-t-3 {
  border-top-width: 3px;
}
</style>
