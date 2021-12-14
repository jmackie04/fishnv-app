import maplibregl from 'maplibre-gl'
const TILE_URL = 'http://localhost:3333'
const MAPTILER_KEY = '2BL4ZBQCqs6NfOUgnKGy'

export const addFishableWaters = (map) => {
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

// dev only map details
export const explainMap = (map) => {
  if (!map) return {}
  
  const mapDetails = {}

  map.on('load', () => {
    mapDetails.zoom = this.map.getZoom()
    mapDetails.center = this.map.getCenter()
    mapDetails.bounds = this.map.getBounds()
  })

  map.on('click', () => {
    const features = map.queryRenderedFeatures(e.point)
    mapDetails.features = features.map(feature => {
      const { geometry, _geometry, _vectorTileFeature, ...rest } = feature
      return rest
    })
  })

  return mapDetails
}