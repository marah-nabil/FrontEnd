<template>
  <div class="confirm-overlay" @click.self="$emit('close')">
    <div class="confirm-card">

      <!-- ICON -->
      <div class="icon-wrapper">
        <span class="warning-icon">!</span>
      </div>

      <!-- TITLE -->
      <h3 class="title">هل أنت متأكد؟</h3>

      <!-- MESSAGE -->
      <p class="message">
        هل أنت متأكد من إرسال طلب حذف
        <strong>{{ name }}</strong>؟
      </p>

      <!-- ACTIONS -->
      <div class="actions">
        <button class="cancel" @click="$emit('close')">
          إلغاء
        </button>
        <button class="confirm" @click="$emit('confirm')">
          نعم، إرسال طلب حذف
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()

defineEmits(['confirm', 'close'])
</script>

<style scoped>
/* OVERLAY */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  direction: rtl;
}

/* CARD */
.confirm-card {
  width: 420px;
  background: #fff;
  border-radius: 14px;
  padding: 28px 24px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,.2);
}

/* ICON */
.icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.warning-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #f59e0b;
  color: #f59e0b;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* TEXT */
.title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.message {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 24px;
}

/* ACTIONS */
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.cancel {
  background: #e5e7eb;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.confirm {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.confirm:hover {
  background: #dc2626;
}
</style>
