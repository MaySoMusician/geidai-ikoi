<template>
  <div>
    <TheWebsiteTitle />

    <transition name="fade1" mode="out-in" appear>
      <CBox
        id="comments"
        as="section"
        :class="[$style.SectionContainer]"
        mb="-2rem"
      >
        <CHeading as="h2">運営より</CHeading>
        <template v-for="(content, index) in contents">
          <CFlex
            :key="index"
            px="0.2rem"
            mb="2rem"
            direction="column"
            align="center"
          >
            <CFlex
              :class="[$style.CommentAroundSlash]"
              justify="center"
              align="center"
              direction="row"
            >
              <CText :class="[$style.CommentAroundSlashInside]">
                {{ content.body }}
              </CText>
            </CFlex>
            <CBox :class="[$style.CommentAuthor]">
              <CText as="span"
                >{{ content.role }} {{ content.age }} {{ content.name }}</CText
              >
            </CBox>
          </CFlex>
        </template>
      </CBox>
    </transition>
    <transition name="fade2" mode="out-in" appear>
      <CBox id="contacts" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">お問い合わせ</CHeading>
        <CFlex justify="center">
          <CList :spacing="4">
            <CListItem
              v-for="(contact, index) in contacts"
              :key="index"
              :class="[$style.ContactListItem]"
              font-size="0.875rem"
            >
              <CListIcon
                :icon="contact.icon"
                :color="contact.color || 'gray.500'"
                size="1.375rem"
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
    <transition name="fade3" mode="out-in" appear>
      <!-- <CBox id="attributions" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">権利表示</CHeading>
        <CFlex justify="center"></CFlex>
      </CBox> -->
    </transition>
    <transition name="fade4" mode="out-in" appear></transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
// import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
  contents: { body: string; role: string; age: string; name: string }[]
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
          role: '発起人',
          age: '作曲科3年',
          name: '姫野七弦',
        },
        {
          body: '開発担当しました。みんな使ってね～～～～',
          role: 'プログラミング担当',
          age: '作曲科3年',
          name: '渡邊響',
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
  head() {
    return {
      title: '運営より',
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
@include fadeEaseOutCubic('fade1', $globalFadeDuration, 0s);
@include fadeEaseOutCubic('fade2', $globalFadeDuration, 0.15s);
@include fadeEaseOutCubic('fade3', $globalFadeDuration, 0.3s);
@include fadeEaseOutCubic('fade4', $globalFadeDuration, 0.45s);
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
}

.Comment {
  &Author {
    font-size: 0.875rem;
    > span {
      display: block;
      white-space: nowrap;
    }
  }
  &AroundSlash {
    $borderColor: #333;
    $angle: 64deg;

    position: relative;
    width: 100%;
    text-align: center;

    margin: {
      left: auto;
      right: auto;
      bottom: 0.2rem;
    }

    font-size: 1rem;

    &Inside {
      max-width: 23em;
      padding: {
        top: 0.8rem;
        bottom: 0.4rem;
        left: 0.2rem;
        right: 0.2rem;
      }
    }
    &::before,
    &::after {
      content: '';
      display: block;
      align-items: center;
      width: 4em;
      height: 2px;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      flex-shrink: 0;
    }

    &::before {
      transform: rotate($angle);
    }

    &::after {
      transform: rotate($angle * -1);
    }
  }
}

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
