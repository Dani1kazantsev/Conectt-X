<template>
  <router-link class="link" v-if="link" :to="href" :style="styles">
    {{text}}
  </router-link>
  <h1 class="text" v-else-if="title === 'h1'" :style="styles">
    {{ text }}
  </h1>
  <h2 class="text" v-else-if="title === 'h2'" :style="styles">
    {{ text }}
  </h2>
  <h3 class="text" v-else-if="title === 'h3'" :style="styles">
    {{ text }}
  </h3>
  <p class="text" v-else :style="styles">
    {{ text }}
  </p>
</template>

<script lang="ts" setup>
import { PropType, defineProps, computed } from 'vue'

const props = defineProps({
  fontSize: {
    require: false,
    default: '16px',
    type: String as PropType<string>
  },
  fontWeight: {
    require: false,
    default: '400',
    type: String as PropType<string>
  },
  link: {
    require: false,
    default: false,
    type: Boolean as PropType<boolean>
  },
  href: {
    require: false,
    default: '/',
    type: String as PropType<string>
  },
  title: {
    require: false,
    default: '',
    type: String as PropType<'h1' | 'h2' | 'h3'>
  },
  text: {
    require: true,
    type: String as PropType<string>
  }
})

const styles = computed(() => `font-size: ${props.fontSize};font-weight: ${props.fontWeight};`)
</script>

<style lang="scss" scoped>
.link {
  transition: all 0.5s ease;

  &:hover {
    color: var(--secondary-color);
  }
}

.text, .link {
  color: var(--text-color);
  line-height: 25px;
}
</style>
