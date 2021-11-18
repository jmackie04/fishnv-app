import { reactive } from 'vue'

const regions = [
  { name: 'Eastern', description: 'Eastern' },
  { name: 'Southern', description: 'Southern' },
  { name: 'Western', description: 'Western' }
]

const counties = [
  { name: 'Carson City', description: 'Carson City' },
  { name: 'Churchill',description: 'Churchill' },
  { name: 'Clark', description: 'Clark' },
  { name: 'Douglas', description: 'Douglas' },
  { name: 'Elko', description: 'Elko' },
  { name: 'Esmeralda', description: 'Esmeralda' },
  { name: 'Eureka', description: 'Eureka' },
  { name: 'Humboldt', description: 'Humboldt' },
  { name: 'Lander', description: 'Lander' },
  { name: 'Lincoln', description: 'Lincoln' },
  { name: 'Lyon', description: 'Lyon' },
  { name: 'Mineral', description: 'Mineral' },
  { name: 'Nye', description: 'Nye' },
  { name: 'Pershing', description: 'Pershing' },
  { name: 'Storey', description: 'Storey' },
  { name: 'Washoe', description: 'Washoe' },
  { name: 'White Pine', description: 'White Pine' }
]

const state = reactive({
  regions,
  selectedRegion: '',
  counties,
  selectedCounty: ''
})

const clearSelected = () => {
  state.selectedRegion = ''
  state.selectedCounty = ''
}

const setSelectedRegion = (value) => {
  state.selectedRegion = value
}

const setSelectedCounty = (value) => {
  state.selectedCounty = value
}

export default () => {
  return {
    state,
    clearSelected,
    setSelectedRegion,
    setSelectedCounty
  }
}
