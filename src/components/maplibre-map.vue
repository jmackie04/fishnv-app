<template>
  <div id="maplibre-map" class="relative w-full h-full" />
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import maplibregl from 'maplibre-gl'
import { addFishableWaters } from '../lib/maplibre.js'
const TILE_URL = 'http://localhost:3333'
const MAPTILER_KEY = '2BL4ZBQCqs6NfOUgnKGy'

export default {
  name: 'maplibre-map',
  emits: ['update:moveend'],
  setup (_, context) {
    let blueprint = reactive({
      maplibreRef: {}
    })

    const renderMap = () => {
      const map = new maplibregl.Map({
        container: 'maplibre-map',
        style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`,
        center: [-116.6554, 38.55],
        zoom: 6
      })

      map.on('load', () => {
        addFishableWaters(map)
      })

      // zoom, pan interactions. emit events
      map.on('moveend', () => {
        const center = map.getCenter()
        const zoom = map.getZoom()
        const bounds = map.getBounds()
        context.emit('update:moveend', { z: zoom, x: center.lng, y: center.lat, bounds })
      })

      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point)
        console.log(features)
      })

      return map
    }

    onMounted(() => {
      const map = renderMap(context)
      blueprint.maplibreRef = map
    })

    const maplibreObject = computed(() => blueprint.maplibreRef)

    return { maplibreObject }
  }
}
</script>
