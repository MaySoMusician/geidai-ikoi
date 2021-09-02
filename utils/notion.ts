const NOTION_API_BASEURL = 'https://notion-api.splitbee.io/v1'
const IGNORE = true as const

export function fetchNotionData(type: string, id: string) {
  return fetch(`${NOTION_API_BASEURL}/${type}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

export function fetchNotionTableData(id: string) {
  return fetchNotionData('table', id)
}

export interface NotionDatabaseItem {
  id: string
}

export function isValidNotionDatabaseItem(
  target: any
): target is NotionDatabaseItem {
  return _isValidNotionDatabaseItem(target)
}

function _isValidNotionDatabaseItem(target: any): boolean {
  return target && isNotEmptyString(target.id)
}

export interface MeetLinkItem extends NotionDatabaseItem {
  slug: string
  url: string
  category?: string[]
  name?: string
  isHidden?: boolean
}

export function isValidMeetLinkItem(target: any): target is MeetLinkItem {
  return (
    _isValidNotionDatabaseItem(target) &&
    isNotEmptyString(target.slug) &&
    isNotEmptyString(target.url) &&
    target.url.startsWith('https://meet.google.com/') &&
    ('category' in target
      ? Array.isArray(target.category) &&
        target.category.every((v: any) => isNotEmptyString(v))
      : IGNORE) &&
    ('name' in target ? isNotEmptyString(target.name) : IGNORE) &&
    ('isHidden' in target ? typeof target.isHidden === 'boolean' : IGNORE)
  )
}

const newsTypes = ['info', 'warning'] as const
export type NewsType = typeof newsTypes[number]

export interface NewsItem extends NotionDatabaseItem {
  title: string
  type: NewsType
  publishedOn?: string
  content?: string
  isHidden?: boolean
}

export function isValidNewsItem(target: any): target is NewsItem {
  return (
    _isValidNotionDatabaseItem(target) &&
    isNotEmptyString(target.title) &&
    isNotEmptyString(target.type) &&
    newsTypes.includes(target.type) &&
    ('publishedOn' in target ? isNotEmptyString(target.publishedOn) : IGNORE) &&
    ('content' in target ? isNotEmptyString(target.content) : IGNORE) &&
    ('isHidden' in target ? typeof target.isHidden === 'boolean' : IGNORE)
  )
}

export interface ModalNoticeItem extends NotionDatabaseItem {
  title: string
  body: string
  link?: string
  releasedAt?: number
  expiredAt?: number
  version: string
  conditions?: string
}

export function isValidModalNoticeItem(target: any): target is ModalNoticeItem {
  return (
    _isValidNotionDatabaseItem(target) &&
    isNotEmptyString(target.title) &&
    isNotEmptyString(target.body) &&
    ('link' in target ? typeof target.link === 'string' : IGNORE) &&
    ('releasedAt' in target
      ? isNumber(target.releasedAt) && target.releasedAt > 0
      : IGNORE) &&
    ('expiredAt' in target
      ? isNumber(target.expiredAt) && target.expiredAt > 0
      : IGNORE) &&
    isNotEmptyString(target.version) &&
    ('conditions' in target ? typeof target.conditions === 'string' : IGNORE)
  )
}

export interface AppointmentCalendarItem extends NotionDatabaseItem {
  title: string
  url: string
  category: string
}

export function isValidAppointmentCalendarItem(
  target: any
): target is AppointmentCalendarItem {
  return (
    _isValidNotionDatabaseItem(target) &&
    isNotEmptyString(target.title) &&
    isNotEmptyString(target.url) &&
    isNotEmptyString(target.slug) &&
    isNotEmptyString(target.category)
  )
}

function isNotEmptyString(target: any): target is string {
  return typeof target === 'string' && target !== ''
}

function isNumber(target: any): target is number {
  return !Number.isNaN(target)
}

type ModalNoticeConditions = {
  shownLimit?: number
  intervalMin?: number
}

export function validateModalNoticeConditions(
  str: string
): ModalNoticeConditions | false {
  if (str === '') return false

  const arr = str.split(';')
  const result: ModalNoticeConditions = {}

  for (const expr of arr) {
    const [property, value] = expr.split('=')
    if (property === 'shownLimit') {
      const num = Number.parseInt(value, 10)
      if (!Number.isNaN(num)) result.shownLimit = num
    } else if (property === 'intervalMin') {
      const num = Number.parseInt(value, 10)
      if (!Number.isNaN(num)) result.intervalMin = num
    }
  }
  return result
}
