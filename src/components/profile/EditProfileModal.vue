<template>
<div class="page-wrapper">
  <div v-if="beneficiary" class="info-summary-card">

    <!-- كارد المعلومات الأساسية -->
    <div class="info-grid">
      <div class="info-block">
          <p class="name">{{ beneficiary?.fullName }}</p>
          <p class="id">{{ beneficiary?.nationalId }}</p>
          <span class="badge">
             {{ beneficiary?.status === 'غير نشط' ? 'نشط' : 'نشط' }}
          </span>
      </div>
        <div class="info-block center">
          <div class="item">
            <label>تاريخ التسجيل في الجمعية</label>
            <p>08 سبتمبر 2024</p>
         </div>

          <div class="item">
            <label>السكن</label>
            <p>{{ beneficiary?.address }}</p>
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
        <button class="submit" :disabled="!isFormValid || isSubmitting" @click="submitEditRequest">
          {{ isSubmitting ? 'جاري الإرسال...' : 'طلب التعديل' }}
        </button>
        <button class="cancel" @click="router.push('/profile')">إلغاء</button>
      </div>
      <p v-if="validationMessage" class="error">
        {{ validationMessage }}
      </p>

    </div>
</div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch  } from 'vue'
import api from '../../services/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const beneficiary = ref(null)
const isSubmitting = ref(false)

onMounted( async() =>{
  try{
  const token = localStorage.getItem('accessToken')
  const beneificiaryId = localStorage.getItem('beneficiaryId')

     const response = await api.get(`/beneficiaries/profile/${beneificiaryId}`, {
      headers: {
        'X-Access-Token': token,
      },
    })
    beneficiary.value = response.data
    phone.value = response.data.phone?.replace(/^97/, '')
  }catch(error){
    console.error(error)
  }
})

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

const submitEditRequest = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true
  try {
    const token = localStorage.getItem('accessToken')
    const beneificiaryId = localStorage.getItem('beneficiaryId')

    await api.post
        (`/beneficiaries/${beneificiaryId}/edit-request`,
    {
      phone: phone.value,
      governorate: governorate.value,
      area: area.value,
      neighborhood: neighborhood.value,
      housing: housing.value,
      association: association.value
    },
    {
      headers: {
        'X-Access-Token': token
      }
    })

    router.push('/profile/requests')
  }catch (error) {
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>


<style scoped>
.page-wrapper {
  max-width: 1250px;
  margin: 0 auto;
  padding: 140px 24px 60px;
}

.info-summary-card {
  background: #fff;
  border-radius: 14px;
  padding: 32px 36px;
  transform: translateY(-90px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  direction: rtl;
}
.form-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
    transform: translateY(-40px);
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

.name {
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
}
.id {
  font-size: 14px;
  color: #2563eb;
}

.badge {
  background: #14b8a6;
  color: #fff;
  padding: 4px 14px;
  border-radius: 999px;
  font-size: 13px;
  width: fit-content;
}
/* كارد الفورم */
.form-card {
  background: #fff;
  border-radius: 16px;
  padding: 36px 40px;
  transform: translateY(-40px);
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
/* INPUTS */
.form-field input,
.form-field select {
  height: 46px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  transition: .2s ease;
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
  margin-top: 12px;
}
@media (max-width: 768px) {

  .page-wrapper {
    padding: 110px 16px 40px;
  }

  .info-summary-card {
    padding: 20px;
    transform: translateY(-60px);
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-card {
    padding: 20px;
    transform: translateY(-20px);
  }

  .form-grid {
    grid-template-columns: 1fr;   /* 👈 عمود واحد في الجوال */
    gap: 18px;
  }

  .form-field input,
  .form-field select {
    height: 44px;
    font-size: 15px;
  }

  .form-actions {
    flex-direction: column;   /* 👈 الأزرار تحت بعض */
    gap: 10px;
  }

  .submit,
  .cancel {
    width: 100%;
  }

  .name {
    font-size: 16px;
  }

  .id {
    font-size: 13px;
  }
}
</style>
