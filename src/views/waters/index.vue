<template>
  <ndow-loading v-if="loading" />
  <ndow-error v-if="error" :error="error" />

  <template v-else>
    <div class="min-h-full min-w-full mt-16">
      <div class="flex flex-col lg:flex-row max-w-7xl mx-auto px-2 gap-4">
        <header class="w-full lg:w-72 py-8 flex-shrink-0">
          <div class>
            <div class="flex-1 min-w-0 flex flex-col space-y-6">
              <div class="flex justify-center">
                <svg
                  class="h-44 w-44 text-gray-600 border border-gray-400/50 rounded-full p-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path
                    class="cls-1"
                    d="M24.42,46.28s14.06,3.66,13.7,6.94-21.91,7.89-27.57,14S21.69,83.89,46,85.9"
                  />
                  <path
                    class="cls-1"
                    d="M33.92,41.54s22.21,2.75,36,7.55C81.75,53.22,46.65,68.19,96,71.3"
                  />
                  <path
                    class="cls-1"
                    d="M22.56,70.92c3.42,0,3.42,2,6.84,2s3.42-2,6.85-2,3.42,2,6.85,2"
                  />
                  <path
                    class="cls-1"
                    d="M41.31,65.09c3.42,0,3.42,2,6.84,2s3.43-2,6.85-2,3.42,2,6.85,2"
                  />
                  <path
                    class="cls-1"
                    d="M48,78.36c2.56,0,2.56,2,5.13,2s2.56-2,5.13-2,2.57,2,5.14,2,2.56-2,5.13-2"
                  />
                  <path
                    class="cls-1"
                    d="M50.39,54.57c2.24,0,2.24,2,4.49,2s2.25-2,4.49-2,2.25,2,4.5,2"
                  />
                  <path
                    class="cls-1"
                    d="M40.27,48.6c2.24,0,2.24,2,4.49,2s2.25-2,4.49-2,2.25,2,4.5,2"
                  />
                  <path class="cls-1" d="M58.27,43s4.78-.06,4.78-6V26.62" />
                  <path class="cls-1" d="M72.44,43s-4.77-.06-4.77-6V26.62" />
                  <path
                    class="cls-1"
                    d="M60.13,34.23s-3-.43-3.17-2.81a3.53,3.53,0,0,1,1.35-3.37,5.53,5.53,0,0,1-2-5.46c.69-3.56,4.4-4.1,4.4-4.1s-.79-3,1.84-4.06c2.84-1.15,5.32,1.05,5.32,1.05a3.46,3.46,0,0,1,4.41.74c1.89,1.93.27,4.8.27,4.8a4.37,4.37,0,0,1,2.23,3.59,3.14,3.14,0,0,1-2,3.4s1.57,5.36-2.88,5.3"
                  />
                  <path class="cls-1" d="M6.5,56.9s5.62-.08,5.62-7V37.62" />
                  <path class="cls-1" d="M23.2,56.9s-5.63-.08-5.63-7V37.62" />
                  <path
                    class="cls-1"
                    d="M8.68,46.58S5.21,46.08,5,43.27a4.14,4.14,0,0,1,1.58-4,6.51,6.51,0,0,1-2.37-6.44C5,28.66,9.34,28,9.34,28s-.92-3.52,2.18-4.78c3.35-1.36,6.27,1.24,6.27,1.24a4.06,4.06,0,0,1,5.2.86c2.23,2.29.31,5.67.31,5.67a5.15,5.15,0,0,1,2.64,4.23,3.72,3.72,0,0,1-2.38,4s1.86,6.32-3.39,6.25"
                  />
                </svg>
              </div>

              <div>
                <h1
                  class="text-2xl font-bold leading-7 text-gray-600 sm:text-2xl sm:truncate"
                >{{ data.water_name }}</h1>
                <h3 class="mt-1 text-lg font-normal text-gray-500">{{ data.label }}</h3>
              </div>

              <div>
                <button
                  type="button"
                  class="w-full py-1 rounded bg-gray-50 border border-transparent hover:border-red-500"
                >Favorite</button>
              </div>

              <div class="pt-2 border-t border-gray-300">
                <h3 class="text-gray-600 font-semibold">Species</h3>
                <div class="flex flex-row flex-wrap gap-x-2 gap-y-1 pt-2">
                  <div
                    v-for="species in data.species"
                    :key="species"
                    class="px-3 py-1 text-sm inline-block rounded capitalize bg-oxford-200/40 border border-oxford-400 text-oxford-600"
                  >{{ species }}</div>
                </div>
              </div>

              <div class="pt-2 border-t border-gray-300">
                <ul class="text-gray-500 text-sm">
                  <li class="flex items-center space-x-2 py-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>{{ latLng }}</div>
                  </li>
                  <li class="flex items-center space-x-2 py-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        />
                      </svg>
                    </div>
                    <div>{{ dims }}</div>
                  </li>
                  <li class="flex items-center space-x-2 py-1">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                    <div>
                      <ol role="list" class="flex items-center space-x-2">
                        <li>{{ data.region }}</li>
                        <li>
                          <svg
                            class="flex-shrink-0 h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </li>
                        <li>{{ data.county }}</li>
                        <li>
                          <svg
                            class="flex-shrink-0 h-5 w-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </li>
                        <li>Reno</li>
                      </ol>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main class="rounded border flex-grow mt-8 bg-gray-50 rounded-t-lg shadow space-y-6">
          <div
            class="lg:relative w-full h-96 lg:h-156 rounded-t-lg overflow-hidden border-b border-gray-300"
          >
            <maplibre-map />
          </div>

          <div class="py-4 px-2">
            <nearby-waters-container :nearby-waters="data.nearby_waters.slice(0, 9)" />
          </div>
        </main>

        <!-- <pre><code lang="json">{{ data }}</code></pre> -->
      </div>
    </div>
  </template>
</template>

<script>
import { computed } from 'vue'
import NdowError from '../../components/ndow-error.vue'
import NdowLoading from '../../components/ndow-loading.vue'
import NearbyWatersContainer from './nearby-waters-container.vue'
import MaplibreMap from '../../components/maplibre-map.vue'

import { getFishableWatersById } from '../../services/api.js'

export default {
  name: 'fishable-waters',
  components: {
    NdowError,
    NdowLoading,
    NearbyWatersContainer,
    MaplibreMap
  },
  setup() {
    const { data, loading, error } = getFishableWatersById('f5719332-8135-481b-94dc-198956ed20d6')

    const latLng = computed(() => {
      const [x, y] = data.value?.spatial_metadata?.centroid ?? [0, 0]
      return [y.toFixed(4), x.toFixed(4)].join(', ')
    })
    const dims = computed(() => {
      let d = data.value?.spatial_metadata?.spatial_dimensions ?? 0
      const type = data.value?.spatial_metadata?.geometry_type
      const conversion = {
        ST_MultiLineString: {
          x: 0.000189394,
          unit: 'Miles'
        },
        ST_MultiPolygon: {
          x: 0.000022957,
          unit: 'Acres'
        }
      }
      d = d * conversion[type].x
      return `${d.toFixed(2)} ${conversion[type].unit}`
    })

    return { data, loading, error, latLng, dims }
  },
};
</script>

<style scoped>
.cls-1 {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>