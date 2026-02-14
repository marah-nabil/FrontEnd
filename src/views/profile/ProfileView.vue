<template>
    <div class="page-title">
        بيانات المستفيد
    </div>
  <div class="page-container">

    <div class="content" v-if="beneficiary">
        <ProfileCard :beneficiary="beneficiary" />
        <FamilyTable :family="family" />
        <InstructionsCard />
        <PackageCard />

    </div>

    <div v-else>
      <p>Loading...</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref ,onMounted } from 'vue'
import api from '../../services/api'

import ProfileCard from '../../components/profile/ProfileCard.vue'
import FamilyTable from '../../components/profile/FamilyTable.vue'
import EditProfileModal from '../../components/profile/EditProfileModal.vue'
import InstructionsCard from '../../components/profile/InstructionsCard.vue'
import PackageCard from '../../components/profile/PackageCard.vue'


const beneficiary = ref(null)
const family = ref([])

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
    family.value = response.data.familyMembers
  }catch(error){
    console.error(error)
  }
})

</script>
<style scoped>
.page-title {
  position: relative;
  max-width: 100%;
  margin: -60px auto 20px;
  padding: 0 150px;
  height: 220px;
  font-size: 22px;
  font-weight: 400;
  color: #ffffff;

  direction: rtl;
  text-align: right;

  z-index: 1000;
}
@media (max-width: 1024px) {
  .page-title {
    padding-right: 50px;
  }
}
.page-container {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #fff7cc 0%,
    /* أصفر فاتح */ #f0fdf4 50%,
    #fef2f2 100% /* أحمر فاتح جداً */
  );
  display: flex;
  justify-content: center;
  padding-top: 70px;
  padding: 40px 20px;
  direction: rtl;
  text-align: right;
}


.content {
  width: 100%;
  max-width: 1250px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
