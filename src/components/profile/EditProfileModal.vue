<template>
<div class="page-wrapper">
  <div class="info-summary-card">

    <!-- كارد المعلومات الأساسية -->
    <div class="info-grid">
      <div class="info-block">
          <p class="name">mohamed</p>
          <p class="id">803873926</p>
          <span class="badge">مسجل</span>
      </div>
        <div class="info-block center">
          <div class="item">
            <label>تاريخ التسجيل في الجمعية</label>
            <p>08 سبتمبر 2024</p>
         </div>

          <div class="item">
            <label>السكن</label>
            <p>البريج</p>
          </div>
        </div>

      </div>
    </div>

    <!-- كارد الفورم -->
    <div class="form-card">

      <div class="form-grid">
        <div class="form-field">
          <label>رقم الموبايل *</label>
          <input type="text" />
        </div>

        <div class="form-field">
          <label>المحافظة *</label>
          <input type="text" />
        </div>

        <div class="form-field">
          <label>المنطقة *</label>
          <input type="text" />
        </div>

        <div class="form-field">
          <label>الحي *</label>
          <input type="text" />
        </div>

        <div class="form-field">
          <label>السكن *</label>
          <input type="text" />
        </div>

        <div class="form-field">
          <label>أقرب جمعية *</label>
          <select>
            <option>اختر أقرب جمعية</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button class="submit">طلب التعديل</button>
        <button class="cancel">إلغاء</button>
      </div>
    </div>
</div>
</template>
<style scoped>
.page-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 140px 24px 60px;
}

.info-summary-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px 32px;
  transform: translateY(-60px);
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  direction: rtl;
}
.form-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
}
.info-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  align-items: center;
  gap: 24px;
}
.info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.info-block:first-child {
  align-items: flex-start;
}

.info-block.center {
  text-align: center;
}
.item p {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

.info-block label {
  font-size: 13px;
  color: #6b7280;
}
.name {
  font-size: 16px;
  font-weight: 700;
  color: #2563eb;
}
.id {
  font-size: 14px;
  color: #2563eb;
  font-weight: 500;
}

.badge {
  margin-top: 8px;
  align-self: flex-start;
  background: #14b8a6;
  color: #fff;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}
/* 📱 موبايل */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
    text-align: right;
  }

  .info-block.center {
    text-align: right;
  }
}
/* كارد الفورم */
.form-card {
  background: #fff;
  border-radius: 16px;
  padding: 36px 40px;
  direction: rtl;
  box-shadow: 0 10px 30px rgba(0,0,0,.06);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px 24px;
}
/* FIELD */
.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

.form-field label span {
  color: #e11d48;
}

/* INPUTS */
.form-field input,
.form-field select {
  height: 44px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: border-color .2s, box-shadow .2s;
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59,130,246,.15);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.submit {
  background: #4f7cff;
  color: #fff;
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.cancel {
  background: #f3f4f6;
  color: #111;
  padding: 10px 28px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}


</style>
