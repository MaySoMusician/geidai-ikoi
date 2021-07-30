<template>
  <CPseudoBox
    as="button"
    border-radius="0.5rem"
    background-color="rgba(255, 255, 255, 92%)"
    :_hover="{ backgroundColor: 'gray.100' }"
    transition="background-color 0.4s"
    @click="$emit('click')"
  >
    <CFlex
      :class="[$style.Noop]"
      direction="column"
      justify="center"
      align="center"
      py="1rem"
    >
      <CBox :pb="2">{{ title }}</CBox>
      <CFlex :class="[$style.Noop]" direction="row" align="center" :mt="1">
        <CBox
          font-size="0.9rem"
          line-height="100%"
          background-color="azalea"
          border-radius="2rem"
          color="mineShaft"
          :px="4"
          :py="2"
          >ログイン</CBox
        >
        <CIcon name="login" size="1.4rem" :ml="1" />
      </CFlex>
    </CFlex>
  </CPseudoBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  title: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    title: {
      type: String,
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
