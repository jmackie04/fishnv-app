<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="h-screen flex bg-gray-200">
    <ndow-mobile-menu as="template" :navigation="navigation" :user="user" :mobile-menu-open="isMobileMenuOpen" @toggle-menu="closeMobileMenu()" />

    <!-- Static sidebar for desktop -->
    <ndow-sidebar-nav as="template" :navigation="navigation" :user="user" />

    <div class="flex-1 min-w-0 flex flex-col">
      <main class="flex-1 flex overflow-hidden">
        <router-view :key="$route.fullPath" />
      </main>
    </div>
  </div>
</template>

<script>
import { GlobeIcon, HomeIcon } from '@heroicons/vue/outline'
import ndowSidebarNav from '@/components/ndow-sidebar-nav.vue'
import ndowMobileNavbar from '@/components/ndow-mobile-navbar.vue'
import ndowMobileMenu from '@/components/ndow-mobile-menu.vue'
import useMobileMenu from '@/composables/use-mobile-menu.js'

const user = {
  name: 'Emily Selman',
  imageUrl:
    'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Map', href: '/map', icon: GlobeIcon }
]

export default {
  name: 'MapPage',
  components: {
    ndowSidebarNav,
    ndowMobileNavbar,
    ndowMobileMenu
  },
  setup () {
    const { isOpen: isMobileMenuOpen, close: closeMobileMenu } = useMobileMenu()

    return {
      user,
      navigation,
      isMobileMenuOpen,
      closeMobileMenu
    }
  }
}
</script>
