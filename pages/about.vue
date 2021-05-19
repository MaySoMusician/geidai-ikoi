<template>
  <div :class="[$style.PageAbout]">
    <TheWebsiteTitle />

    <transition name="fade1" mode="out-in" appear @after-enter="() => {}">
      <CBox as="section" :pt="3" :pb="4">
        <CHeading as="h2" text-align="center" size="lg" :mb="4">
          このサイトについて
        </CHeading>
        <template v-for="(content, index) in contents">
          <CBox
            :key="index"
            :px="{ base: '1.5rem', sm: '2rem', md: '4rem' }"
            :mb="3"
          >
            <CText :pt="2" :pb="2">{{ content.body }}</CText>
            <CText text-align="end" font-size="0.8rem">{{
              content.name
            }}</CText>
          </CBox>
        </template>
      </CBox>
    </transition>
    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
      <CBox as="section" :pt="3" :pb="4">
        <CHeading as="h2" text-align="center" size="lg" :mb="4">
          連絡先
        </CHeading>
        <CFlex justify="center">
          <CList :spacing="4">
            <CListItem
              v-for="(contact, index) in contacts"
              :key="index"
              :class="[$style.ContactListItem]"
              :font-size="{ base: 'sm', sm: 'md' }"
            >
              <CListIcon
                :icon="contact.icon"
                :color="contact.color || 'gray.500'"
                :size="{ base: '1.5rem', sm: '2rem' }"
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
    <transition name="fade3" mode="out-in" appear @after-enter="() => {}">
      <CBox as="section" :pt="10" :pb="4">
        <CHeading as="h2" text-align="center" size="md" :mb="4">
          帰属表示
        </CHeading>
        <CFlex justify="center">
          <CText font-size="sm" text-align="center"
            >Icons made by
            <CLink
              href="https://www.flaticon.com/authors/pixel-perfect"
              title="Pixel perfect"
              is-external
              >Pixel perfect</CLink
            >
            from
            <CLink href="https://www.flaticon.com/" title="Flaticon" is-external
              >www.flaticon.com</CLink
            ></CText
          >
        </CFlex>
      </CBox>
    </transition>
    <transition name="fade4" mode="out-in" appear @after-enter="() => {}">
      <CBox as="section" :pt="10" :pb="4">
        <CHeading as="h2" text-align="center" size="md" :mb="4">
          プライバシー ポリシー
        </CHeading>
        <CBox
          font-size="sm"
          :px="{ base: '1.5rem', sm: '2rem', md: '4rem' }"
          text-indent="1em"
        >
          <CText
            >本サイトでは、Webサイト・サービスの改善のためにGoogle
            アナリティクスを使用しています。</CText
          >
          <CText
            >Google
            アナリティクスは、データを収集するために、Cookieの設定・読取、個人を特定しない端末情報などの送信を行います（IPアドレスは匿名化されます）。</CText
          ><CText
            >詳しい仕組みは<CLink
              href="https://www.google.com/intl/ja/policies/privacy/partners"
              is-external
              >こちら</CLink
            >をご覧ください。</CText
          ><CText mt="0.8em"
            >皆さまの使用状況にあわせてサイトを改良するために、データを収集・使用しておりますので、どうかご協力よろしくお願いいたします。データを収集されたくない場合は、ブラウザのCookieを無効にするか、<CLink
              href="https://tools.google.com/dlpage/gaoptout?hl=ja"
              is-external
              >専用のアドオン</CLink
            >（PCのみ）をご利用ください。</CText
          >
        </CBox>
      </CBox>
    </transition>
    <transition name="fade5" mode="out-in" appear @after-enter="() => {}">
      <CBox as="section" :pt="4" :pb="4">
        <CFlex justify="center">
          <CButton
            variant-color="gray"
            font-weight="normal"
            font-size="xl"
            @click="$router.back()"
          >
            もどる
          </CButton>
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
          title: 'contact@mg.geidai-ikoi.net',
          link: 'contact@mg.geidai-ikoi.net',
          prependText: 'お問い合わせ',
        },
        {
          icon: 'email',
          type: 'email',
          title: 's2119008+ikoi@ms.geidai.ac.jp',
          link: 's2119008+ikoi@ms.geidai.ac.jp',
          prependText: '姫野七弦',
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
@include fadeEaseOutCubic('fade1', 0.3s, 0.3rem);
@include fadeEaseOutCubic('fade2', 0.5s, 0.3rem);
@include fadeEaseOutCubic('fade3', 0.7s, 0.3rem);
@include fadeEaseOutCubic('fade4', 0.9s, 0.3rem);
@include fadeEaseOutCubic('fade5', 1.1s, 0.3rem);
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

.PageAbout {
  section a {
    color: #00a3c4;
  }
}
</style>
