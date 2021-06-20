<template>
  <CBox
    flex="1 1 0%"
    place-self="stretch"
    v-bind="$attrs"
    role="presentation"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend<unknown, unknown, unknown, unknown>({
  inheritAttrs: false,
})
</script>

<style></style>
