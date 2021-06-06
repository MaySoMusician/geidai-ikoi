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
        <CHeading as="h2">運営より</CHeading>
        <template v-for="(content, index) in contents">
          <CFlex :key="index" px="2rem" mb="2rem" direction="row">
            <CBox :class="[$style.CommentAuthor]" align-self="flex-end">
              <CText as="span">{{ content.role }}</CText>
              <CText as="span">{{ content.age }} {{ content.name }}</CText>
            </CBox>
            <CFlex :class="[$style.CommentBalloon]" align="center">
              <CText>{{ content.body }}</CText>
            </CFlex>
          </CFlex>
        </template>
      </CBox>
    </transition>
    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
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
    <transition name="fade3" mode="out-in" appear @after-enter="() => {}">
      <CBox id="attributions" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">権利表示</CHeading>
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
    <transition
      name="fade4"
      mode="out-in"
      appear
      @after-enter="() => {}"
    ></transition>
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

.Comment {
  &Author {
    font-size: 0.75rem;
    > span {
      display: block;
      white-space: nowrap;
    }
  }
  &Balloon {
    $arrowSize: 0.6rem;
    $borderColor: #555;

    position: relative;
    width: 100%;
    max-width: 100%;
    min-height: 4rem;

    margin: {
      left: $arrowSize + 12/16;
    }

    padding: {
      top: 0.8rem;
      bottom: 0.8rem;
      left: 0.8rem;
      right: 0.8rem;
    }

    background: #fff;
    border: solid 2px $borderColor;
    box-sizing: border-box;
    border-radius: 0.375rem;
    font-size: 0.875rem;

    @mixin arrow($size, $color) {
      content: '';
      position: absolute;
      bottom: 0.8rem;
      left: $size * -2;
      margin-bottom: $size * -1;
      border: $size solid transparent;
      border-right: $size solid $color;
      transform: scaleY(0.8);
      transform-origin: right center;
    }

    &::before {
      @include arrow($arrowSize, white);
      z-index: 2;
    }

    &::after {
      @include arrow($arrowSize + (3 / 16), $borderColor);
      z-index: 1;
    }

    p {
      margin: 0;
      padding: 0;
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
