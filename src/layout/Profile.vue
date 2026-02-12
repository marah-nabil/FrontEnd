<template>
  <div class="profile">
    <ProfileCard :beneficiary="beneficiary"
      />
    <FamilyTable :family="family" />
    <EditButton
      v-if="showEdit"
      :beneficiary="beneficiary"
      @close="showEdit = false"
      @saved="reloadDate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import ProfileCard from '../components/profile/ProfileCard.vue'
import FamilyTable from '../components/profile/FamilyTable.vue'
import EditProfileModal from '../components/profile/EditProfileModal.vue'

const props = defineProps<{
  beneficiary: any
}>()

const family = ref([])
//const showEdit = ref(false)

/* const loadDate = async () => {
  beneficiary.value = (await api.get('/beneficiaries/1')).data
  family.value = (await api.get('/beneficiaries/1/family')).data
}

const openEdit = () => (showEdit.value = true)
const reloadDate = () => {
  showEdit.value = false
  loadDate()
} */
watch(
  () => props.beneficiary,
  (newVal) => {
    if (newVal) {
      family.value = newVal.FamilyMembers
    }
  },
  { immediate: true }
)
</script>
