<template>
  <div id="maplibre-map" ref="root" class="relative w-full h-full">
    <map-menu-button
      @click:geolocate="geolocate"
      @click:recenter="recenter"
      @click:layers="toggleSlider"
    />
  </div>
  <map-layers-panel
    :open="sliderOpen"
    :basemaps="basemaps"
    :layers="layers"
    :portal-slider="portalSlider"
    @panel:close="toggleSlider"
    @layers:switch-basemap="setBasemap"
    @layers:toggle-layer="toggleLayer"
  />
</template>

<script>
import { onMounted, reactive, computed, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

import { geolocate as geolocation } from '../lib/geolocation.js'
import { renderMaplibre } from '../lib/maplibre.js'
import { basemaps as styles, layers as overlays } from '../lib/maplibre-layers.js'

import MapMenuButton from '../views/map/map-menu-button.vue'
import MapLayersPanel from '../views/map/map-layers-panel.vue'

const mapInit = {
  center: [-116.6554, 38.55],
  zoom: 6
}

export default {
  name: 'maplibre-map',
  components: { MapMenuButton, MapLayersPanel },
  props: {
    portalSlider: {
      type: Boolean,
      defualt: false
    }
  },
  emits: ['update:moveend', 'toggle:maplayers'],
  setup(props, { emit }) {
    const route = useRoute()
    const root = ref(null)
    const blueprint = reactive({
      ready: false,
      maplibreRef: {},
      basemaps: styles,
      layers: overlays
    })
    const map = computed(() => blueprint.maplibreRef)
    const ready = computed(() => blueprint.ready)
    const layers = computed(() => blueprint.layers)
    const basemaps = computed(() => blueprint.basemaps)

    onMounted(async () => {
      const options = {
        container: root.value,
        center: [route.query.x ?? -116.6554, route.query.y ?? 38.55],
        zoom: route.query.z ?? 6
      }
      blueprint.maplibreRef = renderMaplibre(options, blueprint.layers)
      blueprint.ready = true

      nextTick(() => {
        map.value.on('moveend', () => {
          const center = map.value.getCenter()
          const zoom = map.value.getZoom()
          const bounds = map.value.getBounds()
          emit('update:moveend', { z: zoom, x: center.lng, y: center.lat, bounds })
        })

        map.value.on('click', (e) => {
          const features = map.value.queryRenderedFeatures(e.point)
          console.log({ features })
        })
      })
    })

    // map menu functions
    const geolocate = async () => {
      const { coords } = await geolocation()
      map.value.flyTo({ center: [coords.longitude, coords.latitude], zoom: 11 })
    }
    const recenter = () => {
      map.value.flyTo(mapInit)
    }

    // map layer slider panel
    const sliderOpen = ref(false)
    const toggleSlider = () => { sliderOpen.value = !sliderOpen.value }
    const setBasemap = (payload) => {
      map.value.setStyle(payload.style)
      blueprint.basemaps.forEach(basemap => basemap.active = payload.name === basemap.name)
    }
    const toggleLayer = (payload) => {
      blueprint.layers.forEach(def => {
        console.log({ def: JSON.parse(JSON.stringify(def)) })
        if (def.name === payload.name) {
          def.active = !def.active
          const layerIds = def.layers.map(layer => layer.id)
          layerIds.forEach((id, i) => {
            const visibility = def.active ? 'visible' : 'none'
            map.value.setLayoutProperty(id, 'visibility', visibility)
            def.layers[i].layout.visibility = visibility
          })
        }
      })
    }


    return {
      root,
      ready,
      layers,
      basemaps,
      map,

      geolocate,
      recenter,

      sliderOpen,
      toggleSlider,
      setBasemap,
      toggleLayer
    }
  }
}
</script>
