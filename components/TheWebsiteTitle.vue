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
          <img
            :class="[$style.HeaderLogoImage]"
            src="https://via.placeholder.com/96"
          />
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
          flex-wrap="wrap"
          text-align="center"
          font-size="0.8rem"
        >
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
    </CBox>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  headerLinks: { text: string; link: string; external: boolean }[]
  mobileMenuOpen: boolean
}

export default Vue.extend<Data, unknown, unknown, unknown>({
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
@include slideAnimation('slide', 0.8s);
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
        width: calc(100% - 6.6rem);
        margin: {
          left: calc(6.6rem);
        }
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
    bottom: 12rem;
  }

  margin: {
    bottom: 1.3rem;
  }

  &Background {
    object-position: 50% 66%;
  }
}

/* Layout configurations */
.Header {
  &Logo {
    @media screen and (min-width: 30em) {
      &Container {
        border-bottom-right-radius: $radius1;
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
