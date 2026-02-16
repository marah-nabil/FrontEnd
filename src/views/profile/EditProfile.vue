<template>
  <div class="edit-page">
    <h1>تعديل بيانات المستفيد</h1>
  </div>
  <div class="edit-profile">
    <EditProfileModal />
  </div>
</template>

<script setup lang="ts">
import EditProfileModal from '../../components/profile/EditProfileModal.vue'
</script>
<style scoped>
.edit-page {
  height: 250px;
  background: linear-gradient(135deg, #0adff3, #facc15);
  display: flex;
  align-items: flex-end;
  padding: 0 100px 50px;
  color: #fff;
  direction: rtl;
}

.edit-page h1{
  font-size: 26px;
  font-weight: 400;
}
.edit-profile{
    min-height: 100vh;
  background: linear-gradient(
    135deg,
    #fff7cc 0%,
    /* أصفر فاتح */ #f0fdf4 50%,
    #fef2f2 100% /* أحمر فاتح جداً */
  );
  justify-content: center;
  direction: rtl;
  text-align: right;
}
/* ================= MOBILE STYLE ================= */
@media (max-width: 768px) {

  .edit-page {
    height: 200px;
    margin: -40px 0 0;
    padding: 0 50px 20px;
    font-size: 18px;
    align-items: flex-end;
  }

  .edit-page h1 {
    font-size: 20px;
  }

  .page-container {
    padding: 20px 15px;
  }

  .content {
    gap: 25px;
  }

  /* خلي كل كرت ياخذ عرض كامل */
  .content > * {
    width: 100%;
  }

}
</style>
