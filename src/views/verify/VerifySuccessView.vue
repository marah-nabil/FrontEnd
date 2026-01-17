<template>
  <div class="success-view">
    <div class="icon">✓</div>

    <h2>تم التحقق بنجاح!</h2>
    <!--<p class="description">شكراً لتأكيد معلوماتك. يمكنك الآن الاستمرار في استخدام خدماتنا</p>
-->
    <button class="btn-primary">دخول</button>
  </div>
</template>

<script setup lang="ts">
// No specific script logic needed for this component
</script>

<style scoped>
.form {
  max-width: 420px;
}

.field {
  margin-bottom: 20px;
}

.btn-primary {
  background: #cfa24d;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  margin-right: 620px;
  cursor: pointer;
}

.success-view {
  text-align: center;
  max-width: 420px;
}
.success-view h2 {
  font-size: 20px;
  margin-bottom: 10px;
  margin-right: 250px;
  color: #333;
}
.icon {
  width: 55px;
  height: 55px;
  margin: 0 auto 10px;
  margin-right: 310px;
  border-radius: 50%;
  background-color: #4caf50;
  font-size: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description {
  font-size: 14px;
  margin-bottom: 25px;
  margin-right: 180px;
  color: #666;
}
</style>
