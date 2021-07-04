<template>
  <div style="padding-top: 1rem">
    <CHeading as="h1" class="noop" mb="2rem">TUNNELING AUDIO...</CHeading>

    <CBox class="SelectOuter">
      <label for="audioInput">Audio source (input): </label
      ><CSelect
        id="audioInput"
        class="SelectBox"
        background-color="#222"
        color="#ececec"
      ></CSelect>
    </CBox>
    <CBox class="SelectOuter">
      <label for="audioOutput">Audio destination (output): </label
      ><CSelect
        id="audioOutput"
        class="SelectBox"
        background-color="#222"
        color="#ececec"
        :is-disabled="outputSelectDisabled"
      ></CSelect>
    </CBox>

    <CFlex class="noop" justify="center" align="center" pt="4" pb="6">
      <CButton
        :variant-color="muted ? 'blue' : 'red'"
        min-w="7em"
        @click="toggleMuted"
      >
        {{ muted ? 'Start' : 'Stop' }}
        <div style="padding-left: 4px">
          <!-- prettier-ignore -->
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            :class="{ 'eq-bar--stopped': muted }" style="fill: white"
          >
            <rect class="eq-bar eq-bar--1" x="4" y="4" width="3.7" height="8" />
            <rect class="eq-bar eq-bar--2" x="10.2" y="4" width="3.7" height="16" />
            <rect class="eq-bar eq-bar--3" x="16.3" y="4" width="3.7" height="11" />
          </svg>
        </div>
      </CButton>
    </CFlex>

    <audio id="audio1" autoplay></audio>

    <CBox text-align="center">
      <CLink
        href="https://webrtc.github.io/samples/"
        title="WebRTC samples homepage"
        is-external
        >WebRTC samples</CLink
      >・<CLink
        id="viewSource"
        href="https://github.com/webrtc/samples/tree/gh-pages/src/content/devices/input-output"
        title="View source for this page on GitHub"
        is-external
        >View source on GitHub</CLink
      >
    </CBox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debugLog, debugError } from '@/utils/debug'

type Data = {
  outputSelectDisabled: boolean
  muted: boolean
}

type Methods = {
  toggleMuted(): void
  setMuted(value: boolean): void
  updateMutedState(): void
}

let _stream: MediaStream | undefined

export default Vue.extend<Data, Methods, unknown, unknown>({
  layout: 'tools',
  data() {
    return {
      outputSelectDisabled: false,
      muted: false,
    }
  },
  head() {
    return {
      title: 'Audio Tunnel',
    }
  },
  async mounted() {
    this.outputSelectDisabled = !('sinkId' in HTMLMediaElement.prototype)

    const audioElement = document.querySelector('#audio1') as HTMLAudioElement
    const audioInputSelect = document.querySelector(
      '#audioInput > select'
    ) as HTMLSelectElement
    const audioOutputSelect = document.querySelector(
      '#audioOutput > select'
    ) as HTMLSelectElement
    const selectors = [audioInputSelect, audioOutputSelect]

    // Attach audio output device to video element using device/sink ID.
    async function attachSinkId(element: any, sinkId: string) {
      if (typeof element.sinkId === 'undefined') {
        debugError('Browser does not support output device selection.')
        return
      }

      try {
        await element.setSinkId(sinkId)
        debugLog(`Success, audio output device attached: ${sinkId}`)
      } catch (error) {
        let errorMessage: any = error
        if (error.name === 'SecurityError') {
          errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`
        }
        debugError(errorMessage)
        // Jump back to first output device in the list as it's the default.
        audioOutputSelect.selectedIndex = 0
      }
    }

    function changeAudioDestination() {
      const audioDestination = audioOutputSelect.value
      attachSinkId(audioElement, audioDestination)
    }

    function setStreamSource(stream: MediaStream) {
      _stream = stream // make stream available to console
      audioElement.srcObject = stream
    }

    function handleError(error: Error) {
      debugError(
        'navigator.MediaDevices.getUserMedia error: ',
        error.message,
        error.name
      )
    }

    function refreshSelectorOptions(deviceInfos: MediaDeviceInfo[]) {
      // Handles being called several times to update labels. Preserve values.
      const selectedValues = selectors.map((select) => select.value)

      // Clear current options
      for (const selector of selectors) {
        while (selector.firstChild) {
          selector.removeChild(selector.firstChild)
        }
      }

      // Add options by obtained info
      for (const info of deviceInfos) {
        const option = document.createElement('option')
        option.value = info.deviceId
        if (info.kind === 'audioinput') {
          option.text =
            info.label || `microphone ${audioInputSelect.length + 1}`
          audioInputSelect.appendChild(option)
        } else if (info.kind === 'audiooutput') {
          option.text = info.label || `speaker ${audioOutputSelect.length + 1}`
          audioOutputSelect.appendChild(option)
        } else if (info.kind === 'videoinput') {
          // noop
        } else {
          debugLog('Some other kind of source/device: ', info)
        }
      }

      // Restore value that is selected in the beginning
      for (const [index, selector] of selectors.entries()) {
        if (
          Array.prototype.slice
            .call(selector.childNodes)
            .some((n) => n.value === selectedValues[index])
        ) {
          selector.value = selectedValues[index]
        }
      }
    }

    async function updateSelectors() {
      try {
        const deviceInfos = await navigator.mediaDevices.enumerateDevices()
        refreshSelectorOptions(deviceInfos)
      } catch (error) {
        handleError(error)
      }
    }

    async function start() {
      if (_stream) {
        for (const track of _stream.getTracks()) {
          track.stop()
        }
      }
      const audioInput = audioInputSelect.value
      const constraints = {
        audio: { deviceId: audioInput ? { exact: audioInput } : undefined },
        video: false,
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setStreamSource(stream)
      } catch (error) {
        handleError(error)
      }

      // Refresh button list in case labels have become available
      await updateSelectors()
    }

    await updateSelectors()

    audioInputSelect.addEventListener('change', start)
    audioOutputSelect.addEventListener('change', changeAudioDestination)

    await start()
    this.setMuted(true)
  },
  methods: {
    toggleMuted() {
      const audioElement = document.querySelector('#audio1') as HTMLAudioElement
      this.setMuted(!audioElement.muted)
    },
    setMuted(value) {
      const audioElement = document.querySelector('#audio1') as HTMLAudioElement
      audioElement.muted = value
      this.updateMutedState()
    },
    updateMutedState() {
      const audioElement = document.querySelector('#audio1') as HTMLAudioElement
      this.muted = audioElement.muted
    },
  },
})
</script>

<style lang="scss" scoped>
a {
  color: #5050ff;
}

.Select {
  &Outer {
    margin-bottom: 1rem;
  }
}

label {
  width: 15em;
  display: inline-block;
}

.eq-bar {
  transform: scale(1, -1) translate(0, -24px);

  &--1,
  &--2,
  &--3 {
    animation-duration: 0.5s;
    animation-iteration-count: infinite;
  }

  &--1,
  &--3 {
    animation-name: short-eq;
  }

  &--1 {
    animation-delay: 0s;
  }

  &--3 {
    animation-delay: 0.34s;
  }

  &--2 {
    animation-name: tall-eq;
    animation-delay: 0.17s;
  }

  &--stopped > .eq-bar {
    animation-play-state: paused;
  }
}

/* prettier-ignore */
@keyframes short-eq {
    0% { height: 8px; }
   50% { height: 4px; }
  100% { height: 8px; }
}

/* prettier-ignore */
@keyframes tall-eq {
    0% { height: 16px; }
   50% { height:  6px; }
  100% { height: 16px; }
}
</style>
