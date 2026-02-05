<template>
  <div
  class="modal-overlay"
  @click.self="emit('close')"
>
  <div class="modal-card" @click.stop>

      <div class="modal-header">
        <h3 class="modal-title">
          {{ mode === 'add'
            ? 'إضافة فرد جديد للأسرة'
            : 'تعديل بيانات فرد من العائلة'
          }}
        </h3>
        <button class="close-btn" @click="emit('close')">✕</button>

      </div>

      <form class="form-grid" @submit.prevent="submit">
        <div>
          <label class="required">نوع العلاقة </label>
          <select v-model="form.relation">
            <option>ابن</option>
            <option>ابنة</option>
            <option>زوجة</option>
          </select>
        </div>

         <div>
          <label class="required">رقم الهوية </label>
          <input type="text" v-model="form.idNumber" />
        </div>

        <div>
          <label class="required">الاسم </label>
          <input type="text" v-model="form.firstName"/>
        </div>

        <div>
          <label class="required">اسم الأب </label>
          <input type="text" v-model="form.fatherName"/>
        </div>

        <div>
          <label class="required">اسم الجد </label>
          <input type="text" v-model="form.grandFatherName"/>
        </div>

        <div>
          <label class="required">اسم العائلة </label>
          <input type="text" v-model="form.familyName"/>
        </div>

        <div>
          <label class="required">الجنس </label>
          <select v-model="form.gender">
            <option>ذكر</option>
            <option>أنثى</option>
          </select>
        </div>

        <div>
          <label class="required">تاريخ الميلاد </label>
          <input type="date" v-model="form.birthDate"/>
        </div>

        <div class="full-disability">
          <label>هل لديه إعاقة ؟</label>
          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" name="disability" :value="false" v-model="form.hasDisability" />لا
            </label>

            <label class="radio-item">
              <input type="radio" name="disability" :value="true" v-model="form.hasDisability"/>نعم
            </label>
          </div>

        </div>
        <div class="form-group full">
          <label>ملاحظات</label>
          <textarea rows="4" v-model="form.notes"></textarea>
        </div>
      </form>

      <div class="modal-actions">
        <button
          type="button"
          class="cancel"
          @click="emit('close')"
        >
          إلغاء
        </button>
        <button type="submit" class="save" @click="submit">
          {{ mode === 'add' ? 'حفظ' : 'حفظ التعديلات' }}
        </button>
      </div>

    </div>
  </div>

</template>
<script setup lang="ts">
import { reactive, watch, /*computed */} from 'vue'

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
const props = defineProps<{
  mode: 'add' | 'edit'
  member?: FamilyMember | null
}>()

//const isModal = computed(() => props.variant !== 'page')

const emit = defineEmits(['save', 'close'])

const form = reactive({
  relation: '',
  idNumber: '',
  firstName: '',
  fatherName: '',
  grandFatherName: '',
  familyName: '',
  gender: '',
  birthDate: '',
  hasDisability: false,
  notes: ''
})
watch(
  () => props.member,
  (val) => {
    if (val) Object.assign(form, val)
  },
  { immediate: true }
)

const submit = () => {
  emit('save', { ...form, id: props.member?.id })
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  direction: rtl;
}

.modal-card {
  width: 900px;
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  max-height: 90vh;
  overflow-y: auto;
}

/* HEADER */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* FORM */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.form-grid .full {
  grid-column: span 2;
}
label {
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  margin-bottom: 6px;
}

.required::after {
  content: " *";
  color: #ef4444; /* أحمر */
  font-weight: bold;
}
input, select, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.disability {
  margin-top: 10px;
}
.full-disability {
  grid-column: 1 / -1; /* ياخذ صف كامل */
  display: flex;
  align-items: center;
  gap: 24px;
}

.full-disability label {
  font-weight: 600;
  white-space: nowrap;
}

.radio-group {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  cursor: pointer;
}

.radio-item input {
  accent-color: #2563eb; /* أزرق أنيق مثل الأونروا */
}

.form-group.full {
  grid-column: 1 / -1; /* ياخذ السطر كامل */
}
.form-group.full label {
  font-weight: 600;
}

textarea {
  width: 100%;
  resize: vertical;
}

/* ACTIONS */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.save {
  background: #0ab142;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
}

.cancel {
  background: #eee;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
}
</style>
