<template>
  <div :id="anchor">
    <!-- overwrites default CHeading css here since they are at higher
    priority than $style styles -->
    <CHeading
      as="p"
      :class="[classPosition]"
      font-size="3rem"
      font-family="latin"
      line-height="100%"
      font-weight="bold"
      letter-spacing="0.0625rem"
      >{{ line1 }}</CHeading
    >
    <CHeading
      as="h2"
      :class="[classPosition]"
      font-size="1.5rem"
      line-height="100%"
      font-weight="bold"
      letter-spacing="0.0875rem"
      pt="0.5rem"
      >{{ line2 }}</CHeading
    >
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type Position = 'left' | 'center'

type Data = {
  classPosition: string
}

type Props = {
  line1: string
  line2: string
  position: Position
  anchor: string
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
      required: true,
    },
    position: {
      type: String as PropType<Position>,
      required: true,
    },
    anchor: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      classPosition:
        this.position === 'left'
          ? this.$style.HeadingLeft
          : this.$style.HeadingCenter,
    }
  },
})
</script>

<style lang="scss" module>
.Heading {
  &Left {
    text-align: left;
  }
  &Center {
    text-align: center;
  }
}
</style>
