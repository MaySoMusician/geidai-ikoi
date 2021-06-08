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
    .map(([v, n]) => `${v}:${n}vw`)
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
    const root = `/_ipx${this.originalSrc}?f=${this.originalFormat}&s=`

    console.log(_img)

    /* Prepare types and helpers */
    type Entries<T> = [keyof T, T[keyof T]][]
    type ImageSizesEntries = Entries<ImageSizes>
    type ImageSizeQueries = Record<keyof typeof VIEWPORTS, string>

    const getHeight = (
      width: number,
      originalWidth: number,
      originalHeight: number
    ) => Math.round((width / originalWidth) * originalHeight)

    // { xs: '320_xxx', ... }
    const generateSizeQueries = (
      sizes: ImageSizes,
      originalWidth: number,
      originalHeight: number
    ) => {
      const sizesArray = Object.entries(sizes) as ImageSizesEntries
      const s: Partial<ImageSizeQueries> = {}

      for (const [viewport, width] of sizesArray) {
        const w = (VIEWPORTS[viewport] * width) / 100
        const h = getHeight(w, originalWidth, originalHeight)
        s[viewport] = `${w}_${h}`
      }
      return s as ImageSizeQueries
    }

    const generateImitatedSizes = (sizes: ImageSizes) => {
      const sizesArray = Object.entries(sizes) as ImageSizesEntries
      const last = sizesArray.pop() // Remove last element
      return (
        sizesArray
          .map(
            ([viewport, width]) =>
              `(max-width: ${VIEWPORTS[viewport]}px) ${width}vw`
          )
          .join(', ') + `, ${last![1]}vw`
      )
    }
    const generateImitatedSrcSet = (sizeQueries: ImageSizeQueries) =>
      (Object.entries(sizeQueries) as Entries<ImageSizeQueries>)
        .map(([_viewport, query]) => {
          const imgUrl = _img[`${root}${query}`]
          return `${imgUrl} ${query.split('_')[0]}w`
        })
        .join(', ')

    const sizeQueries = generateSizeQueries(
      this.sizes,
      this.originalWidth,
      this.originalHeight
    )

    /* Generate imitated values for <img> */
    const imitatedSrc =
      _img[`${root}${Object.values(sizeQueries).slice(-1)[0]}`]
    const imitatedSrcSet = generateImitatedSrcSet(sizeQueries)
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
