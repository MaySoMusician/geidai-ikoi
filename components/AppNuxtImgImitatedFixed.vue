<template>
  <nuxt-img
    v-if="!imgNotLoaded"
    v-bind="$attrs"
    :src="originalSrc"
    :width="originalWidth"
    :height="originalHeight"
    :format="originalFormat"
    :sizes="getNuxtImgeSizes(sizes)"
    @load.native="$emit('load')"
  />
  <img
    v-else
    v-bind="$attrs"
    :src="imitatedSrc"
    :srcset="imitatedSrcSet"
    :sizes="imitatedSizes"
    :width="originalWidth"
    :height="originalHeight"
    @load="$emit('load')"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { VIEWPORTS } from '@/utils/constants'

type ImageSizes = Record<keyof typeof VIEWPORTS, number>

type Data = {
  imitatedSrc: string
  imitatedSrcSet: string
  imitatedSizes: string
  imgNotLoaded: boolean
}

type Methods = {
  getNuxtImgeSizes(sizes: ImageSizes): string
}

type Props = {
  originalSrc: string
  originalWidth: number
  originalHeight: number
  originalFormat: string
  sizes: ImageSizes
  payloadSource: string
}

const _getNuxtImgeSizes = (sizes: ImageSizes) =>
  Object.entries(sizes)
    .map(([v, n]) => `${v}:${n}px`)
    .join(' ')

export default Vue.extend<Data, Methods, unknown, Props>({
  props: {
    originalSrc: {
      type: String,
      required: true,
    },
    originalWidth: {
      type: Number,
      required: true,
    },
    originalHeight: {
      type: Number,
      required: true,
    },
    originalFormat: {
      type: String,
      required: true,
    },
    sizes: {
      type: Object as PropType<ImageSizes>,
      required: true,
    },
    payloadSource: {
      type: String,
      required: true,
    },
  },
  data() {
    const options = {
      provider: 'static',
      modifiers: {
        width: this.originalWidth,
        height: this.originalHeight,
        format: this.originalFormat,
      },
      sizes: _getNuxtImgeSizes(this.sizes),
    }

    const { url } = this.$img.getImage(this.originalSrc, options)

    const imgNotLoaded = this.originalSrc === url

    return {
      imgNotLoaded,
      imitatedSrc: '',
      imitatedSrcSet: '',
      imitatedSizes: '',
    }
  },
  async mounted() {
    if (!this.imgNotLoaded) return

    const staticAssetsBase = (window as any).__NUXT__.staticAssetsBase

    const payloadUrl = `${staticAssetsBase}/${this.payloadSource}/payload.js`
    const payload = await fetch(payloadUrl).then((r) => r.text())

    const strData = /__NUXT_JSONP__\("\/.*", (.*)\)/.exec(payload)?.[1]

    if (!strData) return

    const data = JSON.parse(
      strData
        .replace('data:[', '"data":[')
        .replace('_img:{', '"_img":{')
        .replace('fetch:{', '"fetch":{')
        .replace('mutations:[', '"mutations":[')
    )
    const _img = data.data[0]._img

    const getUrl = (w: number) =>
      `/_ipx${this.originalSrc}?w=${w}&f=${this.originalFormat}`

    /* Prepare types and helpers */
    type Entries<T> = [keyof T, T[keyof T]][]
    type ImageSizesEntries = Entries<ImageSizes>

    const generateImitatedSizes = (sizes: ImageSizes) => {
      const sizesArray = Object.entries(sizes) as ImageSizesEntries
      if (sizesArray.length < 2) {
        return `${sizesArray[0][1]}px`
      }

      const last = sizesArray.pop() // Remove last element
      return (
        sizesArray
          .map(
            ([viewport, width]) =>
              `(max-width: ${VIEWPORTS[viewport]}px) ${width}px`
          )
          .join(', ') + `, ${last![1]}px`
      )
    }
    const generateImitatedSrcSet = (sizes: ImageSizes) =>
      (Object.entries(sizes) as ImageSizesEntries)
        .map(([_viewport, size]) => {
          const imgUrl = _img[getUrl(size)]
          return `${imgUrl} ${size}w`
        })
        .join(', ')

    /* Generate imitated values for <img> */
    const imitatedSrc = _img[getUrl(Object.values(this.sizes).slice(-1)[0])]
    const imitatedSrcSet = generateImitatedSrcSet(this.sizes)
    const imitatedSizes = generateImitatedSizes(this.sizes)

    this.imitatedSrc = imitatedSrc
    this.imitatedSrcSet = imitatedSrcSet
    this.imitatedSizes = imitatedSizes
  },
  methods: {
    getNuxtImgeSizes(sizes) {
      return _getNuxtImgeSizes(sizes)
    },
  },
})
</script>

<style></style>
