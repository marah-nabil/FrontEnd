<template>
  <div class="family-page">

    <!-- HERO -->
    <section class="page-hero">
      <h1>طلباتي</h1>
    </section>

    <!-- CONTENT -->
    <section class="page-content">
      <div class="card">
        <h3 class="card-title">طلبات المستفيد</h3>

        <RequestsTable :requests="requests" />
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref , onMounted} from 'vue'
import api from '../../services/api'
import RequestsTable from '../../components/profile/RequestsTable.vue'

const requests = ref([])
onMounted( async() =>{
  try{
    const token = localStorage.getItem('accessToken')

    const res = await api.get(`/beneficiaries/requests`, {
      headers: {
        'X-Access-Token': token,
      },

    })

    requests.value = res.data.map(r => ({
      id: r.id,
      type: 'طلب تعديل بيانات',
      date: r.requestDate,
        status: r.status,
        /*   .currentStatus === 0
            ? 'Pending'
            : r.currentStatus === 1
            ? 'Approved'
            : 'Rejected', */
      notes: r.description || ''
    }))
  }catch(error){
    console.error(error)
  }
})

</script>

<style scoped>
.page-hero {
  height: 240px;
  background: linear-gradient(135deg, #0b5ed7, #18bfae);
  display: flex;
  align-items: flex-end;
  padding: 0 80px 50px;
  color: #fff;
}

.page-content {
  max-width: 1200px;
  margin: -100px auto 80px;
  padding: 0 24px;
}

.card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
}

.card-title {
  margin-bottom: 16px;
  font-weight: 600;
}
</style>
