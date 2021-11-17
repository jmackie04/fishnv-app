<template>

  <div class="flex-1 flex flex-col">
    <ndow-header-bar />

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
      <aside class="w-full lg:w-120 lg:flex-shink-0 lg:order-first overflow-clip overflow-y-scroll">
        <div class="border-r border-gray-200 bg-gray-200">
          <!-- <div class="text-lg py-2">{{ totalFishableWaters }}</div> -->
          <!-- <pre><code>{{ { isLoading } }}</code></pre> -->

          <pre><code>{{ { hasFilters } }}</code></pre>
          <pre><code>{{ { filters } }}</code></pre>

          <div class="text-sm">
            <pre><code>{{ filteredFishableWaters }}</code></pre>

          </div>
        </div>
      </aside>

    </div>
  </div>


</template>

<script>
import ndowHeaderBar from '../../components/ndow-header-bar.vue'
import useFishableWaters from '../../composables/use-fishable-waters.js'
import useMobileMenu from '../../composables/use-mobile-menu.js'

export default {
  name: 'map-view',
  components: { ndowHeaderBar },

  setup () {
    const {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters
    } = useFishableWaters()
    const { open: openMobileMenu } = useMobileMenu()

    return {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      // mobile menu method
      openMobileMenu
    }
  }
}
</script>