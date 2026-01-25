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
          <td>{{ m.relation }}</td>
          <td>{{ m.fullName }}</td>
          <td>{{ m.birthDate }}</td>
          <td>{{ m.nationalId }}</td>
        </tr>
      </tbody>
    </table>
    <div class="card-footer">
      <button class="edit-btn" @click="$emit('edit')">تعــديل الـبيـانـات</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  family: {
    id: number
    relation: string
    fullName: string
    birthDate: string
    nationalId: number
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
@media (max-width: 768px) {
  .family-grid {
    grid-template-columns: 120px 1fr;
  }
  .card-footer  {
    justify-content: center;
  }
}

</style>
