<template>
  <CPseudoBox
    :as="$attrs['as'] || 'button'"
    border="1px"
    :border-color="bdColor"
    :background-color="bgColor"
    :_hover="{ backgroundColor: hoverBgColor }"
    transition="all 0.4s"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    <CFlex
      :class="[$style.ButtonContainer]"
      direction="column"
      jutify="center"
      align="center"
      py="1rem"
      px="1em"
      min-w="10rem"
    >
      <CBox :font-size="fontSize">
        <CText
          as="span"
          d="inline-block"
          font-size="1em"
          line-height="1.4em"
          ml="0.67em"
          >{{ text }}</CText
        >
        <CIcon name="chevron-right" size="1.4em" />
      </CBox>
    </CFlex>
  </CPseudoBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Props = {
  text: string
  bdColor: string
  bgColor: string
  hoverBgColor: string
  fontSize: string
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    text: {
      type: String,
      required: true,
    },
    bdColor: {
      type: String,
      default: 'gray.500',
    },
    bgColor: {
      type: String,
      default: 'rgb(255 255 255)',
    },
    hoverBgColor: {
      type: String,
      default: 'gray.100',
    },
    fontSize: {
      type: String,
      default: '0.875rem',
    },
  },
  data() {
    return {}
  },
})
</script>

<style lang="scss" module>
.Button {
  &Container {
    svg {
      vertical-align: bottom;
    }
  }
}
</style>
