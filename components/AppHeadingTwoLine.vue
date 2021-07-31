<template>
  <div :id="anchor">
    <CHeading as="p" :class="[classPosition, $style.HeadingLine1]">{{
      line1
    }}</CHeading>
    <CHeading as="h2" :class="[classPosition, $style.HeadingLine2]">{{
      line2
    }}</CHeading>
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

  &Line1 {
    font-size: 3rem;
    letter-spacing: 1px;
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    line-height: 100%;
  }
  &Line2 {
    font-size: 1.5rem;
    letter-spacing: 1.4px;
    font-weight: bold;
    line-height: 100%;
    padding: {
      top: 0.5rem;
    }
  }
}
</style>
