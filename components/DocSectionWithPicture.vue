<template>
  <DocSectionTwoColumns
    :anchor="anchor"
    :classes-column1="[$style.Picture]"
    :classes-column2="[$style.Content]"
    :direction="direction"
  >
    <template #column1>
      <AppNuxtImgImitated
        :original-src="pictureSrc"
        :original-width="pictureWidth"
        :original-height="pictureHeight"
        :original-format="format"
        :sizes="{ xs: 100, sm: 100, md: 50, lg: 50 }"
        :payload-source="pictureSource"
      />
    </template>
    <template #column2>
      <div>
        <slot />
      </div>
    </template>
  </DocSectionTwoColumns>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Direction } from '@/components/DocSectionTwoColumns.vue'

type LeftRight = 'left' | 'right'

type Data = {
  format: string
  direction: Direction
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
    return {
      format: this.pictureSrc.split('.').pop() || '',
      direction: this.picturePosition === 'left' ? 'normal' : 'reversed',
    }
  },
})
</script>

<style lang="scss" module>
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
</style>
