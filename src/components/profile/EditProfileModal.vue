<template>
  <div class="modal-overlay">
    <div class="modal-card">
      <!-- Header -->
      <div class="modal-header">
        <h3>تعديل بيانات المستفيد</h3>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <div class="form-group">
          <label>رقم الهاتف</label>
          <input type="text" v-model="form.phone" />
        </div>

        <div class="form-group">
          <label>العنوان</label>
          <input type="text" v-model="form.address" />
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="btn-cancel" @click="$emit('close')">إلغاء</button>
        <button class="btn-save" @click="save">حفظ التعديلات</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Beneficiary } from '../../mock/beneficiary'

const props = defineProps<{ beneficiary: Beneficiary }>()
const emit = defineEmits(['close', 'save'])

const form = reactive({
  phone: props.beneficiary.phone,
  address: props.beneficiary.address,
})

const save = () => {
  emit('save', form)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: #ffffff;
  width: 720px;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  animation: fadeIn 0.25s ease;
}

/* Header */
.modal-header {
  background-color: #f3f6f9;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 16px;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background-color: #f0fdf4;
  color: #2f855a;
  border: 1px solid #2f855a;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

/* Body */
.modal-body {
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-group label {
  font-size: 13px;
  margin-bottom: 6px;
  color: #374151;
}

.form-group input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #2563eb;
}

/* Footer */
.modal-footer {
  padding: 14px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-top: 1px solid #e5e7eb;
}

.btn-cancel {
  background-color: #f0fdf4;
  color: #2f855a;
  border: 1px solid #2f855a;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.btn-save {
  background-color: #2f855a;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-save:hover {
  background-color: #276749;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<!--
<template>
  <div class="editmodal">
    <div class="whiteview">
      <h2></h2>

      <input v-model="form.phone" placeholder="رقم الهاتف" />
      <input v-model="form.phone" placeholder="العنوان" />

      <div class="btns">
        <button @click="$emit('close')" class="close">إلغاء</button>
        <button @click="$emit('saved')" class="save">حفظ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '../../services/api'

const props = defineProps({ beneficiary: Object })
const emit = defineEmits(['close', 'saved'])

const form = reactive({
  phone: props.beneficiary.phone,
  address: props.beneficiary.address,
})

const save = async () => {
  await api.put(`/beneficaries/${props.beneficiary.id}`, form)
  emit('saved')
}
</script>
-->
