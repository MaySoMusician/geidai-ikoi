<template>
  <!-- <img
    :class="[$style.EmojiCoffee]"
    draggable="false"
    alt="☕"
    src="https://twemoji.maxcdn.com/2/72x72/2615.png"
  /> -->
  <img
    :class="[$style.EmojiCoffee]"
    draggable="false"
    src="~assets/coffeeCup.min.svg"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend<unknown, unknown, unknown, unknown>({})
</script>

<style lang="scss" module>
.Emoji {
  &Coffee {
    display: inline;
    height: 2rem;
    vertical-align: middle;

    @media screen and (min-width: 30em) {
      height: 3rem;
    }
  }
}
</style>
