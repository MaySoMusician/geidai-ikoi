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
      <CPseudoBox
        transition="all 0.3s"
        :_hover="{ opacity: 0.7, cursor: 'pointer' }"
        @click="showWhatsThis = true"
      >
        <img src="~assets/whatsThis.min.svg" size="100%" />
      </CPseudoBox>
    </CGrid>

    <AdvertisementGridItemModal
      :is-open="showModal"
      :on-close="closeDetails"
      is-centered
      :size="{ base: 'sm', sm: 'md', md: 'lg' }"
      :thumbnail="selectedItem && getAdvertiseThumbnail(selectedIndex)"
      :title="selectedItem && selectedItem.title"
      :description="selectedItem && selectedItem.description"
      :author="selectedItem && selectedItem.author"
      :link="selectedItem && selectedItem.link"
      @clickDetails="openAdvertiseLink(selectedIndex)"
    />

    <AdvertisementGridItemModal
      :is-open="showWhatsThis"
      :on-close="() => (showWhatsThis = false)"
      is-centered
      :size="{ base: 'sm', sm: 'md', md: 'lg' }"
      thumbnail="WHATS_THIS"
      title="宣伝コーナーを設置しました"
      description="サークルの勧誘、演奏会のお知らせ、伴奏者の募集 etc...
              藝大生に見てもらいたい、知ってもらいたい情報を載せて、活動の輪を広げませんか？"
      author=""
      link=""
      @clickDetails="() => {}"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  fetchNotionTableData,
  isValidAdvertisementItem,
  AdvertisementItem,
} from '@/utils/notion'
import AdvertisementGridItemModal from './AdvertisementGridItemModal.vue'

type Data = {
  items: AdvertisementItem[]
  showModal: boolean
  selectedIndex: number
  showWhatsThis: boolean
}

type Methods = {
  viewDetails(index: number): void
  closeDetails(): void
  openAdvertiseLink(index: number): void
  getAdvertiseThumbnail(index: number): string
}

type Computed = {
  itemsAvailable: AdvertisementItem[]
  selectedItem: AdvertisementItem | null
}

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: { AdvertisementGridItemModal },
  data() {
    return {
      items: [],
      showModal: false,
      selectedIndex: -1,
      showWhatsThis: false,
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
    openAdvertiseLink(index) {
      if (index < 0) return ''
      const { link } = this.itemsAvailable[index]
      if (!link) return

      // this.$gtag.event()

      window.open(link, '_blank', 'noopener,noreferrer')
    },
    getAdvertiseThumbnail(index) {
      if (index < 0) return ''

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
