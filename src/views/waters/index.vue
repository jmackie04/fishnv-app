<template>
  <ndow-loading v-if="loading" />
  <ndow-error v-if="error" :error="error" />
  <template v-else>
    <div class="min-h-full min-w-full">
      <!-- Page heading -->
      <header class="py-8">
        <div
          class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between"
        >
          <div class="flex-1 min-w-0">
            <nav class="flex" aria-label="Breadcrumb">
              <ol role="list" class="flex items-center space-x-4">
                <li>
                  <div>
                    <a
                      href="#"
                      class="text-sm font-medium text-gray-500 hover:text-gray-700"
                    >{{ data.region }}</a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
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
                    <a
                      href="#"
                      class="ml-4 text-sm text-gray-500 hover:text-gray-700"
                    >{{ data.county }} County</a>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
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
                    <a href="#" class="ml-4 text-sm text-gray-500 hover:text-gray-700">Reno</a>
                  </div>
                </li>
              </ol>
            </nav>

            <h1
              class="mt-2 sm:mt-3 text-2xl font-bold leading-7 text-gray-600 sm:text-3xl sm:truncate"
            >
              {{ data.water_name }}
              <span
                class="ml-2 text-lg font-normal text-gray-500"
              >{{ data.label }}</span>
            </h1>

            <div class="flex flex-row flex-wrap gap-x-2 gap-y-1 mt-2">
              <div
                v-for="species in data.species"
                :key="species"
                class="px-3 py-1 text-xs md:text-sm bg-gray-50 shadow-sm inline-block rounded capitalize"
              >{{ species }}</div>
            </div>
          </div>

          <div class="mt-2 flex xl:mt-0 xl:ml-4">
            <span class="block">
              <button
                type="button"
                class="inline-flex items-center drop-shadow-md p-2 bg-transparent text-gray-500 hover:text-red-500 focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-600"
              >
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
      </header>

      <main class="bg-green-300 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div class="h-96 md:h-full col-sapn-1 md:col-span-2 bg-white rounded shadow">map</div>
        <div class="col-span-1 bg-white rounded shadow">Nearby Waters</div>
      </main>

      <pre><code lang="json">{{ data }}</code></pre>
    </div>
  </template>
</template>

<script>
import NdowError from '../../components/ndow-error.vue';
import NdowLoading from '../../components/ndow-loading.vue';

import { getFishableWatersById } from '../../services/api.js';

export default {
  name: 'fishable-waters',
  components: {
    NdowError,
    NdowLoading
  },
  setup() {
    const { data, loading, error } = getFishableWatersById('f5719332-8135-481b-94dc-198956ed20d6')

    return { data, loading, error }
  },
};
</script>
