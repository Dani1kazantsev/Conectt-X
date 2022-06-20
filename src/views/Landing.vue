<template>
  <div class="wrapper">
    <LandingHeader />
    <LandingContent />
    <LandingFooter />
    <img class="circle1" :src="circle1SVG" alt="circle">
    <img class="circle2" :src="circle2SVG" alt="circle2">
  </div>
</template>

<script lang="ts" setup>
import circle1SVG from '@/assets/images/circles.svg'
import circle2SVG from '@/assets/images/circles2.svg'
import LandingHeader from '@/components/Landing/LandingHeader.vue'
import LandingContent from '@/components/Landing/LandingContent/LandingContent.vue'
import LandingFooter from '@/components/Landing/LandingFooter.vue'
</script>

<style lang="scss" scoped>
.wrapper {
  width: min(100%, 1600px);
  margin: 32px 0 80px 0;

  @media all and (max-width: 768px) {
    margin: 0;
  }
}

.circle1 {
  top: 58vh;
  left: 0
}

.circle2 {
  top: 185vh;
  right: 0;
}

.circle1, .circle2 {
  position: absolute;

  @media all and (max-width: 768px) {
    display: none;
  }
}
</style>
