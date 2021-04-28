import { ChakraTheme } from './types/chakra-ui-bridge'
export const extendTheme: Partial<ChakraTheme> = {
  fonts: {
    heading: "'Noto Sans JP', sans-serif",
    body: "'Noto Sans JP', sans-serif",
  },
}

type Icon = {
  path: string
  viewBox: string
}

export const customIcons: Record<string, Icon> = {
  menu: {
    path:
      '<path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />',
    viewBox: '0 0 24 24',
  },
}
