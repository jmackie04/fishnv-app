<template>

  <div class="flex-1 flex flex-col">
    <ndow-header-bar @click="openMobileMenu()" />

    <div class="flex-1 flex overflow-hidden">
      <!-- map section -->
      <section id="map" class="hidden lg:block min-w-0 flex-1 lg:order-last bg-green-200">
        <h1>Map</h1>
        <div class="block md:hidden">sm</div>
        <div class="hidden md:block lg:hidden">md</div>
        <div class="hidden lg:block xl:hidden">lg</div>
        <div class="hidden xl:block 2xl:hidden">xl</div>
        <div class="hidden 2xl:block">2xl</div>
      </section>

      <!-- side bar -->
      <aside class="lg:w-120 lg:flex-shink-0 lg:order-first overflow-y-scroll">
        <div class="border-r border-gray-200 bg-gray-200">

          <div class="p-4">
            
            <label for="region" class="block">Select Region</label>
            <select name="region" id="select-region" class="block w-full mt-1" v-model="filters.region">
              <option v-for="option in regionOptionsList" :key="option" :value="option">{{ option }}</option>
            </select>

            <label for="county" class="block mt-4">Select County</label>
            <select name="county" id="select-county" class="block w-full mt-1" v-model="filters.county">
              <option v-for="option in countyOptionsList" :key="option" :value="option">{{ option }}</option>
            </select>

            <label for="species" class="block mt-4">Select Species</label>
            <select name="species" id="select-species" class="block w-full mt-1" v-model="filters.species">
              <option v-for="option in speciesOptionsList" :key="option" :value="option">{{ option }}</option>
            </select>

            <label for="water-type" class="block mt-4">Select Water Type</label>
            <select name="water-type" id="select-water-type" class="block w-full mt-1" v-model="filters.water_type">
              <option v-for="option in waterTypeOptionsList" :key="option" :value="option">{{ option }}</option>
            </select>

            <pre><code>{{ filters }}</code></pre>
            <button type="button" class="px-4 py-2 bg-olive-600 text-white mt-2 rounded shadow" @click="resetFilters">
              Reset Filters
            </button>

          </div>

          <div class="text-lg py-2">{{ totalFishableWaters }}</div>
          <pre><code>{{ { isLoading } }}</code></pre>

          <div class="overflow-y-scroll">
            <pre><code>{{ filteredFishableWaters }}</code></pre>
          </div>
        </div>
      </aside>

    </div>
  </div>


</template>

<script>
import ndowHeaderBar from '../../components/ndow-header-bar.vue'
import { useFishableWaters } from '../../composables/use-fishable-waters.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'
import {
  countyOptionsList,
  speciesOptionsList,
  waterTypeOptionsList,
  regionOptionsList
} from '../../assets/data/dropdown-list-options.js'

export default {
  name: 'map-view',
  components: { ndowHeaderBar },

  setup () {
    const {
      filters,
      resetFilters,
      isLoading,
      fishableWaters,
      error,
      filteredFishableWaters,
      totalFishableWaters
    } = useFishableWaters()
    const { open: openMobileMenu } = useMobileMenu()

    return {
      filters,
      resetFilters,
      fishableWaters,
      isLoading,
      error,
      filteredFishableWaters,
      totalFishableWaters,

      // mobile menu method
      openMobileMenu,

      //options
      countyOptionsList,
      speciesOptionsList,
      waterTypeOptionsList,
      regionOptionsList
    }
  }
}
</script>