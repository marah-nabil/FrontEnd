<template>
  <div class="stepper">
    <StepperItem
      v-for="step in steps"
      :key="step.id"
      :number="step.id"
      :title="step.title"
      :state="getState(step.id)"
      :disabled="step.id - 1 > maxReachedStep"
      @select="goTo"
    />
  </div>
</template>
<script setup lang="ts">
import StepperItem from './StepperItem.vue'

const props = defineProps<{
  currentStep: number
  maxReachedStep: number
}>()

const steps = [
  { id: 1, title: 'المعلومات الأساسية' },
  { id: 2, title: 'المعلومات الإضافية' },
  { id: 3, title: 'تأكيد التحقق' },
]
const getState = (stepId: number) => {
  if (props.currentStep + 1 > stepId) return 'done'
  if (props.currentStep + 1 === stepId) return 'active'
  return 'upcoming'
}
const emit = defineEmits(['select'])

const goTo = (stepIndex: number) => {
  emit('select', stepIndex)
}

// No specific script logic needed for this component
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: flex-start; /* ❌ لا يكون بالمنتصف */
  align-items: center;

  /* 👇 هذا هو المهم */
  margin-right: 0;
  margin-left: auto;

  width: 65%; /* نفس عرض الجهة اليمنى */
  padding-right: 90px; /* محاذاة مع الفورم */
  margin-top: 20px;
}
</style>
