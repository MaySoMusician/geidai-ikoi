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

        <CFlex justify="center" direction="column" :py="3">
          <CHeading
            v-if="title"
            as="h2"
            text-align="start"
            font-size="1.125rem"
            font-weight="bold"
            >{{ title }}</CHeading
          >
          <CBox v-if="description" text-align="start" :px="1">{{
            description
          }}</CBox>
          <CBox v-if="author" text-align="end"
            ><span :class="[$style.SendenItemModalAuthor]">{{
              author
            }}</span></CBox
          >
        </CFlex>
        <CFlex justify="center" :pb="2">
          <template v-if="link">
            <CButton
              v-if="link.startsWith('/')"
              as="nuxt-link"
              v-bind="linkButtonAttrs"
              :to="link"
              @click="$emit('clickDetails')"
              >{{ linkText }}</CButton
            >
            <CButton
              v-else
              as="a"
              v-bind="linkButtonAttrs"
              :href="link"
              @click="$emit('clickDetails')"
              >{{ linkText }}</CButton
            >
          </template>
        </CFlex></CModalBody
      >
      <!-- <CModalFooter></CModalFooter> -->
    </CModalContent>
    <CModalOverlay />
  </CModal>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  linkButtonAttrs: Record<string, string>
}

type Methods = {}

type Computed = {}

type Props = {
  thumbnail?: string
  title?: string
  description?: string
  author?: string
  link?: string
  linkText: string
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
    linkText: {
      type: String,
      default: '詳細',
    },
  },
  data() {
    return {
      linkButtonAttrs: {
        variantColor: 'blue',
        variant: 'solid',
        size: 'sm',
        minW: '5em',
        fontWeight: 'normal',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }
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

      &Author {
        position: relative;
        z-index: 0;

        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          height: 1px;
          width: 2em;
          top: 50%;
          right: calc(100% + 0.18rem);
          border-bottom: 1px solid #1a202c;
          z-index: -1;
        }
      }
    }
  }
}
</style>
