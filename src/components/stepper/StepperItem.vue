<template>
  <div class="stepper-item" :class="[state, { disabled }]" @click="handleClick">
    <div class="line" v-if="number !== 1"></div>
    <div class="number">{{ number }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  number: number
  title: string
  state?: 'active' | 'done' | 'upcoming'
  disabled: boolean
}>()
const emit = defineEmits(['select'])
const handleClick = () => {
  if (!props.disabled) {
    emit('select', props.number - 1)
  }
}
</script>
<style scoped>
.stepper-item {
  text-align: center;
  flex: 1;
  position: relative;
  transition: all 0.3s ease;
}
.line {
  position: absolute;
  top: 18px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 0;
  overflow: hidden;
}

/* خط متحرك */
.line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #cfa24d;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

/* لما تكون الخطوة منجزة */
.stepper-item.done .line::after {
  transform: scaleX(1);
}

.stepper-item.disabled {
  pointer-events: none;
  opacity: 0.4;
  cursor: not-allowed;
}

.number {
  position: relative;
  z-index: 1;
  width: 36px;
  height: 36px;
  margin: 0 auto 8px;
  border-radius: 50%;
  background: #e5e5e5;
  color: #666;
  line-height: 36px;
  font-weight: bold;
  transition: all 0.3s ease;
}
.title {
  font-size: 13px;
  color: #999;
  transition: color 0.3s ease;
}
/* ========== Pulse effect للخطوة الحالية ========== */
.stepper-item.active .number::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: rgba(207, 162, 77, 0.35);
  animation: pulse 1.6s ease-out infinite;
  z-index: -1;
}
.stepper-item.active .number {
  background: #cfa24d;
  color: white;
  transform: scale(1.1);
}
.stepper-item.active .title {
  color: #000;
}
.stepper-item.done .number {
  background-color: #4caf50;
  color: white;
}
.stepper-item.done .title {
  color: #4caf50;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}
</style>
