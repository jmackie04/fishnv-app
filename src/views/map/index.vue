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

          <div v-if="!isLoading" class="p-2 text-2xl text-gray-600">
            {{ totalFishableWaters }} Fishable Waters
          </div>

          <div v-if="!isLoading" class="flex flex-col p-2 divide-y-2 divide-gray-200 overflow-x-hidden mx-auto">
            <transition-group
              enter-active-class="transition-all transform duration-200 ease-out"
              leave-active-class="transition-all transform duration-200 ease-in absolute w-[430px]"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
              move-class="transform duration-200 ease-in-out"
            >
              <div
                v-for="(water, index) in filteredFishableWaters" :key="water.id"
                :class="[
                  index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  index === filteredFishableWaters.length - 1 ? 'rounded-bl-md rounded-br-md': '',
                  'bg-white overflow-hidden flex flex-col p-2'
                ]"
              >
                <div class="">
                  <h2 class="text-lg text-olive-500 tracking-wide font-medium leading-loose">{{ water.water_name }} <span class="text-gray-600 text-sm font-light ml-1">{{ water.label }}</span></h2>
                </div>
                <div class="">
                  <p class="text-gray-600 text-sm font-light capitalize">
                    {{ water.species.join(', ') }}
                  </p>
                </div>
              </div>
            </transition-group>
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
      filteredFishableWaters,
      totalFishableWaters
    } = useFishableWaters()
    const { open: openMobileMenu } = useMobileMenu()

    return {
      fishableWaters,
      isLoading,
      error,
      filters,
      hasFilters,
      filteredFishableWaters,
      totalFishableWaters,
      // mobile menu method
      openMobileMenu
    }
  }
}
</script>