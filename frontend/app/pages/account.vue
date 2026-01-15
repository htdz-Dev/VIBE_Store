<template>
  <div class="pt-24 bg-[#fef6e0] min-h-screen">
    <div class="container-custom py-12">
      <h1 class="page-title-brutal mb-8">{{ $t('account.title') }}</h1>

      <div v-if="!authStore.user" class="account-card-brutal p-8">
        <div class="skeleton h-6 w-48 mb-4 bg-[#e5dcc3]"></div>
        <div class="skeleton h-4 w-full mb-2 bg-[#e5dcc3]"></div>
        <div class="skeleton h-4 w-3/4 bg-[#e5dcc3]"></div>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <div class="account-card-brutal p-6 text-center">
            <div class="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-[#ff5c00] border-3 border-[#1a1a1a]">
              <span class="text-3xl font-bold text-white font-mono">{{ userInitials }}</span>
            </div>
            <h2 class="text-xl font-bold mb-1 text-[#1a1a1a]">{{ authStore.user.name }}</h2>
            <p class="text-[#525252] text-sm">{{ authStore.user.email }}</p>
            
            <div class="mt-6 pt-6 border-t-3 border-[#1a1a1a]">
              <NuxtLink to="/orders" class="flex items-center justify-center gap-2 text-[#ff5c00] hover:underline font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {{ $t('nav.orders') }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="account-card-brutal p-6">
            <h3 class="text-xl font-bold mb-6 text-[#1a1a1a]">{{ $t('account.profileInfo') }}</h3>
            
            <form @submit.prevent="updateProfile" class="space-y-6">
              <div>
                <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('auth.name') }}</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="input-brutal"
                  :placeholder="$t('auth.name')"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('auth.email') }}</label>
                <input
                  :value="authStore.user.email"
                  type="email"
                  class="input-brutal opacity-60 cursor-not-allowed"
                  disabled
                />
                <p class="text-xs text-[#525252] mt-1">{{ locale === 'ar' ? 'لا يمكن تغيير البريد الإلكتروني' : 'Email cannot be changed' }}</p>
              </div>

              <div>
                <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('checkout.phone') }}</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="input-brutal"
                  :placeholder="$t('checkout.phone')"
                />
              </div>

              <div>
                <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('checkout.address') }}</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="input-brutal"
                  :placeholder="$t('checkout.address')"
                />
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('checkout.city') }}</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="input-brutal"
                    :placeholder="$t('checkout.city')"
                  />
                </div>
                <div>
                  <label class="block text-sm font-bold mb-2 text-[#525252]">{{ $t('checkout.wilaya') }}</label>
                  <input
                    v-model="form.wilaya"
                    type="text"
                    class="input-brutal"
                    :placeholder="$t('checkout.wilaya')"
                  />
                </div>
              </div>

              <div v-if="error" class="p-4 bg-[#fef2f2] border-2 border-[#ef4444] text-[#ef4444] font-bold">
                {{ error }}
              </div>

              <div v-if="success" class="p-4 bg-[#f0fdf4] border-2 border-[#22c55e] text-[#22c55e] font-bold">
                {{ $t('account.profileUpdated') }}
              </div>

              <button
                type="submit"
                class="btn btn-primary w-full"
                :disabled="isUpdating"
              >
                <span v-if="isUpdating">{{ $t('common.loading') }}</span>
                <span v-else>{{ $t('account.saveChanges') }}</span>
              </button>
            </form>
          </div>

          <div class="account-card-brutal p-6 mt-6">
            <h3 class="text-xl font-bold mb-4 text-[#1a1a1a]">{{ $t('account.actions') }}</h3>
            <button
              @click="handleLogout"
              class="logout-btn-brutal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="locale === 'ar' ? 'ml-2' : 'mr-2'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              {{ $t('account.signOut') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const { locale, t } = useI18n()

const form = reactive({
  name: '',
  phone: '',
  address: '',
  city: '',
  wilaya: '',
})

const isUpdating = ref(false)
const error = ref('')
const success = ref(false)

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login?redirect=/account')
  } else {
    form.name = authStore.user?.name || ''
    form.phone = authStore.user?.phone || ''
    form.address = authStore.user?.address || ''
    form.city = authStore.user?.city || ''
    form.wilaya = authStore.user?.wilaya || ''
  }
})

const userInitials = computed(() => {
  if (!authStore.user?.name) return '?'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const updateProfile = async () => {
  isUpdating.value = true
  error.value = ''
  success.value = false

  const result = await authStore.updateProfile(form)
  
  if (result.success) {
    success.value = true
    setTimeout(() => success.value = false, 3000)
  } else {
    error.value = result.error || t('common.error')
  }
  
  isUpdating.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

useSeoMeta({
  title: () => `${t('account.title')} - VIBE`,
  description: () => t('account.profileInfo'),
})
</script>

<style scoped>
.page-title-brutal {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  text-transform: uppercase;
}

.account-card-brutal {
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.border-3 {
  border-width: 3px;
}

.border-t-3 {
  border-top-width: 3px;
}

.input-brutal {
  @apply w-full px-4 py-3 transition-all duration-150;
  background: #fffef0;
  border: 3px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
}

.input-brutal:focus {
  outline: none;
  background: white;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.logout-btn-brutal {
  @apply flex items-center px-6 py-3 font-bold transition-all duration-150;
  background: #fee2e2;
  border: 3px solid #1a1a1a;
  color: #dc2626;
  box-shadow: 3px 3px 0px #1a1a1a;
}

.logout-btn-brutal:hover {
  background: #fca5a5;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #1a1a1a;
}
</style>
