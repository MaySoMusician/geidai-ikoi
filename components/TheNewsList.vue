<template>
  <transition name="fade" mode="out-in" @enter="$emit('loaded')">
    <CFlex
      v-if="$fetchState.pending"
      v-bind="$attrs"
      key="loading"
      justify="center"
    >
      <AppSpinnerLoading />
    </CFlex>
    <div v-else-if="$fetchState.error" key="error" v-bind="$attrs">error</div>
    <template v-else>
      <CAlert
        v-if="newsItemsAvailable.length < 1"
        v-bind="$attrs"
        key="shown"
        bg="gray.200"
        py="0.4rem"
        >お知らせはありません</CAlert
      >
      <CStack v-else v-bind="$attrs" key="shown" :spacing="3">
        <CAlert
          v-for="(item, index) in newsItemsAvailable"
          :key="index"
          :status="item.type"
        >
          <CAlertIcon />
          <CBox>
            <CAlertTitle :mr="2">{{ item.title }}</CAlertTitle>
            <CAlertDescription v-if="item.content">{{
              item.content
            }}</CAlertDescription>
          </CBox>
        </CAlert>
        <!-- Avoid empty slot -->
        <div />
      </CStack>
    </template>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import { fetchNotionTableData, isValidNewsItem, NewsItem } from '@/utils/notion'

type Data = {
  newsItems: NewsItem[]
}

type Computed = {
  newsItemsAvailable: NewsItem[]
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  data() {
    return {
      newsItems: [],
    }
  },
  async fetch() {
    const rawItems = await fetchNotionTableData(
      this.$config.newsDatabaseId
    ).then((r) => r.json())
    if (Array.isArray(rawItems)) {
      const items = rawItems.filter((v) => isValidNewsItem(v))
      this.newsItems = items
    }
  },
  computed: {
    newsItemsAvailable() {
      return this.newsItems.filter((item) => !item.isHidden)
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateY(0.5rem);
}
</style>

<style lang="scss" module></style>
