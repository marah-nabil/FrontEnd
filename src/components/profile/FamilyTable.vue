<template>
  <div class="family-card">
    <div class="card-header">
      <h2>بيانات افراد الاسرة</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>العلاقة</th>
          <th>الاسم</th>
          <th>تاريخ الميلاد</th>
          <th>رقم الهوية</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in family" :key="m.id">
          <td data-label="العلاقة">{{ m.relation }}</td>
          <td data-label="الاسم">{{ m.fullName }}</td>
          <td data-label="تاريخ الميلاد">{{ formatDate(m.birthDate) }}</td>
          <td data-label="رقم الهوية">{{ m.nationalId }}</td>
        </tr>
        <tr v-if="family.length === 0">
            <td colspan="4" class="empty">
              لا يوجد أفراد أسرة مسجلين
            </td>
          </tr>
      </tbody>
    </table>
    <div class="card-footer">
      <button class="edit-btn" @click="router.push('/profile/family')">تعــديل الـبيـانـات</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB')
}
defineProps<{
  family: {
    id: number
    relation: string
    fullName: string
    birthDate: string | null
    nationalId: string
  }[]
}>()
</script>
<style scoped>
.card-header {
  margin-bottom: 24px;
  padding-bottom: 25px;
  border-bottom: 2px solid #2f855a; /* خط خفيف */
}

.card-header h2 {
  font-weight: bold;
  font-size: 20px;
  color: #1f2937;
  margin: 0;
}
.family-card {
  direction: rtl;
  background: white;
  border-radius: 14px;
  padding: 30px 34px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.family-card table {
  width: 100%;
  border-collapse: collapse;
}

.family-card th {
  background: #f1f5f9;
  padding: 14px 12px;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}

.family-card td {
  padding: 14px 12px;
  text-align: right;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}
.card-footer {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end; /* RTL = يمين */
}

.edit-btn {
  background: #2f855a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 36px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.edit-btn:hover {
  background-color: #276749;
}
/* ================= MOBILE TABLE ================= */
@media (max-width: 768px) {

  .family-card table,
  .family-card thead,
  .family-card tbody,
  .family-card th,
  .family-card td,
  .family-card tr {
    display: block;
    width: 100%;
  }

  .family-card thead {
    display: none; /* نخفي رأس الجدول */
  }

  .family-card tr {
    background: #f9fafb;
    margin-bottom: 16px;
    padding: 14px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,.05);
  }

  .family-card td {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border: none;
    font-size: 14px;
  }

  .family-card td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #374151;
  }

}


</style>
