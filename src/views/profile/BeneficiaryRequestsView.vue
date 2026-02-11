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
import { ref } from 'vue'
import RequestsTable from '../../components/profile/RequestsTable.vue'

const requests = ref([
  {
    id: 1,
    type: 'طلب إضافة فرد',
    date: '2026-01-18',
    status: 'pending',
    notes: ''
  },
  {
    id: 2,
    type: 'طلب تعديل بيانات',
    date: '2026-01-15',
    status: 'approved',
    notes: 'تمت الموافقة'
  },
  {
    id: 3,
    type: 'طلب حذف فرد',
    date: '2026-01-10',
    status: 'rejected',
    notes: 'الطلب غير مستوفي الشروط'
  }
])
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
