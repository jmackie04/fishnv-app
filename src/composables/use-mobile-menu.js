import { reactive, toRefs } from 'vue'

const state = reactive({
  isOpen: false
})


export default function useMobileMenu () {
  const open = () => { state.isOpen = true }
  const close = () => { state.isOpen = false }
  const toggle = () => { state.isOpen = !state.isOpen }

  return {
    ...toRefs(state),
    open,
    close,
    toggle
  }
}
