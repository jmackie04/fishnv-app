<template>
  <div class="flex flex-col items-center justify-between bg-blue-300 full-screen w-full">
    <div class="flex items-center content-center bg-red-300 w-36 h-36">TOP</div>
    <div class="flex items-center content-center w-36 h-36">
      <router-link
          to="/map"
          class="inline-block px-4 py-2 rounded-md text-xl text-gray-100 bg-olive-500 border border-olive-500 shadow-md hover:bg-olive-600"
        >
          Explore The Map
        </router-link>
    </div>
    <div class="flex items-center content-center bg-red-300 w-36 h-36">BOTTOM</div>
  </div>
  <!-- <div class='flex-1 relative flex items-center justify-center overflow-hidden bg-gray-800'>
    <header class="relative z-30 w-full mx-4 lg:mx-0 lg:w-2/3 xl:w-1/2">
      <h3 class="text-shadow mb-2 ml-2 font-mono text-3xl font-light tracking-widest text-gray-300">FishNV</h3>
      <h2 class="text-shadow text-8xl font-extrabold tracking-wider text-olive-400">Get Online</h2>
      <h2 class="text-shadow text-8xl font-extrabold tracking-wider text-olive-400">Get Outside</h2>
      <p class="text-shadow mt-5 lg:mt-3 ml-2 text-2xl font-light text-gray-200">
        From desert creeks to high mountain lakes Nevada offers endless fishing possibilities.
        Find the perfect fishing opportunity for our 34 sport fish species and 543 fishable waters.
      </p>
      <div class="flex items-center space-x-4 mt-10 ml-2">
        <router-link
          to="/map"
          class="inline-block px-4 py-2 rounded-md text-xl text-gray-100 bg-olive-500 border border-olive-500 shadow-md hover:bg-olive-600"
        >
          Explore The Map
        </router-link>
        <a
          href="https://nevada.licensing.kalkomey.com/licenses"
          class="inline-block px-4 py-2 rounded-md text-xl text-olive-200 bg-transparent border border-olive-200 shadow-md hover:border-olive-400 hover:text-olive-400"
        >
          Buy a License
        </a>
      </div>
    </header>

    <img
      src="https://ndow-cdn.s3-us-west-2.amazonaws.com/species/brook-trout/brook-trout-hero.jpg"
      alt="A brook trout laying in the grass with a fly fishing pole and reel above the fish."
      class="absolute object-cover min-w-full min-h-full z-10 opacity-50"
    >
    <div class="absolute h-full w-full object-cover bg-gray-600 vignette"></div>
    <div class="absolute h-full w-full object-cover opacity-90 bg-gray-600 mix-blend-overlay"></div>
  </div> -->
</template>



<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px 1px rgba(41, 44, 49, 0.75);
}

.vignette {
  box-shadow: inset 0 0 300px black;
}

.full-screen {
  height: 100vh;
}
</style>