<template>
  <li>
    <!-- TODO: replace this div with router-link -->
    <div class="flex items-center justify-between cursor-pointer">
      <div class="flex-1 px-4 py-2 truncate">
        <h3 class="text-olive-700">
          <slot name="title">Water Name</slot>
        </h3>
        <p class="text-gray-600 font-light">
          <slot name="subtitle">Subtitle</slot>
        </p>
      </div>
      <div class="flex-shrink-0 pr-2">
        <button
          class="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="sr-only">Open options</span>
          <!-- Heroicon name: solid/link -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'nearby-water-item',
  props: {
    waterId: {
      type: String,
      required: true
    }
  }
}
</script>
