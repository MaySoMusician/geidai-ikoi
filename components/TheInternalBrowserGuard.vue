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

type Methods = {}

export default Vue.extend<Data, unknown, Computed, Methods>({
  components: {},
  data() {
    return {}
  },
  computed: {
    userAgent() {
      return process.client ? navigator.userAgent : ''
    },
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss" module></style>
