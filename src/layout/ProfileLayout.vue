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
  display: flex;
  flex-direction: column;
}

.page-content {
  padding-top: 70px;
  min-height: calc(100vh - 140px);
  flex: 1;
}
</style>
