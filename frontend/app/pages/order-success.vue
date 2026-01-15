<template>
  <div class="bg-[#fef6e0] min-h-screen">
    <div class="container-custom py-20">
      <div class="success-card-brutal">
        <div class="success-icon">✓</div>
        
        <h1 class="success-title">{{ $t('orderSuccess.title').toUpperCase() }}</h1>
        
        <p class="success-message">
          {{ $t('orderSuccess.thankYou') }}
        </p>

        <div v-if="orderNumber" class="order-number-brutal">
          <span class="order-label">{{ $t('orders.orderNumber') }}:</span>
          <span class="order-value">{{ orderNumber }}</span>
        </div>

        <div class="success-details">
          <div class="detail-item">
            <span class="detail-icon">📧</span>
            <span>{{ $t('orderSuccess.confirmation') }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">📦</span>
            <span>{{ $t('orderSuccess.delivery') }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">💵</span>
            <span>{{ isPaid ? $t('orderSuccess.paymentReceived') : $t('orderSuccess.paymentCod') }}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <NuxtLink to="/shop" class="btn btn-primary">
            {{ $t('cart.continueShopping') }} →
          </NuxtLink>
          <NuxtLink to="/" class="btn btn-secondary">
            {{ $t('common.backToHome') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

const orderNumber = computed(() => route.query.order as string)
const isPaid = computed(() => route.query.paid === 'true')

useSeoMeta({
  title: () => `${t('orderSuccess.title')} - VIBE`,
  description: () => t('orderSuccess.thankYou'),
})
</script>

<style scoped>
.success-card-brutal {
  @apply max-w-2xl mx-auto p-12 text-center;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 8px 8px 0px #1a1a1a;
}

.success-icon {
  @apply w-24 h-24 mx-auto mb-6 flex items-center justify-center text-5xl font-bold;
  background: #22c55e;
  color: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.success-title {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.success-message {
  @apply text-lg text-[#525252] mb-8;
}

.order-number-brutal {
  @apply inline-block px-6 py-3 mb-8;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.order-label {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  color: #1a1a1a;
}

.order-value {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  color: #1a1a1a;
}

[dir="ltr"] .order-value {
  margin-left: 0.5rem;
}

[dir="rtl"] .order-value {
  margin-right: 0.5rem;
}

.success-details {
  @apply space-y-4 text-left max-w-md mx-auto;
}

[dir="rtl"] .success-details {
  text-align: right;
}

.detail-item {
  @apply flex items-center gap-3 p-3;
  background: #fef6e0;
  border: 2px solid #1a1a1a;
}

.detail-icon {
  font-size: 1.5rem;
}
</style>
