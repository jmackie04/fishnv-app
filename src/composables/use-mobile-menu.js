import { reactive, toRefs } from 'vue'
import { createMachine } from '../lib/fsm.js'

const mobileDisplayMachineDef = {
  initial: 'both',
  history: [],
  states: {
    list: {
      transitions: {
        toggle: { target: 'map' },
        openFilters: { target: 'filters' },
        toBoth: { target: 'both' }
      },
    },
    map: {
      transitions: {
        toggle: { target: 'list' },
        openFilters: { target: 'filters' },
        toBoth: { target: 'both' }
      }
    },
    both: {
      transitions: {
        toList: { target: 'list' }
      }
    },
    filters: {
      transitions: {
        close: {
          target (ctx) {
            const value = ctx.history.pop()
            return value
          }
        }
      }
    }
  }
}

const mobileDisplayMachine = createMachine(mobileDisplayMachineDef)

const state = reactive({
  isOpen: false,
  display: mobileDisplayMachine.value
})

export default function useMobileMenu () {
  const open = () => { state.isOpen = true }
  const close = () => { state.isOpen = false }
  const toggle = () => { state.isOpen = !state.isOpen }

  // mobile display state machine transitions
  const transitionDisplay = (event) => {
    const nextValue = mobileDisplayMachine.transition(state.display, event)
    // console.log({ machine: mobileDisplayMachine })
    state.display = nextValue
  }

  return {
    ...toRefs(state),
    open,
    close,
    toggle,
    transitionDisplay
  }
}
