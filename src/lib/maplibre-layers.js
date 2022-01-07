const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY
const TILE_URL = import.meta.env.VITE_TILE_URL

// basemaps layers
export const basemaps = [
  {
    name: 'voyager',
    description: 'A simple, light colored basemap.',
    active: true,
    thumbnail: 'https://cloud.maptiler.com/static/img/maps/voyager.png?t=1634127409',
    style: `https://api.maptiler.com/maps/voyager/style.json?key=${MAPTILER_KEY}`
  },
  {
    name: 'topo',
    description: 'A topographic basemap with hillshade.',
    active: false,
    thumbnail: 'https://cloud.maptiler.com/static/img/maps/outdoor.png?t=1634127409',
    style: `https://api.maptiler.com/maps/topo/style.json?key=${MAPTILER_KEY}`
  },
  {
    name: 'satellite',
    description: 'A satellite map with labels.',
    active: false,
    thumbnail: 'https://cloud.maptiler.com/static/img/maps/hybrid.png?t=1634127409',
    style: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`
  }
]

// overlays (layers)
export const fishableWaters = {
  name: 'fishable waters',
  id: 'fishable-waters',
  description: 'Fishable waters of Nevada.',
  active: true,
  thumbnail: 'https://ndow-cdn.s3.us-west-2.amazonaws.com/maptile-previews/fishable-waters.png',
  source: {
    'fishable-waters': {
      type: 'vector',
      tiles: [`${TILE_URL}/features/fishable_waters/{z}/{x}/{y}.pbf`]
    }
  },
  layers: [
    {
      id: 'fw-lines',
      type: 'line',
      source: 'fishable-waters',
      'source-layer': 'fishable_waters',
      layout: {
        visibility: 'visible',
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-opacity': 1,
        'line-color': '#589fd6',
        'line-width': 2
      }
    },
    {
      id: 'fw-polygons',
      type: 'fill',
      source: 'fishable-waters',
      'source-layer': 'fishable_waters',
      layout: {
        visibility: 'visible',
      },
      paint: {
        'fill-opacity': 0.75,
        'fill-color': '#589fd6'
      },
      filter: ['==', '$type', 'Polygon']
    },
    {
      id: 'hovered-fw-lines',
      type: 'line',
      source: 'fishable-waters',
      'source-layer': 'fishable_waters',
      layout: {
        visibility: 'visible',
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#f29647',
        'line-width': 4
      },
      filter: ['==', 'id', 0]
    },
    {
      id: 'hovered-fw-polygons',
      type: 'fill',
      source: 'fishable-waters',
      'source-layer': 'fishable_waters',
      layout: {
        visibility: 'visible',
      },
      paint: {
        'fill-color': '#f29647'
      },
      filter: ['all', ['==', '$type', 'Polygon'], ['==', 'id', 0]]
    }
    // {
    //   id: 'labels-fw-lines',
    //   type: 'symbol',
    //   source: 'fishable-waters',
    //   'source-layer': 'fishable_waters',
    //   layout: {
    //     visibility: 'visible',
    //     'symbol-placement': 'line',
    //     'text-font': ['Open Sans Regular'],
    //     'text-field': ['get', 'water_name'],
    //     'text-anchor': 'top',
    //     'text-size': 16
    //   },
    //   paint: {
    //     'text-color': '#589fd6',
    //     'text-halo-color': 'white',
    //     'text-halo-width': 1,
    //     'text-halo-blur': 1
    //   }
    // }
  ]
}

export const huntUnits = {
  name: 'hunt units',
  id: 'hunt-units',
  description: 'NDOW hunt units.',
  active: false,
  thumbnail: 'https://ndow-cdn.s3.us-west-2.amazonaws.com/maptile-previews/hunt-units.png',
  source: {
    'hunt-units': {
      type: 'vector',
      tiles: ['https://huntnv.apis.wildlifenv.com/features/hunt_units_open_full/{z}/{x}/{y}.pbf']
    },
    'hunt-unit-labels': {
      type: 'vector',
      tiles: ['https://huntnv.apis.wildlifenv.com/features/hunt_unit_labels/{z}/{x}/{y}.pbf']
    }
  },
  layers: [
    {
      id: 'hunt-units-outline',
      type: 'line',
      source: 'hunt-units',
      'source-layer': 'hunt_units_open_full',
      layout: {
        visibility: 'none',
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-opacity': 1,
        'line-color': '#f29645',
        'line-width': 2
      }
    },
    {
      id: 'unit-labels',
      type: 'symbol',
      source: 'hunt-unit-labels',
      'source-layer': 'hunt_unit_labels',
      layout: {
        visibility: 'none',
        'text-font': ['Open Sans Regular'],
        'text-field': ['get', 'display_name'],
        'text-size': 16
      },
      paint: {
        'text-color': '#db6f0f',
        'text-halo-color': 'white',
        'text-halo-width': 1,
        'text-halo-blur': 1
      }
    }
  ]
}

export const contours = {
  name: 'contours',
  id: 'contours',
  description: 'Contour lines in meters',
  active: false,
  thumbnail: 'https://ndow-cdn.s3.us-west-2.amazonaws.com/maptile-previews/contours.png',
  source: {
    'contours': {
      type: 'vector',
      tiles: ['https://api.maptiler.com/tiles/contours/{z}/{x}/{y}.pbf?key=BJ5Us337tUIPtCCZeKV8']
    }
  },
  layers: [
    {
      id: 'contours',
      type: 'line',
      source: 'contours',
      'source-layer': 'contour',
      layout: {
        visibility: 'none',
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-opacity': 0.6,
        'line-color': '#7a9e7f',
        'line-width': 1
      }
    }
  ]
}

export const layers = [
  fishableWaters,
  huntUnits,
  // contours
]
