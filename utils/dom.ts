export type StyleKey = Exclude<
  keyof CSSStyleDeclaration,
  /* Exclude the following 2 readonly property keys */
  | 'length'
  | 'parentRule'
  /* Exclude the following 5 methods */
  | 'getPropertyPriority'
  | 'getPropertyValue'
  | 'item'
  | 'removeProperty'
  | 'setProperty'
>

export type StyleEntry = [StyleKey, CSSStyleDeclaration[StyleKey]]
export function applyOrderedStyles(
  // eslint-disable-next-line no-undef
  element: ElementCSSInlineStyle,
  styles: StyleEntry[]
) {
  for (const [key, value] of styles) {
    element.style[key] = value
  }
}
