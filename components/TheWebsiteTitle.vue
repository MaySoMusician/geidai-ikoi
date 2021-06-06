<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex :class="[$style.HeaderLogoContainer]" direction="row">
        <CLink as="nuxt-link" d="block" to="/" :_focus="{}">
          <img
            :class="[$style.HeaderLogoImage]"
            src="https://via.placeholder.com/96"
          />
        </CLink>
      </CFlex>
      <CFlex :class="[$style.HeaderLinksOuter]" direction="row" ml="">
        <CFlex
          :class="[$style.HeaderLinks]"
          direction="row"
          justify="center"
          text-align="center"
          font-size="0.8rem"
        >
          <CBox :pt="1" :pb="2">憩いとは</CBox>
          <CBox :pt="1" :pb="2">運営より</CBox>
          <CBox :pt="1" :pb="2">募集案内</CBox>
        </CFlex>
      </CFlex>
    </CBox>
    <CBox :class="[$style.AboveTheFold]">
      <img :class="[$style.AboveTheFoldBackground]" src="/photo-ikoi06.jpg" />
    </CBox>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend<unknown, unknown, unknown, unknown>({})
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

      margin: {
        left: 1.3rem;
      }
    }

    &Image {
      padding: 0.1rem 0.3rem;
      padding: {
        top: 0.1rem;
        bottom: 0.2rem;
        left: 0.2rem;
        right: 0.2rem;
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
      margin: {
        left: calc(1.3rem + 96px + 0.4rem);
      }
      z-index: 1;
    }

    > div {
      margin: 0 1rem;
    }
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
