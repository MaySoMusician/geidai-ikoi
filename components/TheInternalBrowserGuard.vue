<template>
  <AppModal
    :is-open="modalOpen"
    :on-close="() => (modalClosed = true)"
    :portal-z-index="2999"
    is-centered
    size="sm"
  >
    <div :class="[$style.Arrow]"><SvgArrowTopRight /></div>
    <AppModalContent rounded="0.5rem">
      <AppModalHeader
        py="8px"
        background-color="azalea"
        color="mineShaft"
        rounded-top="0.5rem"
        font-size="1.2rem"
        >{{ browserTypeName }} からようこそ！</AppModalHeader
      >
      <AppModalCloseButton />
      <AppModalBody font-size="0.9rem">
        <CText :mb="1">アプリのブラウザをご利用ですか？</CText>
        <CText :mb="2"
          >オンライン憩いはアプリ内ブラウザだとうまく動作しないことがあります。</CText
        >
        <CText
          >右上のボタンから「{{
            openBrowserLabel
          }}」をタップして、ブラウザで開きなおしてください。</CText
        >
      </AppModalBody>
    </AppModalContent>
    <AppModalOverlay bg="rgba(0,0,0,0.8)" />
  </AppModal>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  AppModal,
  AppModalOverlay,
  AppModalContent,
  AppModalHeader,
  AppModalBody,
  AppModalCloseButton,
} from '@/components/AppModal'
import SvgArrowTopRight from '~/assets/arrowTopRight2.min.svg?inline'

type InAppBrowserType = 'Facebook' | 'Instagram' | 'LINE' | 'Twitter'

type Data = {
  modalClosed: boolean
  browserType: InAppBrowserType | null
}

type Computed = {
  userAgent: string
  modalOpen: boolean
  browserTypeName: string
  openBrowserLabel: string
}

type Methods = {}

export default Vue.extend<Data, unknown, Computed, Methods>({
  components: {
    AppModal,
    AppModalOverlay,
    AppModalContent,
    AppModalHeader,
    AppModalBody,
    AppModalCloseButton,
    SvgArrowTopRight,
  },
  data() {
    return {
      modalClosed: false,
      browserType: 'Facebook',
    }
  },
  computed: {
    userAgent() {
      return process.client ? navigator.userAgent : ''
    },
    modalOpen() {
      return !!this.browserType && !this.modalClosed
    },
    browserTypeName() {
      if (!this.browserType) return ''

      const names: Record<InAppBrowserType, string> = {
        Facebook: 'Facebook',
        Instagram: 'Instagram',
        LINE: 'LINE',
        Twitter: 'Twitter',
      }
      return names[this.browserType]
    },
    openBrowserLabel() {
      if (!this.browserType) return ''

      const labels: Record<InAppBrowserType, string> = {
        Facebook: 'ブラウザで開く',
        Instagram: 'ブラウザで開く',
        LINE: '他のアプリで開く',
        Twitter: 'ブラウザで開く',
      }
      return labels[this.browserType]
    },
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss" module>
.Arrow {
  position: fixed;
  top: 4px;
  right: 4px;
  height: auto;
  width: 15%;
  max-width: 200px;
  z-index: 1350;

  > svg {
    transform: rotateZ(356deg);
  }
}
</style>
