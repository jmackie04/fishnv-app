import Home from '../views/home/index.vue'
import MapView from '../views/map/index.vue'
import DevView from '../views/dev/index.vue'

export const routes = [
  {
    path: '/',
    home: 'Home',
    component: Home,
    meta: { title: 'FishNV' }
  },
  {
    path: '/map',
    name: 'Map',
    component: MapView,
    meta: { title: 'FishNV Map'}
  },
  {
    path: '/dev',
    name: 'Dev',
    component: DevView,
    meta: { title: 'dev page' }
  }
]