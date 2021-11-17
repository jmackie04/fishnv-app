<template>
  <div class="text-gray-600 space-y-2">
    <div>
      <h2 class="text-xl text-gray-800">Select A Species</h2>
      <p class="font-light">
        This will filter the waters for the combination of species selected.
      </p>
    </div>

    <div class="space-y-2">
      <div v-for="(group, index) in speciesGroups" :key="index" class="space-y-1">
        <h3 class="text-gray-600 capitalize">{{ group }}</h3>
        <div class="flex flex-wrap items-center gap-2">
          <checkbox-option
            v-for="option in species[group]"
            :key="option.value"
            :optionId="option.value"
            :optionLabel="option.label"
            v-model="model"
          />
      </div>
      </div>
    </div>

    <div>
      <button
        type="button"
        class="text-sm font-light underline text-saffron-500 hover:text-saffron-400"
        @click="clearSelection"
      >
        Clear Selection
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import checkboxOption from '../../components/checkbox-option.vue'
import useFiltersSpecies from '../../composables/use-filters-species.js'

export default {
  name: 'filter-species-checkbox-group',

  props: {
    modelValue: {
      type: Array
    }
  },

  emits: ['update:modelValue', 'update:clearValue'],

  components: {
    checkboxOption
  },

  setup (props, { emit }) {
    const { state } = useFiltersSpecies()
    const { species, speciesGroups } = state

    const model = computed({
      get: () => props.modelValue,
      set: value => { emit('update:modelValue', value) }
    })

    const clearSelection = () => { emit('update:clearValue') }

    return {
      species,
      speciesGroups,
      model,
      clearSelection
    }
  }
}
</script>

<style>

</style>