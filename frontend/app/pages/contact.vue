<template>
  <div class="pt-24 bg-[#fef6e0] min-h-screen">
    <div class="container-custom py-16">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="page-title-brutal">
            {{ $t('contact.title') }}
          </h1>
          <p class="text-[#525252] text-lg">
            {{ $t('contact.subtitle') }}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <div class="space-y-6">
            <div class="contact-card-brutal">
              <div class="flex items-start gap-4">
                <div class="contact-icon-brutal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-[#1a1a1a] mb-1">{{ $t('contact.email') }}</h3>
                  <p class="text-[#525252]">contact@vibe-store.com</p>
                </div>
              </div>
            </div>

            <div class="contact-card-brutal">
              <div class="flex items-start gap-4">
                <div class="contact-icon-brutal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-[#1a1a1a] mb-1">{{ $t('contact.phone') }}</h3>
                  <p class="text-[#525252]">+213 XXX XXX XXX</p>
                </div>
              </div>
            </div>

            <div class="contact-card-brutal">
              <div class="flex items-start gap-4">
                <div class="contact-icon-brutal">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-[#1a1a1a] mb-1">{{ $t('contact.workingHours') }}</h3>
                  <p class="text-[#525252]">{{ $t('contact.workingHoursValue') }}</p>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <a href="#" class="social-btn-brutal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="social-btn-brutal">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="form-card-brutal">
            <form @submit.prevent="sendMessage" class="space-y-6">
              <div v-if="success" class="p-4 bg-[#f0fdf4] border-2 border-[#22c55e] text-[#22c55e] font-bold">
                {{ $t('contact.successMessage') }}
              </div>

              <div v-if="error" class="p-4 bg-[#fef2f2] border-2 border-[#ef4444] text-[#ef4444] font-bold">
                {{ $t('contact.errorMessage') }}
              </div>

              <div>
                <label class="label-brutal">{{ $t('auth.name') }}</label>
                <input 
                  v-model="form.name"
                  type="text"
                  class="input-brutal"
                  :placeholder="$t('auth.name')"
                  required
                />
              </div>

              <div>
                <label class="label-brutal">{{ $t('auth.email') }}</label>
                <input 
                  v-model="form.email"
                  type="email"
                  class="input-brutal"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label class="label-brutal">{{ $t('contact.subject') }}</label>
                <input 
                  v-model="form.subject"
                  type="text"
                  class="input-brutal"
                  :placeholder="$t('contact.subjectPlaceholder')"
                  required
                />
              </div>

              <div>
                <label class="label-brutal">{{ $t('contact.message') }}</label>
                <textarea 
                  v-model="form.message"
                  class="input-brutal min-h-[150px]"
                  :placeholder="$t('contact.messagePlaceholder')"
                  required
                ></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full" :disabled="loading">
                <span v-if="loading">{{ $t('common.sending') }}...</span>
                <span v-else>{{ $t('contact.sendMessage') }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

const success = ref(false)
const error = ref(false)
const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const sendMessage = async () => {
  loading.value = true
  error.value = false
  
  try {
    const response = await $fetch<{ success: boolean }>(`${config.public.apiBase}/v1/contact`, {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      },
    })
    
    if (response.success) {
      success.value = true
      form.name = ''
      form.email = ''
      form.subject = ''
      form.message = ''
      
      setTimeout(() => {
        success.value = false
      }, 5000)
    }
  } catch (e) {
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 5000)
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: () => `${t('contact.title')} - VIBE`,
  description: () => t('contact.subtitle'),
})
</script>

<style scoped>
.page-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.contact-card-brutal {
  @apply p-6;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
}

.contact-icon-brutal {
  @apply w-12 h-12 flex items-center justify-center flex-shrink-0;
  background: #facc15;
  border: 2px solid #1a1a1a;
  color: #1a1a1a;
}

.form-card-brutal {
  @apply p-8;
  background: white;
  border: 3px solid #1a1a1a;
  box-shadow: 6px 6px 0px #1a1a1a;
}

.label-brutal {
  @apply block text-sm font-bold mb-2;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
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

.social-btn-brutal {
  @apply w-12 h-12 flex items-center justify-center transition-all duration-150;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 3px 3px 0px #1a1a1a;
  color: #1a1a1a;
}

.social-btn-brutal:hover {
  background: #ff5c00;
  color: white;
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0px #1a1a1a;
}
</style>
