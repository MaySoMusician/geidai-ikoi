<template>
  <div>
    <TheWebsiteTitle />

    <transition name="fade1" mode="out-in" appear>
      <DocSectionWithPicture
        picture-src="/illust-03.png"
        :picture-width="1194"
        :picture-height="937"
        picture-source="noop/index"
        picture-position="left"
        anchor="team"
      >
        <AppHeadingTwoLine line1="TEAM" line2="運営より" position="left" />
        <template v-for="(content, index) in contents">
          <CFlex
            :key="index"
            class="dummy"
            px="0.2rem"
            my="2rem"
            direction="column"
            align="stretch"
          >
            <CFlex justify="center" align="center" direction="row">
              {{ content.body }}
            </CFlex>
            <CBox :class="[$style.CommentAuthor]">
              <CText as="span"
                >&mdash;&mdash; {{ content.role }}&ensp;{{ content.name }}（{{
                  content.age
                }}）</CText
              >
            </CBox>
          </CFlex>
        </template>
      </DocSectionWithPicture>
    </transition>

    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
      <DocSectionTwoColumns
        direction="normal"
        :classes-column1="[$style.VerticallyTop, $style.ContactHeading]"
        :classes-column2="[$style.ContactContent]"
      >
        <template #column1>
          <AppHeadingTwoLine
            :class="[$style.ContactHeadingInner]"
            line1="CONTACTS"
            line2="お問い合わせ"
            position="left"
          />
        </template>
        <template #column2>
          <CList :class="[$style.ContactContentInner]" :spacing="4">
            <CListItem
              v-for="(contact, index) in contacts"
              :key="index"
              :class="[$style.ContactListItem]"
              font-size="1rem"
            >
              <CListIcon
                :icon="contact.icon"
                :color="contact.color || 'gray.500'"
                size="1.375rem"
              />
              <CText class="dummy" as="span" :mr="2">{{
                contact.prependText
              }}</CText>
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
        </template>
      </DocSectionTwoColumns>
    </transition>

    <transition name="fade3" mode="out-in" appear @after-enter="() => {}">
      <!-- <CBox id="attributions" as="section" :class="[$style.SectionContainer]">
        <CHeading as="h2">権利表示</CHeading>
        <CFlex justify="center"></CFlex>
      </CBox> -->
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
          age: '作曲5年',
          name: '姫野七弦',
        },
        {
          body: '開発担当しました。みんな使ってね～～～～',
          role: 'プログラマー',
          age: '旧作曲科',
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
@media screen and (min-width: 48em) {
  .VerticallyTop {
    align-self: start;
  }
}

.Comment {
  &Author {
    font-size: 0.875rem;
    margin-top: 0.2rem;
    > span {
      display: block;
      white-space: nowrap;
      text-align: right;
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

.Contact {
  &Heading,
  &Content {
    width: 100%;
    margin: {
      left: auto;
      right: auto;
    }

    @media screen and (min-width: 48em) {
      width: 50%;
    }
  }

  &Heading {
    &Inner {
      @media screen and (min-width: 48em) {
        padding: {
          left: 25%;
        }
      }
    }
  }

  &Content {
    flex-shrink: 0;
    &Inner {
      padding: {
        top: 3rem;
        left: 30%;
      }
      @media screen and (min-width: 48em) {
        padding: {
          top: 1rem;
          left: 10%;
        }
      }
    }
  }

  &List {
    &Item {
      > svg,
      > span,
      > a {
        vertical-align: middle;
      }
    }
  }
}
</style>
