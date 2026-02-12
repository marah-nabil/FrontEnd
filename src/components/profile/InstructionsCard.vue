<template>
  <div class="card instructions-card">
    <!-- Header -->
    <div class="card-header">
      <h2>تعليمات</h2>
    </div>

    <!-- Content -->
    <div class="card-content">
      <h3 class="subtitle">بخصوص توزيع الكفالة – رقم (4)</h3>

      <ul class="instructions-list">
        <li>
          <strong>توقف مؤقت للدورة الحالية:</strong>
          تم إيقاف توزيع الكفالة للدورة الرابعة مؤقتاً.
        </li>

        <li>
          <strong>تعليمات الاستلام:</strong>
          يجب على الوصي الحضور شخصياً مع الهوية الشخصية أو أي وثائق رسمية بديلة في حال فقدان
          الهوية.
        </li>

        <li>
          في حال تعذر حضور الوصي، يمكن لأي فرد من الأسرة الاستلام بشرط إحضار:
          <ul class="sub-list">
            <li>هوية رب الأسرة</li>
            <li>الهوية الشخصية للمستلم</li>
          </ul>
        </li>

        <li>
          <strong>في حال عدم ظهور نتيجة عند الفحص:</strong>
          إذا لم تظهر أي معلومات عند التحقق من الرابط، فهذا يعني أن دور المستفيد لم يحن بعد. يتم
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// UI فقط – بدون منطق
</script>

<style scoped>
.instructions-card {
  background: white;
  border-radius: 14px;
  padding: 32px 36px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

/* عنوان الكارد */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 25px;
  border-bottom: 2px solid #2f855a;
}

.card-header h2 {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

/* المحتوى */
.card-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.8;
}

.subtitle {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
  color: #1f2937;
}

/* القائمة */
.instructions-list {
  padding-right: 20px;
  list-style-type: disc;
}

.instructions-list > li {
  margin-bottom: 14px;
}

/* قائمة فرعية */
.sub-list {
  margin-top: 8px;
  padding-right: 20px;
  list-style-type: circle;
}

.sub-list li {
  margin-bottom: 6px;
}

/* إبراز العناوين داخل النص */
.instructions-card strong {
  font-weight: 600;
  color: #1f2937;
}
</style>
