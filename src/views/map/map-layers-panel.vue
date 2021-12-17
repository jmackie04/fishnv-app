<template>
  <ndow-slider-right :open="open" @close="close">
    <template #title>Layers and Basemaps</template>

    <template #content>
      <div class="h-full rounded">
        <div class="flex flex-col w-full space-y-2">
          <map-layers-card v-for="(layer, index) in layers" :key="index" :map-layer="layer" @activate="toggleLayer" />
        </div>
      </div>
    </template>
  </ndow-slider-right>
</template>

<script>
import { ref } from 'vue'

import NdowSliderRight from '../../components/ndow-slider-right.vue'
import MapLayersCard from './map-layers-card.vue'

const mapLayers = [
  {
    name: 'voyager',
    description: 'A simple, light colored basemap.',
    type: 'basemap',
    active: true,
    layerOpacity: 0.75,
    thumbnail: 'https://cloud.maptiler.com/static/img/maps/voyager.png?t=1634127409',
    style: `https://api.maptiler.com/maps/voyager/style.json?key=BJ5Us337tUIPtCCZeKV8` 
  },
  {
    name: 'outdoor',
    description: 'A topographic basemap with hillshade.',
    type: 'basemap',
    active: false,
    layerOpacity: 0.75,
    thumbnail: 'https://cloud.maptiler.com/static/img/maps/outdoor.png?t=1634127409',
    style: `https://api.maptiler.com/maps/outdoor/style.json?key=BJ5Us337tUIPtCCZeKV8` 
  }
]

export default {
  components: {
    NdowSliderRight,
    MapLayersCard
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['panel:close', 'layers:switch-basemap'],
  setup (_, { emit }) {
    const close = () => {
      emit('panel:close')
    }

    const layers = ref(mapLayers)
    const toggleLayer = (payload) => {
      layers.value.forEach(layer => { layer.active = payload.name === layer.name })
      emit('layers:switch-basemap', payload)
    }

    return { close, layers, toggleLayer }
  }
}
</script>