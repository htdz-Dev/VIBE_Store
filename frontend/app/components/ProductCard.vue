<template>
  <NuxtLink 
    :to="`/shop/${product.slug}`"
    class="product-card-brutal group cursor-pointer block"
  >
    <div class="product-image-brutal">
      <img 
        v-if="primaryImage"
        :src="primaryImage"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-[#525252]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <div 
        v-if="product.is_featured"
        class="featured-badge-brutal"
      >
        ★ {{ $t('product.hot') }}
      </div>

      <div class="quick-add-brutal">
        <button 
          @click.prevent="quickAdd"
          class="btn btn-primary w-full"
        >
          + {{ $t('product.addToCart') }}
        </button>
      </div>
    </div>

    <div class="p-4 bg-white">
      <p v-if="product.category" class="product-category-brutal">
        {{ product.category.name }}
      </p>

      <h3 class="product-name-brutal">
        {{ product.name }}
      </h3>

      <div class="product-price-brutal">
        {{ formatPrice(product.price) }} {{ $t('common.currency') }}
      </div>

      <div v-if="product.variants?.length > 0" class="mt-3 flex flex-wrap gap-2">
        <span 
          v-for="size in availableSizes" 
          :key="size"
          class="size-tag-brutal"
        >
          {{ size }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

interface ProductVariant {
  id: number
  size?: string
  color?: string
  stock_quantity: number
  price_adjustment: number
}

interface Category {
  id: number
  name: string
  slug: string
}

interface ProductImage {
  id: number
  path: string
  is_primary: boolean
}

interface Product {
  id: number
  name: string
  slug: string
  description?: string
  price: number
  is_active: boolean
  is_featured: boolean
  category?: Category
  variants?: ProductVariant[]
  primary_image?: ProductImage
  images?: ProductImage[]
}

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
const config = useRuntimeConfig()

const primaryImage = computed(() => {
  if (props.product.primary_image?.path) {
    return `${config.public.apiBase.replace('/api/v1', '')}/storage/${props.product.primary_image.path}`
  }
  if (props.product.images?.length) {
    const primary = props.product.images.find(i => i.is_primary) || props.product.images[0]
    return `${config.public.apiBase.replace('/api/v1', '')}/storage/${primary.path}`
  }
  return null
})

const availableSizes = computed(() => {
  if (!props.product.variants) return []
  const sizes = new Set(
    props.product.variants
      .filter(v => v.stock_quantity > 0 && v.size)
      .map(v => v.size)
  )
  return Array.from(sizes)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-DZ').format(parseFloat(String(price)) || 0)
}

const quickAdd = () => {
  const variant = props.product.variants?.find(v => v.stock_quantity > 0)
  
  cartStore.addItem({
    productId: props.product.id,
    variantId: variant?.id,
    name: props.product.name,
    variant: variant ? `${variant.size || ''} ${variant.color || ''}`.trim() : undefined,
    price: (parseFloat(String(props.product.price)) || 0) + (parseFloat(String(variant?.price_adjustment)) || 0),
    quantity: 1,
    image: primaryImage.value || undefined,
  })
}
</script>

<style scoped>
.product-card-brutal {
  @apply overflow-hidden transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.product-card-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1a1a1a;
}

.product-image-brutal {
  @apply relative overflow-hidden;
  aspect-ratio: 3/4;
  background: #fef6e0;
  border-bottom: 3px solid #1a1a1a;
}

.featured-badge-brutal {
  @apply absolute top-3 left-3 px-3 py-1.5 text-xs font-bold;
  font-family: 'Space Mono', monospace;
  background: #ff5c00;
  color: white;
  border: 2px solid #1a1a1a;
  box-shadow: 2px 2px 0px #1a1a1a;
  transform: rotate(-2deg);
}

.quick-add-brutal {
  @apply absolute bottom-0 left-0 right-0 p-3;
  transform: translateY(100%);
  transition: transform 0.2s ease;
}

.product-card-brutal:hover .quick-add-brutal {
  transform: translateY(0);
}

.product-category-brutal {
  @apply text-xs uppercase mb-2 font-bold;
  font-family: 'Space Mono', monospace;
  color: #7c3aed;
  letter-spacing: 0.1em;
}

.product-name-brutal {
  @apply font-bold text-lg mb-2 line-clamp-2 transition-colors duration-150;
  font-family: 'Space Grotesk', sans-serif;
  color: #1a1a1a;
}

.product-card-brutal:hover .product-name-brutal {
  color: #ff5c00;
}

.product-price-brutal {
  @apply text-xl font-bold;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
}

.size-tag-brutal {
  @apply px-2 py-1 text-xs font-bold;
  font-family: 'Space Mono', monospace;
  background: #facc15;
  border: 2px solid #1a1a1a;
  color: #1a1a1a;
}
</style>
