<template>
  <div
    class="relative flex-shrink-0 flex h-16 bg-white shadow"
    style="z-index: 10;"
  >
    <!-- Menu open button, mobile only -->
    <button
      class="lg:hidden px-4 border-r border-gray-200 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
      aria-label="Open sidebar"
      @click="toggleMenu()"
    >
      <span class="sr-only">Open application menu</span>
      <menu-alt4-icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Page header -->
    <div class="flex-1 flex justify-between items-center">

      <!-- Search bar, left side -->
      <div class="flex-1 flex">
        <div class="min-w-0 flex-1 lg:px-0 xl:col-span-6">
          <div class="flex items-center px-2 md:max-w-3xl lg:max-w-none lg:mx-0 xl:px-4">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full bg-white border border-gray-300 rounded py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-olive-500 focus:border-olive-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side of page header -->
      <div class="flex items-center space-x-1 lg:hidden">

        <button
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
        >
          <span class="sr-only">Open filters panel</span>
          <adjustments-icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
        >
          <span class="sr-only">Open filters panel</span>
          <map-icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          class="flex-shrink-0 bg-white rounded p-2 text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-olive-500"
        >
          <span class="sr-only">Open filters panel</span>
          <view-grid-icon class="h-6 w-6" aria-hidden="true" />
        </button>

      </div>

    </div>
  </div>
</template>

<script>
import { SearchIcon, AdjustmentsIcon, MapIcon, ViewGridIcon, MenuAlt4Icon } from '@heroicons/vue/outline'

export default {
  name: 'ndow-map-header',
  components: { SearchIcon, AdjustmentsIcon, MapIcon, ViewGridIcon, MenuAlt4Icon },
  emits: 'toggle-menu',
  setup (_, { emit }) {
    function toggleMenu () {
      emit('toggle-menu')
    }

    return { toggleMenu }
  }
}
</script>