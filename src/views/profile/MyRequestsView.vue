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
              <td data-label="#">{{ startIndex + index + 1 }}</td>
              <td data-label="نوع الطلب">{{ req.type }}</td>
              <td data-label="تاريخ الطلب">{{ req.date }}</td>
              <td data-label="الحالة">
                <span
                  class="status"
                  :class="req.status"
                >
                  {{
                    req.status === 'Pending'
                      ? 'قيد المراجعة'
                      : req.status === 'Approved'
                      ? 'مقبول'
                      : 'مرفوض'
                  }}
                </span>
              </td>
              <td data-label="ملاحظات">{{ req.notes || '-' }}</td>
              <td data-label="الإجراء">
                <button
                  class="action-btn view"
                  @click="openModal(req)"
                >
                  عرض
                </button>

                <button
                  v-if="req.status === 'Pending'"
                  class="action-btn cancel"
                  @click="cancelRequest(req)"
                >
                  إلغاء
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="selectedRequest" class="modal-overlay">

        <div class="modal">

          <div class="modal-header">
            <h3>تفاصيل الطلب</h3>
            <button class="close-btn" @click="selectedRequest = null">✕</button>
          </div>

          <div class="modal-body">

            <div class="info-row">
              <span>تاريخ الطلب:</span>
              <strong>{{ formatDate(selectedRequest.requestDate) }}</strong>
            </div>

            <div class="info-row">
              <span>الحالة:</span>
              <strong>{{ translateStatus(selectedRequest.currentStatus) }}</strong>
            </div>

            <div
              v-if="selectedRequest.rejectionReason"
              class="info-row rejection"
            >
              <span>سبب الرفض:</span>
              <strong>{{ selectedRequest.rejectionReason }}</strong>
            </div>

            <hr />

            <h4>البيانات الجديدة المطلوبة</h4>

            <div
              v-for="(value, key) in parsedChanges"
              :key="key"
              class="change-row"
            >
              <div class="field-name">{{ key }}</div>

              <div class="values">
                <span class="old">
                  {{ profileData[key] || '-' }}
                </span>

                <span class="arrow">→</span>

                <span class="new">
                  {{ value || '-' }}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

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
import { ref, computed ,onMounted} from 'vue'
import api from '../../services/api'

const requests = ref([])

const page = ref(1)
const pageSize = ref(10)

const selectedRequest = ref(null)
const profileData = ref({})

onMounted(async () => {
  try {
    const token = localStorage.getItem('accessToken')

    const res = await api.get(`/beneficiaries/requests`, {
      headers: {
        'X-Access-Token': token,
      },
    })
    const familyRes = await api.get(
      '/beneficiaries/family-member-update-requests',
      {
        headers: {
          'X-Access-Token': token
        }
      }
    )


    const beneficiaryRequests = res.data.map(r => ({
      id: r.id,
      type: r.requestType === 'Update' ? 'طلب تعديل بيانات' : 'طلب تعديل بيانات',
      requestDate: r.date,
      currentStatus: r.status,
      requestedChanges: r.requestedChanges,
      date: new Date(r.date).toLocaleDateString(),
      status: r.status, // لأنه أنتِ أصلاً مرجّعة string من الباك
      notes: r.notes
    }))

    const familyRequests = familyRes.data.map(r => ({
      id: r.id,
      type:
        r.requestType === 'Add'
        ? 'طلب إضافة فرد أسرة'
        : r.requestType === 'Delete'
        ? 'طلب حذف فرد أسرة'
        : 'طلب تعديل فرد أسرة',
        requestDate: r.requestDate,
        currentStatus: r.status,
        requestedChanges: r.requestedChanges,
      date: new Date(r.date).toLocaleDateString(),
        status:
          r.status === 0
            ? 'Pending'
            : r.status === 1
            ? 'Approved'
            : 'Rejected',
      notes: r.rejectionReason || ''
    }))

    requests.value = [
      ...beneficiaryRequests,
      ...familyRequests
    ]
  } catch (error) {
    console.error(error)
  }
})

