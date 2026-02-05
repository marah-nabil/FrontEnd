<template>
  <div class="family-page">

    <section class="page-hero">
      <h1>تعديل بيانات فرد من العائلة</h1>
    </section>

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
          @edit="openEditForm"
        />
      </div><!-- <FamilyMemberForm
        mode="edit"
        variant="page"
        :member="member"
        @save="saveEdit"
      /> -->
    </section>

 <!-- MODAL (Add / Edit) -->
    <FamilyMemberForm
      v-if="showForm"
      :mode="mode"
      :member="selectedMember"
      @close="showForm = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, /*onMounted */} from 'vue'
//import { useRoute, useRouter } from 'vue-router'
import FamilyMemberForm from '../../components/profile/FamilyMemberForm.vue'
import FamilyTableCard from '../../components/profile/FamilyTableCard.vue'

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

const members = ref<FamilyMember[]>([
  {
    id: 1,
    relation: 'ابن',
    idNumber: '442815338',
    firstName: 'محمد',
    fatherName: 'أنس',
    grandFatherName: 'نبيل',
    familyName: 'سلامة',
    gender: 'ذكر',
    birthDate: '2022-04-24',
    hasDisability: false,
    notes: ''
  }
])

const showForm = ref(false)
const mode = ref<'add' | 'edit'>('add')
const selectedMember = ref<FamilyMember | null>(null)

const openAddForm = () => {
  mode.value = 'add'
  selectedMember.value = null
  showForm.value = true
}

const openEditForm = (id: number) => {
  selectedMember.value = members.value.find(m => m.id === id) || null
  mode.value = 'edit'
  showForm.value = true
}

const handleSave = (data: FamilyMember) => {
  if (mode.value === 'add') {
    members.value.push({ ...data, id: Date.now() })
  } else {
    const index = members.value.findIndex(m => m.id === data.id)
    if (index !== -1) members.value[index] = data
  }
  showForm.value = false
}
/* const route = useRoute()
const router = useRouter()

const member = ref(null)

// 🧪 مؤقتًا (Mock)
onMounted(() => {
  const id = Number(route.params.id)

  // لاحقًا ستأتي من API
  member.value = {
    id,
    relation: 'ابن',
    idNumber: '442815338',
    firstName: 'محمد',
    fatherName: 'أنس',
    grandFatherName: 'نبيل',
    familyName: 'سلامة',
    gender: 'ذكر',
    birthDate: '2022-04-24',
    hasDisability: false,
    notes: '',
  }
})
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

const saveEdit = (data: FamilyMember) => {
  console.log('Edited:', data)
  router.push('/profile/family')
} */

</script>
<style scoped>
.family-page { direction: rtl; }

.page-hero {
  height: 260px;
  background: linear-gradient(135deg, #0b5ed7, #18bfae);
  display: flex;
  align-items: flex-end;
  padding: 0 80px 60px;
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-member-btn {
  background: #16a34a;
  color: #fff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
