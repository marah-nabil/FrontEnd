<template>
  <div class="profile-layout">
    <AppHeader v-if="beneficiary" :beneficiary="beneficiary" />

    <main class="page-content">
      <router-view :beneficiary="beneficiary" />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

import AppHeader from '../components/profile/AppHeader.vue'
import AppFooter from '../components/profile/AppFooter.vue'

const router = useRouter()
const beneficiary = ref(null)

onMounted( async() =>{
  const token = localStorage.getItem('accessToken')
  const beneificiaryId = localStorage.getItem('beneficiaryId')

  if (!token || !beneificiaryId) return

  try{
     const response = await api.get(`/beneficiaries/profile/${beneificiaryId}`, {
      headers: {
        'X-Access-Token': token,
      },
    })
    beneficiary.value = response.data
  }catch(error){
    console.error(error)
  }
})
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
