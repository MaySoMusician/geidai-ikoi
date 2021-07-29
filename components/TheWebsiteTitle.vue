<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex
        :class="{
          [$style.HeaderLogoContainer]: true,
          [$style.HeaderLogoContainerTrueWhite]: mobileMenuOpen,
        }"
        direction="row"
      >
        <CLink as="nuxt-link" d="block" to="/" :_focus="{}">
          <SvgLogoTitle :class="[$style.HeaderLogoTitle]" />
        </CLink>
        <AppSpacer :d="{ sm: 'none' }" />
        <MobileMenuOpener
          :d="{ sm: 'none' }"
          mr="2"
          :z-index="1450"
          :open="mobileMenuOpen"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
      </CFlex>
      <CFlex :class="[$style.HeaderLinksOuter]">
        <CFlex
          :class="[$style.HeaderLinks]"
          direction="row"
          justify="center"
          align="center"
          flex-wrap="wrap"
          text-align="center"
          font-size="0.8rem"
        >
          <CLink as="nuxt-link" d="block" to="/" :_focus="{}" mr="1.2rem">
            <SvgLogoTitle :class="[$style.HeaderLogoTitleDesktop]" />
          </CLink>

          <CLink
            v-for="(link, index) in headerLinks"
            :key="index"
            :class="[$style.HeaderLinkItem]"
            :as="!link.external && link.link ? 'nuxt-link' : 'a'"
            :to="link.link"
            >{{ link.text }}</CLink
          >
          <WebsiteHeaderTwitterLink font-size="0.7rem" :py="0" min-w="5em" />
        </CFlex>
      </CFlex>
    </CBox>
    <transition name="slide" mode="out-in" @after-enter="() => {}">
      <CFlex
        v-if="mobileMenuOpen"
        :class="[$style.MobileMenu]"
        text-align="center"
        font-size="1rem"
        direction="column"
      >
        <CLink
          v-for="(link, index) in headerLinks"
          :key="index"
          :as="!link.external && link.link ? 'nuxt-link' : 'a'"
          :to="link.link"
          :py="3"
          >{{ link.text }}</CLink
        >
        <WebsiteHeaderTwitterLink />
      </CFlex>
    </transition>
    <CBox :class="[$style.AboveTheFold]">
      <AppNuxtImgImitated
        :class="[$style.AboveTheFoldBackground]"
        original-src="/photo-ikoi06.jpg"
        :original-width="5504"
        :original-height="3096"
        original-format="jpg"
        :sizes="{ xs: 100, sm: 100, md: 100, lg: 100 }"
        payload-source="about"
      />
      <div class="ShapeDivider1" role="presentation">
        <SvgShapeDivider1 />
      </div>
    </CBox>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgLogoTitle from '~/assets/logoTitle.min.svg?inline'
import SvgShapeDivider1 from '~/assets/shapeDivider1.svg?inline'

type Data = {
  headerLinks: { text: string; link: string; external: boolean }[]
  mobileMenuOpen: boolean
}

export default Vue.extend<Data, unknown, unknown, unknown>({
  components: { SvgLogoTitle, SvgShapeDivider1 },
  data() {
    return {
      headerLinks: [
        { text: '憩いとは', link: '/intro/', external: false },
        { text: '運営より', link: '/about/', external: false },
        { text: '募集案内', link: '', external: false },
      ],
      mobileMenuOpen: false,
    }
  },
})
</script>

<style lang="scss" scoped>
$slideDuration: 0.8s;
@include slideAnimation('slide', $slideDuration);

.slide {
  &-enter-active,
  &-leave-active {
    transition: background-color $slideDuration cubic-bezier(0.33, 1, 0.68, 1);
  }

  &-enter,
  &-leave-to {
    background-color: rgba(255, 255, 255, 88%);
  }
}

.ShapeDivider1 {
  position: absolute;
  bottom: -2px; // avoid gap when the height is sub pixel
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: min(35px, 6.5vw);
  }
  .shape-fill {
    fill: #ffffff;
  }
}
</style>

<style lang="scss" module>
@import '~assets/abstracts/_header.scss';
/* The following variables are defined there: $radius1, $bg */

.Header {
  &Links {
    &Outer {
      position: absolute;
      background: $bg;
      z-index: 1;

      @media screen and (min-width: 30em) {
        width: 100%;
      }
    }
  }

  &LinkItem {
    padding: {
      top: 0.25rem;
      bottom: 0.3rem;
      left: 1rem;
      right: 1rem;
    }
    min-width: 5em;
  }
}

/* .MobileMenu is defined in _header.scss */

.AboveTheFold {
  padding: {
    bottom: 14rem;
  }

  margin: {
    bottom: 1.3rem;
  }

  &Background {
    object-position: 50% 68%;
  }
}

/* Layout configurations */
.Header {
  &Logo {
    &TitleDesktop {
      display: none;
    }

    @media screen and (min-width: 30em) {
      &Container {
        border-bottom-right-radius: $radius1;
      }
      &Title {
        display: none;
      }
      &TitleDesktop {
        display: block;
        height: 0.8rem;
      }
    }
  }
  &Links {
    &Outer {
      display: none;
    }

    @media screen and (min-width: 30em) {
      &Outer {
        display: flex;
        flex-direction: column;
        place-content: center;
      }
    }
  }
}
</style>
