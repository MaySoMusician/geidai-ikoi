<template>
  <CBox :mb="1">
    <CText font-size="0.8rem">{{ userAgent }} </CText>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {}

type Computed = {
  userAgent: string
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  components: {},
  data() {
    return {}
  },
  computed: {
    userAgent() {
      return process.client ? navigator.userAgent : ''
    },
  },
})
</script>

<style lang="scss" module></style>
