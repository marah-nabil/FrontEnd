<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <div class="header-full">
      <!-- RIGHT -->
      <div class="header-right">
        <img src="@/assets/Logo2.jpeg" class="logo" />
        <nav class="header-nav">
          <a href="#">الرئيسية</a>
          <a href="#">الطلبات</a>
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
          <a class="danger" @click="logout">تسجيل الخروج</a>
        </div>
      </div>

      <!-- HAMBURGER -->
      <div class="hamburger" @click="mobileOpen = true">☰</div>
    </div>

     <!-- MOBILE MENU -->
     <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false">
      <div class="mobile-menu" @click.stop>
        <p class="mobile-user">{{ beneficiary.fullName }}</p>
        <a href="#">الرئيسية</a>
        <a href="#">الطلبات</a>
        <a @click="goProfile">الملف الشخصي</a>
        <a class="danger" @click="logout">تسجيل الخروج</a>
      </div>
    </div>
  </header>



</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

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

const logout = () => {
  localStorage.clear()
  router.push('/login')
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
  height: 64px;
  background: white;
  z-index: 1000;
}

/* الحالة العادية */
.app-header:not(.scrolled) {
  position: relative;
  height: 35vh; /* ثلث الشاشة */
  background: linear-gradient(135deg, #fdf912, #ff4704);
  color: white;
}

/* عند السكرول */
.app-header.scrolled {
  position: fixed;
  top: 0;
  height: 70px;
  background: white;
  color: #111;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.header-full {
  width: 100%;
  height: 70%;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  direction: rtl;
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
  padding-left: 100px;
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
  background: #e6edff;
  color: #2f5be7;
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
.logo {
  height: 48px;
}

.header-nav a {
  margin-left: 16px;
  text-decoration: none;
  color: #111;
  font-weight: 500;
  font-size: 14px;
  margin-left: 16px;
  text-decoration: none;
  color: #111;
  font-weight: 500;
}
@media (max-width: 768px) {
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
/* HAMBURGER */
.hamburger {
  display: none;
  font-size: 26px;
  cursor: pointer;
}


.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  height: 100%;
  background: #fff;
  padding: 20px;
}

.mobile-menu .danger {
  color: #c0392b;
}

.mobile-user {
  font-weight: bold;
  margin-bottom: 12px;
}
</style>
