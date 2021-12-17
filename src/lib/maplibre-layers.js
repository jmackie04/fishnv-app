export const fishableWaters = {
  name: 'fishable waters',
  id: 'fishable-waters',
  active: true,
  source: {
    'fishable-waters': {
      type: 'vector',
      tiles: ['https://fishnv.apis.wildlifenv.com/features/fishable_waters/{z}/{x}/{y}.pbf']
    }
  },
  layers: [
    {
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
    },
    {
      id: 'fw-polygons',
      type: 'fill',
      source: 'fishable-waters',
      'source-layer': 'fishable_waters',
      paint: {
        'fill-opacity': 0.75,
        'fill-color': '#589fd6'
      },
      filter: ['==', '$type', 'Polygon']
    }
  ]
}

export const huntUnits = {
  name: 'hunt units',
  id: 'hunt-units',
  active: true,
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