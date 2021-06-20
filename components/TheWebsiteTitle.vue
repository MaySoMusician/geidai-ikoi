<template>
  <CHeading as="h1" text-align="center" :mt="3" :mb="4" :class="[$style.Title]">
    <CLink as="nuxt-link" to="/" :_hover="{ textDecoration: 'none' }">
      <AppSvgIconCoffee /><span>オンライン憩い</span><AppSvgIconCoffee />
    </CLink>
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
  font-size: 1.65rem;

  @media screen and (min-width: 30em) {
    font-size: 1.875rem;
  }
}
</style>
