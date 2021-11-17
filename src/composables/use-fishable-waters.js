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
    // return filterObj
    return filterFishableWaters(fishableWaters.value, filterObj)
  })

  return {
    fishableWaters,
    isLoading,
    error,
    filters,
    hasFilters,
    filteredFishableWaters
  }
}

// export const useFishableWaters = () => {
//   const { data: fishableWaters, isLoading, error } = useAxios('/fishable-waters', FishNvApi)
//   const { state: speciesFilters } = useFiltersSpecies()

//   // filter variables
//   const filters = reactive({
//     species: '',
//     water_type: '',
//     region: '',
//     county: ''
//   })

//   // filtered fishable waters
//   const filteredFishableWaters = computed(() => {
//     const hasFilters = Object.keys(filters).length
//     if (isLoading.value || !hasFilters) return fishableWaters.value

//     const filterObj = pickTruthy(filters)
//     return filterFishableWaters(fishableWaters.value, filterObj)
//   })
//   const totalFishableWaters = computed(() => {
//     return filteredFishableWaters.value?.length
//   })

//   // reset filters method
//   function resetFilters () {
//     filters.species = '',
//     filters.water_type = ''
//     filters.region = ''
//     filters.county = ''
//   }

//   return {
//     isLoading,
//     fishableWaters,
//     error,
//     filteredFishableWaters,
//     totalFishableWaters,

//     // filter values
//     filters,
//     resetFilters
//   }
// }
