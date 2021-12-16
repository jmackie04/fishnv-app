<template>
  <div class="flex-1 flex flex-col">
    <ndow-header-bar />

    <!-- content area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- map section -->
      <section
        v-if="display === 'both' || display === 'map'"
        id="map" 
        class="relative block min-w-0 flex-1 lg:order-last bg-blue-300"
      >
        <maplibre-map
          @update:moveend="syncUrl"
          @toggle:maplayers="toggleLayers"
        />
      </section>

      <!-- side bar -->
      <aside
        v-if="display === 'both' || display === 'list'"
        class="relative z-10 w-full lg:w-120 lg:flex-shink-0 lg:order-first overflow-clip overflow-y-scroll shadow-sm"
      >
        <div>

          <div v-if="!isLoading" class="p-2 text-2xl text-oxford-600">
            {{ totalFishableWaters }} Fishable Waters
          </div>

          <div v-if="!isLoading" class="flex flex-col p-2 divide-y-2 divide-gray-200 overflow-x-hidden mx-auto">
            <div
              v-for="(water, index) in filteredFishableWaters" :key="water.id"
              :class="[
                index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                index === filteredFishableWaters.length - 1 ? 'rounded-bl-md rounded-br-md': '',
                'bg-white overflow-hidden flex flex-col p-2 group cursor-pointer'
              ]"
            >
              <div>
                <h2 class="text-lg text-oxford-600 tracking-wide font-medium leading-loose group-hover:text-saffron-600">{{ water.water_name }} <span class="text-gray-600 text-sm font-light ml-1">{{ water.label }}</span></h2>
              </div>
              <div class="">
                <p class="text-gray-600 text-sm font-light capitalize">
                  {{ water.species.join(', ') }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </aside>

    </div>

    <map-layers-panel :open="mapLayersPanelVisible" @panel:close="toggleLayers" />
    <filters-panel-mobile />
  </div>
</template>

<script>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useFishableWaters from '../../composables/use-fishable-waters.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'
import useBreakpoints from '../../composables/use-breakpoints.js'

import ndowHeaderBar from '../../components/ndow-header-bar.vue'
import FiltersPanelMobile from './filters-panel-mobile.vue'
import MaplibreMap from '../../components/maplibre-map.vue'
import MapLayersPanel from './map-layers-panel.vue'

export default {
  name: 'map-view',
  components: {
    ndowHeaderBar,
    FiltersPanelMobile,
    MaplibreMap,
    MapLayersPanel
  },

  setup () {
    const {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      totalFishableWaters
    } = useFishableWaters()
    const { open: openMobileMenu, display, transitionDisplay } = useMobileMenu()
    
    const { breakpoints } = useBreakpoints()
    watch(
      () => breakpoints.w,
      (bp) => {
        if (bp >= 1024) transitionDisplay('toBoth')
        else transitionDisplay('toList')
      }
    )

    // map interactions
    const route = useRoute()
    const router = useRouter()
    const mapLayersPanelVisible = ref(false)
    const syncUrl = ({ bounds, ...layout }) => {
      router.replace({ query: { ...route.query, ...layout } })
    }
    const toggleLayers = () => { mapLayersPanelVisible.value = !mapLayersPanelVisible.value; console.log({ mapLayersPanelVisible }) }

    return {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      totalFishableWaters,
      
      // mobile menu method
      openMobileMenu,

      // mobile display state machine
      display,
      transitionDisplay,
      breakpoints,

      // map interactions
      syncUrl,
      mapLayersPanelVisible,
      toggleLayers
    }
  }
}
</script>
