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
        @save="/*addMemberhandleSave*/sendAddRequest"
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
import { ref } from 'vue'
import { useRequestsStore } from '../../stores/requests'

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
}

type RequestItem = {
  id: number
  type: 'add' | 'edit' | 'delete'
  title: string
  date: string
  status: 'pending'
  payload: FamilyMember
}

/* ================= STATE ================= */
const members = ref<FamilyMember[]>([
  {
    id: 1,
    relation: 'ابن',
    firstName: 'محمد',
    fatherName: 'أنس',
    grandFatherName: 'نبيل',
    familyName: 'سلامة',
    birthDate: '2022-04-24',
    idNumber: '442815338',
    gender: 'ذكر',
    hasDisability: false
  }
])

const requestsStore = useRequestsStore()

const requests = ref<RequestItem[]>([])

const showForm = ref(false)
const mode = ref<'add' | 'edit'>('add')
const selectedMember = ref<FamilyMember | null>(null)

const showDeleteConfirm = ref(false)
const memberToDelete = ref<FamilyMember | null>(null)

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

const sendAddRequest = (data: FamilyMember) => {
  requestsStore.addRequest('add' , data)
  /* requests.value.push({
    id: Date.now(),
    type: 'add',
    title: 'طلب إضافة فرد',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    payload: data
  }) */
  showForm.value = false
}

const sendEditRequest = (data: FamilyMember) => {
 requestsStore.addRequest('edit' , data)
 /*  requests.value.push({
    id: Date.now(),
    type: 'edit',
    title: 'طلب تعديل بيانات فرد',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    payload: data
  }) */
  showForm.value = false
}

const requestDelete = (member: FamilyMember) => {
  memberToDelete.value = member
  showDeleteConfirm.value = true
}

const sendDeleteRequest = () => {
  if (!memberToDelete.value) return
  requestsStore.addRequest('delete', memberToDelete.value)

 /*  requests.value.push({
    id: Date.now(),
    type: 'delete',
    title: 'طلب حذف فرد',
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    payload: memberToDelete.value
  })
 */
  showDeleteConfirm.value = false
  memberToDelete.value = null
}
</script>



<style scoped>
.family-page {
  position: relative;
  direction: rtl;
}

/* HERO */
.page-hero {
  height: 260px;
  background: linear-gradient(135deg, #0b5ed7, #18bfae);
  display: flex;
  align-items: flex-end;
  padding: 0 80px 60px;
  color: #fff;
}

.page-hero h1 {
  font-size: 24px;
  font-weight: 400;
  margin: 80px;
}

/* CONTENT */
.page-content {
  max-width: 1200px;
  margin: -100px auto 80px; /* يطلع الكارد فوق الهيرو */
  padding: 0 24px;
}

.card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
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
  transition: background 0.2s ease;
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
.add-member-btn:hover .plus {
  background: rgba(255,255,255,0.3);
}
</style>
