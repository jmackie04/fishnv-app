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

// import { addFishableWaters, addFwLayer, addFwSource } from '../lib/maplibre.js'
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

                // hunt units
        map.addSource('units', {
          type: 'vector',
          tiles: [`https://huntnv.apis.wildlifenv.com/features/hunt_units_open_full/{z}/{x}/{y}.pbf`]
        })
        map.addLayer({
          id: 'units',
          type: 'line',
          source: 'units',
          'source-layer': 'hunt_units_open_full',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#f29645',
            'line-width': 2
          }
        })

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

      map.on('styledata', (e) => {
        // console.log({ e })
        addFishableWaters()
      })

      // usefull functions
      function addFishableWaters () {
        const source = {
          type: 'vector',
          tiles: [`${TILE_URL}/features/fishable_waters/{z}/{x}/{y}.pbf`]
        }
        
        map.addSource('fishable-waters', source)

        map.addLayer({
          id: 'fw-lines',
          type: 'line',
          source: 'fishable-waters',
          'source-layer': 'fishable_waters',
          layout: {
            'line-cap': 'round',
            'line-join': 'round'
          },
          paint: {
            'line-opacity': 1,
            'line-color': '#589fd6',
            'line-width': 2
          }
        })

        map.addLayer({
          id: 'fw-polygons',
          type: 'fill',
          source: 'fishable-waters',
          'source-layer': 'fishable_waters',
          paint: {
            'fill-opacity': 0.75,
            'fill-color': '#589fd6'
          },
          filter: ['==', '$type', 'Polygon']
        })
      }

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
