/*
 * JitsiTrack
 */

export interface TrackEffect {
  startEffect(): MediaStream
  stopEffect(): void
  isEnabled(): boolean
}

export class JitsiTrack {
  getType(): 'video' | 'audio'
  mute(): Promise<unknown>
  unmute(): Promise<unknown>
  isMuted(): boolean
  attach(container: unknown): unknown
  detach(container: unknown): unknown
  dispose(): Promise<unknown>
  getId(): string
  getParticipantId(): string
  setAudioOutput(audioOutputDeviceId: string): unknown
  getDeviceId(): string
  isEnded(): boolean
  setEffect(effect?: TrackEffect): Promise<void>

  isLocal(): boolean
  storedMSID?: string
  ownerEndpointId?: string
}

/*
 * JitsiConference
 */

export interface CommandValue {
  value: any
  attributes: Record<string, any>
  children: CommandValue[]
}

export interface VideoConstraints {
  lastN: number
  selectedEndpoints: string[]
  onStageEndpoints: string[]
  defaultConstraints: Record<string, any>
  constraints: Record<string, Record<string, any>>
}

export class JitsiConference {
  join(password?: string): void
  leave(): Promise<void>
  myUserId(): string
  getLocalTracks(): JitsiTrack[]
  addEventListener(event: string, listener: Function): void
  removeEventListener(event: string, listener: Function): void
  on(event: string, listener: Function): void
  off(event: string, listener: Function): void
  sendTextMessage(text: string): void
  setDisplayName(name: string): void
  selectParticipant(participantId: string): void
  sendCommand(name: string, values: CommandValue): void
  sendCommandOnce(name: string, values: CommandValue): void
  removeCommand(name: string): void
  addCommandListener(command: string, listener: Function): void
  removeCommandListener(command: string): void
  addTrack(track: JitsiTrack): Promise<unknown>
  removeTrack(track: JitsiTrack): Promise<unknown>
  isDTMFSupported(): boolean
  getRole(): string
  isModerator(): boolean
  lock(password: string): Promise<void>
  unlock(): Promise<void>
  kickParticipant(id: string, reason?: string): void
  setStartMutedPolicy(policy: { audio: boolean; video: boolean }): void
  getStartMutedPolicy(): { audio: boolean; video: boolean }
  isStartAudioMuted(): boolean
  isStartVideoMuted(): boolean
  sendFeedback(
    overallFeedback: 1 | 2 | 3 | 4 | 5,
    detailedFeedback: unknown
  ): void

  setSubject(subject: string): void
  sendEndpointMessage(to: string, payload: any): void
  sendEndpointStatsMessage(payload: any): void
  broadcastEndpointMessage(payload: any): void
  replaceTrack(oldTrack: JitsiTrack, newTrack: JitsiTrack): void
  setReceiverConstraints(videoConstraints: VideoConstraints): void
  setReceiverVideoConstraint(resolution: number): void
  setSenderVideoConstraint(resolution: number): void
  isHidden(): boolean
  setLocalParticipantProperty(propertyKey: string, propertyValue: string): void
  getParticipants(): JitsiParticipant[]
  revokeOwner(participantId: string): void
}

/*
 * JitsiConnection
 */

export interface JitsiConnectionOptions {
  serviceUrl?: string
  hosts?: { domain?: string; muc?: string; anonymousdomain?: string }
  enableLipSync?: boolean
  clientNode?: string
  xmppPing?: { interval?: number; timeout?: number; threshold?: number }
  websocketKeepAlive?: number
  websocketKeepAliveUrl?: string
  externalConnectUrl?: string
}

