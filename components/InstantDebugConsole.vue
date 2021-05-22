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

type LogType = 'LOG' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

type Data = {
  logs: {
    type: LogType
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
const nativeLogger: Record<LogType, (...data: any[]) => void> = {
  LOG: console.log,
  DEBUG: console.debug,
  INFO: console.info,
  WARN: console.warn,
  ERROR: console.error,
}
/* eslint-enable no-console */

const vue = Vue.extend<Data, Methods, Computed, unknown>({
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
      const getLoggingFunction = (type: LogType) =>
        function (this: InstanceType<typeof vue>) {
          this.logs.push({
            type,
            timestamp: new Date(),
            data: { value: arguments },
          })
          nativeLogger[type](arguments)
        }.bind(this)

      /* eslint-disable no-console */
      console.log = getLoggingFunction('LOG')
      console.debug = getLoggingFunction('DEBUG')
      console.info = getLoggingFunction('INFO')
      console.warn = getLoggingFunction('WARN')
      console.error = getLoggingFunction('ERROR')

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
export default vue
</script>
