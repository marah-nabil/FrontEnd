<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="header-full">
      <!-- RIGHT -->
      <div class="header-right">
        <img src="@/assets/Logo2.png" class="logo" />
        <nav class="header-nav">
          <a class="requests-btn" @click="goProfile">الرئيسية</a>
          <router-link
            to="/profile/requests"
            class="requests-btn"
          >
            الطلبات
          </router-link>
        </nav>
      </div>

      <!-- LEFT -->
      <div class="header-left" ref="dropdownRef">
        <div class="user-click" @click="toggleDropdown">
          <div class="avatar">
            {{ beneficiary.fullName.charAt(0) }}
          </div>
          <span class="user-name">{{ beneficiary.fullName }}</span>
          <span class="arrow">▼</span>
        </div>

        <div v-if="open" class="dropdown">
          <a @click="goProfile">الملف الشخصي</a>
          <a class="danger" @click.stop="openLogoutConfirm">تسجيل الخروج</a>
        </div>
      </div>

      <!-- HAMBURGER -->
      <div class="hamburger" @click="mobileOpen = true">☰</div>
    </div>

     <!-- MOBILE MENU -->
     <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false">
      <div class="mobile-menu" @click.stop>
        <p class="mobile-user">{{ beneficiary.fullName }}</p>
        <a class="requests-btn" @click="goProfile">الرئيسية</a>
          <router-link
            to="/profile/requests"
            class="requests-btn"
          >
            الطلبات
          </router-link>
        <a @click="goProfile">الملف الشخصي</a>
        <a class="danger" @click.stop="openLogoutConfirm">تسجيل الخروج</a>

      </div>
    </div>
    <ConfirmDaialog
      v-if="showLogoutConfirm"
      title="انـتـبــه"
      message="أنت على وشك تسجيل الخروج، هل ترغب في تأكيد العملية؟"
      confirmText="تسجيل الخروج"
      @close="showLogoutConfirm = false"
      @confirm="confirmLogout"
    />

  </header>



</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ConfirmDaialog from '../../components/profile/ConfirmDaialog.vue'

defineProps<{
  beneficiary: {
    fullName: string
  }
}>()

const isScrolled = ref(false)

const onScroll = () => {
  isScrolled.value = window.scrollY > 120
}
const router = useRouter()

const showLogoutConfirm = ref(false)

const open = ref(false)
const mobileOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  open.value = !open.value
}

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

const goProfile = () => {
  open.value = false
  mobileOpen.value = false
  router.push('/profile')
}

const openLogoutConfirm = () => {
  showLogoutConfirm.value = true
  open.value = false
  mobileOpen.value = false
}

const confirmLogout = () =>{
  localStorage.removeItem('accessToken')
  localStorage.removeItem('beneficiary')

  showLogoutConfirm.value = false

  router.push('/verify')
}
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('click', closeDropdown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>

.app-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  color: #111;
  color: white;
  z-index: 1000;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* عند السكرول */
.app-header.scrolled {
  background: white;
  color: #111;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}


.header-full {
  width: 100%;
  height: 70%;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
  margin-top: 10px;
}

/* RIGHT */
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 40px;
}

.header-nav a {
  margin-left: 16px;
  text-decoration: none;
  color: #111;
  font-weight: 500;
}
.app-header:not(.scrolled) .header-nav a {
  color: white;
}

.app-header.scrolled .header-nav a {
  color: #111;
}

/* LEFT */
.header-left {
  position: relative;
  padding-left: 50px;
}

.user-click {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #fff;
  color: #0d9940;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.arrow {
  font-size: 10px;
}

/* DROPDOWN */
.dropdown {
  position: absolute;
  top: 50px;
  left: 0;
  width: 180px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.dropdown a {
  display: block;
  padding: 10px 16px;
}

.dropdown .danger {
  color: #c0392b;
}

.logout-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.logout-modal {
  width: 360px;
  background: #fff;
  border-radius: 10px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,.2);
}

.logout-modal h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

.logout-modal p {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 24px;
}

.logout-modal .actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-cancel {
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
}

.btn-logout {
  padding: 8px 18px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.logo {
  margin-top: 15px;
  height: 70px;
  background: transparent;
  display: block;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
}
.requests-btn {
  color: #fff;
  padding: 8px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 50px;
}
/* HAMBURGER */
.hamburger {
  display: none;
  font-size: 26px;
  cursor: pointer;
}
@media (max-width: 700px) {
  .header-nav {
    display: none;
  }
  .user-click {
    display: none;
  }

  .hamburger {
    display: block;
  }
}



.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  z-index: 999;
  display: flex;
  direction: rtl;
  justify-content: flex-end;
}
.mobile-menu {
  width: 260px;
  height: 100vh;
  background: #fff;
  padding: 40px 25px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.mobile-menu a,
.mobile-menu .requests-btn {
  text-decoration: none;
  color: #111827;
  font-size: 16px;
  padding: 10px 0;
  display: block;
}
.mobile-menu a.danger {
  color: #c0392b;
}
.mobile-menu a {
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
}

@keyframes slideIn {
  from { transform: translateX(0); }
  to { transform: translateX(2%); }
}
</style>
