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

        <CBox
          :class="[$style.HeaderLinks, $style.LinksVertical]"
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
        </CBox>
      </CFlex>
    </CBox>
    <CBox :class="[$style.AboveTheFold]">
      <nuxt-img
        :class="[$style.AboveTheFoldBackground]"
        src="/photo-ikoi06.jpg"
        width="5504"
        height="3096"
        format="jpg"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw"
      />
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
        { text: '憩いとは', link: '/intro/', external: false },
        { text: '運営より', link: '/about/', external: false },
        { text: '募集案内', link: '', external: false },
      ],
    }
  },
})
</script>

<style lang="scss" module>
$pad1: 0rem;
$pad2: 1.3rem;
$radius1: 0.5rem;

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
      width: auto;
    }
  }

  &Links {
    padding: {
      top: 0.3rem;
      bottom: 0.3rem;
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

/* Layout configurations */
.HeaderLogo {
  &Container {
    width: 100%;
  }
  &Image {
    height: 64px;
    padding: {
      top: 0.125rem;
      bottom: 0.125rem;
      left: 0.3rem;
      right: 0.3rem;
    }
  }

  @media screen and (min-width: 30em) {
    &Container {
      margin: {
        left: $pad2;
      }
      border-bottom-left-radius: $radius1;
      border-bottom-right-radius: $radius1;
      width: auto;
    }
    &Image {
      height: 100%;
      padding: {
        top: 0.1rem;
        bottom: 0.2rem;
        left: 0.3rem;
        right: 0.3rem;
      }
    }
  }
}

.Links {
  &Vertical {
    display: none;
  }
  &Horizontal {
    display: flex;
  }

  @media screen and (min-width: 30em) {
    &Vertical {
      display: flex;
      flex-direction: column;
      place-content: center;
    }
    &Horizontal {
      display: none;
    }
  }
}

.AboveTheFold {
  margin: {
    bottom: 0.6rem;
  }
  &SignInButtons {
    bottom: 0.6rem;
    right: 50%;
    transform: translateX(50%);
  }

  @media screen and (min-width: 30em) {
    margin: {
      bottom: $pad2;
    }
    &SignInButtons {
      bottom: $pad2;
      right: $pad2;
      transform: unset;
    }
  }
}
</style>
