export {}

declare module 'vue/types/vue' {
  interface Vue {
    $style: Record<string, string>
  }
}
