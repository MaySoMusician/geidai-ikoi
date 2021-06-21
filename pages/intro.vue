<template>
  <div>
    <TheWebsiteTitle />

    <transition name="fade1" mode="out-in" appear @after-enter="() => {}">
      <CBox
        id="comments"
        as="section"
        :class="[$style.SectionContainer]"
        mb="-2rem"
      >
        <CHeading as="h2">憩いとは</CHeading>
        <CFlex justify="center">
          <CText>準備中</CText>
        </CFlex>
      </CBox>
    </transition>
    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
      <!-- <CBox id="contacts" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">お問い合わせ</CHeading>
        <CFlex justify="center"></CFlex>
      </CBox> -->
    </transition>
    <transition name="fade3" mode="out-in" appear @after-enter="() => {}">
      <!-- <CBox id="attributions" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">権利表示</CHeading>
        <CFlex justify="center"></CFlex>
      </CBox> -->
    </transition>
    <transition name="fade4" mode="out-in" appear @after-enter="() => {}">
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
// import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
}

type Computed = {
  colorMode: string
  theme: ChakraTheme
  toggleColorMode: ToggleColorModeFunction
}

type Methods = {}

const vue = Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    colorMode() {
      return this.$chakraColorMode()
    },
    theme() {
      return this.$chakraTheme()
    },
    toggleColorMode() {
      return this.$toggleColorMode
    },
  },
  async mounted() {},
  methods: {},
})

export default vue
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade1', $globalFadeDuration, 0s, 0);
@include fadeEaseOutCubic('fade2', $globalFadeDuration, 0.15s, 0);
@include fadeEaseOutCubic('fade3', $globalFadeDuration, 0.3s, 0);
@include fadeEaseOutCubic('fade4', $globalFadeDuration, 0.45s, 0);
</style>

<style lang="scss" module>
.Section {
  &Container {
    padding: {
      top: 2rem;
      bottom: 3rem;
    }

    h2 {
      font-size: 1.125rem;
      min-width: 7em;

      margin: {
        left: auto;
        right: auto;
        bottom: 2rem;
      }

      padding: {
        top: 0.8rem;
        bottom: 0.8rem;
      }

      @include headingBorderAboveBelow();
    }
  }

  /* &Grid {
    grid-row-gap: 1rem;
    grid-template-columns: repeat(2, minmax(10em, auto));
    place-content: space-evenly;

    > button {
      width: 100%;
      margin: {
        left: auto;
        right: auto;
      }
    }
  } */
}
</style>
