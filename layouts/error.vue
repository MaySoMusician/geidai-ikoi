<template>
  <CFlex
    v-if="message === FORBIDDEN_OUTSIDE_OF_UNIV"
    justify="center"
    align="center"
  >
    <CBox mt="20vh">
      <CFlex justify="center" align="center">
        <CIcon
          name="account-cancel"
          color="red.400"
          d="block"
          size="8rem"
          :mb="0"
        />
      </CFlex>
      <CHeading
        as="h1"
        text-align="center"
        :mb="4"
        font-size="max(calc(100vw / 20), 1.5rem)"
      >
        {{ friendlyMessage }}
      </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <AppButton
          bg-color="red.200"
          hover-bg-color="red.300"
          mt="3"
          text="ログアウトして戻る"
          @click="signOut"
        >
        </AppButton>
      </CFlex>
    </CBox>
  </CFlex>
  <CFlex v-else justify="center" align="center">
    <CBox mt="20vh">
      <CFlex justify="center" align="center">
        <CIcon
          name="warning-alt"
          color="orange.400"
          d="block"
          size="5rem"
          :mb="5"
        />
      </CFlex>
      <CHeading as="h1" text-align="center" :mb="4">
        {{ friendlyMessage }}
      </CHeading>
      <CFlex justify="center" direction="column" align="center">
        <AppButton
          as="a"
          bg-color="red.200"
          hover-bg-color="red.300"
          mt="3"
          text="TOPへ戻る"
          href="/"
        >
        </AppButton>
      </CFlex>
    </CBox>
  </CFlex>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { NuxtError } from '@nuxt/types'

import { FORBIDDEN_OUTSIDE_OF_UNIV } from '@/utils/constants'

type Data = {
  showModal: boolean
  FORBIDDEN_OUTSIDE_OF_UNIV: string
}

type Computed = {
  statusCode: number
  message: string
  friendlyMessage: string
}

type Methods = {
  signOut(): void
}

type Props = {
  error: NuxtError
}

export default Vue.extend<Data, Methods, Computed, Props>({
  components: {},
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      default: null,
    },
  },
  data() {
    return {
      showModal: false,

      FORBIDDEN_OUTSIDE_OF_UNIV,
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return (this.error && this.error.message) || 'Internal Server Error'
    },
    friendlyMessage() {
      if (!this.error || !this.error.statusCode || !this.error.message)
        return '不明なエラー'

      if (this.error.message === FORBIDDEN_OUTSIDE_OF_UNIV)
        return '芸大アカウントでログインしてください'

      if (this.error.statusCode === 404) return 'ページが見つかりません'
      return this.error.message
    },
  },
  methods: {
    async signOut() {
      await this.$fire.auth.signOut()

      window.location.reload()
    },
  },
})
</script>
