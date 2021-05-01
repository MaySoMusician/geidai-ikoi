<template>
  <CIconButton
    mr="3"
    :icon="colorMode === 'light' ? 'moon' : 'sun'"
    :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`"
    @click="$emit('click')"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type ColorMode = 'light' | 'dark'

type Props = {
  colorMode: ColorMode
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    colorMode: {
      type: String as PropType<ColorMode>,
      required: true,
    },
  },
})
</script>

<style></style>
