<template>
  <div>
    <section class="hero-brutal">
      <div class="container-custom py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="sticker-brutal mb-6">
              ★ {{ $t('home.newArrivals').toUpperCase() }} 2026
            </div>
            <h1 class="hero-title-brutal">
              {{ $t('home.heroTitle') }}
              <span class="hero-accent">{{ $t('home.heroSubtitle') }}</span>
            </h1>
            <p class="text-[#525252] text-xl mb-8 max-w-lg leading-relaxed">
              {{ $t('home.heroDescription') }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/shop" class="btn btn-primary text-lg px-8 py-4">
                {{ $t('home.shopNow') }} →
              </NuxtLink>
              <NuxtLink to="/about" class="btn btn-secondary text-lg px-8 py-4">
                {{ $t('about.story') }}
              </NuxtLink>
            </div>
          </div>

          <div class="hidden lg:block">
            <div class="hero-visual-brutal">
              <div class="hero-box box-1">VIBE</div>
              <div class="hero-box box-2">2026</div>
              <div class="hero-box box-3">★</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-brutal">
      <div class="container-custom">
        <div class="section-header-brutal">
          <h2 class="section-title-brutal">
            {{ $t('home.featuredProducts').toUpperCase() }}
          </h2>
          <p class="text-[#525252] text-lg">
            {{ $t('shop.noProducts') === 'No products found' ? 'Discover our most popular pieces.' : '' }}
          </p>
        </div>

        <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i" class="card">
            <div class="skeleton h-80"></div>
            <div class="p-4 space-y-3">
              <div class="skeleton h-4 w-20"></div>
              <div class="skeleton h-6 w-full"></div>
              <div class="skeleton h-6 w-24"></div>
            </div>
          </div>
        </div>

        <div v-else-if="featuredProducts?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-else class="text-center py-12">
          <p class="text-[#525252]">{{ $t('shop.noProducts') }}</p>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/shop" class="btn btn-secondary">
            {{ $t('common.viewAll') }} →
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="section-header-brutal">
          <h2 class="section-title-brutal">
            {{ $t('home.categories').toUpperCase() }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink 
            v-for="(category, index) in categories" 
            :key="category.slug"
            :to="`/shop?category=${category.slug}`"
            class="category-card-brutal"
            :class="getCategoryColor(index)"
          >
            <img :src="getCategoryIcon(index)" class="category-icon-img" alt="Category Icon" />
            <h3 class="category-name-brutal">{{ category.name }}</h3>
            <p class="text-sm text-[#525252]">{{ category.products_count || 0 }} {{ $t('shop.allProducts') === 'All Products' ? 'Products' : 'منتجات' }}</p>
            <span class="category-arrow">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section-brutal">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="feature-card-brutal feature-card-1">
            <span class="feature-icon-brutal">📦</span>
            <h3 class="feature-title-brutal">{{ $t('cart.freeShipping').toUpperCase() }}</h3>
            <p class="text-[#525252]">{{ locale === 'ar' ? 'توصيل مجاني لجميع الطلبات في الجزائر' : 'Free delivery on all orders across Algeria' }}</p>
          </div>
          
          <div class="feature-card-brutal feature-card-2">
            <span class="feature-icon-brutal">⭐</span>
            <h3 class="feature-title-brutal">{{ locale === 'ar' ? 'جودة عالية' : 'PREMIUM QUALITY' }}</h3>
            <p class="text-[#525252]">{{ locale === 'ar' ? 'مواد مختارة بعناية للراحة الدائمة' : 'Carefully selected materials for lasting comfort' }}</p>
          </div>
          
          <div class="feature-card-brutal feature-card-3">
            <span class="feature-icon-brutal">💵</span>
            <h3 class="feature-title-brutal">{{ $t('checkout.cod').toUpperCase() }}</h3>
            <p class="text-[#525252]">{{ locale === 'ar' ? 'ادفع عند استلام طلبك' : 'Pay when you receive your order' }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[#facc15] border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="newsletter-brutal">
          <h2 class="newsletter-title-brutal">
            {{ locale === 'ar' ? 'انضم إلى مجتمع VIBE' : 'JOIN THE VIBE COMMUNITY' }}
          </h2>
          <p class="text-[#525252] mb-8 text-lg">
            {{ $t('footer.newsletterText') }}
          </p>
          <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              v-model="email"
              type="email" 
              :placeholder="locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'"
              class="input flex-grow"
              required
            />
            <button type="submit" class="btn btn-primary whitespace-nowrap">
              {{ $t('footer.subscribe') }} →
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const email = ref('')
const { locale, t } = useI18n()

const { data: featuredData, pending } = await useFetch<{ data: any[] }>(`${config.public.apiBase}/products/featured`, {
  lazy: true,
  server: false,
})

const featuredProducts = computed(() => featuredData.value?.data || [])

const { data: categoriesData } = await useFetch<{ data: any[] }>(`${config.public.apiBase}/categories`, {
  lazy: true,
  server: false,
})

const categories = computed(() => categoriesData.value?.data || [])

const getCategoryColor = (index: number) => {
  const colors = ['category-orange', 'category-purple', 'category-blue']
  return colors[index % colors.length]
}

const getCategoryIcon = (index: number) => {
  const icons = [
    'products/h.png',
    'products/t.png', 
    'products/j.png' 
  ]
  const base = config.public.apiBase.replace('/api/v1', '')
  return `${base}/storage/${icons[index % icons.length]}`
}

const subscribe = () => {
  alert(locale.value === 'ar' ? `تم الاشتراك: ${email.value}` : `Subscribed with: ${email.value}`)
  email.value = ''
}

useSeoMeta({
  title: () => `VIBE - ${t('home.heroSubtitle')}`,
  description: () => t('home.heroDescription'),
})
</script>

<style scoped>
.hero-brutal {
  background: #fffef0;
  border-bottom: 3px solid #1a1a1a;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.sticker-brutal {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.875rem;
  transform: rotate(-1deg);
}

.hero-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 3.5rem;
  line-height: 1.1;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-title-brutal {
    font-size: 4.5rem;
  }
}

.hero-accent {
  color: #ff5c00;
  display: block;
}

.hero-visual-brutal {
  position: relative;
  height: 400px;
}

.hero-box {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0px #1a1a1a;
}

.box-1 {
  top: 10%;
  left: 10%;
  width: 200px;
  height: 200px;
  background: #ff5c00;
  color: white;
  font-size: 2.5rem;
  transform: rotate(-3deg);
}

.box-2 {
  top: 30%;
  right: 10%;
  width: 150px;
  height: 150px;
  background: #facc15;
  font-size: 1.5rem;
  transform: rotate(5deg);
}

.box-3 {
  bottom: 10%;
  left: 30%;
  width: 100px;
  height: 100px;
  background: #7c3aed;
  color: white;
  font-size: 2rem;
  transform: rotate(-5deg);
}

.section-brutal {
  @apply py-20;
  background: #fffef0;
}

.section-header-brutal {
  @apply text-center mb-12;
}

.section-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.category-card-brutal {
  @apply p-8 transition-all duration-150 relative;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.category-card-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1a1a1a;
}

.category-orange { background: #fff7ed; }
.category-purple { background: #f5f3ff; }
.category-blue { background: #eff6ff; }

.category-icon-img {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  display: block;
  margin-bottom: 1rem;
}

.category-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.category-name-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.category-arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 1.5rem;
  transition: transform 0.15s ease;
}

[dir="rtl"] .category-arrow {
  right: auto;
  left: 1.5rem;
  transform: rotate(180deg);
}

.category-card-brutal:hover .category-arrow {
  transform: translateX(5px);
}

[dir="rtl"] .category-card-brutal:hover .category-arrow {
  transform: translateX(-5px) rotate(180deg);
}

.feature-card-brutal {
  @apply p-8 text-center;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.feature-card-1 { background: #fff7ed; }
.feature-card-2 { background: #fef6e0; }
.feature-card-3 { background: #f0fdf4; }

.feature-icon-brutal {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.125rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.newsletter-brutal {
  @apply text-center max-w-2xl mx-auto;
}

.newsletter-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.border-y-3 {
  border-top-width: 3px;
  border-bottom-width: 3px;
}
</style>
