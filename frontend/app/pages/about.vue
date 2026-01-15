<template>
  <div class="bg-[#fef6e0]">
    <section class="hero-about-brutal">
      <div class="container-custom text-center">
        <div class="sticker-brutal-large">✦ {{ locale === 'ar' ? 'تأسست' : 'EST.' }} 2024 ✦</div>
        <h1 class="hero-title-about">
          {{ $t('about.title') }} <span class="text-[#ff5c00]">VIBE</span>
        </h1>
        <p class="text-xl text-[#525252] max-w-2xl mx-auto">
          {{ $t('about.subtitle') }}
        </p>
      </div>
    </section>

    <section class="py-20 bg-white border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="section-title-brutal mb-6">
              {{ locale === 'ar' ? 'قصتنا' : 'OUR' }} <span class="text-[#ff5c00]">{{ locale === 'ar' ? '' : 'STORY' }}</span>
            </h2>
            <div class="space-y-4 text-[#525252] leading-relaxed text-lg">
              <p>
                <strong class="text-[#1a1a1a]">{{ $t('about.storyIntro') }}</strong>
              </p>
              <p>
                {{ $t('about.storyBody') }}
              </p>
              <p>
                {{ $t('about.mission') }}
              </p>
            </div>
          </div>
          <div>
            <div class="story-image-brutal">
              <div class="story-image-placeholder">
                <span class="text-6xl">👕</span>
                <p class="mt-4 font-bold">{{ locale === 'ar' ? 'جودة عالية' : 'PREMIUM QUALITY' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-[#fffef0]">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="section-title-brutal">
            {{ $t('about.values') }}
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div class="value-card-brutal value-card-1">
            <span class="value-icon">🛡️</span>
            <h3 class="value-title-brutal">{{ $t('about.qualityFirst') }}</h3>
            <p class="text-[#525252]">
              {{ $t('about.qualityDesc') }}
            </p>
          </div>

          <div class="value-card-brutal value-card-2">
            <span class="value-icon">⭐</span>
            <h3 class="value-title-brutal">{{ $t('about.uniqueDesigns') }}</h3>
            <p class="text-[#525252]">
              {{ $t('about.uniqueDesc') }}
            </p>
          </div>

          <div class="value-card-brutal value-card-3">
            <span class="value-icon">🤝</span>
            <h3 class="value-title-brutal">{{ $t('about.community') }}</h3>
            <p class="text-[#525252]">
              {{ $t('about.communityDesc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 bg-[#facc15] border-y-3 border-[#1a1a1a]">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="stat-brutal">
            <span class="stat-number">500+</span>
            <span class="stat-label">{{ $t('about.happyCustomers') }}</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">50+</span>
            <span class="stat-label">{{ $t('about.products') }}</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">48</span>
            <span class="stat-label">{{ $t('about.wilayasCovered') }}</span>
          </div>
          <div class="stat-brutal">
            <span class="stat-number">100%</span>
            <span class="stat-label">{{ $t('about.satisfaction') }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="container-custom text-center">
        <h2 class="section-title-brutal mb-6">
          {{ $t('about.joinMovement') }}
        </h2>
        <p class="text-xl text-[#525252] mb-8 max-w-2xl mx-auto">
          {{ $t('about.exploreCollection') }}
        </p>
        <NuxtLink to="/shop" class="btn btn-primary text-lg px-10 py-4">
          {{ $t('home.shopNow') }} →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n()

useSeoMeta({
  title: () => `${t('about.title')} - VIBE`,
  description: () => t('about.subtitle'),
})
</script>

<style scoped>
.hero-about-brutal {
  @apply py-24;
  background: #fffef0;
  border-bottom: 3px solid #1a1a1a;
}

.sticker-brutal-large {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #facc15;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  transform: rotate(-1deg);
}

.hero-title-about {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 4rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .hero-title-about {
    font-size: 5rem;
  }
}

.section-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 2.5rem;
  color: #1a1a1a;
}

.story-image-brutal {
  @apply aspect-square;
  background: #fef6e0;
  border: 3px solid #1a1a1a;
  box-shadow: 8px 8px 0px #1a1a1a;
}

.story-image-placeholder {
  @apply w-full h-full flex flex-col items-center justify-center;
  font-family: 'Space Mono', monospace;
  color: #1a1a1a;
}

.value-card-brutal {
  @apply p-8 text-center;
  border: 3px solid #1a1a1a;
  box-shadow: 4px 4px 0px #1a1a1a;
  transition: all 0.15s ease;
}

.value-card-brutal:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #1a1a1a;
}

.value-card-1 { background: #fff7ed; }
.value-card-2 { background: #f5f3ff; }
.value-card-3 { background: #ecfdf5; }

.value-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.value-title-brutal {
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 1.125rem;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.stat-brutal {
  @apply text-center;
}

.stat-number {
  display: block;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 3rem;
  color: #1a1a1a;
}

.stat-label {
  display: block;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  color: #1a1a1a;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.border-y-3 {
  border-top-width: 3px;
  border-bottom-width: 3px;
}
</style>
