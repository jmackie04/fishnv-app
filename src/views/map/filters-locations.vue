<template>
  <div class="text-gray-600 space-y-6">
    <div class="space-y-4">
      <div>
        <h2 class="text-lg text-gray-800">Select a Region</h2>
        <p class="font-light text-sm">
          Filter diplayed waters based on the Region selected.
        </p>
      </div>
      <inputRadioGroup :options="regions" v-model="selectedRegion" />
    </div>

    <div class="space-y-4">
      <div>
        <h2 class="text-lg text-gray-800">Select a County</h2>
        <p class="font-light text-sm">
          Filter diplayed waters based on the County selected.
        </p>
      </div>
      <inputRadioGroup :options="counties" v-model="selectedCounty" />
    </div>

    <div class="flex justify-end">
      <button
        type="button"
        class="text-sm font-light text-gray-600 hover:text-red-500 hover:underline"
        @click="clearSelected"
      >
        Clear Selection
      </button>
    </div>
  </div>
  
</template>

<script>
import { toRefs } from 'vue'
import inputRadioGroup from '../../components/input-radio-group.vue'
import useFiltersLocation from '../../composables/use-filters-location.js'

export default {
  name: 'filters-location',
  components: { inputRadioGroup },

  setup () {
    const { state, clearSelected } = useFiltersLocation()
    const { selectedRegion, selectedCounty, regions, counties } = toRefs(state)

    return {
      selectedRegion,
      selectedCounty,
      regions,
      counties,
      clearSelected
    }
  }
}
</script>