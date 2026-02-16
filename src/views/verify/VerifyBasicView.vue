<template>
  <div class="basic-view">
    <label>رقم الهوية</label>
    <input v-model="nationalId" />

    <label>تاريخ الميلاد</label>
    <input type="date" v-model="birthDate" />

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

const nationalId = ref('')
const birthDate = ref('')
const loading = ref(false)
const error = ref('')

const submit = async () => {
  if (!nationalId.value || !birthDate.value) {
    error.value = 'الرجاء ملء جميع الحقول'
    emit('valid', false)
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await api.post('/beneficiaries/verify-basic', {
      nationalId: nationalId.value,
      birthDate: new Date(birthDate.value).toISOString()
    })

   localStorage.setItem('beneficiaryId', response.data.id)
    emit('valid', true)
    emit('next')
  } catch (err: any) {
    error.value =
      err.response?.data?.error ||
      err.response?.data ||
       'حدث خطأ أثناء الاتصال بالخادم'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.basic-view {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
}

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

.basic-view h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
}

.description {
  font-size: 14px;
  margin-bottom: 25px;
  color: #666;
}
@media (max-width: 768px) {

  .basic-view {
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
