<template>
  <div class="text-gray-600 space-y-6">
    <div>
      <h2 class="text-lg text-gray-800">Select A Water Type</h2>
      <p class="font-light text-sm">
        This will filter the diplayed waters by the selected water type.
      </p>
    </div>

    <RadioGroup v-model="selected">
      <RadioGroupLabel class="sr-only">
        Water Types
      </RadioGroupLabel>
      <div class="bg-white rounded-md -space-y-px">
        <RadioGroupOption as="template" v-for="(water, index) in waterTypes" :key="water.name" :value="water.name" v-slot="{ checked, active }">
          <div
            :class="[
              index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
              index === waterTypes.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
              checked ? 'bg-olive-200 bg-opacity-50 border-olive-200 z-10' : '',
              'relative p-4 flex cursor-pointer focus:outline-none'
            ]"
          >
            <span :class="[checked ? 'bg-olive-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-olive-500' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
              <span class="rounded-full bg-white w-1.5 h-1.5" />
            </span>
            <div class="ml-3 flex flex-col">
              <RadioGroupLabel as="span" :class="[checked ? 'text-olive-900' : 'text-gray-900', 'block text-sm font-medium capitalize']">
                {{ water.name }}
              </RadioGroupLabel>
              <RadioGroupDescription as="span" :class="[checked ? 'text-olive-700' : 'text-gray-500', 'block text-sm']">
                {{ water.description }}
              </RadioGroupDescription>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>

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
import { toRef } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import useFiltersWaterType from '../../composables/use-filters-water-type.js'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
  },
  setup() {
    const { state, setSelected, clearSelected } = useFiltersWaterType()
    const { waterTypes } = state

    /* 
    TODO: 
    this implementation doesn't seem correct. I think this is two-way data binding to the state.
    Instead of the watcher setting the state, it is the fact that "selected" is bound is mutating
    the state exposed by useFiltersWaterType.
    
    watch(selected, (selected) => { setSelected(selected) })
    */
    const selected = toRef(state, 'selectedWaterType')

    return {
      waterTypes,
      selected,
      clearSelected,
      state
    }
  },
}
</script>