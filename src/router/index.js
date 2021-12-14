import Home from '../views/home/index.vue'
import MapView from '../views/map/index.vue'
import DevView from '../views/dev/index.vue'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'FishNV' }
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map/index.vue')
    // meta: { title: 'FishNV Map'}
  },
  {
    path: '/dev',
    name: 'Dev',
    component: DevView,
    meta: { title: 'dev page' }
  }
]