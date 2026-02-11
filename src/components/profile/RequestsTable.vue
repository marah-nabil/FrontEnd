<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>نوع الطلب</th>
          <th>تاريخ الطلب</th>
          <th>الحالة</th>
          <th>ملاحظات</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="requests.length === 0">
          <td colspan="4" class="empty">لا يوجد طلبات</td>
        </tr>

        <tr v-for="req in requests" :key="req.id">
          <td>{{ req.type }}</td>
          <td>{{ req.date }}</td>
          <td>
            <span class="badge" :class="req.status">
              {{ statusText(req.status) }}
            </span>
          </td>
          <td>{{ req.notes || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{ requests: any[] }>()

const statusText = (status: string) => {
  if (status === 'pending') return 'قيد المراجعة'
  if (status === 'approved') return 'مقبول'
  if (status === 'rejected') return 'مرفوض'
}
</script>

<style scoped>
.table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.table {
  width: 100%;
  border-collapse: collapse;
  direction: rtl;
}

th, td {
  padding: 14px;
  border: 1px solid #e5e7eb;
  text-align: right;
  font-size: 14px;
}

thead {
  background: #f3f4f6;
}

.empty {
  text-align: center;
  color: #6b7280;
}

/* BADGES */
.badge {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
}

.badge.pending {
  background: #f59e0b;
  color: #fff;
}

.badge.approved {
  background: #16a34a;
  color: #fff;
}

.badge.rejected {
  background: #ef4444;
  color: #fff;
}
</style>
