<template>
  <CHeading as="h1" text-align="center" :mt="3" :mb="4" :class="[$style.Title]">
    <AppSvgIconCoffee /><span>オンライン憩い</span><AppSvgIconCoffee />
  </CHeading>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend<unknown, unknown, unknown, unknown>({})
</script>

<style lang="scss" module>
.Title span {
  vertical-align: middle;
  margin: {
    left: 6px;
    right: 6px;
  }
}
</style>