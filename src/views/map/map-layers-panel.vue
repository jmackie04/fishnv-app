<template>
  <ndow-slider-right :open="open" @close="close">
    <template #title>
      <h2>Layers and Basemaps</h2>
      <p class="text-sm font-light mt-1">
        Click any of the basemap or layers below to change the layers on the map.
        Only one basemap can be active at a time. Many layers can be added at once.
      </p>
    </template>

    <template #content>
      <div class="h-full space-y-8">
        <div>
          <h3 class="pl-1.5 text-lg text-gray-600">Layers</h3>
          <div class="mt-2 flex flex-col w-full space-y-1">
            <map-layers-card
              v-for="(layer, index) in layers"
              :key="index"
              :map-layer="layer"
              @activate="toggleLayer"
            />
          </div>
        </div>

        <div>
          <h3 class="pl-1.5 text-lg text-gray-600">Basemaps</h3>
          <div class="mt-2 flex flex-col w-full space-y-1">
            <map-layers-card
              v-for="(basemap, index) in basemaps"
              :key="index"
              :map-layer="basemap"
              @activate="switchBasemap"
            />
          </div>
        </div>
      </div>
    </template>
  </ndow-slider-right>
</template>

<script>
import NdowSliderRight from '../../components/ndow-slider-right.vue'
import MapLayersCard from './map-layers-card.vue'

export default {
  components: {
    NdowSliderRight,
    MapLayersCard
  },
  props: {
    open: {
      type: Boolean,
      required: true
    },
    basemaps: {
      type: Array,
      required: true
    },
    layers: {
      type: Array,
      required: true
    }
  },
  emits: ['panel:close', 'layers:switch-basemap', 'layers:toggle-layer'],
  setup(props, { emit }) {
    const close = () => {
      emit('panel:close')
    }

    const switchBasemap = (payload) => { emit('layers:switch-basemap', payload) }
    const toggleLayer = (payload) => { emit('layers:toggle-layer', payload) }

    return { close, switchBasemap, toggleLayer }
  }
}
</script>
