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
.form {
  max-width: 420px;
}

.field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  margin-left: 100px;
  margin-right: 100px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #cfa24d;
}
.btn-primary {
  background: #cfa24d;
  color: #fff;
  border: none;
  padding: 12px 24px;
  margin-left: 0px;
  margin-right: 140px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}
.btn-outline {
  background: #fff;
  border: 1px solid #ccc;
  padding: 12px 26px;
  border-radius: 8px;
  margin-left: 20px;
  margin-right: 100px;
  font-size: 14px;
  cursor: pointer;
}
.basic-view {
  max-width: 420px;
}
.basic-view h2 {
  font-size: 26px;
  margin-bottom: 10px;
  color: #333;
}
.description {
  font-size: 14px;
  margin-bottom: 25px;
  color: #666;
}
.actions {
  margin-top: 20px;
}
.btn-primary:hover {
  background-color: #b89242;
}
</style>
