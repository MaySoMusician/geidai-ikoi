<template>
  <CBox v-bind="$attrs">
    <CBox font-size="0.8rem" :mb="2">
      <b style="margin-right: 6px">デバッグログ</b>
      エラーのみ表示:
      <CSwitch v-model="showOnlyErrorLog" />
    </CBox>

    <textarea
      ref="logsTextArea"
      :value="getLogs(showOnlyErrorLog)"
      readonly
      rows="15"
      style="
        width: 100%;
        font-family: monospace;
        font-size: 11px;
        line-height: 110%;
        padding: 3px;
      "
      @click="$refs.logsTextArea.select()"
    >
    </textarea>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  logs: {
    type: 'LOG' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
    timestamp: Date
    data: any
  }[]
  showOnlyErrorLog: boolean
}

type Computed = {}

type Methods = {
  initLogger(): void
  getLogs(onlyError: boolean): string
}

/* eslint-disable no-console */
const _log = console.log
const _debug = console.debug
const _info = console.info
const _warn = console.warn
const _error = console.error
/* eslint-enable no-console */

export default Vue.extend<Data, Methods, Computed, unknown>({
  data() {
    return {
      logs: [],
      showOnlyErrorLog: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.initLogger()
    }, 200)
  },
  methods: {
    initLogger() {
      /* eslint-disable no-console */
      console.log = (...data: any) => {
        this.logs.push({
          type: 'LOG',
          timestamp: new Date(),
          data: [...data],
        })
        _log(data)
      }

      console.debug = (...data: any) => {
        this.logs.push({
          type: 'DEBUG',
          timestamp: new Date(),
          data: [...data],
        })
        _debug(data)
      }

      console.info = (...data: any) => {
        this.logs.push({
          type: 'INFO',
          timestamp: new Date(),
          data: [...data],
        })
        _info(data)
      }

      console.warn = (...data: any) => {
        this.logs.push({
          type: 'WARN',
          timestamp: new Date(),
          data: [...data],
        })
        _warn(data)
      }

      console.error = (...data: any) => {
        this.logs.push({
          type: 'ERROR',
          timestamp: new Date(),
          data: [...data],
        })
        _error(data)
      }

      window.addEventListener('error', (ev) =>
        console.error(ev.error, ev.error.stack, ev.message, ev.lineno, ev.colno)
      )
      window.addEventListener('unhandledrejection', (ev) => {
        console.error(ev.reason.stack)
      })

      /* eslint-enable no-console */
    },
    getLogs(onlyError) {
      this.$nextTick().then(() => {
        const logArea = this.$refs.logsTextArea as HTMLTextAreaElement
        if (logArea) {
          logArea.scrollTop = logArea.scrollHeight
        }
      })

      return this.logs
        .filter((l) =>
          onlyError ? l.type === 'WARN' || l.type === 'ERROR' : true
        )
        .map((l) => {
          const { data } = l
          const time = l.timestamp.toISOString()

          if (typeof data === 'object') {
            return `${l.type} | ${time} | ${JSON.stringify(data)}`
          }

          if (Array.isArray(data)) {
            return `${l.type} | ${time} | ${JSON.stringify({ data })}`
          }
          return `${l.type} | ${time} | ${l.data}`
        })
        .join('\n')
    },
  },
})
</script>
