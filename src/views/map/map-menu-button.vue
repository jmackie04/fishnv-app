<template>
  <div class="absolute z-10 bottom-5 right-5 flex flex-col items-center">
    <div class="absolute bottom-0 h-64 w-10 flex flex-col justify-end pb-20 space-y-2">

      <transition
        enter-active-class="transition-all transform duration-200 ease-in-out delay-300"
        leave-active-class="transition-all transform duration-200 ease-in-out"
        enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full"
      >
        <button
          v-show="menuVisible"
          class="bg-olive-500 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </button>
      </transition>

      <transition
        enter-active-class="transition-all transform duration-200 ease-in-out delay-150"
        leave-active-class="transition-all transform duration-200 ease-in-out delay-150"
        enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-full"
      >
        <button
          v-show="menuVisible"
          class="bg-olive-500 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>
      </transition>

      <transition
          enter-active-class="transition-all transform duration-200 ease-in-out"
          leave-active-class="transition-all transform duration-200 ease-in-out delay-300"
          enter-from-class="opacity-0 translate-y-full"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-full"
        >
          <button
            v-show="menuVisible"
            class="bg-olive-500 text-white p-2 w-10 h-10 rounded-full shadow-xl hover:bg-olive-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </transition>
    </div>
    
    <div class="relative h-16 w-16">
      <button
        class="bg-olive-500 text-white p-3 w-16 h-16 rounded-full shadow-xl hover:bg-olive-600"
        @click="toggle"
      >
        <transition
          enter-active-class="transition-all transform duration-200 ease-out"
          leave-active-class="transition-all transform duration-200 ease-in"
          enter-from-class="opacity-25 rotate-180 scale-75"
          enter-to-class="opacity-100 rotate-0 scale-100"
          leave-from-class="opacity-100 rotate-0 scale-100"
          leave-to-class="opacity-25 -rotate-180 scale-75"
          mode="out-in"
        >
          <svg v-if="!menuVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </transition>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'map-menu-button',

  setup () {
    const menuVisible = ref(false)
    const toggle = () => { menuVisible.value = !menuVisible.value }

    return {
      menuVisible,
      toggle
    }
  }
}
</script>