export interface InitJitsiConferenceOptions {
  openBridgeChannel?: boolean | 'datachannel' | 'websocket'
  recordingType?: string
  callStatsID?: string
  callStatsSecret?: string
  enableTalkWhileMuted?: boolean
  ignoreStartMuted?: boolean
  startSilent?: boolean
  confID?: string
  siteID?: string
  statisticsId?: string
  statisticsDisplayName?: string
  focusUserJid?: unknown
  enableNoAudioDetection?: boolean
  enableNoisyMicDetection?: boolean
  enableRemb?: boolean
  enableTcc?: boolean
  useRoomAsSharedDocumentName?: boolean
  channelLastN?: number
  startBitrate?: string | number
  stereo?: boolean
  forceJVB121Ratio?: number
  hiddenDomain?: string
  startAudioMuted?: number
  startVideoMuted?: number
  enableLayerSuspension?: boolean
  deploymentInfo?: {
    environment?: string
    envType?: string
    releaseNumber?: string
    shard?: string
    region?: string
    userRegion?: string
    crossRegion?: 0 | 1
  }
  p2p?: {
    enabled?: boolean
    stunServers?: { urls: string }[]
    backToP2PDelay?: number
    disabledCodec?: string
    preferredCodec?: string
  }
  rttMonitor?: {
    enabled?: boolean
    initialDelay?: number
    getStatsInterval?: number
    analyticsInterval?: number
    stunServers?: { urls: string }[]
  }
  e2eping?: {
    pingInterval?: number
  }
  abTesting?: {
    enableSuspendVideoTest?: 0 | 1
  }
  testing?: {
    capScreenshareBitrate?: 0 | 1
    callStatsThreshold?: number
    p2pTestMode?: 0 | 1
    octo?: {
      probability?: unknown
    }
  }
}

export class JitsiConnection {
  constructor(
    appID: string | null,
    token: string | null,
    options: JitsiConnectionOptions
  )

  connect(options?: { id: string; password: string }): void
  disconnect(): void
  initJitsiConference(
    name: string,
    options: InitJitsiConferenceOptions
  ): JitsiConference

  addEventListener(event: string, listener: Function): void
  removeEventListener(event: string, listener: Function): void
  addFeature(feature: string, submit?: boolean): void
  removeFeature(feature: string, submit?: boolean): void
}

/*
 * JitsiTrackError
 */

export class JitsiTrackError extends Error {
  gum: {
    error: any
    constraints: any
    devices: ('audio' | 'video' | 'screen' | 'desktop' | 'audiooutput')[]
  }
}

/*
 * JitsiParticipant
 */

export class JitsiParticipant {
  constructor(
    jid: string,
    conference: JitsiConference,
    displayName: string,
    hidden: boolean,
    statsID: string,
    status: string,
    identity: unknown
  )

  getConference(): JitsiConference
  getProperty(name: string): unknown
  hasAnyVideoTrackWebRTCMuted(): boolean
  getConnectionStatus(): string
  setProperty(name: string, value: unknown): void
  getTracks(): JitsiTrack[]
  getTracksByMediaType(mediaType: 'video' | 'audio'): JitsiTrack[]
  getId(): string
  getJid(): string
  getDisplayName(): string
  getStatsID(): string
  getStatus(): string
  isModerator(): boolean
  isHidden(): boolean
  isAudioMuted(): boolean
  isVideoMuted(): boolean
  getRole(): string
  setRole(newRole: string): void
  supportsDTMF(): boolean
  getFeatures(): Promise<Set<string>>
  hasFeature(feature: string): boolean
  setFeatures(newFeatures?: Set<string>): void
  getBotType(): string | undefined
  setBotType(newBotType: string): void
}

/*
 * JitsiMeetJS
 */

export interface JitsiMeetJSInitOptions {
  useIPv6?: unknown
  disableAudioLevels?: boolean
  disableSimulcast?: boolean
  enableWindowOnErrorHandler?: boolean
  disableThirdPartyRequests?: boolean // default false
  enableAnalyticsLogging?: boolean
  externalStorage?: unknown
  callStatsCustomScriptUrl?: string
  disableRtx?: unknown // Enables RTX everywhere
  disabledCodec?: string
  preferredCodec?: string
  useTurnUdp?: unknown
}

