<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex :class="[$style.HeaderLogoContainer]" direction="column">
        <CLink as="nuxt-link" d="block" to="/" :_focus="{}">
          <img
            :class="[$style.HeaderLogoImage]"
            src="https://via.placeholder.com/96"
          />
        </CLink>

        <CFlex
          :class="[$style.HeaderLinks, $style.LinksHorizontal]"
          direction="column"
          justify="center"
          text-align="center"
          font-size="0.875rem"
        >
          <CLink
            v-for="(link, index) in headerLinks"
            :key="index"
            :as="!link.external && link.link ? 'nuxt-link' : 'a'"
            :to="link.link"
            :py="3"
            >{{ link.text }}</CLink
          >
        </CFlex>
      </CFlex>
      <CFlex :class="[$style.HeaderLinksOuter, $style.LinksVertical]">
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
      <img :class="[$style.AboveTheFoldBackground]" src="/photo-ikoi06.jpg" />
      <CFlex :class="[$style.AboveTheFoldSignInButtons]" direction="column">
        <IndexSignInButton
          title="音楽学部生"
          @click="$emit('clickMusicStudentSignIn')"
        />
        <IndexSignInButton
          title="美術学部生・その他の学生"
          @click="$emit('clickOthersSignIn')"
        />
      </CFlex>
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
        { text: '憩いとは', link: '', external: false },
        { text: '運営より', link: '/about/', external: false },
        { text: '募集案内', link: '', external: false },
      ],
    }
  },
})
</script>

<style lang="scss" module>
$pad1: 0.6rem;
$pad2: 1.3rem;

.Header {
  $bg: rgba(255, 255, 255, 88%);
  position: relative;

  &Logo {
    &Container {
      position: absolute;
      background: $bg;
      z-index: 1;
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
        left: calc(#{$pad1} + 96px + 0.6rem);
      }

      @media screen and (min-width: 30em) {
        margin: {
          left: calc(#{$pad2} + 96px + 0.6rem);
        }
      }
    }

    > div {
      margin: 0 1rem;
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
    bottom: 21rem;
  }

  &Background {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 56%;
    z-index: 0;
  }

  &SignInButtons {
    position: absolute;
    width: calc(100% - (#{$pad1} * 2));
    max-width: 15em;
    z-index: 1;

    > button:first-child {
      margin: {
        bottom: 0.8rem;
      }
    }
  }
}

// margin
.HeaderLogoContainer {
  margin: {
    left: $pad1;
  }
}

.Links {
  &Vertical {
    display: flex;
  }
  &Horizontal {
    display: none;
  }
}

.AboveTheFold {
  margin: {
    bottom: $pad1;
  }
  &SignInButtons {
    bottom: $pad1;
    right: $pad1;
  }
}

@media screen and (min-width: 30em) {
  .HeaderLogoContainer {
    margin: {
      left: $pad2;
    }
  }

  .Links {
    &Vertical {
      display: none;
    }
    &Horizontal {
      display: flex;
    }
  }

  .AboveTheFold {
    margin: {
      bottom: $pad2;
    }
    &SignInButtons {
      bottom: $pad2;
      right: $pad2;
    }
  }
}
</style>
