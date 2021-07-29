<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex
        :class="{
          [$style.HeaderLogoContainer]: true,
          [$style.HeaderLogoContainerTrueWhite]: mobileMenuOpen,
        }"
        justify="center"
      >
        <CLink as="nuxt-link" d="block" to="/" :_focus="{}">
          <img :class="[$style.HeaderLogoImage]" src="/logo-placeholder1.png" />
          <SvgLogoTitle :class="[$style.HeaderLogoTitle]" />
        </CLink>

        <CBox
          :class="[$style.HeaderLinks, $style.LinksVertical]"
          text-align="center"
          font-size="1rem"
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
        </CBox>
        <AppSpacer :d="{ sm: 'none' }" />
        <MobileMenuOpener
          :d="{ sm: 'none' }"
          mr="2"
          :z-index="1450"
          :open="mobileMenuOpen"
          @click="mobileMenuOpen = !mobileMenuOpen"
        />
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
      <nuxt-img
        :class="[$style.AboveTheFoldBackground]"
        src="/photo-ikoi06.jpg"
        width="5504"
        height="3096"
        format="jpg"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw"
      />
      <div class="ShapeDivider1" role="presentation">
        <SvgShapeDivider1 />
      </div>
      <client-only>
        <transition name="fade">
          <CFlex
            v-if="!userSignedIn"
            key="signIn"
            :class="[$style.AboveTheFoldSignInButtons]"
            direction="column"
          >
            <IndexSignInButton
              title="音楽学部生"
              @click="$emit('clickMusicStudentSignIn')"
            />
            <IndexSignInButton
              title="美術学部生・その他の学生"
              @click="$emit('clickOthersSignIn')"
            />
          </CFlex>
          <CFlex
            v-else
            key="signOut"
            :class="[$style.AboveTheFoldSignInButtons]"
            direction="column"
          >
            <IndexSignOutButton title="" @click="$emit('clickSignOut')" />
          </CFlex>
        </transition>
      </client-only>
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

type Computed = {
  userSignedIn: boolean
}

export default Vue.extend<Data, unknown, Computed, unknown>({
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
  computed: {
    userSignedIn() {
      return !!this.$accessor.user
    },
  },
})
</script>

<style lang="scss" scoped>
$slideDuration: 0.8s;
@include slideAnimation('slide', $slideDuration);
@include fadeEaseOutCubic('fade', $globalFadeDuration, 0s);

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
    fill: url(#divider-gradient-1);
  }
  #divider-gradient-1 {
    --color-stop-1: var(--theme-colors-ebb);
  }
}
</style>

<style lang="scss" module>
@import '~assets/abstracts/_header.scss';
/* The following variables are defined there: $radius1, $bg */

$pad1: 0rem;
$pad2: 1.3rem;

.Header {
  &Links {
    > div,
    > a {
      margin: 0 1rem;
    }
  }
}

/* .MobileMenu is defined in _header.scss */

.AboveTheFold {
  padding: {
    bottom: 25rem;
  }

  &Background {
    object-position: 50% 56%;
  }

  &SignInButtons {
    position: absolute;
    width: calc(100% - (#{$pad1} * 2));
    max-width: 15em;
    z-index: 1;

    > button:not(:last-child) {
      margin: {
        bottom: 0.8rem;
      }
    }
  }
}

/* Layout configurations */
.Header {
  &Logo {
    &Image {
      display: none;
    }

    @media screen and (min-width: 30em) {
      &Container {
        margin: {
          left: $pad2;
        }
        border-bottom-left-radius: $radius1;
        border-bottom-right-radius: $radius1;
      }

      &Image {
        display: block;
      }
    }
  }
}

.Links {
  &Vertical {
    display: none;
  }

  @media screen and (min-width: 30em) {
    &Vertical {
      display: flex;
      flex-direction: column;
      place-content: center;
    }
  }
}

.AboveTheFold {
  margin: {
    // bottom: 0.6rem;
  }
  &SignInButtons {
    bottom: calc(0.6rem + 20px);
    right: 50%;
    transform: translateX(50%);
  }

  @media screen and (min-width: 30em) {
    margin: {
      // bottom: $pad2;
    }
    &SignInButtons {
      bottom: calc(#{$pad2} + 20px);
      right: $pad2;
      transform: unset;
    }
  }
}
</style>
