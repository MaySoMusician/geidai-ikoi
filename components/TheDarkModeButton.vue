<template>
  <CIconButton
    mr="3"
    :icon="colorMode === 'light' ? 'moon' : 'sun'"
    :aria-label="`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`"
    @click="toggleColorMode"
  />
</template>

<script lang="ts">
import Vue from 'vue'

import { ToggleColorModeFunction } from '@/types/chakra-ui-bridge'

type Computed = {
  colorMode: string
  toggleColorMode: ToggleColorModeFunction
}

export default Vue.extend<unknown, unknown, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
    toggleColorMode() {
      return this.$toggleColorMode
    },
  },
})
</script>

<style></style>
