<template>
  <div class="block2">
    <div class="flexBlock">
      <VText font-weight="900" font-size="46px" title="h2" text="1200" />
      <VText text="Пользователей" />
    </div>
    <img :src="dot" alt="Точка" />
    <div class="flexBlock">
      <VText font-weight="900" font-size="46px" title="h2" text="96%" />
      <VText text="Довольны нами" />
    </div>
    <img :src="dot" alt="Точка" />
    <div class="flexBlock">
      <VText font-weight="900" font-size="46px" title="h2" text="4" />
      <VText text="В команде" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dot from '@/assets/icons/dot.svg'
import VText from '@/components/VText.vue'
</script>

<style lang="scss" scoped>
.block2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 138px 233px 138px;

  @media all and (max-width: 1000px) {
    margin: 0 50px 120px 50px;
  }

  @media all and (max-width: 768px) {
    margin: 0 0 15px 0;
    flex-direction: column;

    img {
      display: none;
    }
  }
}

.flexBlock {
  display: flex;
  align-items: center;

  > h2 {
    margin: 0 12px 0 0;
  }

  @media all and (max-width: 768px) {
    margin: 0 0 20px 0;
  }
}
</style>
