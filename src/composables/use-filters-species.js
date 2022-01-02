import { reactive } from 'vue'

const trout = [
  {
    group: 'trout',
    label: 'Bonneville Cutthroat Trout',
    value: 'bonneville cutthroat trout'
  },
  {
    group: 'trout',
    label: 'Bowcutt Trout',
    value: 'bowcutt trout'
  },
  {
    group: 'trout',
    label: 'Brook Trout',
    value: 'brook trout'
  },
  {
    group: 'trout',
    label: 'Brown Trout',
    value: 'brown trout'
  },
  {
    group: 'trout',
    label: 'Bull Trout',
    value: 'bull trout'
  },
  {
    group: 'trout',
    label: 'Lahontan Cutthroat Trout',
    value: 'lahontan cutthroat trout'
  },
  {
    group: 'trout',
    label: 'Mackinaw Trout',
    value: 'mackinaw trout'
  },
  {
    group: 'trout',
    label: 'Rainbow Trout',
    value: 'rainbow trout'
  },
  {
    group: 'trout',
    label: 'Redband Trout',
    value: 'redband trout'
  },
  {
    group: 'trout',
    label: 'Tiger Trout',
    value: 'tiger trout'
  },
  {
    group: 'trout',
    label: 'Yellowstone Cutthroat Trout',
    value: 'yellowstone cutthroat trout'
  },
  {
    group: 'trout',
    label: 'Mountain Whitefish',
    value: 'mountain whitefish'
  }
]
const bass = [
  {
    group: 'bass',
    label: 'Largemouth Bass',
    value: 'largemouth bass'
  },
  {
    group: 'bass',
    label: 'Smallmouth Bass',
    value: 'smallmouth bass'
  },
  {
    group: 'bass',
    label: 'Spotted Bass',
    value: 'spotted bass'
  },
  {
    group: 'bass',
    label: 'Striped Bass',
    value: 'striped bass'
  },
  {
    group: 'bass',
    label: 'White Bass',
    value: 'white bass'
  },
  {
    group: 'bass',
    label: 'Wiper',
    value: 'wiper'
  }
]
const catfish = [
  {
    group: 'catfish',
    label: 'Bullhead Catfish',
    value: 'bullhead catfish'
  },
  {
    group: 'catfish',
    label: 'Channel Catfish',
    value: 'channel catfish'
  },
  {
    group: 'catfish',
    label: 'White Catfish',
    value: 'white catfish'
  }
]
const other = [
  {
    group: 'other',
    label: 'Black Crappie',
    value: 'balck crappie'
  },
  {
    group: 'other',
    label: 'White Crappie',
    value: 'white crappie'
  },
  {
    group: 'other',
    label: 'Bluegill Sunfish',
    value: 'bluegill sunfish'
  },
  {
    group: 'other',
    label: 'Green Sunfish',
    value: 'green sunfish'
  },
  {
    group: 'other',
    label: 'Pumpkinseed',
    value: 'pumpkinseed'
  },
  {
    group: 'other',
    label: 'Redear Sunfish',
    value: 'redear sunfish'
  },
  {
    group: 'other',
    label: 'Carp',
    value: 'carp'
  },
  {
    group: 'other',
    label: 'Kokanee Salmon',
    value: 'kokanee salmon'
  },
  {
    group: 'other',
    label: 'Sacramento Perch',
    value: 'sacramento perch'
  },
  {
    group: 'other',
    label: 'Yellow Perch',
    value: 'yellow perch'
  },
  {
    group: 'other',
    label: 'Tiger Muskie',
    value: 'tiger muskie'
  },
  {
    group: 'other',
    label: 'Walleye',
    value: 'walleye'
  }
]
const species = { trout, bass, catfish, other, }
const speciesGroups = Object.keys(species)

const state = reactive({
  species,
  speciesGroups,
  selectedSpecies: []
})

const clearSelectedSpecies = () => {
  state.selectedSpecies = []
}

export default () => {
  return {
    state,
    clearSelectedSpecies
  }
}
