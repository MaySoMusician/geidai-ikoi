<template>
  <CLink
    :font-size="fontSize"
    :py="py"
    href="https://twitter.com/ikoi_online"
    is-external
    v-bind="$attrs"
    d="flex"
    flex-direction="row"
    place-content="center"
    place-items="center"
  >
    <CIcon name="twitter" size="1.8em" color="#009EF7" />
  </CLink>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  fontSize: string
  py: string | number
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  inheritAttrs: false,
  props: {
    fontSize: {
      type: String,
      default: '1rem',
    },
    py: {
      type: [String, Number],
      default: 2,
    },
  },
})
</script>

<style lang="scss" module></style>
