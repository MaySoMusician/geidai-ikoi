<template>
  <div v-if="modalLoad">
    <AppModal
      :is-open="modalOpen"
      :on-close="closeModalNotice"
      :portal-z-index="1999"
      is-centered
    >
      <AppModalContent rounded="0.5rem">
        <template v-if="modalItem">
          <AppModalHeader
            py="8px"
            background-color="azalea"
            color="white"
            rounded-top="0.5rem"
            >{{ modalItem.title }}</AppModalHeader
          >
          <AppModalCloseButton color="white" top="6px" />
          <AppModalBody>
            <CBox>{{ modalItem.body }}</CBox>
            <CFlex justify="center" :pt="6" :pb="2">
              <AppButton
                v-if="modalItem.link"
                v-bind="linkButtonAttrs"
                chevron="none"
                text="詳細"
              />
              <AppButton
                v-else
                chevron="none"
                text="閉じる"
                @click="closeModalNotice"
              />
            </CFlex>
          </AppModalBody>
        </template>
      </AppModalContent>
      <AppModalOverlay />
    </AppModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  AppModal,
  AppModalOverlay,
  AppModalContent,
  AppModalHeader,
  AppModalBody,
  AppModalCloseButton,
} from '@/components/AppModal'
import {
  fetchNotionTableData,
  isValidModalNoticeItem,
  ModalNoticeItem,
  validateModalNoticeConditions,
} from '@/utils/notion'
import { debugLog } from '@/utils/debug'

type Data = {
  modalLoad: boolean // Lazy load to get correct client width
  modalOpen: boolean
  modalItem: ModalNoticeItem | null
}
type Methods = {
  closeModalNotice(): void
}

type Computed = {
  linkButtonAttrs: Record<string, unknown>
}

let _modalNoticeShownTimestamp = 0

export default Vue.extend<Data, Methods, Computed, unknown>({
  components: {
    AppModal,
    AppModalOverlay,
    AppModalContent,
    AppModalHeader,
    AppModalBody,
    AppModalCloseButton,
  },
  data() {
    return {
      modalLoad: false,
      modalOpen: true,
      modalItem: null,
    }
  },
  computed: {
    linkButtonAttrs() {
      if (!this.modalItem || !this.modalItem.link) return {}

      const link = this.modalItem.link

      if (link.startsWith('/')) {
        // internal link
        return {
          as: 'nuxt-link',
          to: link,
        }
      } else {
        // external link
        return {
          as: 'a',
          href: link,
          rel: 'noopener noreferrer',
          target: '_blank',
        }
      }
    },
  },
  async mounted() {
    const getCatalog = async () => {
      const rawItems = await fetchNotionTableData(
        this.$config.modalNoticesDatabaseId
      ).then((r) => r.json())
      if (!Array.isArray(rawItems))
        throw new Error('The items from ModalNotices database is not an array')
      return rawItems.filter((v) =>
        isValidModalNoticeItem(v)
      ) as ModalNoticeItem[]
    }

    const noticesCatalog = await getCatalog()
    const now = Math.round(Date.now() / 1000)
    const noticesAvailable = noticesCatalog
      .filter((item) => {
        const withinRange =
          (item.releasedAt ? item.releasedAt <= now : true) &&
          (item.expiredAt ? item.expiredAt > now : true)

        const existingStatus = this.$accessor.modalNotices.status.find(
          (entry) => entry.id === item.id
        )
        const { conditions: strConditions } = item

        if (!existingStatus || !strConditions) {
          return withinRange
        }

        const conditions = validateModalNoticeConditions(strConditions)
        if (!conditions) {
          return withinRange
        }

        let conditionSatisfied = true
        const { shown, lastShown } = existingStatus
        const { shownLimit, intervalMin } = conditions

        if (shownLimit && !(shown < shownLimit)) {
          debugLog('Condition not satisfied: shown < shownLimit')
          conditionSatisfied = false
        }
        if (intervalMin && !(Date.now() - lastShown > intervalMin)) {
          debugLog(
            'Condition not satisfied: (Date.now() - lastShown) > intervalMin'
          )
          conditionSatisfied = false
        }

        return withinRange && conditionSatisfied
      })
      .sort((a, b) => {
        if (!a.releasedAt) {
          return !b.releasedAt ? 0 : +1
        }
        return !b.releasedAt ? -1 : a.releasedAt - b.releasedAt
      })

    if (noticesAvailable.length > 0) {
      this.modalItem = noticesAvailable[0]
    }

    this.$nextTick(() => {
      this.modalOpen = !!this.modalItem
      _modalNoticeShownTimestamp = Date.now()

      // Lazy load to get correct client width
      setTimeout(() => {
        this.modalLoad = true
      })
    })
  },
  methods: {
    closeModalNotice() {
      this.modalOpen = false

      const existingStatus = this.$accessor.modalNotices.status.find(
        (entry) => entry.id === this.modalItem!.id
      )

      if (existingStatus) {
        this.$accessor.modalNotices.updateStatusEntry({
          id: existingStatus.id,
          shown: existingStatus.shown + 1,
          lastShown: _modalNoticeShownTimestamp,
        })
      } else {
        this.$accessor.modalNotices.addStatusEntry({
          id: this.modalItem!.id,
          shown: 1,
          lastShown: _modalNoticeShownTimestamp,
        })
      }

      this.modalItem = null
    },
  },
})
</script>

<style lang="scss" module></style>
