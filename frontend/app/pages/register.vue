<template>
  <div class="pt-24 min-h-screen bg-[#fef6e0] flex items-center">
    <div class="container-custom py-12">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block mb-6">
            <span class="text-3xl font-bold text-[#1a1a1a]" style="font-family: 'Space Mono', monospace;">VIBE</span>
          </NuxtLink>
          <h1 class="text-3xl font-bold text-[#1a1a1a]">{{ $t('auth.registerTitle') }}</h1>
          <p class="text-[#525252] mt-2">{{ $t('auth.registerSubtitle') }}</p>
        </div>

        <div class="auth-card-brutal">
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div v-if="error" class="p-4 bg-[#fef2f2] border-2 border-[#ef4444] text-[#ef4444] text-sm font-bold">
              {{ error }}
            </div>

            <div>
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('auth.name') }}</label>
              <input 
                v-model="form.name"
                type="text"
                class="input-brutal"
                :placeholder="locale === 'ar' ? 'أحمد محمد' : 'John Doe'"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('auth.email') }}</label>
              <input 
                v-model="form.email"
                type="email"
                class="input-brutal"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('checkout.phone') }} ({{ locale === 'ar' ? 'اختياري' : 'Optional' }})</label>
              <input 
                v-model="form.phone"
                type="tel"
                class="input-brutal"
                placeholder="0XXX XXX XXX"
              />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('auth.password') }}</label>
              <input 
                v-model="form.password"
                type="password"
                class="input-brutal"
                placeholder="••••••••"
                required
                minlength="8"
              />
            </div>

            <div>
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('auth.confirmPassword') }}</label>
              <input 
                v-model="form.password_confirmation"
                type="password"
                class="input-brutal"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              :disabled="authStore.isLoading"
              class="btn btn-primary w-full"
            >
              <span v-if="authStore.isLoading">{{ $t('common.loading') }}</span>
              <span v-else>{{ $t('auth.signUp') }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-[#525252]">
              {{ $t('auth.hasAccount') }}
              <NuxtLink to="/login" class="text-[#ff5c00] hover:underline font-bold">
                {{ $t('auth.signIn') }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const authStore = useAuthStore()
const { status } = useAuth()
const { locale, t } = useI18n()

const error = ref('')
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
})

const handleRegister = async () => {
  error.value = ''
  
  if (form.password !== form.password_confirmation) {
    error.value = locale.value === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'
    return
  }
  
  const result = await authStore.register(form)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || t('common.error')
  }
}

onMounted(() => {
  if (status.value === 'authenticated') {
    router.push('/')
  }
})

useSeoMeta({
  title: () => `${t('auth.signUp')} - VIBE`,
  description: () => t('auth.registerSubtitle'),
})
</script>

<style scoped>
.auth-card-brutal {
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0px #1a1a1a;
  padding: 2rem;
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

.input-brutal::placeholder {
  color: #a0a0a0;
}
</style>