export interface CreateLocalTracksOptions {
  devices?: ('desktop' | 'video' | 'audio')[]
  resolution?: number // ?
  constraints?: unknown
  cameraDeviceId?: string | number
  micDeviceId?: string | number
  minFps?: number
  maxFps?: number
  desktopSharingFrameRate?: {
    min?: number
    max?: number
  }
  desktopSharingSourceDevice?: string
  facingMode?: 'user' | 'environment'
  firePermissionPromptIsShownEvent?: boolean
  fireSlowPromiseEvent?: boolean
}

export interface ConferenceEvents {
  AUDIO_INPUT_STATE_CHANGE: 'conference.audio_input_state_changed'
  AUTH_STATUS_CHANGED: 'conference.auth_status_changed'
  BEFORE_STATISTICS_DISPOSED: 'conference.beforeStatisticsDisposed'
  BOT_TYPE_CHANGED: 'conference.bot_type_changed'
  CONFERENCE_CREATED_TIMESTAMP: 'conference.createdTimestamp'
  CONFERENCE_ERROR: 'conference.error'
  CONFERENCE_FAILED: 'conference.failed'
  CONFERENCE_JOINED: 'conference.joined'
  CONFERENCE_LEFT: 'conference.left'
  CONFERENCE_UNIQUE_ID_SET: 'conference.unique_id_set'
  CONNECTION_ESTABLISHED: 'conference.connectionEstablished'
  CONNECTION_INTERRUPTED: 'conference.connectionInterrupted'
  CONNECTION_RESTORED: 'conference.connectionRestored'
  DATA_CHANNEL_OPENED: 'conference.dataChannelOpened'
  DISPLAY_NAME_CHANGED: 'conference.displayNameChanged'
  DOMINANT_SPEAKER_CHANGED: 'conference.dominantSpeaker'
  DTMF_SUPPORT_CHANGED: 'conference.dtmfSupportChanged'
  ENDPOINT_MESSAGE_RECEIVED: 'conference.endpoint_message_received'
  ENDPOINT_STATS_RECEIVED: 'conference.endpoint_stats_received'
  JVB121_STATUS: 'conference.jvb121Status'
  KICKED: 'conference.kicked'
  LAST_N_ENDPOINTS_CHANGED: 'conference.lastNEndpointsChanged'
  LOBBY_USER_JOINED: 'conference.lobby.userJoined'
  LOBBY_USER_LEFT: 'conference.lobby.userLeft'
  LOBBY_USER_UPDATED: 'conference.lobby.userUpdated'
  LOCK_STATE_CHANGED: 'conference.lock_state_changed'
  MEMBERS_ONLY_CHANGED: 'conference.membersOnlyChanged'
  MESSAGE_RECEIVED: 'conference.messageReceived'
  NOISY_MIC: 'conference.noisy_mic'
  NO_AUDIO_INPUT: 'conference.no_audio_input'
  P2P_STATUS: 'conference.p2pStatus'
  PARTCIPANT_FEATURES_CHANGED: 'conference.partcipant_features_changed'
  PARTICIPANT_CONN_STATUS_CHANGED: 'conference.participant_conn_status_changed'
  PARTICIPANT_KICKED: 'conference.participant_kicked'
  PARTICIPANT_PROPERTY_CHANGED: 'conference.participant_property_changed'
  PHONE_NUMBER_CHANGED: 'conference.phoneNumberChanged'
  PRIVATE_MESSAGE_RECEIVED: 'conference.privateMessageReceived'
  PROPERTIES_CHANGED: 'conference.propertiesChanged'
  RECORDER_STATE_CHANGED: 'conference.recorderStateChanged'
  SERVER_REGION_CHANGED: 'conference.server_region_changed'
  STARTED_MUTED: 'conference.started_muted'
  START_MUTED_POLICY_CHANGED: 'conference.start_muted_policy_changed'
  SUBJECT_CHANGED: 'conference.subjectChanged'
  SUSPEND_DETECTED: 'conference.suspendDetected'
  TALK_WHILE_MUTED: 'conference.talk_while_muted'
  TRACK_ADDED: 'conference.trackAdded'
  TRACK_AUDIO_LEVEL_CHANGED: 'conference.audioLevelsChanged'
  TRACK_MUTE_CHANGED: 'conference.trackMuteChanged'
  TRACK_REMOVED: 'conference.trackRemoved'
  TRANSCRIPTION_STATUS_CHANGED: 'conference.transcriptionStatusChanged'
  USER_JOINED: 'conference.userJoined'
  USER_LEFT: 'conference.userLeft'
  USER_ROLE_CHANGED: 'conference.roleChanged'
  USER_STATUS_CHANGED: 'conference.statusChanged'
  VIDEO_SIP_GW_AVAILABILITY_CHANGED: 'conference.videoSIPGWAvailabilityChanged'
  VIDEO_SIP_GW_SESSION_STATE_CHANGED: 'conference.videoSIPGWSessionStateChanged'
  _MEDIA_SESSION_ACTIVE_CHANGED: 'conference.media_session.active_changed'
  _MEDIA_SESSION_STARTED: 'conference.media_session.started'
}

