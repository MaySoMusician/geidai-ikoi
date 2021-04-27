import { VNode } from 'vue'
import { ChakraTheme, ToggleColorModeFunction } from '@/types/chakra-ui-bridge'

declare module 'vue/types/vue' {
  type ToastOptions = {
    title: string
    isClosable: boolean
    onClose: () => void
    description: string
    status: 'success' | 'error' | 'warning' | 'info'
    variant: 'solid' | 'subtle' | 'left-accent' | 'top-accent'
    duration: number
    position:
      | 'top'
      | 'top-left'
      | 'top-right'
      | 'bottom'
      | 'bottom-left'
      | 'bottom-right'
    render: (props: { onClose: () => void; id: string }) => VNode
  }
  interface Vue {
    $toast(options: Partial<ToastOptions>): void
    $chakraColorMode(): string
    $chakraTheme(): ChakraTheme
    $toggleColorMode: ToggleColorModeFunction
  }
}
