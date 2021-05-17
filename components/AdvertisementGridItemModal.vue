<template>
  <CModal v-bind="$attrs">
    <CModalContent>
      <CModalHeader></CModalHeader>
      <CModalCloseButton />
      <CModalBody :pt="3">
        <img
          v-if="thumbnail === 'WHATS_THIS'"
          src="~assets/whatsThis.min.svg"
          :class="[$style.SendenItemModalThumbnail]"
        />
        <CImage
          v-else-if="thumbnail"
          :src="thumbnail"
          size="100%"
          max-w="512px"
        />

        <CFlex justify="center" direction="column" :pt="2">
          <CBox v-if="title" text-align="start" font-weight="bold">{{
            title
          }}</CBox>
          <CBox v-if="description" text-align="start" :px="1">{{
            description
          }}</CBox>
          <CBox v-if="author" text-align="end">{{ author }}</CBox>
        </CFlex>
        <CFlex justify="center" :pb="2">
          <CButton
            variant-color="blue"
            variant="solid"
            size="sm"
            min-w="5em"
            font-weight="normal"
            @click="$emit('clickDetails')"
            >詳細</CButton
          >
        </CFlex></CModalBody
      >
      <!-- <CModalFooter></CModalFooter> -->
    </CModalContent>
    <CModalOverlay />
  </CModal>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {}

type Methods = {}

type Computed = {}

type Props = {
  thumbnail?: string
  title?: string
  description?: string
  author?: string
  link?: string
}

export default Vue.extend<Data, Methods, Computed, Props>({
  props: {
    thumbnail: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
})
</script>

<style lang="scss" module>
.Senden {
  &Item {
    &Modal {
      &Thumbnail {
        height: 80%;
        width: 80%;
        max-width: 512px;
        margin: 0 auto;
      }
    }
  }
}
</style>
