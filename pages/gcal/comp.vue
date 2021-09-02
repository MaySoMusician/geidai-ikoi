<template>
  <div>
    <TheWebsiteTitle />

    <CBox id="" as="section" :class="[$style.SectionContainer]" mb="">
      <CHeading as="h2">練習室予約カレンダー（作曲科）</CHeading>

      <CBox text-align="center" :mb="4">
        <CText
          >※動作未確認のため、予約手続き後に改めてカレンダーで確認してください。（<CLink
            href="#list"
            >カレンダーURL一覧</CLink
          >）</CText
        >
      </CBox>
      <CBox text-align="center">
        <CText>芸大アドレスでログインされているか確認してください。</CText>
      </CBox>

      <CBox
        position="relative"
        height="60px"
        role="presentation"
        aria-hidden="true"
      >
        <div class="DownArrow">
          <span></span>
        </div>
      </CBox>
      <CBox position="relative" height="100px">
        <iframe
          :class="[$style.CalendarAccountIndicator]"
          src=""
          :data-src="calendars[0] && calendars[0].calendarUrl"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </CBox>
      <CBox text-align="center">
        <CLink href="https://accounts.google.com/Logout?hl=ja" is-external
          >アカウントが間違っている場合は、こちらからログアウトしてください。</CLink
        >
      </CBox>
      <CBox text-align="center">
        上にメールアドレスが表示されてない場合、再ログインしたい場合は
        <CLink
          href="https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
          is-external
          >こちらから。</CLink
        >
      </CBox>
    </CBox>

    <CBox
      v-for="(calendar, index) in calendars"
      id=""
      :key="index"
      as="section"
      :class="[$style.SectionContainer]"
      mb=""
    >
      <CHeading as="h2">{{ calendar.title }}</CHeading>
      <CBox :class="[$style.CalendarOuter]">
        <iframe
          :class="[$style.CalendarNormal]"
          src=""
          :data-src="calendar.calendarUrl"
          frameborder="0"
        ></iframe>
      </CBox>
    </CBox>

    <CBox id="list" text-align="center">
      <CText :mb="2">カレンダーURL一覧</CText>
      <span v-for="(calendar, index) in calendars" :key="index">
        <span v-if="index !== 0"> ･ </span>
        <CLink
          :href="calendar.calendarUrl"
          display="inline-block"
          is-external
          >{{ calendar.title }}</CLink
        >
      </span>
    </CBox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'
import {
  fetchNotionTableData,
  isValidAppointmentCalendarItem,
  AppointmentCalendarItem,
} from '@/utils/notion'
// import { debugLog, debugError } from '@/utils/debug'

type Data = {
  showModal: boolean
  calendars: { calendarUrl: string; title: string }[]
}

type Computed = {
  colorMode: string
  theme: ChakraTheme
  toggleColorMode: ToggleColorModeFunction
}

type Methods = {
  load(): void
}

const vue = Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  middleware: ['auth'],
  data() {
    return {
      showModal: false,
      calendars: [],
    }
  },
  head() {
    return {
      title: '練習室予約カレンダー（作曲科）',
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
  async mounted() {
    await this.load()
    const iframes = document.querySelectorAll(
      'iframe[data-src]'
      // eslint-disable-next-line no-undef
    ) as NodeListOf<HTMLIFrameElement>

    iframes.forEach((iframe) => {
      iframe.src = iframe.getAttribute('data-src') || ''
    })
  },
  methods: {
    async load() {
      try {
        const rawItems = await fetchNotionTableData(
          this.$config.appointmentCalendarsId
        ).then((r) => r.json())
        if (Array.isArray(rawItems)) {
          const items = rawItems.filter((v) =>
            isValidAppointmentCalendarItem(v)
          ) as AppointmentCalendarItem[]

          this.calendars = items
            .filter((item) => item.category === 'COMP')
            .map((item) => ({ calendarUrl: item.url, title: item.title }))
        }
      } catch (e) {
      } finally {
        //
      }
    },
  },
})

export default vue
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade1', $globalFadeDuration, 0s);
@include fadeEaseOutCubic('fade2', $globalFadeDuration, 0.15s);
@include fadeEaseOutCubic('fade3', $globalFadeDuration, 0.3s);
@include fadeEaseOutCubic('fade4', $globalFadeDuration, 0.45s);

.DownArrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  $color: var(--theme-colors-santafe);

  span {
    display: block;
    width: 25px;
    height: 25px;
    border-bottom: 5px solid $color;
    border-right: 5px solid $color;
    transform: rotate(45deg);
    margin: -10px;
    animation: animate 2s infinite;
  }

  span:nth-child(2) {
    animation-delay: -0.2s;
  }
  span:nth-child(3) {
    animation-delay: -0.4s;
  }
}

$y: 10px;
@keyframes animate {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate($y * -1, $y * -1);
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate($y, $y);
  }
}

a {
  color: #3f588b;
}
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

.Calendar {
  &AccountIndicator {
    max-width: 300px;
    width: 100%;
    height: 3rem;
    overflow: hidden;
    transform: translate(35px, 80%) scale(1.8);
    margin: auto;
    /* clip-path: inset(0px 70px 20px 70%); */
    clip-path: inset(0px 70px 20px 0px);
  }

  &Normal {
    width: 100%;
    min-height: 600px;
    min-width: 550px;
    height: fit-content;
  }

  &Outer {
    overflow-x: auto;
  }
}
</style>
