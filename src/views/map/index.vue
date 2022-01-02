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
        <maplibre-map ref="maplibre" @update:moveend="syncUrl" />
      </section>

      <!-- side bar -->
      <aside
        v-if="display === 'both' || display === 'list'"
        class="relative z-10 w-full lg:w-120 lg:flex-shink-0 lg:order-first overflow-clip overflow-y-scroll shadow-sm"
      >
        <div v-if="!isLoading">
          <div class="p-2 text-2xl text-oxford-600">{{ totalFishableWaters }} Fishable Waters</div>
          <fw-list-container :fishable-waters="filteredFishableWaters" />
        </div>
        <div v-else class="flex items-center justify-center w-full h-full">
          <div class="flex space-x-2">
            <div class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading"></div>
            <div
              class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading animation-delay-100"
            ></div>
            <div
              class="w-5 h-5 bg-olive-600 bg-opacity-75 rounded-full animate-loading animation-delay-200"
            ></div>
          </div>
        </div>
      </aside>
    </div>

    <filters-panel-mobile />
  </div>
</template>

<script>
import { watch, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import useFishableWaters from '../../composables/use-fishable-waters.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'
import useBreakpoints from '../../composables/use-breakpoints.js'

import ndowHeaderBar from '../../components/ndow-header-bar.vue'
import FiltersPanelMobile from './filters-panel-mobile.vue'
import MaplibreMap from '../../components/maplibre-map.vue'
import fwListContainer from './fw-list-container.vue'

import { layers } from '../../lib/maplibre-layers.js'

export default {
  name: 'map-view',
  components: {
    ndowHeaderBar,
    FiltersPanelMobile,
    MaplibreMap,
    fwListContainer
  },

  setup() {
    const {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      totalFishableWaters,
      fwIds
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
    const syncUrl = ({ bounds, ...layout }) => { router.replace({ query: { ...route.query, ...layout } }) }

    // map methods
    const maplibre = ref(null)
    watch(fwIds, async (curr) => {
      await nextTick()
      maplibre.value.map.setFilter('fw-lines', curr)
      maplibre.value.map.setFilter('fw-polygons', ['all', ['==', '$type', 'Polygon'], curr])

      layers.forEach(def => {
        def.layers.forEach((layer) => {
          if (layer.id == 'fw-lines') layer.filter = curr
          if (layer.id == 'fw-polygons') layer.filter = ['all', ['==', '$type', 'Polygon'], curr]
        })
      })
    },
      { deep: true })

    return {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      totalFishableWaters,
      fwIds,

      // mobile menu method
      openMobileMenu,

      // mobile display state machine
      display,
      transitionDisplay,
      breakpoints,

      // map interactions
      syncUrl,
      maplibre
    }
  }
}
</script>
