<template>
  <CBox>
    <CBox :class="[$style.Header]">
      <CFlex :class="[$style.HeaderLogoContainer]" direction="column">
        <img
          :class="[$style.HeaderLogoImage]"
          src="https://via.placeholder.com/96"
        />
        <span>オンライン</span><span>憩い</span>
      </CFlex>
      <CFlex :class="[$style.HeaderLinks]">
        <CBox>TOP</CBox>
        <CBox>PAGE1</CBox>
        <CBox>PAGE1</CBox>
        <CBox>PAGE1</CBox>
      </CFlex>
    </CBox>
    <CBox :class="[$style.AboveTheFold]">
      <img :class="[$style.AboveTheFoldBackground]" src="~/assets/ikoi.jpg" />
      <CBox :class="[$style.AboveTheFoldSubtitle]"
        >「憩い」と呼ばれる場所がある</CBox
      >
    </CBox>
    <!-- <CLink :class="[$style.AboutIkoi]" as="nuxt-link" to="/"
      >憩いについて</CLink
    > -->
  </CBox>

  <!-- <CHeading as="h1" text-align="center" :mt="3" :mb="4" :class="[$style.Title]">
    <CLink as="nuxt-link" to="/" :_hover="{ textDecoration: 'none' }">
      <AppSvgIconCoffee /><span>オンライン憩い</span><AppSvgIconCoffee />
    </CLink>
  </CHeading> -->
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend<unknown, unknown, unknown, unknown>({})
</script>

<style lang="scss" module>
.Title span {
  vertical-align: middle;
  margin: {
    left: 6px;
    right: 6px;
  }
  font-size: 1.65rem;

  @media screen and (min-width: 30em) {
    font-size: 1.875rem;
  }
}

.Header {
  position: relative;

  &Logo {
    &Container {
      position: absolute;
      background: white;
      z-index: 1;

      margin: {
        left: 0.3rem;
      }

      > span {
        line-height: 110%;
        text-align: center;
      }
    }

    &Image {
      padding: 0.1rem 0.3rem;
    }
  }

  &Links {
    margin: {
      left: 7.5rem;
    }
    padding: {
      top: 0.3rem;
      bottom: 0.3rem;
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
    bottom: 20rem;
  }

  margin: {
    bottom: 0.5rem;
  }

  &Background {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    z-index: 0;
  }

  &Subtitle {
    position: absolute;
    color: white;
    font-weight: 500;
    bottom: 1rem;
    right: 1rem;
    font-size: 1.7rem;
    text-shadow: 1px 1px 2px #1f1f1f;
  }
}

.AboutIkoi {
  display: block;
  text-align: end;
}
</style>
