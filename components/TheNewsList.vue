<template>
  <CBox :class="[$style.NewsWrapper]">
    <client-only>
      <transition name="fade" mode="out-in">
        <CFlex v-if="pending" v-bind="$attrs" key="loading" justify="center">
          <AppSpinnerLoading color="white" size="2rem" />
        </CFlex>
        <CFlex v-else-if="error" key="error" justify="center" v-bind="$attrs">
          <AppErrorLoading />
        </CFlex>
        <template v-else>
          <CAlert
            v-if="newsItemsAvailable.length < 1"
            v-bind="$attrs"
            key="shown"
            :class="[$style.NewsItem]"
            bg="transparent"
            >お知らせはありません</CAlert
          >
          <CStack v-else v-bind="$attrs" key="shown" :spacing="0">
            <CAlert
              v-for="(item, index) in newsItemsAvailable"
              :key="index"
              :class="[$style.NewsItem]"
              :status="item.type"
              bg="transparent"
              :py="3"
            >
              <CAlertIcon />
              <CBox>
                <CAlertTitle d="inline" :mr="2">{{ item.title }}</CAlertTitle>
                <CAlertDescription d="inline">
                  <CText v-if="item.content" as="span">{{
                    item.content
                  }}</CText>
                  <time v-if="item.publishedOn" :datetime="item.publishedOn"
                    >（{{ item.publishedOn }}）</time
                  >
                </CAlertDescription>
              </CBox>
            </CAlert>
            <!-- Avoid empty slot -->
            <div />
          </CStack>
        </template>
      </transition>
    </client-only>
  </CBox>
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
      this.$emit('loaded')
    }
  },
})
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade', $globalFadeDuration, 0s);
</style>

<style lang="scss" module>
.News {
  &Wrapper {
    padding: {
      top: 0.4rem;
      bottom: 1.2rem;
    }
    background: linear-gradient(
      to top,
      rgb(255, 255, 255),
      var(--theme-colors-ebb) 1.2rem
    );
  }
  &Item {
    letter-spacing: 0.4px;
    font-size: 0.92rem;
  }
}
</style>
