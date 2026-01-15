<template>
  <div class="pt-24 bg-[#fef6e0] min-h-screen">
    <div v-if="pending" class="container-custom py-16">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="skeleton h-[600px] bg-[#e5dcc3]"></div>
        <div class="space-y-6">
          <div class="skeleton h-8 w-32 bg-[#e5dcc3]"></div>
          <div class="skeleton h-12 w-3/4 bg-[#e5dcc3]"></div>
          <div class="skeleton h-10 w-40 bg-[#e5dcc3]"></div>
          <div class="skeleton h-24 w-full bg-[#e5dcc3]"></div>
          <div class="skeleton h-12 w-full bg-[#e5dcc3]"></div>
        </div>
      </div>
    </div>

    <div v-else-if="product" class="container-custom py-12">
      <nav class="mb-8 text-sm">
        <ol class="flex items-center gap-2 text-[#525252]">
          <li><NuxtLink to="/" class="hover:text-[#ff5c00]">{{ $t('nav.home') }}</NuxtLink></li>
          <li>/</li>
          <li><NuxtLink to="/shop" class="hover:text-[#ff5c00]">{{ $t('nav.shop') }}</NuxtLink></li>
          <li v-if="product.category">/</li>
          <li v-if="product.category">
            <NuxtLink :to="`/shop?category=${product.category.slug}`" class="hover:text-[#ff5c00]">
              {{ product.category.name }}
            </NuxtLink>
          </li>
          <li>/</li>
          <li class="text-[#1a1a1a] font-bold">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid lg:grid-cols-2 gap-12">
        <div class="space-y-4">
          <div class="product-image-brutal">
            <img 
              v-if="selectedImage"
              :src="selectedImage" 
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-[#525252]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div v-if="productImages.length > 1" class="grid grid-cols-4 gap-4">
            <button 
              v-for="(img, index) in productImages" 
              :key="index"
              @click="selectedImageIndex = index"
              :class="[
                'thumb-brutal',
                selectedImageIndex === index ? 'active' : ''
              ]"
            >
              <img :src="img" :alt="`${product.name} - ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div>
          <p v-if="product.category" class="text-sm text-[#525252] uppercase tracking-wider mb-2 font-bold">
            {{ product.category.name }}
          </p>

          <h1 class="product-title-brutal">{{ product.name }}</h1>

          <div class="mb-6">
            <span class="product-price-brutal">
              {{ formatPrice(currentPrice) }} {{ $t('common.currency') }}
            </span>
          </div>

          <p class="text-[#525252] mb-8 leading-relaxed">
            {{ product.description || $t('product.noDescription') }}
          </p>

          <div v-if="product.variants?.length > 0" class="space-y-6 mb-8">
            <div v-if="availableSizes.length > 0">
              <label class="block font-mono font-bold mb-3 text-[#1a1a1a]">📐 {{ $t('product.size').toUpperCase() }}</label>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-for="size in availableSizes" 
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'variant-btn',
                    selectedSize === size ? 'active' : ''
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div v-if="availableColors.length > 0">
              <label class="block font-mono font-bold mb-3 text-[#1a1a1a]">🎨 {{ $t('product.color').toUpperCase() }}</label>
              <div class="flex flex-wrap gap-3">
                <button 
                  v-for="color in availableColors" 
                  :key="color"
                  @click="selectedColor = color"
                  :class="[
                    'variant-btn',
                    selectedColor === color ? 'active' : ''
                  ]"
                >
                  {{ color }}
                </button>
              </div>
            </div>
          </div>

          <div class="mb-6">
            <span 
              v-if="selectedVariant?.stock_quantity > 0"
              class="stock-badge in-stock"
            >
              ✓ {{ $t('product.inStock') }} ({{ selectedVariant.stock_quantity }} {{ locale === 'ar' ? 'متوفر' : 'available' }})
            </span>
            <span 
              v-else-if="!product.variants?.length"
              class="stock-badge in-stock"
            >
              ✓ {{ $t('product.inStock') }}
            </span>
            <span v-else class="stock-badge out-of-stock">
              ✗ {{ $t('product.outOfStock') }}
            </span>
          </div>

          <div class="mb-8">
            <label class="block font-mono font-bold mb-3 text-[#1a1a1a]">📦 {{ $t('product.quantity').toUpperCase() }}</label>
            <div class="flex items-center gap-4">
              <button 
                @click="quantity > 1 && quantity--"
                class="qty-btn"
              >
                −
              </button>
              <span class="text-2xl font-bold font-mono w-12 text-center text-[#1a1a1a]">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <button 
            @click="addToCart"
            :disabled="!canAddToCart"
            :class="[
              'btn w-full text-lg py-4',
              canAddToCart ? 'btn-primary' : 'bg-[#e5dcc3] text-[#525252] cursor-not-allowed border-3 border-[#1a1a1a]'
            ]"
          >
            <span v-if="canAddToCart">{{ $t('product.addToCart') }} - {{ formatPrice(currentPrice * quantity) }} {{ $t('common.currency') }}</span>
            <span v-else>{{ $t('product.selectOptions') }}</span>
          </button>

          <div class="mt-8 pt-8 border-t-3 border-[#1a1a1a] space-y-4">
            <div class="flex items-center gap-3 text-[#525252]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#ff5c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ $t('cart.freeShipping') }}</span>
            </div>
            <div class="flex items-center gap-3 text-[#525252]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#ff5c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ $t('checkout.cod') }}</span>
            </div>
            <div class="flex items-center gap-3 text-[#525252]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#ff5c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ locale === 'ar' ? 'مواد عالية الجودة' : 'Premium quality materials' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="container-custom py-16 text-center">
      <h1 class="text-2xl font-bold mb-4 text-[#1a1a1a]">{{ $t('product.notFound') }}</h1>
      <NuxtLink to="/shop" class="btn btn-primary">
        {{ $t('common.backToShop') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const config = useRuntimeConfig()
const cartStore = useCartStore()
const { locale, t } = useI18n()

const quantity = ref(1)
const selectedSize = ref<string | null>(null)
const selectedColor = ref<string | null>(null)
const selectedImageIndex = ref(0)

const { data: productData, pending } = await useFetch<{ data: any }>(`${config.public.apiBase}/products/${route.params.slug}`, {
  lazy: true,
  server: false,
})

const product = computed(() => productData.value?.data)

const productImages = computed(() => {
  if (!product.value?.images?.length) return []
  const base = config.public.apiBase.replace('/api/v1', '')
  
  let images = product.value.images
  if (selectedColor.value) {
    const colorImages = images.filter((img: any) => img.color === selectedColor.value)
    if (colorImages.length > 0) {
      images = colorImages
    }
  }
  
  return images.map((img: any) => `${base}/storage/${img.path}`)
})

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || null
})

