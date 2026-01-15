// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/turnstile',
    '@sidebase/nuxt-auth',
  ],

  auth: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/user', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        headerName: 'Authorization',
        maxAgeInSeconds: 60 * 60 * 24 * 7, // 7 days
      },
      session: {
        dataType: {
          id: 'number',
          name: 'string',
          email: 'string',
          phone: 'string | undefined',
          address: 'string | undefined',
          city: 'string | undefined',
          wilaya: 'string | undefined',
          is_admin: 'boolean',
        },
        dataResponsePointer: '/user',
      },
    },
    session: {
      enableRefreshOnWindowFocus: true,
      enableRefreshPeriodically: 5 * 60 * 1000, // 5 minutes
    },
    globalAppMiddleware: {
      isEnabled: false, // Enable manually on specific pages
    },
  },

  turnstile: {
    siteKey: '0x4AAAAAACMhbjBZTeLGMslv',
  },


  i18n: {
    locales: [
      { code: 'en', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'VIBE - Streetwear Collection',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Discover the latest streetwear trends. Premium quality clothing for the urban lifestyle.' },
        { name: 'theme-color', content: '#0f0f23' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1',
    },
  },
})


