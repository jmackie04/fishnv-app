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
        <div v-if="!isLoading">
          <div class="p-2 text-2xl text-oxford-600">
            {{ totalFishableWaters }} Fishable Waters
          </div>
          <fw-list-container :fishable-waters="filteredFishableWaters" />
        </div>
        <div v-else class="flex items-center justify-center w-full h-full">
          <div class="flex space-x-2">
            <div class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading"></div>
            <div class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading animation-delay-100"></div>
            <div class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading animation-delay-200"></div>
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
import fwListContainer from './fw-list-container.vue'

export default {
  name: 'map-view',
  components: {
    ndowHeaderBar,
    FiltersPanelMobile,
    MaplibreMap,
    MapLayersPanel,
    fwListContainer
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
