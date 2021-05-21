<template>
  <div>
    <TheWebsiteTitle />
    <TheNewsList
      mx="auto"
      :mb="3"
      max-w="42rem"
      align="stretch"
      @loaded="newsLoaded = true"
    />
    <!-- <CText font-size="1.4rem" font-weight="bold" text-align="center">{{
      welcomeMessage
    }}</CText> -->
    <transition name="fade1" mode="out-in" @after-enter="meetLinksShown = true">
      <div>
        {{ jqueryLoaded }}
        {{ libJitsiMeetLoaded }}
        <CButton
          :is-disabled="!jitsiReady || !!myLocalAudioTrack"
          @click="jitsiTest"
          >接続</CButton
        >
        <CButton
          :is-disabled="!jitsiReady || !myLocalAudioTrack"
          @click="disconnect"
          >切断</CButton
        >
        <CSelect
          :is-disabled="!jitsiReady || !myRoom"
          :value="currentAudioInputDeviceId"
          @change="changeAudioInputDeviceId($event)"
        >
          <option
            v-for="device in audioInputDevices"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            {{ device.label }}
          </option>
        </CSelect>
        <div>
          <CButton
            :is-disabled="!jitsiReady || getMyLocalMuted() === null"
            :variant-color="getMyLocalMuted() ? 'red' : 'gray'"
            @click="changeLocalMuted"
            >{{ muteButtonLabel }}</CButton
          >
        </div>

        <div>
          <audio
            v-for="track in remoteAudioTracks"
            :id="`track-${track.getId()}`"
            :key="`track-${track.getId()}`"
            :ref="track.getId()"
            autoplay
          />
        </div>
        <div>
          <div v-for="p in participants" :key="p.id">
            <p>
              {{ p.id }} | {{ p.audioLevel }} | {{ p.displayName }} |
              {{ p.isLocal }} | {{ p.trackId }}
            </p>
            <img v-if="p.avatarUrl" :src="p.avatarUrl" />
            <meter :value="p.audioLevel" />
          </div>
        </div>
      </div>

      <!-- <template v-if="newsLoaded">
        <CFlex v-if="$fetchState.pending" key="loading" justify="center">
          <AppSpinnerLoading />
        </CFlex>
        <div v-else-if="$fetchState.error" key="error">error</div>
        <CSimpleGrid
          v-else
          key="shown"
          :columns="{ base: 1, sm: 2 }"
          :p="{ base: '0 5%', sm: '0 6%' }"
          row-gap="1rem"
          :column-gap="{ base: '5%', sm: '6%' }"
          :mt="5"
        >
          <CFlex
            v-for="(link, index) in meetLinksAvailable"
            :key="index"
            justify="stretch"
            align="center"
          >
            <CButton
              as="a"
              d="flex"
              flex-direction="row"
              width="100%"
              variant-color="blue"
              h="auto"
              :py="3"
              :href="link.url"
              target="_blank"
              rel="noopener noreferer"
              @click="logMeetLinkClickEvent(index)"
            >
              <CIcon name="google-hangouts" size="3rem" :mr="1" />
              <CFlex direction="column">
                <CBox font-size="1.2rem">{{
                  link.name || `Meet ${index + 1}`
                }}</CBox>
                <CBox
                  font-weight="normal"
                  font-size="0.8rem"
                  font-family="mono"
                  mt="0.2rem"
                  pl="0.0625rem"
                  >{{ getMeetId(link.url) }}</CBox
                >
              </CFlex>
            </CButton>
          </CFlex>
        </CSimpleGrid>
      </template> -->
    </transition>
    <CFlex justify="center" direction="column" align="center">
      <CButton variant-color="gray" :mt="8" @click="signOut">
        <CIcon name="chevron-left" size="2rem" :ml="-3" :mr="0" />ログアウト
      </CButton>
    </CFlex>

    <CFlex justify="center" direction="column" align="center"> </CFlex>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  initOptions,
  connectionOptions,
  conferenceOptions,
  createLocalTracksOptions,
} from '@/utils/libJitsiMeet'
import {
  CommandValue,
  JitsiConference,
  JitsiConnection,
  JitsiTrack,
} from '@/types/lib-jitsi-meet'

