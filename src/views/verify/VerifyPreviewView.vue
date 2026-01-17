<template>
  <VerifyLayout>
    <template #intro-mini>
      <!-- 🔵 صفحة الترحيب تظهر دائمًا -->
      <div class="intro-mini">
        <img src="@/assets/Logo2.jpeg" alt="Organization logo" class="logo" />
        <h2>مرحبا بك في نظام المستفيدين</h2>
        <h3>جمعية دار اليتيم الفلسطيني</h3>
        <p class="description">
          يسرنا أن نقدم لكم هذا النظام الإلكتروني الذي يهدف إلى تسهيل إدارة وتحديث بيانات
          المستفيدين، وتعزيز كفاءة الخدمات المقدمة لكم. من خلال هذا النظام، يمكنكم الوصول إلى
          معلوماتكم الشخصية بسهولة، والمساهمة في تحسين تجربة الاستفادة من الجمعية وجميع مشاريعها.
        </p>
        <!-- <p class="description">
          نشكركم على ثقتكم بنا، ونتطلع إلى خدمتكم بشكل أفضل من خلال هذا النظام المتطور.
        </p>-->
      </div>
    </template>
    <!-- 🔵 Stepper يظهر دائمًا -->
    <template #stepper v-if="currentStep > -1">
      <StepperHeader :currentStep="currentStep" />
    </template>

    <Transition :name="transitionName" mode="out-in">
      <component
        :is="currentComponent"
        :key="currentStep"
        @next="next"
        @prev="prev"
        @valid="isStepValid = $event"
      />
    </Transition>
  </VerifyLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import VerifyLayout from '../../layout/VerifyLayout.vue'
import StepperHeader from '../../components/stepper/StepperHeader.vue'

import VerifyStartView from './VerifyStartView.vue'
import VerifyBasicView from './VerifyBasicView.vue'
import VerifyAdditionalView from './VerifyAdditionalView.vue'
import VerifySuccessView from './VerifySuccessView.vue'

const currentStep = ref(0)

const maxStep = 3
const isStepValid = ref(false)
const components = [VerifyBasicView, VerifyAdditionalView, VerifySuccessView]
const currentComponent = computed(() => components[currentStep.value])

const direction = ref<'next' | 'prev'>('next')
const transitionName = computed(() => (direction.value === 'next' ? 'slide-left' : 'slide-right'))

const next = () => {
  if (!isStepValid.value && currentStep.value !== 0) return

  direction.value = 'next'

  if (currentStep.value < components.length - 1) currentStep.value++
}

const prev = () => {
  direction.value = 'prev'

  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const goToStep = (step: number) => {
  if (step <= currentStep.value) {
    currentStep.value = step
  }
}
</script>
<style scoped>
.intro-mini {
  text-align: right;
  margin-bottom: 30px;
  margin: 0px;
  padding: 0px;
}

.intro-mini img {
  height: 120px;
  margin-right: 70px;
  display: flex;
}

.intro-mini h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2a44;
  margin-left: 100px;
  margin-right: 100px;
}
.intro-mini h3 {
  font-size: 20px;
  font-weight: 400;
  color: #1f2a44;
  margin-bottom: 20px;
  margin-left: 100px;
  margin-right: 100px;
}
.intro-mini p {
  font-size: 15px;
  color: #444;
  line-height: 1.9;
  max-width: 720px;
  margin-left: 100px;
  margin-right: 100px;
}

.stepper {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin: 35px 0 45px;
}

.stepper-item {
  text-align: center;
  position: relative;
  min-width: 120px;
}

.stepper-item .number {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #eef1f4;
  color: #6b7280;
  font-weight: 700;
  line-height: 42px;
  margin: 0 auto 8px;
}

.stepper-item.active .number {
  background: #6fdad5;
  color: #fff;
}

.stepper-item.done .number {
  background: #cfeeea;
  color: #2f8f89;
}

.stepper-item .title {
  font-size: 14px;
  color: #6b7280;
}

.stepper-item.active .title {
  color: #1f2a44;
  font-weight: 600;
}

/* الخط بين الخطوات */
.stepper-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 21px;
  left: -60px;
  width: 60px;
  height: 2px;
  background: #e5e7eb;
}

/* ===== الانتقال للأمام ===== */
.slide-forward-enter-active,
.slide-forward-leave-active {
  transition: all 0.35s ease;
}

.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* ===== الانتقال للخلف ===== */
.slide-backward-enter-active,
.slide-backward-leave-active {
  transition: all 0.35s ease;
}

.slide-backward-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

.slide-backward-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.form {
  max-width: 420px;
  margin: 0 auto;
}

.field {
  margin-bottom: 22px;
  margin-left: 100px;
  margin-right: 100px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 14px;
  color: #1f2a44;
  font-weight: 600;
}

.field input {
  width: 100%;
  padding: 14px 16px;
  margin-left: 100px;
  margin-right: 100px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-size: 14px;
}

.field input:focus {
  outline: none;
  border-color: #6fdad5;
  background: #fff;
}
</style>