function openModal(req) {
  selectedRequest.value = req
}
const parsedChanges = computed(() => {
  if (!selectedRequest.value.requestedChanges) return {}

  try {
    return JSON.parse(selectedRequest.value.requestedChanges)
  } catch {
    return {}
  }
})

function translateStatus(status) {
  if (status === 0) return 'قيد المراجعة'
  if (status === 1) return 'مقبول'
  if (status === 2) return 'مرفوض'
  return '-'
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB')
}

async function cancelRequest(req) {
  const token = localStorage.getItem('accessToken')
    if(req.type === 'طلب تعديل بيانات') {
      await api.delete(`/beneficiaries/requests/${req.id}`, {
        headers: { 'X-Access-Token': token }
      })
    } else {
      await api.delete(`/beneficiaries/family-member-update-requests/${req.id}`, {
        headers: { 'X-Access-Token': token }
      })
    }

    requests.value = requests.value.filter(r => r.id !== req.id)
}


/* FILTER */
const filteredRequests = computed(() => requests.value)

/* PAGINATION */
const startIndex = computed(() => (page.value - 1) * pageSize.value)

const endIndex = computed(() => {
  return Math.min(
    startIndex.value + pageSize.value,
    filteredRequests.value.length
  )
})

const paginatedRequests = computed(() =>
  filteredRequests.value.slice(startIndex.value, endIndex.value)
)

</script>


<style scoped>
.requests-page {
  direction: rtl;
}
.page-hero {
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

.page-hero h1 {
  font-size: 26px;
  font-weight: 400;
  margin-right: 40px;
}

.page-content {
  margin-top: 0px;       /* يطلع الكارد فوق الهيرو */
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
.action-btn {
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
}

.view {
  background: #3b82f6;
  color: white;
  font-weight: 600;
}

.cancel {
  background: #ef4444;
  color: white;
  margin-right: 6px;
  font-weight: 600;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: white;
  width: 700px;
  border-radius: 10px;
  padding: 24px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 15px 40px rgba(0,0,0,.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.rejection {
  color: #dc2626;
}

.change-row {
  margin-bottom: 12px;
  padding: 10px;
  background: #f8fafc;
  border-radius: 6px;
}

.field-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.values {
  display: flex;
  align-items: center;
  gap: 10px;
}

.old {
  color: #6b7280;
}

.new {
  color: #0b5ed7;
  font-weight: 600;
}

.arrow {
  color: #9ca3af;
}
.status {
  color: #079837;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
}
/* ================= MOBILE STYLE ================= */
@media (max-width: 768px) {

  .page-hero {
    height: 200px;
    padding: 0 30px 30px;
  }

  .page-hero h1 {
    font-size: 20px;
  }

  .card {
    padding: 16px;
  }

  /* اخفاء رأس الجدول */
  .requests-table thead {
    display: none;
  }

  .requests-table,
  .requests-table tbody,
  .requests-table tr,
  .requests-table td {
    display: block;
    width: 100%;
  }

  .requests-table tr {
    background: #fff;
    margin-bottom: 14px;
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,.06);
  }

  .requests-table td {
    text-align: right;
    padding: 8px 0;
    border: none;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .requests-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }

  /* الأزرار */
  .action-btn {
    flex: 1;
    padding: 8px 10px;
    font-size: 13px;
  }

  .requests-table td:last-child {
    gap: 8px;
  }

  /* الفوتر */
  .table-footer {
    flex-direction: column;
    gap: 10px;
    align-items: center;
    text-align: center;
  }

  .pagination {
    justify-content: center;
  }

  /* المودال */
  .modal {
    width: 95%;
    padding: 16px;
  }

  .info-row {
    flex-direction: column;
    gap: 4px;
  }

  .values {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>
