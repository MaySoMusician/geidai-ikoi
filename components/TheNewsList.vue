<template>
  <transition name="fade" mode="out-in" @enter="$emit('loaded')">
    <CFlex v-if="pending" v-bind="$attrs" key="loading" justify="center">
      <AppSpinnerLoading />
    </CFlex>
    <CFlex v-else-if="error" key="error" justify="center" v-bind="$attrs">
      <AppErrorLoading />
    </CFlex>
    <template v-else>
      <CAlert
        v-if="newsItemsAvailable.length < 1"
        v-bind="$attrs"
        key="shown"
        bg="grass.50"
        py="0.8rem"
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
  pending: boolean
  error: Error | null
}

type Computed = {
  newsItemsAvailable: NewsItem[]
}

export default Vue.extend<Data, unknown, Computed, unknown>({
  data() {
    return {
      newsItems: [],
      pending: true,
      error: null,
    }
  },
  computed: {
    newsItemsAvailable() {
      return this.newsItems.filter((item) => !item.isHidden)
    },
  },
  async mounted() {
    try {
      const rawItems = await fetchNotionTableData(
        this.$config.newsDatabaseId
      ).then((r) => r.json())
      if (Array.isArray(rawItems)) {
        const items = rawItems.filter((v) => isValidNewsItem(v))
        this.newsItems = items
      }
    } catch (e) {
      this.error = e
    } finally {
      this.pending = false
    }
  },
})
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade', $globalFadeDuration, 0s);
</style>

<style lang="scss" module></style>
