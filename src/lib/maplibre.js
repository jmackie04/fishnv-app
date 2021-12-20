import maplibregl from 'maplibre-gl'

const TILE_URL = 'http://localhost:3333'
const MAPTILER_KEY = '2BL4ZBQCqs6NfOUgnKGy'

export const renderMaplibre = (options, layers) => {  
  const map = new maplibregl.Map(Object.assign({
    container: 'maplibre-map',
    style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`,
    center: [-116.6554, 38.55],
    zoom: 6
  }, options))
  
  map.on('style.load', () => {
    console.log({ layers: JSON.parse(JSON.stringify(layers)) })
    layers
      .forEach(def => {
        const sources = Object.keys(def.source)
        sources.forEach(source => { map.addSource(source, def.source[source]) })
        def.layers.forEach(layer => { map.addLayer(layer) })
      })
  })

  return map
}