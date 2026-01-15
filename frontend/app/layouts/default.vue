<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <CartSidebar />
  </div>
</template>

<script setup lang="ts">
</script>
