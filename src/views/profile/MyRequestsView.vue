<template>
  <div class="requests-page">

    <!-- HERO -->
    <section class="page-hero">
      <h1>طلباتي</h1>
    </section>

    <!-- CONTENT -->
    <section class="page-content">
      <div class="container">
        <div class="card">

        <!-- TOP CONTROLS -->
        <div class="table-controls">
          <div class="left">
            Show
            <select v-model="pageSize">
              <option :value="10">10</option>
              <option :value="25">25</option>
              <option :value="50">50</option>
            </select>
            entries
          </div>
            <div class="right">
              <!-- فاضي الآن، بس موجود للاتزان -->
            </div>
        </div>

        <!-- TABLE -->
        <table class="requests-table">
          <thead>
            <tr>
              <th>#</th>
              <th>نوع الطلب</th>
              <th>تاريخ الطلب</th>
              <th>الحالة</th>
              <th>ملاحظات</th>
              <th>الإجراء</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="filteredRequests.length === 0">
              <td colspan="6" class="empty">
                لا يوجد طلبات
              </td>
            </tr>

            <tr
              v-for="(req, index) in paginatedRequests"
              :key="req.id"
            >
              <td>{{ startIndex + index + 1 }}</td>
              <td>{{ req.title }}</td>
              <td>{{ req.date }}</td>
              <td>
                <span
                  class="status"
                  :class="req.status"
                >
                  {{
                    req.status === 'pending'
                      ? 'قيد المراجعة'
                      : req.status === 'approved'
                      ? 'مقبول'
                      : 'مرفوض'
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- FOOTER -->
        <div class="table-footer">
         <div>
          Showing
          {{ filteredRequests.length === 0 ? 0 : startIndex + 1 }}
          to
          {{ endIndex }}
          of {{ filteredRequests.length }} entries
        </div>

        <div class="pagination">
          <button
            class="page-btn"
            :disabled="page === 1"
            @click="page--"
          >
            ‹
          </button>

          <button
            class="page-btn"
            :disabled="endIndex >= filteredRequests.length"
            @click="page++"
          >
            ›
          </button>
        </div>

        </div>

        </div>
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRequestsStore } from '../../stores/requests'
import { storeToRefs } from 'pinia'

const store = useRequestsStore()
const { requests } = storeToRefs(store)

const search = ref('')
const page = ref(1)
const pageSize = ref(10)

/* FILTER */
const filteredRequests = computed(() => {
  return requests.value.filter(r =>
    r.title.includes(search.value)
  )
})

/* PAGINATION */
const startIndex = computed(() => {
  return (page.value - 1) * pageSize.value
})

const endIndex = computed(() => {
  return Math.min(
    startIndex.value + pageSize.value,
    filteredRequests.value.length
  )
})

const paginatedRequests = computed(() => {
  return filteredRequests.value.slice(
    startIndex.value,
    endIndex.value
  )
})

</script>


<style scoped>
.requests-page {
  direction: rtl;
}
.page-hero {
  height: 260px;
  background: linear-gradient(135deg, #facc15, #f97316);
  display: flex;
  align-items: flex-end;
  padding: 0 210px 150px;
  color: #fff;
}

.page-hero h1 {
  font-size: 26px;
  font-weight: 500;
}

.page-content {
  margin-top: -120px;       /* يطلع الكارد فوق الهيرو */
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;        /* نفس UNRWA */
  margin: 0 auto;           /* يوسّط */
  padding: 0 24px;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
}

/* CONTROLS */
.table-controls {
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
}

.table-controls select,
.table-controls input {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  margin: 0 6px;
}
.table-controls .left{
  direction: ltr;
  text-align: left;
  margin-left: auto;
}
/* TABLE */
.requests-table {
  width: 100%;
  border-collapse: collapse;
}

.requests-table th {
  background: #f8fafc;
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.requests-table td {
  padding: 14px;
  border-bottom: 1px solid #f1f5f9;
  text-align: center;
}

.requests-table tbody tr:hover {
  background: #f9fafb;
}

/* STATUS */
.status {
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 13px;
}

.status.pending {
  background: #f59e0b;
  color: #fff;
}

/* FOOTER */
.table-footer {
  direction: ltr;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 14px;
}

.pagination {
  display: flex;
  gap: 6px;
}

.page-btn {
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background: #f3f4f6;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: #f9fafb;
}


.empty {
  padding: 32px;
  color: #6b7280;
}

</style>
