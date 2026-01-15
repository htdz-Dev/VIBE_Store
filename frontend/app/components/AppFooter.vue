<template>
  <footer class="footer-brutal mt-auto">
    <div class="container-custom py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <NuxtLink to="/" class="logo-brutal inline-block mb-6">
            VIBE
          </NuxtLink>
          <p class="text-[#525252] mb-6 max-w-md leading-relaxed">
            {{ $t('footer.description') }}
          </p>
          <div class="flex gap-3">
            <a href="#" class="social-btn-brutal">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
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

        <div>
          <h4 class="footer-heading">{{ $t('footer.quickLinks') }}</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/shop" class="footer-link">
                {{ $t('nav.shop') }} →
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop?category=hoodies" class="footer-link">
                {{ locale === 'ar' ? 'هوديز' : 'Hoodies' }} →
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/shop?category=t-shirts" class="footer-link">
                {{ locale === 'ar' ? 'تيشيرتات' : 'T-Shirts' }} →
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="footer-link">
                {{ $t('nav.about') }} →
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="footer-heading">{{ $t('footer.customerService') }}</h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/contact" class="footer-link">
                {{ $t('nav.contact') }} →
              </NuxtLink>
            </li>
            <li>
              <a href="#" class="footer-link">
                {{ $t('footer.shippingPolicy') }} →
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                {{ $t('footer.returns') }} →
              </a>
            </li>
            <li>
              <a href="#" class="footer-link">
                {{ $t('footer.faq') }} →
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-bold">
          © {{ currentYear }} VIBE. {{ $t('footer.allRightsReserved').toUpperCase() }}.
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="footer-link text-sm">
            {{ $t('footer.privacyPolicy') }}
          </a>
          <a href="#" class="footer-link text-sm">
            {{ $t('footer.termsOfService') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-brutal {
  background: #fffef0;
  border-top: 3px solid #1a1a1a;
}

.logo-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
  letter-spacing: -0.05em;
}

.logo-brutal:hover {
  color: #ff5c00;
}

.footer-heading {
  @apply text-lg font-bold mb-6 uppercase;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
  letter-spacing: 0.05em;
}

.footer-link {
  @apply transition-all duration-150 font-medium;
  color: #525252;
}

.footer-link:hover {
  color: #ff5c00;
}

[dir="rtl"] .footer-link:hover {
  padding-right: 4px;
  padding-left: 0;
}

[dir="ltr"] .footer-link:hover {
  padding-left: 4px;
}

.social-btn-brutal {
  @apply w-10 h-10 flex items-center justify-center transition-all duration-150;
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

.footer-bottom {
  background: #facc15;
  border-top: 3px solid #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
</style>
