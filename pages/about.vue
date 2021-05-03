<template>
  <div>
    <TheWebsiteTitle />

    <transition name="fade" mode="out-in" appear @after-enter="() => {}">
      <CBox :pt="3" :pb="4">
        <CHeading as="h2" text-align="center" size="lg" :mb="4">
          このサイトについて
        </CHeading>
        <template v-for="(content, index) in contents">
          <CBox :key="index" :px="{ base: '1.5rem', md: '4rem' }" :mb="3">
            <CText :pt="2" :pb="2">{{ content.body }}</CText>
            <CText text-align="end" font-size="0.8rem">{{
              content.name
            }}</CText>
          </CBox>
        </template>
      </CBox>
    </transition>
    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
      <CBox :pt="3" :pb="4">
        <CHeading as="h2" text-align="center" size="lg" :mb="4">
          連絡先
        </CHeading>
        <CFlex justify="center">
          <CList :spacing="4">
            <CListItem
              v-for="(contact, index) in contacts"
              :key="index"
              :class="[$style.ContactListItem]"
            >
              <CListIcon
                :icon="contact.icon"
                :color="contact.color || 'gray.500'"
                size="2rem"
              />
              <CText as="span" :mr="2">{{ contact.prependText }}</CText>
              <CLink
                :href="
                  contact.type === 'email'
                    ? `mailto:${contact.link}`
                    : contact.link
                "
                :is-external="contact.type === 'link'"
                >{{ contact.title }}</CLink
              >
            </CListItem>
          </CList>
        </CFlex>
      </CBox>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
// import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
  contents: { body: string; name: string }[]
  contacts: {
    icon: string
    type: 'email' | 'link'
    color?: string
    title: string
    link: string
    prependText: string
  }[]
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
      contents: [
        {
          body:
            'コロナ禍において諸活動が制限される中、学生同士の交流の場としてこのサイトを作ることになりました。ぜひご活用ください！',
          name: '発起人 作曲科3年 姫野七弦',
        },
        {
          body: '開発担当しました。みんな使ってね～～～～',
          name: 'プログラミング担当 作曲科3年 渡邊響',
        },
      ],
      contacts: [
        {
          icon: 'email',
          type: 'email',
          title: 's2119008+ikoi@ms.geidai.ac.jp',
          link: 's2119008+ikoi@ms.geidai.ac.jp',
          prependText: '姫野七弦',
        },
        {
          icon: 'twitter',
          type: 'link',
          title: '@ikoi_online',
          link: 'https://twitter.com/ikoi_online',
          prependText: 'Twitter',
          color: '#009EF7',
        },
        {
          icon: 'email',
          type: 'email',
          title: 's2119015@ms.geidai.ac.jp',
          link: 's2119015@ms.geidai.ac.jp',
          prependText: '渡邊響',
        },
        {
          icon: 'github',
          type: 'link',
          title: 'MaySoMusician/geidai-ikoi',
          link: 'https://github.com/MaySoMusician/geidai-ikoi',
          prependText: 'GitHub',
          color: '#171515',
        },
      ],
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
@mixin transition-base($name, $delay) {
  .#{$name} {
    &-enter-active,
    &-leave-active {
      transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
      transition-delay: $delay;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }

    &-enter {
      transform: translateY(0.3rem);
    }
  }
}

@include transition-base('fade', 0.3s);
@include transition-base('fade2', 0.6s);
</style>

<style lang="scss" module>
.ContactList {
  &Item {
    > svg,
    > span,
    > a {
      vertical-align: middle;
    }
  }
}
</style>