export interface ConnectionEvents {
  CONNECTION_DISCONNECTED: 'connection.connectionDisconnected'
  CONNECTION_ESTABLISHED: 'connection.connectionEstablished'
  CONNECTION_FAILED: 'connection.connectionFailed'
  DISPLAY_NAME_REQUIRED: 'connection.display_name_required'
  WRONG_STATE: 'connection.wrongState'
}

export interface ConnectionQualityEvents {
  LOCAL_STATS_UPDATED: 'cq.local_stats_updated'
  REMOTE_STATS_UPDATED: 'cq.remote_stats_updated'
}

export interface DetectionEvents {
  AUDIO_INPUT_STATE_CHANGE: 'audio_input_state_changed'
  DETECTOR_STATE_CHANGE: 'detector_state_change'
  NO_AUDIO_INPUT: 'no_audio_input_detected'
  VAD_NOISY_DEVICE: 'detection.vad_noise_device'
  VAD_REPORT_PUBLISHED: 'vad-report-published'
  VAD_SCORE_PUBLISHED: 'detection.vad_score_published'
  VAD_TALK_WHILE_MUTED: 'detection.vad_talk_while_muted'
}

export interface MediaDevicesEvents {
  DEVICE_LIST_CHANGED: 'mediaDevices.devicechange'
  PERMISSIONS_CHANGED: 'rtc.permissions_changed'
  PERMISSION_PROMPT_IS_SHOWN: 'mediaDevices.permissionPromptIsShown'
  SLOW_GET_USER_MEDIA: 'mediaDevices.slowGetUserMedia'
}

export interface TrackEvents {
  LOCAL_TRACK_STOPPED: 'track.stopped'
  NO_AUDIO_INPUT: 'track.no_audio_input'
  NO_DATA_FROM_SOURCE: 'track.no_data_from_source'
  TRACK_AUDIO_LEVEL_CHANGED: 'track.audioLevelsChanged'
  TRACK_AUDIO_OUTPUT_CHANGED: 'track.audioOutputChanged'
  TRACK_MUTE_CHANGED: 'track.trackMuteChanged'
  TRACK_VIDEOTYPE_CHANGED: 'track.videoTypeChanged'
}

export interface ConferenceErrors {
  AUTHENTICATION_REQUIRED: 'conference.authenticationRequired'
  CHAT_ERROR: 'conference.chatError'
  CONFERENCE_ACCESS_DENIED: 'conference.connectionError.accessDenied'
  CONFERENCE_DESTROYED: 'conference.destroyed'
  CONFERENCE_MAX_USERS: 'conference.max_users'
  CONFERENCE_RESTARTED: 'conference.restarted'
  CONNECTION_ERROR: 'conference.connectionError'
  FOCUS_DISCONNECTED: 'conference.focusDisconnected'
  FOCUS_LEFT: 'conference.focusLeft'
  GRACEFUL_SHUTDOWN: 'conference.gracefulShutdown'
  ICE_FAILED: 'conference.iceFailed'
  INCOMPATIBLE_SERVER_VERSIONS: 'conference.incompatible_server_versions'
  MEMBERS_ONLY_ERROR: 'conference.connectionError.membersOnly'
  NOT_ALLOWED_ERROR: 'conference.connectionError.notAllowed'
  OFFER_ANSWER_FAILED: 'conference.offerAnswerFailed'
  PASSWORD_NOT_SUPPORTED: 'conference.passwordNotSupported'
  PASSWORD_REQUIRED: 'conference.passwordRequired'
  RESERVATION_ERROR: 'conference.reservationError'
  VIDEOBRIDGE_NOT_AVAILABLE: 'conference.videobridgeNotAvailable'
}

