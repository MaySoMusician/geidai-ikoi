<template>
  <div v-if="isShown">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  now: number | undefined
}

type Props = {
  start: Date | undefined
  end: Date | undefined
}

type Computed = {
  isShown: boolean
  beforeEnd: boolean
  afterStart: boolean
}

export default Vue.extend<Data, unknown, Computed, Props>({
  props: {
    start: {
      type: Date,
      default: undefined,
    },
    end: {
      type: Date,
      default: undefined,
    },
  },
  data() {
    return {
      now: undefined,
    }
  },
  computed: {
    isShown() {
      return this.beforeEnd && this.afterStart
    },
    beforeEnd() {
      return this.now && this.end ? Date.now() < this.end.getTime() : true
    },
    afterStart() {
      return this.now && this.start ? Date.now() >= this.start.getTime() : true
    },
  },
  mounted() {
    this.now = Date.now()
  },
})
</script>

<style></style>
