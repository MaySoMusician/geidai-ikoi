<template>
  <!-- https://codepen.io/avstorm/pen/RwNzPNN -->
  <SvgTea class="Tea" draggable="false" />
</template>

<script lang="ts">
import Vue from 'vue'
import SvgTea from '~/assets/loaderTea.min.svg?inline'

export default Vue.extend<unknown, unknown, unknown, unknown>({
  components: { SvgTea },
})
</script>

<style lang="scss" scoped>
.Tea {
  --color: #78828a;

  #teabag {
    transform-origin: top center;
    transform: rotate(3deg);
    animation: swing 3s infinite;
  }

  #steamL {
    stroke-dasharray: 65;
    stroke-dashoffset: 104;
    animation: steamLarge 2.5s 0.2s infinite;
  }

  #steamR {
    stroke-dasharray: 43;
    stroke-dashoffset: 69;
    animation: steamSmall 2.5s 0.2s infinite;
  }
}

@keyframes swing {
  50% {
    transform: rotate(-3deg);
  }
}

@keyframes steamLarge {
  0% {
    stroke-dashoffset: 104;
    opacity: 0.6;
  }
  100% {
    stroke-dashoffset: 195;
    opacity: 0;
  }
}

@keyframes steamSmall {
  10% {
    stroke-dashoffset: 69;
    opacity: 0.6;
  }
  80% {
    stroke-dashoffset: 129;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 129;
    opacity: 0;
  }
}
</style>