type Data = {
  // meetLinks: MeetLinkItem[]
  newsLoaded: boolean
  // meetLinksShown: boolean
  libJitsiMeetLoaded: boolean
  jqueryLoaded: boolean
  remoteAudioTracks: JitsiTrack[]
  audioInputDevices: MediaDeviceInfo[]
  currentAudioInputDeviceId: string
  myLocalId: string
  myLocalAudioTrack: JitsiTrack | undefined
  // myLocalMuted: boolean
  myRoom: JitsiConference | null
  myConnection: JitsiConnection | null
  muteButtonLabel: string
  participants: {
    id: string
    audioLevel: number
    displayName: string
    isLocal: boolean
    trackId: string
    avatarUrl: string
  }[]
}

type Computed = {
  email: string
  studentId: string
  jitsiReady: boolean
  // myLocalMuted: boolean | null
  // welcomeMessage: string
  // meetLinksAvailable: MeetLinkItem[]
}

type Methods = {
  showToast(): void
  signOut(): void
  getMeetId(url: string): string
  // logMeetLinkClickEvent(index: number): void
  jitsiTest(): void
  useAudioTrack(track?: JitsiTrack): void
  changeAudioInputDeviceId(newDeviceId: string): void
  changeLocalMuted(muted: boolean): void
  getMyLocalMuted(): boolean | null
  disconnect(): void
}

const MUTE_BUTTON_LABEL = 'ミュート'
const UNMUTE_BUTTON_LABEL = 'ミュート中'

