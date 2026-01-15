<template>
  <header class="header-brutal">
    <div class="marquee-banner">
      <div class="marquee-content">
        <span>{{ $t('cart.freeShipping').toUpperCase() }}</span>
        <span class="mx-8">★</span>
        <span>PREMIUM STREETWEAR</span>
        <span class="mx-8">★</span>
        <span>{{ $t('checkout.cod').toUpperCase() }}</span>
        <span class="mx-8">★</span>
        <span>{{ $t('cart.freeShipping').toUpperCase() }}</span>
        <span class="mx-8">★</span>
        <span>PREMIUM STREETWEAR</span>
        <span class="mx-8">★</span>
        <span>{{ $t('checkout.cod').toUpperCase() }}</span>
        <span class="mx-8">★</span>
      </div>
    </div>

    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <NuxtLink to="/" class="logo-brutal">
          VIBE
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-1" :class="{ 'flex-row-reverse': locale === 'ar' }">
          <NuxtLink 
            to="/" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            {{ $t('nav.shop') }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            {{ $t('nav.about') }}
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="nav-link-brutal"
            active-class="nav-link-active"
          >
            {{ $t('nav.contact') }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <!-- Language Switcher -->
          <div class="relative">
            <button 
              @click="toggleLangMenu"
              class="lang-btn-brutal"
            >
              {{ locale === 'ar' ? 'ع' : 'EN' }}
            </button>
            
            <Transition name="fade">
              <div 
                v-if="showLangMenu" 
                class="dropdown-brutal"
              >
                <button 
                  v-for="loc in locales" 
                  :key="loc.code"
                  @click="switchLocale(loc.code)"
                  class="dropdown-item-brutal w-full text-start"
                  :class="{ 'bg-[#facc15]': locale === loc.code }"
                >
                  {{ loc.name }}
                </button>
              </div>
            </Transition>
          </div>

          <button 
            @click="toggleSearch"
            class="icon-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <div class="relative">
            <button 
              @click="toggleUserMenu"
              class="icon-btn-brutal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            
            <Transition name="fade">
              <div 
                v-if="showUserMenu" 
                class="dropdown-brutal"
                :class="{ 'left-0 right-auto': locale === 'ar' }"
              >
                <template v-if="authStore.isAuthenticated">
                  <NuxtLink to="/account" class="dropdown-item-brutal">
                    {{ $t('nav.account') }}
                  </NuxtLink>
                  <NuxtLink to="/orders" class="dropdown-item-brutal">
                    {{ $t('nav.orders') }}
                  </NuxtLink>
                  <button @click="logout" class="dropdown-item-brutal w-full text-start text-[#ff5c00]">
                    {{ $t('nav.logout') }}
                  </button>
                </template>
                <template v-else>
                  <NuxtLink to="/login" class="dropdown-item-brutal">
                    {{ $t('nav.login') }}
                  </NuxtLink>
                  <NuxtLink to="/register" class="dropdown-item-brutal">
                    {{ $t('nav.register') }}
                  </NuxtLink>
                </template>
              </div>
            </Transition>
          </div>

          <button 
            @click="cartStore.toggleCart"
            class="cart-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span 
              v-if="cartStore.itemCount > 0"
              class="cart-badge-brutal"
            >
              {{ cartStore.itemCount }}
            </span>
          </button>

          <button 
            @click="toggleMobileMenu"
            class="md:hidden icon-btn-brutal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="slide-down">
      <div v-if="showMobileMenu" class="md:hidden mobile-menu-brutal">
        <nav class="container-custom py-4 space-y-2">
          <NuxtLink 
            to="/" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            {{ $t('nav.home') }}
          </NuxtLink>
          <NuxtLink 
            to="/shop" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            {{ $t('nav.shop') }}
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            {{ $t('nav.about') }}
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="showMobileMenu = false"
            class="mobile-nav-brutal"
          >
            {{ $t('nav.contact') }}
          </NuxtLink>
          
          <!-- Mobile Language Switcher -->
          <div class="pt-4 border-t-2 border-[#1a1a1a] mt-4">
            <div class="flex gap-2">
              <button 
                v-for="loc in locales" 
                :key="loc.code"
                @click="switchLocale(loc.code)"
                class="px-4 py-2 font-bold border-2 border-[#1a1a1a]"
                :class="locale === loc.code ? 'bg-[#ff5c00] text-white' : 'bg-white'"
              >
                {{ loc.name }}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showSearch" class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32">
        <div class="w-full max-w-2xl mx-4">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text"
              :placeholder="$t('common.search') + '...'"
              class="input w-full text-lg py-4 pl-12 pr-12"
              :class="{ 'text-right pr-12 pl-12': locale === 'ar' }"
              @keyup.enter="performSearch"
              @keyup.escape="showSearch = false"
              ref="searchInput"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-1/2 -translate-y-1/2 text-[#525252]" :class="locale === 'ar' ? 'right-4' : 'left-4'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button @click="showSearch = false" class="absolute top-1/2 -translate-y-1/2 text-[#525252] hover:text-[#1a1a1a]" :class="locale === 'ar' ? 'left-4' : 'right-4'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const { locale, locales, setLocale } = useI18n()

const showMobileMenu = ref(false)
const showUserMenu = ref(false)
const showLangMenu = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const toggleLangMenu = () => {
  showLangMenu.value = !showLangMenu.value
}

const switchLocale = (code: string) => {
  setLocale(code)
  showLangMenu.value = false
  showMobileMenu.value = false
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (showSearch.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value)}`)
    showSearch.value = false
    searchQuery.value = ''
  }
}

const logout = async () => {
  await authStore.logout()
  showUserMenu.value = false
  router.push('/')
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showUserMenu.value = false
      showLangMenu.value = false
    }
  })
})
</script>

<style scoped>
.header-brutal {
  @apply sticky top-0 z-50;
  background: #fffef0;
  border-bottom: 3px solid #1a1a1a;
}

.marquee-banner {
  @apply overflow-hidden whitespace-nowrap py-2;
  background: #facc15;
  border-bottom: 3px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}

[dir="rtl"] .marquee-content {
  animation: marquee-rtl 30s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-rtl {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

.logo-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2rem;
  color: #1a1a1a;
  letter-spacing: -0.05em;
  transition: all 0.15s ease;
}

.logo-brutal:hover {
  color: #ff5c00;
}

.nav-link-brutal {
  @apply px-4 py-2 font-bold uppercase transition-all duration-150;
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.nav-link-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.nav-link-active {
  background: #ff5c00;
  color: white;
  border-color: #1a1a1a;
}

.icon-btn-brutal {
  @apply p-2 transition-all duration-150;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.icon-btn-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.lang-btn-brutal {
  @apply p-2 font-bold transition-all duration-150;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
  background: #e5dcc3;
  border: 2px solid #1a1a1a;
  min-width: 40px;
}

.lang-btn-brutal:hover {
  background: #facc15;
}

.cart-btn-brutal {
  @apply relative p-2 transition-all duration-150;
  color: #1a1a1a;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.cart-btn-brutal:hover {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #1a1a1a;
}

.cart-badge-brutal {
  @apply absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs font-bold;
  background: #ff5c00;
  color: white;
  border: 2px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
}

[dir="rtl"] .cart-badge-brutal {
  @apply -left-2 right-auto;
}

.dropdown-brutal {
  @apply absolute right-0 mt-2 w-48 overflow-hidden;
  background: #fffef0;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

[dir="rtl"] .dropdown-brutal {
  @apply left-0 right-auto;
}

.dropdown-item-brutal {
  @apply block px-4 py-3 font-bold transition-all duration-150;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
}

.dropdown-item-brutal:last-child {
  border-bottom: none;
}

.dropdown-item-brutal:hover {
  background: #facc15;
}

.mobile-menu-brutal {
  background: #fffef0;
  border-top: 3px solid #1a1a1a;
}

.mobile-nav-brutal {
  @apply block py-3 px-4 font-bold uppercase transition-all duration-150;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
  border: 2px solid transparent;
}

.mobile-nav-brutal:hover {
  background: #facc15;
  border-color: #1a1a1a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
