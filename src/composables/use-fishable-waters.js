import { reactive, ref, computed, toRef } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { omitWith, pickTruthy } from '../lib/objects.js'
import { isEmpty, contains } from '../lib/predicates.js'
import useFiltersSpecies from './use-filters-species.js'
import useFiltersWaterType from './use-filters-water-type.js'
import useFiltersLocation from './use-filters-location.js'

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
  const { state: waterTypeFilters } = useFiltersWaterType()
  const { state: locationFilters } = useFiltersLocation()

  const filters = reactive({
    species: toRef(speciesFilters, 'selectedSpecies'),
    water_type: toRef(waterTypeFilters, 'selectedWaterType'),
    region: toRef(locationFilters, 'selectedRegion'),
    county: toRef(locationFilters, 'selectedCounty')
  })

  const hasFilters = computed(() => !isEmpty(omitWith(filters, isEmpty)))
  const filteredFishableWaters = computed(() => {
    if  (isLoading.value || !hasFilters.value ) return fishableWaters.value

    const filterObj = pickTruthy(filters)
    return filterFishableWaters(fishableWaters.value, filterObj)
  })
  const totalFishableWaters = computed(() => {
    if (!isLoading.value) return filteredFishableWaters.value.length
  })

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
