<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex
        :class="[$style.HeaderLogoContainer]"
        direction="row"
        rounded-bottom="0.5rem"
      >
        <CLink as="nuxt-link" d="block" to="/meet/" :_focus="{}">
          <img
            :class="[$style.HeaderLogoImage]"
            src="https://via.placeholder.com/96"
          />
        </CLink>
      </CFlex>
      <CFlex :class="[$style.HeaderLinksOuter]" rounded-bottom-right="0.5rem">
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
        </CFlex>
      </CFlex>
    </CBox>
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
}

export default Vue.extend<Data, unknown, unknown, unknown>({
  data() {
    return {
      headerLinks: [
        { text: 'TOP', link: '/', external: false },
        { text: '憩いとは', link: '', external: false },
        { text: '運営より', link: '/about/', external: false },
        { text: '募集案内', link: '', external: false },
      ],
    }
  },
})
</script>

<style lang="scss" module>
.Header {
  $bg: rgba(255, 255, 255, 88%);
  position: relative;

  &Logo {
    &Container {
      position: absolute;
      background: $bg;
      z-index: 1;

      @media screen and (min-width: 30em) {
        margin: {
          left: 1.3rem;
        }
      }
    }

    &Image {
      padding: {
        top: 0.1rem;
        bottom: 0.2rem;
        left: 0.3rem;
        right: 0.3rem;
      }
    }
  }

  &Links {
    padding: {
      top: 0.3rem;
      bottom: 0.3rem;
    }

    &Outer {
      position: absolute;
      background: $bg;
      z-index: 1;

      margin: {
        left: calc(96px + 0.6rem);
      }

      @media screen and (min-width: 30em) {
        margin: {
          left: calc(1.3rem + 96px + 0.6rem);
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

.AboveTheFold {
  position: relative;
  overflow: hidden;

  padding: {
    bottom: 12rem;
  }

  margin: {
    bottom: 1.3rem;
  }

  &Background {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 66%;
    z-index: 0;
  }
}
</style>
