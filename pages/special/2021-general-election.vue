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

    <CBox :class="[$style.Section3]">
      <CHeading
        as="h2"
        class="dummy"
        font-size="2.5rem"
        line-height="120%"
        font-weight="bold"
        letter-spacing="0.0625rem"
        text-align="center"
        >期日前投票所はどこ？</CHeading
      >

      <CBox :mt="4" text-align="center">
        <CText :mb="1">
          選挙に関心のある有志により、今回の選挙の期日前投票所マップが制作・公開されています。
        </CText>
        <CText
          >（<CLink
            href="https://xn--ldrs20bjha00j3wbt69c.jp/2016-sangiin/#member"
            is-external
            >「KIJIM@P」制作チーム</CLink
          >、その他有志）</CText
        >
      </CBox>

      <CBox :mt="8">
        <iframe
          src="https://www.google.com/maps/d/embed?mid=15MZfCVC1rMCLnQWaH7r0xHKP8aJX14mN"
          style="width: 100%; height: 80vh"
        ></iframe>
      </CBox>

      <CBox :mt="8" text-align="center">
        <CText :mb="1"
          ><CText as="span" font-weight="700">東京都以外</CText
          >の都道府県別のマップや期日前投票に関するデータや解説は<CLink
            href="https://xn--ldrs20bjha00j3wbt69c.jp/2021-shuugiin/"
            is-external
            >こちら</CLink
          >。</CText
        >
        <CText font-size="0.875rem">
          <CText as="span" font-weight="600"
            >自分の自治体のデータがありませんか？</CText
          >
          入力はボランティアによる手作業です。もしご協力いただける方は、<CLink
            href="https://note.com/hal_sk/n/n4ed1aea40220"
            is-external
            >こちらをご覧ください</CLink
          >。
        </CText>
      </CBox>

      <CBox :mt="8">
        <CBox text-align="center">
          <CHeading as="h3" font-size="1.2rem"
            >「期日前投票所マップ」 利用について・出典</CHeading
          >
        </CBox>
        <CBox :mt="4" font-size="0.8rem" max-w="32rem" mx="auto">
          <CText :mb="1" font-size="1rem">
            <strong>誰でも無料でお使い頂けます。</strong>
          </CText>
          <CText :mb="2">
            但し、下記の使用方法はマップ環境を提供元である「Google社」の規約に違反しますので、ご遠慮ください。
          </CText>
          <CList :ml="2" :mb="2" :spacing="1">
            <CListItem>
              <CListIcon
                icon="close"
                color="red.500"
              />スクリーンショットを撮影して、ウェブページに掲載する</CListItem
            >
            <CListItem
              ><CListIcon
                icon="close"
                color="red.500"
              />スクリーンショットを撮影して、配布物資料に掲載する</CListItem
            >
            <CListItem
              ><CListIcon
                icon="close"
                color="red.500"
              />地図を印刷・あるいは印刷物に掲載して、不特定多数に配布・販売する</CListItem
            >
          </CList>
          <CText :mb="4"
            >詳しくは<CLink
              href="https://www.google.co.jp/help/terms_maps/"
              is-external
              >Google マップ / Google Earth 追加利用規約</CLink
            >を参照下さい（Google社の規約）</CText
          >
          <CText
            >出典:
            <CLink
              href="https://xn--ldrs20bjha00j3wbt69c.jp/description/"
              is-external
              >期日前投票所マップ（KIJIM@P）</CLink
            ></CText
          >
        </CBox>
      </CBox>
    </CBox>

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

.Section3 {
  padding: {
    top: 3rem;
    bottom: 3rem;
    left: 1rem;
    right: 1rem;
  }

  @media screen and (min-width: 67em) {
    padding: {
      left: 0;
      right: 0;
    }
  }

  p a {
    color: #3f588b;
    font-weight: 600;
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
