import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const FishNvApi = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

FishNvApi.interceptors.request.use((config) => {
  return new Promise(resolve => setTimeout(() => resolve(config), 1000))
})

/** Pick truthy values */
const pickTruthy = (obj) => Object.keys(obj)
    .reduce((acc, key) => !obj[key] ? { ...acc } : { ...acc, [key]: obj[key] }, {})

export const useFishableWaters = () => {
  const { data: fishableWaters, isLoading, error } = useAxios('/fishable-waters', FishNvApi)

  // filter variables
  const filters = reactive({
    species: '',
    water_type: '',
    region: '',
    county: ''
  })

  // filtered fishable waters
  const filteredFishableWaters = computed(() => {
    const hasFilters = Object.keys(filters).length
    if (isLoading.value || !hasFilters) return fishableWaters.value

    const filterObj = pickTruthy(filters)
    return filterFishableWaters(fishableWaters.value, filterObj)
  })
  const totalFishableWaters = computed(() => {
    return filteredFishableWaters.value?.length
  })

  // reset filters method
  function resetFilters () {
    filters.species = '',
    filters.water_type = ''
    filters.region = ''
    filters.county = ''
  }

  return {
    isLoading,
    fishableWaters,
    error,
    filteredFishableWaters,
    totalFishableWaters,

    // filter values
    filters,
    resetFilters
  }
}

function filterFishableWaters (arr, filters) {
  const filterKeys = Object.keys(filters)

  return arr.filter(item => {
    return filterKeys.every(key => {
      if (!filters[key].toString().length) return true
      if (key === 'species') return item[key].includes(filters[key])
      return filters[key] === item[key]
    })
  })
}