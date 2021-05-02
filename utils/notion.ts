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
  onPublished?: string
  content?: string
  isHidden?: boolean
}

export function isValidNewsItem(target: any): target is NewsItem {
  return (
    _isValidNotionDatabaseItem(target) &&
    isNotEmptyString(target.title) &&
    isNotEmptyString(target.type) &&
    newsTypes.includes(target.type) &&
    ('onPublished' in target ? isNotEmptyString(target.onPublished) : IGNORE) &&
    ('content' in target ? isNotEmptyString(target.content) : IGNORE) &&
    ('isHidden' in target ? typeof target.isHidden === 'boolean' : IGNORE)
  )
}

function isNotEmptyString(target: any): target is string {
  return typeof target === 'string' && target !== ''
}