export default Vue.extend<Data, Methods, Computed, unknown>({
  inject: ['$chakraColorMode', '$toggleColorMode'],
  middleware: ['auth'],
  data() {
    return {
      // meetLinks: [],
      newsLoaded: false,
      // meetLinksShown: false,
      libJitsiMeetLoaded: false,
      jqueryLoaded: false,
      remoteAudioTracks: [],
      audioInputDevices: [],
      currentAudioInputDeviceId: '',
      myLocalId: '',
      myLocalAudioTrack: undefined,
      // myLocalMuted: false,
      myRoom: null,
      myConnection: null,
      muteButtonLabel: MUTE_BUTTON_LABEL,
      participants: [],
    }
  },
  head() {
    return {
      script: [
        {
          vmid: 'jquery',
          src: 'https://code.jquery.com/jquery-3.5.1.min.js',
          defer: true,
          callback: () => {
            this.jqueryLoaded = true
          },
        },
        {
          vmid: 'lib-jitsi-meet',
          src: 'https://meet.jit.si/libs/lib-jitsi-meet.min.js',
          defer: true,
          callback: () => {
            this.libJitsiMeetLoaded = true
          },
        },
      ],
    }
  },
  /* async fetch() {
    const rawMeetLinks = await fetchNotionTableData(
      this.$config.meetLinksDatabaseId
    ).then((r) => r.json())
    if (Array.isArray(rawMeetLinks)) {
      const meetLinks = rawMeetLinks.filter((v) => isValidMeetLinkItem(v))
      this.meetLinks = meetLinks
    }
  }, */
  computed: {
    email() {
      return this.$accessor.user?.email || 'NO EMAIL'
    },
    studentId() {
      return this.email.replace(/@.*.geidai.ac.jp/, '')
    },
    jitsiReady() {
      return this.jqueryLoaded && this.libJitsiMeetLoaded
    },

    /* welcomeMessage() {
      return `${this.studentId}さん、こんにちは`
    }, */
    /* meetLinksAvailable() {
      return this.meetLinks.filter((link) => !link.isHidden)
    }, */
  },
  methods: {
    showToast() {},
    signOut() {
      this.$fire.auth.signOut()
      this.$router.push('/')
    },
    getMeetId(url) {
      return url.replace('https://meet.google.com/', '')
    },
    /* logMeetLinkClickEvent(index) {
      const { slug } = this.meetLinksAvailable[index]
      this.$gtag.event('enter_room', {
        room_type: 'Google Meet',
        room_slug: slug,
      })
    }, */
    useAudioTrack(track) {
      if (this.myLocalAudioTrack) {
        const l = this.myLocalAudioTrack as any
        l.stopStream()
      }
      this.myLocalAudioTrack = track

      /* if (track) {
        this.myLocalMuted = track.isMuted()
      } else {
        this.myLocalMuted = false
      } */
    },
    getMyLocalMuted() {
      if (!this.myLocalAudioTrack) return null
      return this.myLocalAudioTrack.isMuted()
    },
    async jitsiTest() {
      if (!this.jitsiReady) return

      const JitsiMeetJS = window.JitsiMeetJS
      console.log(JitsiMeetJS)
      // ;(window as any).___tracks = []

      JitsiMeetJS.init(initOptions)
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR)

      JitsiMeetJS.mediaDevices.addEventListener(
        JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
        (devices: MediaDeviceInfo[]) => {
          this.audioInputDevices = devices.filter(
            (d) => d.kind === 'audioinput'
          )
        }
      )

      function connect(roomName: string) {
        return new Promise<JitsiConnection>((resolve, reject) => {
          const options = {
            ...connectionOptions,
            serviceUrl: `${connectionOptions.serviceUrl}?room=${roomName}`,
          }

          const connection = new JitsiMeetJS.JitsiConnection(
            null,
            null,
            options
          )
          connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            () => {
              resolve(connection)
            }
          )
          connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            () => {
              reject(new Error('The connection failed.'))
            }
          )
          connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            () => {
              console.log('Connection disconnected')
            }
          )

          connection.connect()
        })
      }

      function createAndJoinRoom(
        connection: JitsiConnection,
        roomName: string
      ) {
        return new Promise<JitsiConference>((resolve) => {
          const room = connection.initJitsiConference(
            roomName,
            conferenceOptions
          )
          room.on(JitsiMeetJS.events.conference.CONFERENCE_JOINED, () => {
            resolve(room)
          })
          room.join()
        })
      }

      const sendAvatarUrl = () => {
        this.myRoom?.sendCommandOnce('set_avatarUrl', {
          value: this.$accessor.user?.photoURL || '',
          attributes: {
            userId: this.myLocalId,
          },
          children: [],
        })
      }

      const addTrack = (track: JitsiTrack) => {
        // ;(window as any).___tracks.push(track)
        this.participants.push({
          id: track.getParticipantId(),
          audioLevel: 0,
          displayName: '',
          isLocal: track.isLocal(),
          trackId: track.getId(),
          avatarUrl: '',
        })

        sendAvatarUrl()

        if (track.isLocal()) return

        this.remoteAudioTracks.push(track)
        this.$nextTick().then(() => {
          const elem = this.$refs[track.getId()] as unknown[]

          track.attach(elem[0])
        })
      }

      if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('input')) {
        JitsiMeetJS.mediaDevices.enumerateDevices((devices) => {
          // console.info('a', devices)

          this.audioInputDevices = devices.filter(
            (d) => d.kind === 'audioinput'
          )

          /* if (audioInputDevices.length > 0) {
            this.audioInputDevices = audioInputDevices
          } */
        })
      }

      const roomName = 'adfahlskjhlergh'
      try {
        this.myConnection = await connect(roomName)

        this.myRoom = await createAndJoinRoom(this.myConnection, roomName)
        ;(window as any).myRoom = this.myRoom

        this.myRoom.setDisplayName(this.studentId)

        /* this.myRoom.setLocalParticipantProperty(
          'avatarUrl',
          this.$accessor.user?.photoURL || ''
        )
        this.myRoom.addCommandListener(
          'jitsi_participant_avatarUrl',
          (values: any) => {
            console.log('avatarUrl', values)
          }
        ) */

        this.myLocalId = this.myRoom.myUserId()
        this.myRoom.on(
          JitsiMeetJS.events.conference.TRACK_ADDED,
          (track: JitsiTrack) => addTrack(track)
        )

        sendAvatarUrl()

        this.myRoom.addCommandListener(
          'set_avatarUrl',
          (values: CommandValue) => {
            console.log('set_avatarUrl', values.attributes.userId, values.value)
            const participantId = values.attributes.userId
            const url = values.value

            const interval = setInterval(() => {
              const p = this.participants.find((p) => p.id === participantId)

              if (p) {
                p.avatarUrl = url
                clearInterval(interval)
              }
            }, 1000)
          }
        )

        this.myRoom.on(
          JitsiMeetJS.events.conference.TRACK_REMOVED,
          (track: JitsiTrack) => {
            // const isLocal = !!track.storedMSID
            const isRemote = !!track.ownerEndpointId

            // console.log(track.getId())

            /* if (isLocal) {
              console.log('isLocal removed')
              this.remoteAudioTracks = this.remoteAudioTracks.filter((t) => {
                console.log('local', t.getId())
                if (t.storedMSID) return t.storedMSID !== track.storedMSID

                return true
              })
            } */

            this.participants = this.participants.filter(
              (p) => p.trackId !== track.getId()
            )

            if (isRemote) {
              console.log('isRemote removed')
              this.remoteAudioTracks = this.remoteAudioTracks.filter(
                (t) => t.getId() !== track.getId()
              )
            }
          }
        )

        this.myRoom.on(
          JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
          (participantId: string, audioLevel: number) => {
            // console.log('TRACK_AUDIO_LEVEL_CHANGED', participandId, audioLevel)
            const p = this.participants.find((p) => p.id === participantId)
            if (!p) return
            p.audioLevel = audioLevel * 1.6
          }
        )

        /* this.myRoom.on(
          JitsiMeetJS.events.conference.USER_JOINED,
          (id: string, user: any) => {
            console.log('USER_JOINED', id, user)
          }
        ) */

        const localTracks = await JitsiMeetJS.createLocalTracks(
          createLocalTracksOptions
        )
        for (const track of localTracks) {
          this.myRoom.addTrack(track)

          if (track.getType() === 'audio') {
            this.useAudioTrack(track)
            this.currentAudioInputDeviceId = track.getDeviceId()
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async changeAudioInputDeviceId(newDeviceId) {
      if (this.currentAudioInputDeviceId === newDeviceId) return

      this.currentAudioInputDeviceId = newDeviceId

      const JitsiMeetJS = window.JitsiMeetJS
      const [track] = await JitsiMeetJS.createLocalTracks({
        ...createLocalTracksOptions,
        micDeviceId: newDeviceId,
      })
      await this.myLocalAudioTrack?.dispose()
      this.myRoom?.addTrack(track)
      this.useAudioTrack(track)
    },
    changeLocalMuted() {
      const muted = this.getMyLocalMuted()

      if (muted === null) return

      if (muted) {
        this.myLocalAudioTrack?.unmute()
        this.muteButtonLabel = MUTE_BUTTON_LABEL
      } else {
        this.myLocalAudioTrack?.mute()
        this.muteButtonLabel = UNMUTE_BUTTON_LABEL
      }
      // this.myLocalAudioTrack?.isMuted
    },
    async disconnect() {
      this.myLocalAudioTrack?.dispose()
      await this.myRoom?.leave()
      await this.myConnection?.disconnect()
      this.myLocalAudioTrack = undefined
      this.myRoom = null
      this.myConnection = null
    },
  },
})
</script>

<style lang="scss" scoped>
@include fadeEaseOutCubic('fade1', 0s, 0.3rem);
</style>

<style lang="scss" module></style>
