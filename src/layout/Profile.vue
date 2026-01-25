<template>
  <div class="profile">
    <ProfileCard :beneficiary="beneficiary" @edit="openEdit" />
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
import { ref, onMounted } from 'vue'
import api from '../services/api'
import ProfileCard from '../components/profile/ProfileCard.vue'
import FamilyTable from '../components/profile/FamilyTable.vue'
import EditProfileModal from '../components/profile/EditProfileModal.vue'

const beneficiary = ref({})
const family = ref({})
const showEdit = ref(false)

const loadDate = async () => {
  beneficiary.value = (await api.get('/beneficiaries/1')).data
  family.value = (await api.get('/beneficiaries/1/family')).data
}

const openEdit = () => (showEdit.value = true)
const reloadDate = () => {
  showEdit.value = false
  loadDate()
}

onMounted(loadDate)
</script>
