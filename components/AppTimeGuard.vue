<template>
  <div v-if="isShown">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  start: Date | undefined
  end: Date | undefined
}

type Computed = {
  isShown: boolean
  beforeEnd: boolean
  afterStart: boolean
}

export default Vue.extend<unknown, unknown, Computed, Props>({
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
  computed: {
    isShown() {
      return this.beforeEnd && this.afterStart
    },
    beforeEnd() {
      return this.end ? Date.now() < this.end.getTime() : true
    },
    afterStart() {
      return this.start ? Date.now() >= this.start.getTime() : true
    },
  },
})
</script>

<style></style>
