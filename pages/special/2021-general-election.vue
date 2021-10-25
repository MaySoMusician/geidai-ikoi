<template>
  <div>
    <TheWebsiteTitle />

    <DocSectionTwoColumns
      :class="[$style.Section1]"
      :classes-column1="[$style.Section1Picture]"
      :classes-column2="[$style.Section1Content]"
      direction="reversed"
    >
      <template #column1>
        <AppNuxtImgImitated
          original-src="/illust-election1.png"
          :original-width="1000"
          :original-height="709"
          original-format="png"
          payload-source="noop/index"
          :sizes="{ xs: 100, sm: 100, md: 100, lg: 50 }"
        />
        <!--  -->
      </template>
      <template #column2>
        <div>
          <div>
            <CHeading
              as="h2"
              class="dummy"
              font-size="2.5rem"
              line-height="120%"
              font-weight="bold"
              letter-spacing="0.0625rem"
              text-align="left"
              >そうだ、<br />選挙に行こう</CHeading
            >
          </div>

          <CBox mt="2rem">
            <CBox mb="2.5rem">
              <CText :class="[$style.ScheduleHeading]">投開票</CText>
              <CText :class="[$style.ScheduleDate]"
                ><span :class="[$style.ScheduleDigit]">10</span>月<span
                  :class="[$style.ScheduleDigit]"
                  >31</span
                >日 (<span :class="[$style.Sunday]">日</span>)</CText
              >
            </CBox>
            <CBox mb="1.2rem">
              <CText :class="[$style.ScheduleHeading]">期日前投票</CText>
              <CText :class="[$style.ScheduleDate]"
                ><span :class="[$style.ScheduleDigit]">10</span>月<span
                  :class="[$style.ScheduleDigit]"
                  >20</span
                >日 (水)</CText
              >
              <CText :class="[$style.ScheduleDate]" :mt="1"
                ><CText as="span" font-size="150%">～</CText
                ><span :class="[$style.ScheduleDigit]">10</span>月<span
                  :class="[$style.ScheduleDigit]"
                  >30</span
                >日 (<span :class="[$style.Saturday]">土</span>)</CText
              >
            </CBox>
          </CBox>
        </div>
      </template>
    </DocSectionTwoColumns>

    <DocSectionTwoColumns
      :class="[$style.Section2]"
      :classes-column1="[$style.Section2Picture]"
      :classes-column2="[$style.Section2Content]"
      direction="normal"
    >
      <template #column1>
        <AppNuxtImgImitated
          original-src="/illust-question1.png"
          :original-width="1000"
          :original-height="893"
          original-format="png"
          payload-source="noop/index"
          :sizes="{ xs: 100, sm: 100, md: 100, lg: 50 }"
        />
      </template>
      <template #column2>
        <div>
          <div>
            <CHeading
              as="h2"
              class="dummy"
              font-size="2.5rem"
              line-height="120%"
              font-weight="bold"
              letter-spacing="0.0625rem"
              text-align="left"
              >投票先<br />どうすればいいの？</CHeading
            >
          </div>

          <CBox :my="6" letter-spacing="0.0875rem" line-height="1.7">
            <CText :mb="1"
              >いざ投票所に来ても「誰に投票していいかわからない……」</CText
            >
            <CText :mb="4">悩んでしまう方は多いのではないでしょうか？</CText>
            <CText :mb="4"
              >近年は、投票率を上げるべく、それぞれの候補者のプロフィールや各政党の公約をまとめたり、過去の公約の達成度を計測したりし、投票先を選びやすくする取り組みも増えてきています。</CText
            >
            <CText :mb="4"
              >JAPAN CHOICEの<CLink
                href="https://japanchoice.jp/vote-navi/"
                is-external
                >投票ナビ</CLink
              >では、16個の質問に答えるだけで各政党の公約と自分の意見のマッチング度を測ることができます。</CText
            >
            <CText
              >また、自分の選挙区の候補者一覧をみたり、争点別に公約を比較したり、これまでの内閣支持率をチェックしたりする機能もあります。ぜひ使ってみてください。</CText
            >
          </CBox>
          <CFlex justify="center" align="center">
            <AppButton
              as="a"
              text="投票ナビ"
              href="https://japanchoice.jp/vote-navi/"
              rel="noopener noreferrer"
              target="_blank"
            />
          </CFlex>
          <CFlex
            :mt="2"
            justify="center"
            align="center"
            direction="column"
            text-align="center"
            color="gray.400"
            font-size="0.65rem"
            font-weight="400"
          >
            <CText>
              JAPAN CHOICEは、NPO法人Mielkaが運営するウェブサイトです。
            </CText>
            <CText
              >JAPAN
              CHOICE内で入力されたデータ等は、オンライン憩いには一切共有されません。</CText
            >
            <CText
              >ウェブサイト内で発生した損害等については、オンライン憩いは一切責任を負いません。<CLink
                href="https://japanchoice.jp/terms-of-service"
                is-external
                >利用規約</CLink
              >をご確認ください。</CText
            >
          </CFlex>
        </div>
      </template>
    </DocSectionTwoColumns>

    <CFlex
      :mt="6"
      justify="center"
      align="center"
      direction="column"
      text-align="center"
    >
      <CHeading color="gray.400" font-size="0.9rem" font-weight="500" :mb="2"
        >Attributions</CHeading
      >
      <CBox color="gray.400" font-size="0.65rem" font-weight="400">
        <CLink
          d="block"
          href="https://www.freepik.com/free-vector/isometric-election-flowchart-composition-with-human-characters-voters-political-figures-teams-with-text-captions_13767763.htm"
          is-external
          >Vector created by macrovector - www.freepik.com</CLink
        >
        <CLink
          d="block"
          href="https://www.vecteezy.com/vector-art/1218825-group-of-people-holding-question-mark-icons"
          is-external
          >Question Vectors by Vecteezy</CLink
        >
      </CBox>
    </CFlex>

    <transition name="fade2" mode="out-in" appear @after-enter="() => {}">
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
  head() {
    return {
      title: 'そうだ、選挙に行こう（衆議院選挙2021 特設サイト）',
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
/* .Section {
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
} */
/* @media screen and (min-width: 48em) {
  .VerticallyTop {
    align-self: start;
  }
} */

.Section1 {
  position: relative;
  background: #accaec;
  padding: {
    top: 3rem;
    bottom: 3rem;
  }

  color: white;
  text-shadow: -2px 2px 8px rgb(91 115 163);

  &Picture,
  &Content {
    width: 100%;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &Picture {
    height: auto;
    object-fit: contain;
    max-width: 30rem;

    > .Attribution {
      margin-top: -0.5rem;
      text-align: right;
    }

    @media screen and (min-width: 48em) {
      width: 50%;
      max-width: unset;

      > img {
        position: absolute;
        top: 5%;
        right: 0;
        width: 63%;
      }

      > .Attribution {
        bottom: 0.15rem;
        right: 0.3rem;
        position: absolute;
        text-align: right;
      }
    }
  }

  &Content {
    padding: {
      top: 3rem;
    }

    @media screen and (min-width: 48em) {
      width: 50%;
      padding: {
        top: 0;
      }
      z-index: 10;
    }
  }
}

.Section2 {
  padding: {
    top: 3rem;
    bottom: 3rem;
  }

  &Picture,
  &Content {
    width: 100%;
    margin: {
      left: auto;
      right: auto;
    }
  }

  &Picture {
    height: auto;
    object-fit: contain;
    max-width: 30rem;

    @media screen and (min-width: 48em) {
      width: 40%;
      max-width: unset;
    }
  }

  &Content {
    padding: {
      top: 3rem;
    }

    p a {
      color: #3f588b;
      font-weight: 600;
    }

    @media screen and (min-width: 48em) {
      width: 60%;
      padding: {
        top: 0;
      }
    }
  }
}

.Schedule {
  &Heading {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 100%;
    margin: {
      bottom: 0.8rem;
    }
  }
  &Date {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 100%;
    padding: {
      left: 0.4rem;
    }

    .Saturday {
      color: #0953fb;
    }
    .Sunday {
      color: #cf1f1f;
    }
  }
  &Digit {
    font-size: 200%;
    font-weight: 700;
    line-height: 100%;
    margin: {
      left: 0.16em;
      right: 0.12em;
    }
  }
}
</style>
