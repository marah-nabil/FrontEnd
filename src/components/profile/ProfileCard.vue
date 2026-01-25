<template>
  <div class="profile-card">

    <div class="profile-grid">
      <p>
        <strong>الاسم :</strong>
        <span> {{ beneficiary.fullName }} </span>
      </p>
      <p>
        <strong>رقم الهوية :</strong>
        <span>{{ beneficiary.nationalId }}</span>
      </p>
      <p>
        <strong>الهاتف :</strong>
        <span>{{ beneficiary.phone }}</span>
      </p>

      <p>
        <strong>العنوان :</strong>
        <span>{{ beneficiary.address }}</span>
      </p>
      <p>
        <strong style="font-weight: bold">الحالة :</strong>
        <span class="status"> {{ beneficiary.status }} </span>
      </p>
    </div>

    <div class="card-footer">
      <button class="edit-btn" @click="$emit('edit')">تعــديل الـبيـانـات</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  beneficiary: {
    fullName: string
    nationalId: string
    phone: string
    address: string
    status: string
  }
}>()
</script>
<style scoped>
.profile-card {
  background: white;
  border-radius: 14px;
  padding: 32px 36px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}


.profile-grid {
  display: grid;
  grid-template-columns:
    140px 1fr
    140px 1fr; /* عمود لليبل + عمود للقيمة */
  row-gap: 18px;
  column-gap: 32px;
  direction: rtl;
}

.profile-grid p {
  display: contents; /* ⬅️ مهم جداً للجريد */
}

.profile-grid strong {
  font-weight: 600;
  color: #000000;
}

.profile-grid span {
  font-weight: 600;
  color: #4d5562;
}

.status {
  background-color: #e6f4ea;
  color: #2f855a;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  width: fit-content;
}
.card-footer {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end; /* RTL = يمين */
}

.edit-btn {
  background: #2f855a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 14px 36px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #276749;
}
@media (max-width: 900px) {
  .profile-grid {
    grid-template-columns: 120px 1fr;
  }
}
@media (max-width: 768px) {
  .card-footer  {
    justify-content: center;
  }
}
</style>