const availableSizes = computed(() => {
  if (!product.value?.variants) return []
  const sizes = new Set(
    product.value.variants
      .filter((v: any) => v.stock_quantity > 0 && v.size)
      .map((v: any) => v.size)
  )
  return Array.from(sizes)
})

const availableColors = computed(() => {
  if (!product.value?.variants) return []
  const colors = new Set(
    product.value.variants
      .filter((v: any) => v.stock_quantity > 0 && v.color)
      .map((v: any) => v.color)
  )
  return Array.from(colors)
})

const selectedVariant = computed(() => {
  if (!product.value?.variants?.length) return null
  
  return product.value.variants.find((v: any) => {
    const sizeMatch = !availableSizes.value.length || v.size === selectedSize.value
    const colorMatch = !availableColors.value.length || v.color === selectedColor.value
    return sizeMatch && colorMatch && v.stock_quantity > 0
  })
})

const currentPrice = computed(() => {
  const base = parseFloat(product.value?.price) || 0
  const adjustment = parseFloat(selectedVariant.value?.price_adjustment) || 0
  return base + adjustment
})

const canAddToCart = computed(() => {
  if (!product.value) return false
  if (!product.value.variants?.length) return true
  return !!selectedVariant.value
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat(locale.value === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price)
}

const addToCart = () => {
  if (!canAddToCart.value || !product.value) return

  const variantInfo = []
  if (selectedSize.value) variantInfo.push(`${t('product.size')}: ${selectedSize.value}`)
  if (selectedColor.value) variantInfo.push(`${t('product.color')}: ${selectedColor.value}`)

  cartStore.addItem({
    productId: product.value.id,
    variantId: selectedVariant.value?.id,
    name: product.value.name,
    variant: variantInfo.join(', ') || undefined,
    price: currentPrice.value,
    quantity: quantity.value,
    image: productImages.value[0] || undefined,
  })
}

watch(selectedColor, () => {
  selectedImageIndex.value = 0
})

watch(product, (p) => {
  if (p?.variants?.length) {
    const firstAvailable = p.variants.find((v: any) => v.stock_quantity > 0)
    if (firstAvailable) {
      selectedSize.value = firstAvailable.size || null
      selectedColor.value = firstAvailable.color || null
    }
  }
}, { immediate: true })

useSeoMeta({
  title: () => product.value ? `${product.value.name} - VIBE` : `${t('nav.shop')} - VIBE`,
  description: () => product.value?.description || t('home.heroDescription'),
})
</script>

<style scoped>
.product-image-brutal {
  @apply aspect-square overflow-hidden;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0px #1a1a1a;
}

.thumb-brutal {
  @apply aspect-square overflow-hidden transition-all duration-150;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.thumb-brutal:hover,
.thumb-brutal.active {
  border-color: #ff5c00;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}

.product-title-brutal {
  font-family: 'Space Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.product-price-brutal {
  font-family: 'Space Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #ff5c00;
}

.variant-btn {
  @apply px-6 py-3 font-mono font-bold transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
  color: #1a1a1a;
}

.variant-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}

.variant-btn.active {
  background: #facc15;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0px #1a1a1a;
}

.stock-badge {
  @apply inline-block px-4 py-2 font-mono font-bold text-sm;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.stock-badge.in-stock {
  background: #bbf7d0;
  color: #166534;
}

.stock-badge.out-of-stock {
  background: #fecaca;
  color: #dc2626;
}

.qty-btn {
  @apply w-12 h-12 flex items-center justify-center text-xl font-bold transition-all duration-150;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
  color: #1a1a1a;
}

.qty-btn:hover {
  background: #fef6e0;
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px #1a1a1a;
}

.qty-btn:active {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px #1a1a1a;
}

.border-3 {
  border-width: 3px;
}

.border-t-3 {
  border-top-width: 3px;
}
</style>
