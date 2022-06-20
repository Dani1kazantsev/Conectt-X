<template>
  <button :class="`${inversionClass} ${sizeClass}`" @click="onClickHandler">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const emit = defineEmits(['click'])

const onClickHandler = () => {
  emit('click')
}

const props = defineProps({
  text: {
    require: true,
    type: String as PropType<string>
  },
  inversion: {
    require: false,
    default: false,
    type: Boolean as PropType<boolean>
  },
  size: {
    require: false,
    default: 'normal',
    type: String as PropType<'small' | 'normal'>
  }
})

const { width } = useWindowSize()

const inversionClass = computed(() => props.inversion ? 'inversionButton' : 'button')
const sizeClass = computed(() => props.size === 'small' || width.value <= 768 ? 'small' : 'normal')
</script>

<style lang="scss" scoped>
.button {
  background: var(--secondary-color);
  color: black;

  &:hover {
    background-color: transparent;
    color: var(--secondary-color);
  }
}

.inversionButton {
  background-color: transparent;
  color: var(--secondary-color);

  &:hover {
    background: var(--secondary-color);
    color: black;
  }
}

.small {
  padding: 12px 0;
}

.normal {
  padding: 22px 0;
}

.button, .inversionButton {
  border: 1px solid var(--secondary-color);
  transition: all 0.5s ease;
  cursor: pointer;
  border-radius: 4px;
  font-size: 22px;
  width: 100%;
  text-align: center;
}
</style>
