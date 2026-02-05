<template>
  <div class="profile-layout">
    <AppHeader :beneficiary="beneficiary" />

    <main class="page-content">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/profile/AppHeader.vue'
import AppFooter from '../components/profile/AppFooter.vue'

const beneficiary = {
  fullName: 'محمد أحمد يوسف',
}
</script>

<style scoped>
.profile-layout {
  min-height: 100vh;
}

.page-content {
  padding-top: 70px;
  min-height: calc(100vh - 140px);
}
</style>
