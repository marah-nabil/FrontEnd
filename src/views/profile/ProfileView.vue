<template>
    <div class="page-title">
       <h1> بيانات المستفيد</h1>
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
  max-width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 0 100px 50px;
  height: 250px;
  color: #ffffff;
  background: linear-gradient(135deg, #0adff3, #facc15);
  direction: rtl;
  text-align: right;
}
.page-title h1 {
  font-size: 26px;
  font-weight: 400;
  margin-right: 40px;
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

/* ================= MOBILE STYLE ================= */
@media (max-width: 768px) {

  .page-title {
    height: 200px;
    margin: -40px 0 0;
    padding: 0 50px 20px;
    font-size: 18px;
    align-items: flex-end;
  }

  .page-title h1 {
    font-size: 20px;
  }

  .page-container {
    padding: 20px 15px;
  }

  .content {
    gap: 25px;
  }

  /* خلي كل كرت ياخذ عرض كامل */
  .content > * {
    width: 100%;
  }

}
body {
  overflow-x: hidden;
}
</style>
