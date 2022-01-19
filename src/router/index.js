import Home from '../views/home/index.vue'
import DevView from '../views/dev/index.vue'

const routes = [
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
    path: '/waters/:id',
    name: 'waters',
    component: () => import('../views/waters/index.vue'),
    props: true
  }
]

if (import.meta.env.DEV) {
  routes.push({
    path: '/dev',
    name: 'Dev',
    component: DevView,
    meta: { title: 'dev page' }
  })
}

export default routes
