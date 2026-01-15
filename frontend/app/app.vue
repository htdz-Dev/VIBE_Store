<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value,
    dir: locale.value === 'ar' ? 'rtl' : 'ltr',
  },
})

watch(locale, (newLocale) => {
  document.documentElement.lang = newLocale
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
})
</script>
