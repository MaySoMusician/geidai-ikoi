<template>
  <CFlex
    :id="anchor"
    as="section"
    :class="[$style.Container]"
    :direction="flexDirection"
  >
    <div :class="[$style.Picture, $style.VerticallyCenter, classPosition1]">
      <AppNuxtImgImitated
        :original-src="pictureSrc"
        :original-width="pictureWidth"
        :original-height="pictureHeight"
        :original-format="format"
        :sizes="{ xs: 100, sm: 100, md: 50, lg: 50 }"
        :payload-source="pictureSource"
      />
    </div>
    <CBox :class="[$style.Content, $style.VerticallyCenter, classPosition2]">
      <div>
        <slot />
      </div>
    </CBox>
  </CFlex>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

type LeftRight = 'left' | 'right'

type Data = {
  format: string
  flexDirection: { base: string; md: string }
  classPosition1: string
  classPosition2: string
}

type Props = {
  pictureSrc: string
  pictureWidth: number
  pictureHeight: number
  pictureSource: string
  picturePosition: LeftRight
  anchor: string
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    pictureSrc: {
      type: String,
      required: true,
    },
    pictureWidth: {
      type: Number,
      required: true,
    },
    pictureHeight: {
      type: Number,
      required: true,
    },
    pictureSource: {
      type: String,
      required: true,
    },
    picturePosition: {
      type: String as PropType<LeftRight>,
      required: true,
    },
    anchor: {
      type: String,
      default: undefined,
    },
  },
  data() {
    const directionNormal = { base: 'column', md: 'row' }
    const directionReverse = { base: 'column', md: 'row-reverse' }
    return {
      format: this.pictureSrc.split('.').pop() || '',
      flexDirection:
        this.picturePosition === 'left' ? directionNormal : directionReverse,
      classPosition1:
        this.picturePosition === 'left'
          ? this.$style.PositionLeft
          : this.$style.PositionRight,
      classPosition2:
        this.picturePosition === 'left'
          ? this.$style.PositionRight
          : this.$style.PositionLeft,
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

  /* &:not(:last-child) {
      padding: {
        bottom: 4rem;
      }
    } */
}

.Picture,
.Content {
  width: 100%;
  margin: {
    left: auto;
    right: auto;
  }

  @media screen and (min-width: 48em) {
    width: 50%;
  }
}

.Picture {
  height: auto;
  object-fit: contain;
  max-width: 30rem;
  @media screen and (min-width: 48em) {
    max-width: unset;
  }
}

.Content {
  padding: {
    top: 3rem;
  }

  @media screen and (min-width: 48em) {
    padding: {
      top: 0;
    }
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
