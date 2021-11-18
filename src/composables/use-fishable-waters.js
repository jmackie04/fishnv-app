import { reactive, ref, computed, toRef } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import useFiltersSpecies from './use-filters-species.js'
import { omitWith, pickTruthy } from '../lib/objects.js'
import { isEmpty, contains } from '../lib/predicates.js'

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

/** filterFishableWaters */
const filterFishableWaters = (fishableWaters, filters) => {
  return fishableWaters.filter(waters => {
    return Object.keys(filters).every(key => {
      if (!filters[key].toString().length) return true
      if (key === 'species') return contains(waters[key], filters[key])
      return filters[key] === waters[key]
    })
  })
}

export default () => {
  const { data: fishableWaters, isLoading, error } = useAxios('/fishable-waters', FishNvApi)
  const { state: speciesFilters } = useFiltersSpecies()

  const filters = reactive({
    species: toRef(speciesFilters, 'selectedSpecies'),
    water_type: '',
    region: '',
    county: ''
  })

  const hasFilters = computed(() => !isEmpty(omitWith(filters, isEmpty)))
  const filteredFishableWaters = computed(() => {
    if  (isLoading.value || !hasFilters.value ) return fishableWaters.value

    const filterObj = pickTruthy(filters)
    return filterFishableWaters(fishableWaters.value, filterObj)
  })
  const totalFishableWaters = computed(() => filteredFishableWaters.value.length)

  return {
    fishableWaters,
    isLoading,
    error,
    filters,
    hasFilters,
    filteredFishableWaters,
    totalFishableWaters
  }
}
