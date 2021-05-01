/**
 * Hey! Welcome to @chakra-ui/vue Popover
 *
 * Popover is a non-modal dialog that floats around a trigger. It's used to display contextual information to the user.
 *
 * @see Docs     https://vue.chakra-ui.com/popover
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPopover/CPopover.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPopover/accessibility.md
 */

import { useId, getElement } from '@chakra-ui/vue/src/utils'

import { CPopper } from '@chakra-ui/vue/src/CPopper'

/**
 * CPopoverContent component
 *
 * The popover content element itself.
 *
 * @extends CPopper
 * @see Docs https://vue.chakra-ui.com/popover
 */
const AppPopoverContent = {
  name: 'AppPopoverContent',
  inheritAttrs: false,
  inject: ['$PopoverContext', '$chakraColorMode'],
  props: {
    gutter: {
      type: [Number, String],
      default: 4,
    },
    ariaLabel: String,
  },
  computed: {
    context() {
      return this.$PopoverContext()
    },
    contentId() {
      return `popover-content-${useId()}`
    },
    colorMode() {
      return this.$chakraColorMode()
    },
    eventHandlers() {
      const { trigger, handleBlur, closePopover, closeOnEscape } = this.context

      let eventHandlers = {}

      if (trigger === 'click') {
        eventHandlers = {
          blur: (e) => {
            this.$emit('blur', e)
            handleBlur(e)
          },
        }
      }

      if (trigger === 'hover') {
        eventHandlers = {
          ...eventHandlers,
          mouseenter: (e) => {
            this.$emit('mouseenter', e)
            this.context.set('isHovering', true)
            setTimeout(this.context.openPopover(), 300)
          },
          mouseleave: (e) => {
            this.$emit('mouseleave', e)
            this.context.set('isHovering', false)
            setTimeout(() => {
              if (this.context.isHovering === false) {
                this.context.closePopover()
              }
            }, 300)
          },
        }
      }

      eventHandlers = {
        ...eventHandlers,
        keydown: (e) => {
          this.$emit('keydown', e)
          if (e.key === 'Escape' && closeOnEscape) {
            closePopover && closePopover()
          }
        },
      }

      return eventHandlers
    },
    calculatedAttrs() {
      const { trigger } = this.context
      if (trigger === 'click') {
        return {
          role: 'dialog',
          'aria-modal': 'false',
        }
      }

      if (trigger === 'hover') {
        return {
          role: 'tooltip',
        }
      }
    },
  },
  mounted() {
    const { set, popoverId } = this.context
    this.$nextTick(() => {
      const contentNode = getElement(`#${popoverId}`)
      if (!contentNode) {
        console.warn('[Chakra-ui]: Unable to locate PopoverContent node')
      } else {
        set('contentNode', contentNode)
      }
    })
  },
  render(h) {
    const {
      isOpen,
      triggerNode,
      popoverId,
      usePortal,
      placement,
    } = this.context
    const bg = this.colorMode === 'light' ? 'white' : 'gray.700'

    return h(
      CPopper,
      {
        props: {
          as: 'section',
          usePortal,
          isOpen,
          placement,
          anchorEl: triggerNode,
          modifiers: [
            {},
            {
              name: 'offset',
              options: {
                offset: [0, this.gutter],
              },
            },
          ],
        },
        attrs: {
          bg,
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          rounded: 'md',
          maxWidth: 'xs',
          /* MODIFIED */
          shadow: 'md',
          border: '1px solid #adb1b761',
          _focus: { outline: 0 /* , shadow: 'outline' */ },
          /* End of MODIFIED */
          ...this.$attrs,
          id: popoverId,
          tabIndex: -1,
          'aria-labelledby': this.headerId,
          'aria-describedby': this.bodyId,
          'aria-label': this.ariaLabel,
          'aria-hidden': !isOpen,
          ...this.calculatedAttrs,
          'data-chakra-component': 'CPopoverContent',
        },
        nativeOn: this.eventHandlers,
      },
      this.$slots.default
    )
  },
}

export { AppPopoverContent }
