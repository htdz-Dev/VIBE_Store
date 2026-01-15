<template>
  <div class="pt-24 bg-[#fef6e0] min-h-screen">
    <div class="container-custom py-12">
      <h1 class="page-title-brutal mb-8">{{ $t('orders.title') }}</h1>

      <div v-if="pending" class="space-y-6">
        <div v-for="i in 3" :key="i" class="order-card-brutal p-6">
          <div class="skeleton h-6 w-48 mb-4 bg-[#e5dcc3]"></div>
          <div class="skeleton h-4 w-full bg-[#e5dcc3]"></div>
        </div>
      </div>

      <div v-else-if="orders?.length > 0" class="space-y-6">
        <div 
          v-for="order in orders" 
          :key="order.id"
          class="order-card-brutal"
        >
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6">
            <div>
              <p class="text-xs uppercase font-bold text-[#525252] tracking-wider">{{ $t('orders.orderNumber') }}</p>
              <p class="font-bold text-lg text-[#1a1a1a]">{{ order.order_number }}</p>
            </div>
            <div>
              <p class="text-xs uppercase font-bold text-[#525252] tracking-wider">{{ $t('orders.date') }}</p>
              <p class="text-[#1a1a1a]">{{ formatDate(order.created_at) }}</p>
            </div>
            <div>
              <p class="text-xs uppercase font-bold text-[#525252] tracking-wider">{{ $t('orders.total') }}</p>
              <p class="font-bold text-lg text-[#ff5c00]">{{ formatPrice(order.total) }} {{ $t('common.currency') }}</p>
            </div>
            <div>
              <span :class="getStatusClass(order.status)">
                {{ getStatusText(order.status) }}
              </span>
            </div>
          </div>

          <div class="border-t-3 border-[#1a1a1a] p-6 bg-[#fef6e0]">
            <div class="flex flex-wrap gap-4">
              <div 
                v-for="item in order.items" 
                :key="item.id"
                class="order-item-brutal"
              >
                <div class="order-item-image">
                  <img 
                    v-if="getProductImage(item)"
                    :src="getProductImage(item)"
                    :alt="item.product_name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center text-[#525252]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-bold text-sm text-[#1a1a1a] truncate">{{ item.product_name }}</p>
                  <p class="text-xs text-[#525252] font-mono">
                    {{ item.variant_info || 'Default' }} × {{ item.quantity }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <div class="order-card-brutal inline-block p-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-[#525252] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h2 class="text-xl font-bold mb-4 text-[#1a1a1a]">{{ $t('orders.noOrders') }}</h2>
          <p class="text-[#525252] mb-6">{{ $t('cart.empty') }}</p>
          <NuxtLink to="/shop" class="btn btn-primary">
            {{ $t('orders.startShopping') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const config = useRuntimeConfig()
const router = useRouter()
const authStore = useAuthStore()
const { t, locale } = useI18n()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login?redirect=/orders')
  }
})

const { data: ordersData, pending } = await useFetch<any>(`${config.public.apiBase}/orders`, {
  lazy: true,
  server: false,
  headers: computed(() => ({
    Authorization: authStore.token ? `Bearer ${authStore.token}` : '',
  })),
})

const orders = computed(() => ordersData.value?.data || [])

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString(locale.value === 'ar' ? 'ar-DZ' : 'fr-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const getProductImage = (item: any) => {
  if (item.product?.images?.length > 0) {
    const image = item.product.images.find((i: any) => i.is_primary) || item.product.images[0]
    if (image.path) {
      return `${config.public.apiBase.replace('/api/v1', '')}/storage/${image.path}`
    }
  }
  return null
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': t('orders.pending'),
    'confirmed': t('orders.confirmed'),
    'processing': t('orders.processing'),
    'shipped': t('orders.shipped'),
    'delivered': t('orders.delivered'),
    'cancelled': t('orders.cancelled'),
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const base = 'status-badge-brutal'
  switch (status) {
    case 'pending':
      return `${base} status-pending`
    case 'confirmed':
      return `${base} status-confirmed`
    case 'processing':
      return `${base} status-processing`
    case 'shipped':
      return `${base} status-shipped`
    case 'delivered':
      return `${base} status-delivered`
    case 'cancelled':
      return `${base} status-cancelled`
    default:
      return `${base} status-default`
  }
}

useSeoMeta({
  title: () => `${t('orders.title')} - VIBE`,
  description: () => t('orders.title'),
})
</script>

<style scoped>
.page-title-brutal {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.order-card-brutal {
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.order-item-brutal {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: white;
  border: 2px solid #1a1a1a;
  min-width: 200px;
}

.order-item-image {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  overflow: hidden;
  background: #fef6e0;
  border: 2px solid #1a1a1a;
}

.border-t-3 {
  border-top-width: 3px;
}

.status-badge-brutal {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid #1a1a1a;
}

.status-pending {
  background: #facc15;
  color: #1a1a1a;
}

.status-confirmed {
  background: #3b82f6;
  color: white;
}

.status-processing {
  background: #a855f7;
  color: white;
}

.status-shipped {
  background: #6366f1;
  color: white;
}

.status-delivered {
  background: #22c55e;
  color: white;
}

.status-cancelled {
  background: #ef4444;
  color: white;
}

.status-default {
  background: #6b7280;
  color: white;
}
</style>
