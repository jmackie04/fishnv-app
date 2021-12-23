import { reactive, ref, computed, toRef } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { omitWith, pickTruthy } from '../lib/objects.js'
import { isEmpty, contains } from '../lib/predicates.js'
import useFiltersSpecies from './use-filters-species.js'
import useFiltersWaterType from './use-filters-water-type.js'
import useSearch from './use-search.js'
import useFiltersLocation from './use-filters-location.js'

const FishNvApi = axios.create({
  baseURL: import.meta.env.VITE_APIURL || 'http://localhost:3333',
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
      if (key === 'searchTerm') {
        return waters.water_name.toLowerCase().indexOf(filters[key].toLowerCase()) > -1
      }
      return filters[key] === waters[key]
    })
  })
}

export default () => {
  const { data: fishableWaters, isLoading, error } = useAxios('/fishable-waters', FishNvApi)
  const { state: speciesFilters, clearSelectedSpecies } = useFiltersSpecies()
  const { state: waterTypeFilters, clearSelected: clearSelectedWaterType } = useFiltersWaterType()
  const { state: locationFilters, clearSelected: clearSelectedLocations  } = useFiltersLocation()
  const { state: search } = useSearch()

  const _filters = reactive({
    species: toRef(speciesFilters, 'selectedSpecies'),
    water_type: toRef(waterTypeFilters, 'selectedWaterType'),
    region: toRef(locationFilters, 'selectedRegion'),
    county: toRef(locationFilters, 'selectedCounty'),
    searchTerm: toRef(search, 'searchTerm')
  })

  const filters = computed(() => omitWith(_filters, isEmpty))
  const hasFilters = computed(() => !isEmpty(filters.value))
  const filteredFishableWaters = computed(() => {
    if  (isLoading.value || !hasFilters.value ) return fishableWaters.value

    return filterFishableWaters(fishableWaters.value, filters.value)
  })
  const totalFishableWaters = computed(() => {
    if (!isLoading.value) return filteredFishableWaters.value.length
  })

  const fwIds = computed(() => {
    if (filteredFishableWaters.value) {
      return ['in', 'id', ...filteredFishableWaters.value.map(fw => fw.id)]
    } else {
      undefined
    }
  })

  const clearFilters = () => {
    clearSelectedSpecies()
    clearSelectedWaterType()
    clearSelectedLocations()
  }

  return {
    fishableWaters,
    isLoading,
    error,
    filters,
    hasFilters,
    filteredFishableWaters,
    fwIds,
    totalFishableWaters,
    clearFilters
  }
}
