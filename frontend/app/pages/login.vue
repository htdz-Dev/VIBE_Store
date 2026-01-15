<template>
  <div class="pt-24 min-h-screen bg-[#fef6e0] flex items-center">
    <div class="container-custom py-12">
      <div class="max-w-md mx-auto">
        <div class="text-center mb-8">
          <NuxtLink to="/" class="inline-block mb-6">
            <span class="text-3xl font-bold text-[#1a1a1a]" style="font-family: 'Space Mono', monospace;">VIBE</span>
          </NuxtLink>
          <h1 class="text-3xl font-bold text-[#1a1a1a]">{{ $t('auth.loginTitle') }}</h1>
          <p class="text-[#525252] mt-2">{{ $t('auth.loginSubtitle') }}</p>
        </div>

        <div class="auth-card-brutal">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div v-if="error" class="p-4 bg-[#fef2f2] border-2 border-[#ef4444] text-[#ef4444] text-sm font-bold">
              {{ error }}
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
              <label class="block text-sm font-bold mb-2 text-[#1a1a1a]">{{ $t('auth.password') }}</label>
              <input 
                v-model="form.password"
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
              <span v-else>{{ $t('auth.signIn') }}</span>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-[#525252]">
              {{ $t('auth.noAccount') }}
              <NuxtLink to="/register" class="text-[#ff5c00] hover:underline font-bold">
                {{ $t('auth.signUp') }}
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
const route = useRoute()
const authStore = useAuthStore()
const { status } = useAuth()
const { t } = useI18n()

const error = ref('')
const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  error.value = ''
  
  const result = await authStore.login(form.email, form.password)
  
  if (result.success) {
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
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
  title: () => `${t('auth.signIn')} - VIBE`,
  description: () => t('auth.loginSubtitle'),
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
