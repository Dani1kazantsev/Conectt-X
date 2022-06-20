<template>
  <LandingHeaderNavbarDesktop v-if="!isMobile" />
  <LandingHeaderNavbarMobile v-else />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import LandingHeaderNavbarDesktop from '@/components/Landing/LandingHeaderNavbar/LandingHeaderNavbarDesktop.vue'
import LandingHeaderNavbarMobile from '@/components/Landing/LandingHeaderNavbar/LandingHeaderNavbarMobile.vue'

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 768)
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

.signInOrSignUp {
  display: flex;

  > a {
    margin: 0 0 0 10px;
  }
}
</style>
