<template>
  <div class="flex items-center justify-content w-full">
    <div class="bg-white rounded w-1/2 mx-auto">
      <checkbox-option optionId="apple" optionLabel="apple" v-model="apple" />
      <!-- <input-checkbox fieldId="apple" label="Apple" v-model:checked="apple" /> -->
      <pre class="mt-4"><code>{{ apple }}</code></pre>

      <div class="flex items-center space-x-2">
        <checkbox-option
          class=""
          v-for="option in options"
          :key="option.id"
          :optionId="option.id"
          :optionLabel="option.label"
          v-model="selected"
        />
      </div>
      <pre class="mt-3"><code>{{ selected }}</code></pre>
    
      <div class="mt-4">
        <filters-species v-model="species" @update:clearValue="clearSpecies" />
      </div>
    </div>


  </div>
</template>

<script>
import { ref } from 'vue'
import inputCheckbox from '../../components/input-checkbox.vue'
import checkboxOption from '../../components/checkbox-option.vue'
import filtersSpecies from '../map/filters-species.vue'

export default {
  name: 'dev-view',
  components: {
    inputCheckbox,
    checkboxOption,
    filtersSpecies
  },

  setup () {
    const apple = ref(true)
    
    const selected = ref([])
    const options = ref([{
      id: 1,
      label: 'Apple'
    }, {
      id: 2,
      label: 'Orange'
    }, {
      id: 3,
      label: 'Banana'
    }])

    const species = ref([])
    const clearSpecies = () => { species.value = [] }

    return {
      apple,
      selected,
      options,
      species,
      clearSpecies
    }
  }
}
</script>