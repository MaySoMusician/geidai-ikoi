<template>
  <CSpinner
    d="flex"
    :size="size"
    thickness="4px"
    speed="0.8s"
    :color="color"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  color: string
  size: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'wafer',
    },
    size: {
      type: String,
      default: '3rem',
    },
  },
})
</script>

<style></style>
