<template>
<div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>العلاقة</th>
          <th>الاسم</th>
          <th>تاريخ الميلاد</th>
          <th>رقم الهوية</th>
          <th>الحالة</th>

          <th class="actions">الإجراء</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in members" :key="member.id">
          <td>{{ member.relation }}</td>
          <td>{{ member.firstName }} {{member.fatherName}}  {{member.grandFatherName }} {{ member.familyName}}</td>
          <td>{{ member.birthDate }}</td>
          <td>{{ member.idNumber }}</td>
          <td>
            <span
              class="badge"
              :class="member.status || 'pending'"
            >
              {{ member.status === 'registered' ? 'مسجل' : member.status === 'delete_requested'
                  ? 'طلب حذف'
                  : 'غير مسجل'
               }}
            </span>
          </td>

          <td class="actions">
            <button class="edit"
              :disabled="member.status === 'delete_requested'"
            @click="emit('edit', member.id)"><i class="icon edit-icon"></i>طلب تعديل</button>
            <button
              class="delete"
              :disabled="member.status === 'registered'"
              @click="emit('delete', member.id)"
            ><i class="icon delete-icon"></i>
            طلب حذف</button>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>
<script setup lang="ts">
defineProps<{
  members: any[]
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

</script>



<style scoped>
.table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 14px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  direction: rtl;
}

/* HEADER */
.table thead {
  background: #f8fafc;
  padding: 18px 14px;
}
.table th,
.table td {
  text-align: right;
  direction: rtl;
}

.table th {
  background: #eef1f5;
  font-weight: 600;
  color: #374151;
  border: 1px solid #e5e7eb;
  padding: 14px 14px;
}

/* BODY */
.table td {
  padding: 14px;
  text-align: right;
  border: 1px solid #e5e7eb;
}

.table tbody tr:hover {
  background: #f9fafb;
}

/* BADGE (الحالة) */
.badge {
  background: #0ab142;
  color: #fff;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
}
.badge.delete_requested{
  background: #f59e0b;
}
/* ACTIONS */
.actions {
  white-space: nowrap;
}
.badge.registered {
  background: #0ab142;
}

.badge.pending {
  background: #f59e0b;
}

.badge.rejected {
  background: #ef4444;
}

.actions button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  margin-left: 6px;
}

/* EDIT */
.actions .edit {
  background: #5b8cff;
  color: #fff;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.actions .edit:hover {
  background: #4a7dff;
}

/* DELETE */
.actions .delete {
  background: #ef4444;
  color: #fff;
}

.actions .delete:hover {
  background: #dc2626;
}

/* ICONS */
.edit-icon::before {
  content: "✎";
  font-size: 14px;
}

.delete-icon::before {
  content: "🗑";
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.table th:nth-child(1),
.table td:nth-child(1) {
  width: 10%;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 20%;
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 15%;
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 15%;
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 10%;
}

.table th:nth-child(6),
.table td:nth-child(6) {
  width: 20%;
}
.badge.registered {
  background: #0ab142;
}

.badge.pending {
  background: #f59e0b;
}

.badge.rejected {
  background: #ef4444;
}
.actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>
