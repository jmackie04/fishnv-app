<template>
  <div id="maplibre-map" class="relative w-full h-full" />
  <map-menu-button
    @click:geolocate="geolocate"
    @click:recenter="recenter"
    @click:layers="toggleLayers"
  />
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import maplibregl from 'maplibre-gl'

import { addFishableWaters } from '../lib/maplibre.js'
import { geolocate as geolocation } from '../lib/geolocation.js'
import MapMenuButton from '../views/map/map-menu-button.vue'

const TILE_URL = 'http://localhost:3333'
const MAPTILER_KEY = '2BL4ZBQCqs6NfOUgnKGy'
const mapInit = {
  center: [-116.6554, 38.55],
  zoom: 6
}

export default {
  name: 'maplibre-map',
  components: { MapMenuButton },
  emits: ['update:moveend', 'toggle:maplayers'],
  setup (_, context) {
    const route = useRoute()

    let blueprint = reactive({
      maplibreRef: {},
      currentPosition: []
    })

    const renderMap = (options) => {
      const mapOptions = Object.assign({
        container: 'maplibre-map',
        style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`,
        center: [-116.6554, 38.55],
        zoom: 6
      }, options)
      const map = new maplibregl.Map(mapOptions)

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
      const options = {
        center: [route.query.x ?? -116.6554, route.query.y ?? 38.55],
        zoom: route.query.z ?? 6
      }
      const map = renderMap(options)
      blueprint.maplibreRef = map
    })

    const maplibreObject = computed(() => blueprint.maplibreRef)

    // map menu click methods
    const geolocate = async () => {
      const { coords } = await geolocation()
      maplibreObject.value.flyTo({ center: [coords.longitude, coords.latitude], zoom: 11 })
    }
    const recenter = () => {
      maplibreObject.value.flyTo(mapInit)
    }
    const toggleLayers = () => {
      context.emit('toggle:maplayers')
    }

    return {
      maplibreObject,
      geolocate,
      recenter,
      toggleLayers
    }
  }
}
</script>
