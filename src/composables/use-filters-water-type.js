import { reactive, readonly } from 'vue'

const waterTypes = [
  {
    name: 'creek or stream',
    description: 'Running water that is easy to wade across.'
  },
  {
    name: 'lake or reservoir',
    description: 'Natural or man-made standing bodies of water.'
  },
  {
    name: 'river',
    description: 'Running water that is too big to wade across.'
  },
  {
    name: 'urban fishery',
    description: 'A water body in or around cities and rural areas.'
  }
]

const state = reactive({
  waterTypes,
  selectedWaterType: ''
})

const clearSelected = () => {
  state.selectedWaterType = ''
}

const setSelected = (value) => {
  state.selectedWaterType = value
}

export default () => {
  return {
    state,
    clearSelected,
    setSelected
  }
}