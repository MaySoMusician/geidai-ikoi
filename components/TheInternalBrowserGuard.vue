<template>
  <CBox :mb="1">
    <CText font-size="0.8rem">{{ userAgent }} </CText>

    <textarea
      ref="logsTextArea"
      :value="getNavigator()"
      readonly
      rows="3"
      style="
        width: 100%;
        font-family: monospace;
        font-size: 11px;
        line-height: 110%;
        padding: 3px;
      "
      @click="() => $refs.logsTextArea && $refs.logsTextArea.select()"
    >
    </textarea>
  </CBox>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {}

type Computed = {
  userAgent: string
}

type Methods = {
  getNavigator(): string
}

export default Vue.extend<Data, unknown, Computed, Methods>({
  components: {},
  data() {
    return {}
  },
  computed: {
    userAgent() {
      return process.client ? navigator.userAgent : ''
    },
  },
  mounted() {},
  methods: {
    getNavigator() {
      if (!process.client) return ''

      const getObject = function (object: any, space: number) {
        let r = ''
        for (const key in object) {
          const s = ' '.repeat(space)
          if (['plugins', 'enabledPlugin'].includes(key)) {
            r += `${s}${key} : *omitted*\n`
            continue
          }

          const cur = object[key]

          if (typeof cur === 'function') {
            r += `${s}${key} : function\n`
          } else if (typeof cur === 'object') {
            r += `${s}${key} : \n${getObject(cur, space + 2)}\n`
          } else {
            r += `${s}${key} : "${cur}" [${typeof cur}]\n`
          }
        }
        return r
      }

      return getObject(navigator, 0)
    },
  },
})
</script>

<style lang="scss" module></style>
