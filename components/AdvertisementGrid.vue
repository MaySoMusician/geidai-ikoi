<template>
  <div>
    <CGrid :class="[$style.Senden]" v-bind="$attrs">
      <CPseudoBox
        v-for="(item, index) in itemsAvailable"
        :key="index"
        transition="all 0.3s"
        :_hover="{ opacity: 0.7, cursor: 'pointer' }"
        @click="viewDetails(index)"
      >
        <CImage :src="getAdvertiseThumbnail(index)" size="100%" />
      </CPseudoBox>
    </CGrid>
    <CModal
      :is-open="showModal"
      :on-close="closeDetails"
      is-centered
      :size="{ base: 'sm', sm: 'md', md: 'lg' }"
    >
      <CModalContent>
        <CModalHeader></CModalHeader>
        <CModalCloseButton />
        <CModalBody :pt="3">
          <template v-if="selectedItem">
            <CImage
              :src="getAdvertiseThumbnail(selectedIndex)"
              size="100%"
              max-w="512px"
            />
            <CFlex justify="center" direction="column" :pt="2">
              <CBox v-if="selectedItem.title" text-align="start">{{
                selectedItem.title
              }}</CBox>
              <CBox
                v-if="selectedItem.description"
                text-align="start"
                :px="1"
                >{{ selectedItem.description }}</CBox
              >
              <CBox text-align="end">{{ selectedItem.author }}</CBox>
            </CFlex>
            <CFlex justify="center" :pb="2">
              <CButton
                variant-color="blue"
                variant="solid"
                size="sm"
                min-w="5em"
                font-weight="normal"
                @click="openAdvertiseLink(selectedItem)"
                >詳細</CButton
              >
            </CFlex>
          </template></CModalBody
        >
        <!-- <CModalFooter></CModalFooter> -->
      </CModalContent>
      <CModalOverlay />
    </CModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  fetchNotionTableData,
  isValidAdvertisementItem,
  AdvertisementItem,
} from '@/utils/notion'

type Data = {
  items: AdvertisementItem[]
  showModal: boolean
  selectedIndex: number
}

type Methods = {
  viewDetails(index: number): void
  closeDetails(): void
  openAdvertiseLink(item: AdvertisementItem): void
  getAdvertiseThumbnail(index: number): string
}

type Computed = {
  itemsAvailable: AdvertisementItem[]
  selectedItem: AdvertisementItem | null
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  data() {
    return {
      items: [],
      showModal: false,
      selectedIndex: -1,
    }
  },
  async fetch() {
    const rawItems = await fetchNotionTableData(
      this.$config.advertisementsDatabaseId
    ).then((r) => r.json())

    if (Array.isArray(rawItems)) {
      const items = rawItems.filter((v) => isValidAdvertisementItem(v))
      this.items = items
    }
  },
  computed: {
    itemsAvailable() {
      return this.items.filter((item) => !item.isHidden)
    },
    selectedItem() {
      const index = this.selectedIndex
      return index > -1 ? this.itemsAvailable[index] : null
    },
  },
  methods: {
    viewDetails(index) {
      this.selectedIndex = index
      this.showModal = true
    },
    closeDetails() {
      this.showModal = false
      this.selectedIndex = -1
    },
    openAdvertiseLink(item) {
      const { link } = item
      if (!link) return

      // this.$gtag.event()

      window.open(link, '_blank', 'noopener,noreferrer')
    },
    getAdvertiseThumbnail(index) {
      const { thumbnail } = this.itemsAvailable[index]
      if (!thumbnail) return ''
      return thumbnail[0].url
    },
  },
})
</script>

<style lang="scss" module>
@mixin grid1($pad, $numColumns) {
  padding: 0 $pad;
  column-gap: $pad;
  grid-template-columns: repeat($numColumns, 1fr);
}

.Senden {
  row-gap: 1rem;
  @include grid1(5%, 1);

  @media screen and (min-width: 30em) {
    @include grid1(6%, 2);
  }

  @media screen and (min-width: 40em) {
    @include grid1(3%, 3);
  }
}
</style>
