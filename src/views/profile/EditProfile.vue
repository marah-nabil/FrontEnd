<template>
  <div class="edit-page">
    <h1>تعديل بيانات المستفيد</h1>
    <EditProfileModal />
  </div>
</template>

<script setup lang="ts">
import EditProfileModal from '../../components/profile/EditProfileModal.vue'
</script>
<style scoped>
.edit-page {
  max-width: 100%;
  margin: auto;
  padding: 24px;
  background: linear-gradient(
    135deg,
    #fff7cc 0%,
    /* أصفر فاتح */ #f0fdf4 50%,
    #fef2f2 100% /* أحمر فاتح جداً */
  );
}

.edit-page h1{
  position: relative;          /* 🔑 هذا أهم سطر */
  max-width: 100%;
  margin: -80px auto 20px;     /* اسحبها فوق بشكل أنعم */
  padding: 0 80px;

  font-size: 22px;
  font-weight: 400;
  color: #ffffff;

  direction: rtl;
  text-align: right;

  z-index: 1000;
}
</style>
