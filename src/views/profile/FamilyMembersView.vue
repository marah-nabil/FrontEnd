<template>
  <div class="family-page">

    <!-- HERO فقط -->
    <section class="page-hero">
      <h1>تعديل بيانات أفراد الأسرة</h1>
    </section>

    <!-- CONTENT (الكارد الأبيض) -->
    <section class="page-content">
      <div class="card">
        <div class="card-header">
          <h3>بيانات أفراد الأسرة</h3>

          <button class="add-member-btn" @click="openAddForm()">
            + إضافة فرد للأسرة
          </button>
        </div>

        <FamilyTableCard
          :members="members"
          @edit="goEdit"
          @delete ="requestDelete"
        />
      </div>
      </section>

     <FamilyMemberForm
        v-if="showForm"
        :mode="mode"
        :member="selectedMember"
        @close="showForm = false"
        @save="handleSave"
      />

    <ConfirmDialog
      v-if="showDeleteConfirm"
      :name="memberToDelete?.firstName + ' ' + memberToDelete?.familyName"
      message="هل أنت متأكد من إرسال طلب حذف هذا الفرد؟"
      @confirm="sendDeleteRequest"
      @close="showDeleteConfirm = false"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../../services/api'

import FamilyTableCard from '../../components/profile/FamilyTableCard.vue'
import FamilyMemberForm from '../../components/profile/FamilyMemberForm.vue'
import ConfirmDialog from '../../components/profile/ConfirmDialog.vue'

/* ================= TYPES ================= */
type FamilyMember = {
  id?: number
  relation: string
  idNumber: string
  firstName: string
  fatherName: string
  grandFatherName: string
  familyName: string
  gender: string
  birthDate: string
  hasDisability: boolean
  notes?: string
  status?: string
}

const members = ref<FamilyMember[]>([])
const showForm = ref(false)
const mode = ref<'add' | 'edit'>('add')
const selectedMember = ref<FamilyMember | null>(null)

const showDeleteConfirm = ref(false)
const memberToDelete = ref<FamilyMember | null>(null)

/* ================= LOAD DATA ================= */

onMounted(async () => {
  try {
    const token = localStorage.getItem('accessToken')

    const res = await api.get(
      '/beneficiaries/family-members',
      {
        headers: {
          'X-Access-Token': token
        }
      }
    )

    members.value = res.data

  } catch (error) {
    console.error(error)
  }
})

/* ================= ACTIONS ================= */
const openAddForm = () => {
  mode.value = 'add'
  selectedMember.value = null
  showForm.value = true
}

const goEdit = (id: number) => {
  selectedMember.value = members.value.find(m => m.id === id) || null
  mode.value = 'edit'
  showForm.value = true
}

const handleSave = (data: FamilyMember) => {
  if (mode.value === 'add') {
    sendAddRequest(data)
  } else {
    sendEditRequest(data)
  }
}

/* ================= ADD ================= */

const sendAddRequest = async (data: FamilyMember) => {

    const token = localStorage.getItem('accessToken')

    await api.post(
      '/beneficiaries/family-members/add-request',
      {
      relation: data.relation,
      idNumber: data.idNumber,
      firstName: data.firstName,
      fatherName: data.fatherName,
      grandFatherName: data.grandFatherName,
      familyName: data.familyName,
      gender: data.gender,
      birthDate: new Date(data.birthDate).toISOString(), // 🔥 مهم
      hasDisability: data.hasDisability,
      notes: data.notes
    },
      {
        headers: {
          'X-Access-Token': token
        }
      }
    )

    showForm.value = false
}

/* ================= EDIT ================= */

const sendEditRequest = async (data: FamilyMember) => {
  try {
    const token = localStorage.getItem('accessToken')

    await api.post(
      `/beneficiaries/family-members/${data.id}/update-request`,
      data,
      {
        headers: {
          'X-Access-Token': token
        }
      }
    )

    showForm.value = false

    // تحديث الحالة فورًا
    const member = members.value.find(m => m.id === data.id)
    if (member) member.status = 'Pending'

  } catch (error) {
    console.error(error)
  }
}
/* ================= DELETE ================= */

const requestDelete = (id: number) => {
  memberToDelete.value =
    members.value.find(m => m.id === id) || null
  showDeleteConfirm.value = true
}

const sendDeleteRequest = async () => {
  try {
    if (!memberToDelete.value) return

    const token = localStorage.getItem('accessToken')

    await api.post(
      `/beneficiaries/family-members/${memberToDelete.value.id}/delete-request`,
      {},
      {
        headers: {
          'X-Access-Token': token
        }
      }
    )

    const member = members.value.find(
      m => m.id === memberToDelete.value?.id
    )

    if (member) member.status = 'Pending'

    showDeleteConfirm.value = false
    memberToDelete.value = null

  } catch (error) {
    console.error(error)
  }
}
</script>



<style scoped>
.family-page {
  position: relative;
  direction: rtl;
}

/* HERO */
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

/* CONTENT */
.page-content {
  max-width: 1250px;
  margin: 0 auto -50px; /* يطلع الكارد فوق الهيرو */
  padding: 0 24px;
}

.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
  padding: 28px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.card-header h3 {
  font-size: 18px;
  font-weight: 600;
}

.add-member-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #16a34a;       /* أخضر */
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease;
}

.add-member-btn .plus {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background 0.2s ease;
}

.add-member-btn:hover {
  background: #15803d; /* أغمق */
}


@media (max-width: 768px) {

  /* HERO */
  .page-hero {
    height: 200px;
    padding: 0 24px 30px;
    align-items: flex-end;
  }

  .page-hero h1 {
    font-size: 20px;
  }

  /* CONTENT */
  .page-content {
    margin: 0 auto 40px;
    padding: 0 16px;
  }

  .card {
    padding: 18px;
  }

  /* HEADER STACK */
  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .card-header h3 {
    font-size: 16px;
  }

  /* BUTTON FULL WIDTH */
  .add-member-btn {
    width: 100%;
    justify-content: center;
    font-size: 15px;
  }

  /* جدول داخل FamilyTableCard */
  :deep(table) {
    display: block;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }

  :deep(table th),
  :deep(table td) {
    font-size: 13px;
    padding: 8px;
  }

}

</style>
