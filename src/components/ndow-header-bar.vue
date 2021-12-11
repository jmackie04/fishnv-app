<template>
  <div class="flex-shrink-0 flex h-16 bg-white shadow px-2" style="z-index: 10;">
    <div class="flex flex-1 items-center h-full space-x-2">
      <!-- Menu button, mobile only -->
      <div class="flex-none flex items-center lg:hidden">
        <button
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
          @click="openMobileMenu()"
        >
          <span class="sr-only">Open mobile navigation menu</span>
          <menu-alt4-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <!-- Search bar -->
      <div class="flex-1">
        <div>
          <div class="pr-2">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full bg-white border border-gray-300 rounded py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-olive-500 focus:border-olive-500"
                placeholder="Search"
                type="search"
                v-model="searchTerm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Filter popovers -->
      <div class="flex-1 items-center space-x-3 hidden lg:flex">
        <!-- species filters -->
        <filter-popover :is-filtered="activeFilters.includes('species')">
          <template #label>Species</template>
          <template #content>
            <filters-species
              v-model="state.selectedSpecies"
              @update:clearValue="clearSelectedSpecies"
            />
          </template>
        </filter-popover>

        <!-- water type filters -->
        <filter-popover :is-filtered="activeFilters.includes('water_type')">
          <template #label>Water Type</template>
          <template #content>
            <filters-water-type />
          </template>
        </filter-popover>

        <!-- location filters -->
        <filter-popover
          :is-filtered="activeFilters.includes('region') || activeFilters.includes('county')"
        >
          <template #label>Locations</template>
          <template #content>
            <filters-locations />
          </template>
        </filter-popover>

        <div>
          <button
            type="button"
            class="p-2 rounded text-sm text-gray-500 font-light hover:text-red-500 hover:underline"
            @click="clearFilters"
          >Clear Filters</button>
        </div>
      </div>

      <!-- mobile page buttons -->
      <div class="flex-none space-x-1 lg:hidden">
        <button
          type="button"
          class="relative flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
          @click="transitionDisplay('openFilters')"
        >
          <span class="sr-only">Open filters panel</span>
          <adjustments-icon class="h-6 w-6" aria-hidden="true" />
          <span
            v-if="activeFilters.length"
            class="absolute inline-flex items-center justify-center bg-olive-500 h-2 w-2 text-xxs text-olive-100 font-bold rounded-full shadow top-1 right-1"
          />
        </button>

        <button
          v-if="display === 'list' || (display === 'filters' && previousDisplay === 'list')"
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
          @click="transitionDisplay('toggle')"
        >
          <span class="sr-only">Open map panel</span>
          <map-icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          v-if="display === 'map' || (display === 'filters' && previousDisplay === 'map')"
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
          @click="transitionDisplay('toggle')"
        >
          <span class="sr-only">Open list panel</span>
          <view-grid-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRef, watch, ref } from 'vue'
import { SearchIcon, AdjustmentsIcon, MapIcon, ViewGridIcon, MenuAlt4Icon } from '@heroicons/vue/outline'
import filterPopover from '../components/filter-popover.vue'
import filtersSpecies from '../views/map/filters-species.vue'
import filtersWaterType from '../views/map/filters-water-type.vue'
import filtersLocations from '../views/map/filters-locations.vue'
import useMobileMenu from '../composables/use-mobile-menu.js'
import useFiltersSpecies from '../composables/use-filters-species.js'
import useSearch from '../composables/use-search.js'
import useFishableWaters from '../composables/use-fishable-waters.js'

export default {
  name: 'ndow-map-header',
  components: {
    SearchIcon,
    AdjustmentsIcon,
    MapIcon,
    ViewGridIcon,
    MenuAlt4Icon,
    filterPopover,
    filtersSpecies,
    filtersWaterType,
    filtersLocations
  },
  setup() {
    const { open: openMobileMenu, display, transitionDisplay } = useMobileMenu()
    const { filters, clearFilters } = useFishableWaters()
    const { state: search } = useSearch()
    const { state, clearSelectedSpecies } = useFiltersSpecies()

    const searchTerm = toRef(search, 'searchTerm')
    const activeFilters = computed(() => Object.keys(filters.value))

    const previousDisplay = ref('')
    watch(
      display,
      (curr, prev) => {
        previousDisplay.value = prev
      }
    )

    return {
      openMobileMenu,
      state,
      clearSelectedSpecies,
      activeFilters,
      clearFilters,
      searchTerm,

      // mobile display state machine
      display,
      transitionDisplay,
      previousDisplay
    }
  }
}
</script>