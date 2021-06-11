<template>
  <CPseudoBox
    :as="$attrs['as'] || 'button'"
    border="1px"
    :border-color="bdColor"
    border-radius="2rem"
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
        <CIcon v-if="chevron === 'left'" name="chevron-left" size="1.4em" />
        <CText
          as="span"
          d="inline-block"
          font-size="1em"
          line-height="1.4em"
          :ml="chevron === 'right' ? '0.67em' : undefined"
          :mr="chevron === 'left' ? '0.67em' : undefined"
          >{{ text }}</CText
        >
        <CIcon v-if="chevron === 'right'" name="chevron-right" size="1.4em" />
      </CBox>
    </CFlex>
  </CPseudoBox>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type Chevron = 'none' | 'left' | 'right'

type Props = {
  text: string
  bdColor: string
  bgColor: string
  hoverBgColor: string
  fontSize: string
  chevron: Chevron
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
    chevron: {
      type: String as PropType<Chevron>,
      default: 'right',
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
