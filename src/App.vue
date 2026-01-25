<template>
  <div>
    <RouterView />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from './components/profile/AppFooter.vue'
</script>

<style>
.app-layout {
  min-height: 100vh;      /* 🔑 طول الشاشة */
  display: flex;
  flex-direction: column;
}
</style>
