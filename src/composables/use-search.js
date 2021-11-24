import { reactive } from 'vue'

const state = reactive({
  searchTerm: ''
})

export default () => {
  return {
    state
  }
}
