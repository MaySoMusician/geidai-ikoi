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
          :class="[$style.HeaderLinks]"
          direction="column"
          justify="center"
          text-align="center"
          font-size="0.875rem"
        >
          <CBox :py="3">憩いとは</CBox>
          <CBox :py="3">運営より</CBox>
          <CBox :py="3">募集案内</CBox>
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
export default Vue.extend<unknown, unknown, unknown, unknown>({})
</script>

<style lang="scss" module>
.Header {
  position: relative;

  &Logo {
    &Container {
      position: absolute;
      background: rgb(255 255 255 / 88%);
      z-index: 1;

      margin: {
        left: 1.3rem;
      }
    }

    &Image {
      padding: 0.1rem 0.3rem;
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
}

.AboveTheFold {
  position: relative;
  overflow: hidden;

  padding: {
    bottom: 20rem;
  }

  margin: {
    bottom: 1.3rem;
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
    bottom: 1.3rem;
    right: 1.3rem;
    width: 80%;
    max-width: 15em;
    z-index: 1;

    > button:first-child {
      margin: {
        bottom: 0.8rem;
      }
    }
  }
}
</style>
