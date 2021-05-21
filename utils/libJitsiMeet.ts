import {
  JitsiMeetJSInitOptions,
  JitsiConnectionOptions,
  InitJitsiConferenceOptions,
  CreateLocalTracksOptions,
} from '@/types/lib-jitsi-meet'

export const initOptions: JitsiMeetJSInitOptions = {
  useIPv6: undefined,
  disableAudioLevels: false,
  disableSimulcast: false,
  enableWindowOnErrorHandler: false,
  disableThirdPartyRequests: true, // default false
  enableAnalyticsLogging: false,
  // externalStorage:
  // callStatsCustomScriptUrl: 'https://api.callstats.io/static/callstats-ws.min.js',
  disableRtx: false, // Enables RTX everywhere
  // disabledCodec:
  // preferredCodec
  useTurnUdp: false,
}

export const connectionOptions: JitsiConnectionOptions = {
  serviceUrl: 'https://meet.jit.si/http-bind', // FIXME: use xep-0156 for that
  // serviceUrl: 'wss://meet.jit.si/xmpp-websocket', // FIXME: use xep-0156 for that
  externalConnectUrl: 'https://meet.jit.si/http-pre-bind',
  hosts: {
    domain: 'meet.jit.si',
    muc: 'conference.meet.jit.si', // FIXME: use XEP-0030
    // anonymousdomain?: string
    // focus: 'focus.meet.jit.si',
  },
  enableLipSync: false,
  clientNode: 'http://jitsi.org/jitsimeet', // The name of client node advertised in XEP-0115 'c' stanza
  // xmppPing:
  // websocketKeepAlive:
  // websocketKeepAliveUrl: 'https://meet.jit.si/_unlock',
}

export const conferenceOptions: InitJitsiConferenceOptions = {
  openBridgeChannel: true,
  // callStatsID: "574005334", //Application ID for callstats.io API
  // callStatsSecret: "sBRvEnCkjJMnkhNy2ufsEaUt1MdMPxR2WQqfO+jB6Lk=", //Secret for callstats.io API
  enableTalkWhileMuted: true,
  enableNoAudioDetection: true,
  enableNoisyMicDetection: true,
  channelLastN: 20,
  startBitrate: '800',
  stereo: false,
  forceJVB121Ratio: -1,
  hiddenDomain: 'recorder.meet.jit.si',
  startAudioMuted: 9,
  startVideoMuted: 9,
  enableLayerSuspension: true,
  deploymentInfo: {
    shard: '',
    userRegion: '',
  },
  p2p: {
    enabled: false,
  },
  e2eping: {
    pingInterval: -1,
  },
  abTesting: {},
  testing: {
    callStatsThreshold: 1, // % of users that will have callStats enabled.
    capScreenshareBitrate: 1,
  },
}

export const createLocalTracksOptions: CreateLocalTracksOptions = {
  devices: ['audio'],
  // cameraDeviceId: 0,
  resolution: 720,
  constraints: {
    video: {
      height: {
        ideal: 720,
        max: 720,
        min: 180,
      },
      width: {
        ideal: 1280,
        max: 1280,
        min: 320,
      },
    },
  },
}
