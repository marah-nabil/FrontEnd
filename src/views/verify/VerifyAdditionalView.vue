<template>
  <div class="additional-view">
    <label>اسم الام</label>
    <input v-model="mother" />

    <label>تاريخ ميلاد الام </label>
    <input type="date" v-model="motherBirthDate" />

    <div class="actions">
      <button class="btn-outline" @click="$emit('prev')">السابق</button>
      <button class="btn-primary" :disabled="loading" @click="submit">{{ loading ? 'جاري التحقق...' : 'التالي' }}</button>
      <p v-if="error" style="color:red; margin-top:10px">{{ error }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import api from '../../services/api'
import { ref } from 'vue'

const emit = defineEmits(['next', 'prev', 'valid'])

const mother = ref('')
const motherBirthDate = ref('')
const loading = ref(false)
const error = ref('')

const submit = async () => {
  if (!mother.value || !motherBirthDate.value) {
    error.value = 'يرجى ملء جميع الحقول'
    return
  }

  const beneficiaryId = localStorage.getItem('beneficiaryId')
  if (!beneficiaryId) {
    error.value = 'معرف المستفيد غير موجود'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/beneficiaries/verify-mother', {
      beneficiaryId: Number(beneficiaryId),
      motherName: mother.value,
      motherBirthDate: motherBirthDate.value
    })

    localStorage.setItem('accessToken', response.data.accessToken)

    emit('next')
  } catch (err: any) {
    error.value =
      err.response?.data?.error ||
      err.response?.data ||
      'حدث خطأ أثناء التحقق'
  } finally {
    loading.value = false
  }
}

</script>

<style scoped>
.additional-view {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* LABEL */
label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
}

/* INPUT */
input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 18px;
  transition: 0.2s;
}

input:focus {
  outline: none;
  border-color: #cfa24d;
  box-shadow: 0 0 0 2px rgba(207,162,77,.15);
}

/* BUTTONS */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.btn-primary {
  background: #cfa24d;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: #b89242;
}

.btn-outline {
  background: #fff;
  border: 1px solid #ccc;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
@media (max-width: 768px) {

  .additional-view {
    padding: 0 15px;
  }

  .actions {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .btn-primary,
  .btn-outline {
    width: 100%;
  }

}

</style>