export interface ConnectionErrors {
  CONNECTION_DROPPED_ERROR: 'connection.droppedError'
  OTHER_ERROR: 'connection.otherError'
  PASSWORD_REQUIRED: 'connection.passwordRequired'
  SERVER_ERROR: 'connection.serverError'
}

export interface TrackErrors {
  CONSTRAINT_FAILED: 'gum.constraint_failed'
  ELECTRON_DESKTOP_PICKER_ERROR: 'gum.electron_desktop_picker_error'
  ELECTRON_DESKTOP_PICKER_NOT_FOUND: 'gum.electron_desktop_picker_not_found'
  GENERAL: 'gum.general'
  NOT_FOUND: 'gum.not_found'
  PERMISSION_DENIED: 'gum.permission_denied'
  SCREENSHARING_GENERIC_ERROR: 'gum.screensharing_generic_error'
  SCREENSHARING_USER_CANCELED: 'gum.screensharing_user_canceled'
  TIMEOUT: 'gum.timeout'
  TRACK_IS_DISPOSED: 'track.track_is_disposed'
  TRACK_NO_STREAM_FOUND: 'track.no_stream_found'
  UNSUPPORTED_RESOLUTION: 'gum.unsupported_resolution'
}

export interface LogLevels {
  DEBUG: 'debug'
  ERROR: 'error'
  INFO: 'info'
  LOG: 'log'
  TRACE: 'trace'
  WARN: 'warn'
}
export type LogLevel = LogLevels[keyof LogLevels]

export interface JitsiMeetJS {
  init(options: JitsiMeetJSInitOptions): void
  JitsiConnection: typeof JitsiConnection
  setLogLevel(level: LogLevel): void
  createLocalTracks(options: CreateLocalTracksOptions): Promise<JitsiTrack[]>
  createTrackVADEmitter(
    localAudioDeviceId: string,
    sampleRate: number,
    vadProcessor: unknown
  ): Promise<unknown>
  isDesktopSharingEnabled(): boolean
  getActiveAudioDevice(): Promise<{ deviceId: string; deviceLabel: string }>
  getGlobalOnErrorHandler(): unknown
  mediaDevices: {
    isDeviceListAvailable(): boolean
    isDeviceChangeAvailable(deviceType?: 'input' | 'output'): boolean
    enumerateDevices(callback: (devices: MediaDeviceInfo[]) => void): void
    setAudioOutputDevice(deviceId: string): Promise<void>
    getAudioOutputDevice(): string
    isDevicePermissionGranted(type?: 'audio' | 'video'): Promise<boolean>
    addEventListener(event: string, handler: Function): void
    removeEventListener(event: string, handler: Function): void
  }
  events: {
    conference: ConferenceEvents
    connection: ConnectionEvents
    connectionQuality: ConnectionQualityEvents
    detection: DetectionEvents
    mediaDevices: MediaDevicesEvents
    track: TrackEvents
  }
  errors: {
    conference: ConferenceErrors
    connection: ConnectionErrors
    track: TrackErrors
  }
  errorTypes: {
    JitsiTrackError: JitsiTrackError
  }
  logLevels: LogLevels
}

/*
 * Extend Window
 */

declare global {
  interface Window {
    JitsiMeetJS: JitsiMeetJS
  }
}
