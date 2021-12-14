<template>
  <div id="maplibre-map" />
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import maplibregl from 'maplibre-gl'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()

    const renderMap = () => {
      const map = new maplibregl.Map({
        container: 'maplibre-map',
        style: `https://demotiles.maplibre.org/style.json`,
        center: [0, 0],
        zoom: 1
      })

      map.on('moveend', () => {
        const center = map.getCenter()
        const zoom = map.getZoom()
        const query = { ...route.query, z: zoom, x: center.lng, y: center.lat }
        router.replace({ query })
      })
    }

    onMounted(() => { renderMap() })
  }
}
</script>

<style scoped>
#maplibre-map {
  width: 100vw;
  height: 100vh;
}
</style>