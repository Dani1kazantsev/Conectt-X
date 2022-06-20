<template>
  <header class="header">
      <section class="logo">
        <VText text="conectt" font-weight="900" font-size="24px" title="h2" />
        <img :src="logoSVG" alt="Лого" />
      </section>
      <LandingNavbar />
  </header>
</template>

<script lang="ts" setup>
import logoSVG from '@/assets/icons/logo.svg'
import LandingNavbar from '@/components/Landing/LandingHeaderNavbar/LandingHeaderNavbar.vue'
import VText from '@/components/VText.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin: 0 0 84px 0;

  @media all and (max-width: 768px) {
    justify-content: space-between;
    margin: 0 0 20px 0;
  }
}

.logo {
  display: flex;
  margin: 0 60px 0 0;

  > h2 {
    margin: 0 12px 0 0;
  }

  @media all and (max-width: 830px) {
    margin: 0 30px 0 0;
  }
}
</style>
