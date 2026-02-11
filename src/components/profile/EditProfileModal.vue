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
          <input type="text" v-model="phone" />
        </div>

        <div class="form-field">
          <label>المحافظة *</label>
          <select v-model="governorate">
            <option value="">اختر المحافظة</option>
            <option v-for="g in Object.keys(locations)" :key="g"> {{ g }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>المنطقة *</label>
          <select v-model="area" :disabled="!governorate">
            <option value="">اختر المنطقة</option>
            <option v-for="a in areas" :key="a"> {{ a }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>الحي *</label>
          <select v-model="neighborhood" :disabled="!area">
            <option value="">اختر الحي</option>
            <option v-for="n in neighborhoods" :key="n"> {{ n }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>السكن *</label>
          <select v-model="housing" :disabled="!neighborhood">
            <option  :disabled="!neighborhood">اختر السكن</option>
            <option v-for="h in housings" :key="h"> {{ h }}</option>
          </select>
        </div>

        <div class="form-field">
          <label>أقرب جمعية *</label>
          <select v-model="association"  :disabled="!neighborhood">
            <option value="">اختر أقرب جمعية</option>
            <option v-for="a in associations" :key="a"> {{ a }}</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button class="submit" :disabled="!isFormValid" @click="submitEditRequest">طلب التعديل</button>
        <button class="cancel">إلغاء</button>
      </div>
      <p v-if="validationMessage" class="error">
        {{ validationMessage }}
      </p>

    </div>
</div>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useRequestsStore } from '../../stores/requests'

const router = useRouter()
const requestsStore = useRequestsStore()

const validationMessage = computed(() => {
  if (!phone.value) return 'رقم الموبايل مطلوب'
  if (!governorate.value) return 'الرجاء اختيار المحافظة'
  if (!area.value) return 'الرجاء اختيار المنطقة'
  if (!neighborhood.value) return 'الرجاء اختيار الحي'
  if (!housing.value) return 'الرجاء اختيار السكن'
  if (!association.value) return 'الرجاء اختيار أقرب جمعية'
  return ''
})

const locations = {
  'شمال القطاع': {
    'جباليا': {
      'جباليا البلد': {
        housings: ['بلوك 1', 'بلوك 2'],
        associations: ['جمعية جباليا', 'جمعية الإحسان']
      },
      'مخيم جباليا': {
        housings: ['بلوك A', 'بلوك B'],
        associations: ['جمعية مخيم جباليا']
      }
    }
  },

  'الوسطى': {
    'البريج': {
      'مخيم البريج': {
        housings: ['بلوك 1', 'بلوك 2'],
        associations: ['جمعية البريج', 'جمعية الوسطى']
      },
      'حي السوق': {
        housings: ['منطقة السوق'],
        associations: ['جمعية دير البلح']
      }
    },
    'النصيرات' : {
      'مخيم النصيرات': {
        housings: ['مخيم A', 'مخيم B'],
        associations: ['جمعية النصيرات']
      }
    }, 'دير البلح' : {
      'مخيم دير البلح': {
        housings: ['مخيم A', 'مخيم B'],
        associations: ['جمعية دير البلح']
      }
    },
    'المغازي': {
      'مخيم المغازي': {
        housings: ['بلوك A', 'بلوك B'],
        associations: ['جمعية المغازي']
      }
    }
  },

  'جنوب القطاع': {
    'خانيونس': {
      'وسط البلد': {
        housings: ['حي 1', 'حي 2'],
        associations: ['جمعية خانيونس']
      }
    }
  }
}

const phone = ref('')
const governorate = ref('')
const area = ref('')
const neighborhood = ref('')
const housing = ref('')
const association = ref('')

const areas = computed(() => {
  return governorate.value
    ? Object.keys(locations[governorate.value])
    : []
})

const neighborhoods = computed(() => {
  return governorate.value && area.value
    ? Object.keys(locations[governorate.value][area.value])
    : []
})

const housings = computed(() => {
  return governorate.value && area.value && neighborhood.value
    ? locations[governorate.value][area.value][neighborhood.value].housings
    : []
})

const associations = computed(() => {
  return governorate.value && area.value && neighborhood.value
    ? locations[governorate.value][area.value][neighborhood.value].associations
    : []
})

watch(governorate, () => {
  area.value = ''
  neighborhood.value = ''
  housing.value = ''
  association.value = ''
})

watch(area, () => {
  neighborhood.value = ''
  housing.value = ''
  association.value = ''
})

watch(neighborhood, () => {
  housing.value = ''
  association.value = ''
})

const isFormValid = computed(() => {
  return (
    phone.value.trim() !== '' &&
    governorate.value !== '' &&
    area.value !== '' &&
    neighborhood.value !== '' &&
    housing.value !== '' &&
    association.value !== ''
  )
})

const submitEditRequest = () => {
  requestsStore.addRequest({
    type: 'edit',
    title: '',
    payload: {
      phone: phone.value,
      governorate: governorate.value,
      area: area.value,
      neighborhood: neighborhood.value,
      housing: housing.value,
      association: association.value
    }
  })
  router.push('/profile/requests')
}
</script>


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
.submit:disabled {
  background: #9ca3af;
  cursor: not-allowed;
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

.error {
  color: #dc2626;
  font-size: 13px;
  margin-top: 10px;
}

</style>
