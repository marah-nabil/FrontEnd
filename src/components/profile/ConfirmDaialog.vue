<template>
  <Teleport to="body">
    <div class="confirm-overlay" @click.self="$emit('close')">
      <div class="confirm-modal">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>

        <div class="actions">
          <button class="btn-cancel" @click="$emit('close')">
            إلغاء
          </button>
          <button class="btn-confirm" @click="$emit('confirm')">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmText?: string
}>()

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999; /* أعلى من الهيدر */
}

.confirm-modal {
  width: 360px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,.2);
}

.confirm-modal h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

.confirm-modal p {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-cancel {
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
}

.btn-confirm {
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  background: #e92304;
  color: #fff;
  cursor: pointer;
}
</style>
