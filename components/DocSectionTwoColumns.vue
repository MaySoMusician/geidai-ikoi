<template>
  <CFlex
    :id="anchor"
    as="section"
    :class="[$style.Container]"
    :direction="flexDirection"
  >
    <div :class="classes1">
      <slot name="column1" />
    </div>
    <div :class="classes2">
      <slot name="column2" />
    </div>
  </CFlex>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export type Direction = 'normal' | 'reversed'

type Data = {
  flexDirection: { base: string; md: string }
  classes1: string[]
  classes2: string[]
}

type Props = {
  anchor: string
  classesColumn1: string[]
  classesColumn2: string[]
  direction: Direction
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    anchor: {
      type: String,
      default: undefined,
    },
    classesColumn1: {
      type: Array,
      default: undefined,
    },
    classesColumn2: {
      type: Array,
      default: undefined,
    },
    direction: {
      type: String as PropType<Direction>,
      required: true,
    },
  },
  data() {
    const directionNormal = { base: 'column', md: 'row' }
    const directionReverse = { base: 'column', md: 'row-reverse' }
    const classPosition1 =
      this.direction === 'normal'
        ? this.$style.PositionLeft
        : this.$style.PositionRight
    const classPosition2 =
      this.direction === 'normal'
        ? this.$style.PositionRight
        : this.$style.PositionLeft

    return {
      flexDirection:
        this.direction === 'normal' ? directionNormal : directionReverse,
      classes1: [this.$style.VerticallyCenter, classPosition1].concat(
        this.classesColumn1
      ),
      classes2: [this.$style.VerticallyCenter, classPosition2].concat(
        this.classesColumn2
      ),
    }
  },
})
</script>

<style lang="scss" module>
.Container {
  padding: {
    top: 6rem;
    bottom: 6rem;
    left: 0.6rem;
    right: 0.6rem;
  }
}

.PositionLeft,
.PositionRight {
  padding: {
    left: 0.8rem;
    right: 0.8rem;
  }
}

@media screen and (min-width: 48em) {
  .PositionLeft {
    padding: {
      left: 4.2%;
      right: 2.7%;
    }
  }
  .PositionRight {
    padding: {
      left: 2.4%;
      right: 4.2%;
    }
  }

  .VerticallyCenter {
    display: flex;
    place-items: center;
  }
}
</style>
