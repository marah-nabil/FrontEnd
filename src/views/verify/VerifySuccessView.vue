<template>
  <div class="success-view">
    <div class="icon">✓</div>

    <h2>تم التحقق بنجاح!</h2>
    <!--<p class="description">شكراً لتأكيد معلوماتك. يمكنك الآن الاستمرار في استخدام خدماتنا</p>
-->
    <button class="btn-primary" @click="goToProfile">دخول</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProfile = () => {
  router.push('/profile')
}
</script>

<style scoped>
.success-view {
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ICON */
.icon {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background-color: #4caf50;
  font-size: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

/* TITLE */
.success-view h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
}

/* BUTTON */
.btn-primary {
  background: #cfa24d;
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  background-color: #b89242;
}
@media (max-width: 768px) {

  .success-view {
    padding: 0 20px;
  }

  .btn-primary {
    width: 100%;
  }

}

</style>
