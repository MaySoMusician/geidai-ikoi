<template>
  <CFlex
    justify="center"
    align="center"
    direction="row"
    v-bind="$attrs"
    :class="[$style.Noop]"
  >
    <CButton
      bg="transparent"
      h="2.5rem"
      w="2.5rem"
      color="rgb(93 93 93)"
      :px="2"
      :_focus="{
        outline: 'none',
        boxShadow: '0 0 0 2px rgb(93 141 181 / 30%)',
      }"
      :_active="{ backgroundColor: 'inherit' }"
      :_hover="{ backgroundColor: 'inherit' }"
      rounded="0.1rem"
      @click="$emit('click')"
    >
      <CIcon :name="open ? 'close' : 'menu'" :size="open ? '1rem' : '1.4rem'" />
    </CButton>
  </CFlex>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  open: boolean
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  inheritAttrs: false,
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" module>
.Noop {
  -custom-noop: noop;
}
</style>
