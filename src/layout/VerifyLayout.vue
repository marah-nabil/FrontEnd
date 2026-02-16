<template>
  <div class="verify-layout" dir="rtl">
    <!-- Right side (dynamic content) -->
    <div class="right-panel">
      <slot name="intro-mini" />

      <div class="stepper-section">
        <slot name="stepper" />
        <div class="content-wrapper">
          <slot />
        </div>
      </div>
    </div>

    <!-- Left side (static content) -->
    <div class="left-panel">
      <div class="branding">
        <h1>تصـــفــح اكـتـشــف الأن وحدث بياناتــك بكل يسر وأمان</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No specific script logic needed for this layout component
</script>

<style scoped>
.verify-layout {
  display: flex;
  min-height: 100vh;
  background: #fff;
}

/* ===== Left panel ===== */
.left-panel {
  width: 35%; /* 👈 لا تخليها 50 أو flex:1 */
  background-image: url('@/assets/back2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  color: #fff;
  padding: 80px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left-panel h1 {
  font-size: 58px;

  line-height: 1.4;
  font-weight: 700;
}
/* ===== Right panel ===== */
.right-panel {
  width: 65%;
  background-color: white;
  padding: 20px 40px;
  box-sizing: border-box;
  overflow-y: auto;
}
/* الانرو */
.intro-mini {
  margin-bottom: 20px;
}

/* الستيبر */
.stepper-wrapper {
  margin: 10px 0 40px;
}

/* الفورم */
.content-wrapper {
  flex: 1;
}

  /* ================= MOBILE ================= */
@media (max-width: 992px) {

  .verify-layout {
    flex-direction: column;   /* بدل صف -> عمودي */
  }

  .left-panel {
    width: 100%;
    height: 260px;           /* ارتفاع ثابت للبنر */
    padding: 40px 20px;
    order: -1;               /* 👈 يخليها بالأعلى */
    text-align: center;
  }

  .left-panel h1 {
    font-size: 24px;
    line-height: 1.5;
  }

  .right-panel {
    width: 100%;
    padding: 20px;
  }

}

</style>
