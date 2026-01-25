<template>
  <div class="card package-card">
    <!-- Header -->
    <div class="card-header">
      <h2>الطرود المستلمة</h2>
      <span class="status-badge">مستلم</span>
    </div>

    <!-- Content -->
    <div class="package-grid">
      <div class="field">
        <span class="label">اسم الطرد</span>
        <span class="value">طرد غذائي – دورة (4)</span>
      </div>

      <div class="field">
        <span class="label">مكان الاستلام</span>
        <span class="value">مركز توزيع البريج</span>
      </div>

      <div class="field">
        <span class="label">تاريخ الاستلام</span>
        <span class="value">24 أبريل 2022</span>
      </div>

      <div class="field">
        <span class="label">توقيت الاستلام</span>
        <span class="value">10:30 صباحاً</span>
      </div>
    </div>

    <!-- Contents -->
    <div class="package-contents">
      <h4>محتويات الطرد</h4>
      <ul>
        <li>طحين</li>
        <li>سكر</li>
        <li>أرز</li>
        <li>زيت طهي</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// UI only
</script>

<style scoped>
.package-card {
  background: white;
  border-radius: 14px;
  padding: 32px 36px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

/* Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 2px solid #2f855a;
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

/* Status badge */
.status-badge {
  background-color: #e6f4ea;
  color: #2f855a;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
}

/* Grid */
.package-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 32px;
  margin-bottom: 24px;
}

.field {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.value {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

/* Contents */
.package-contents h4 {
  margin-bottom: 10px;
  font-size: 15px;
  color: #1f2937;
}

.package-contents ul {
  padding-right: 20px;
  list-style-type: disc;
}

.package-contents li {
  margin-bottom: 6px;
}

/* Responsive */
@media (max-width: 900px) {
  .package-grid {
    grid-template-columns: 1fr;
  }
}
</style>
