<template>
  <div class="min-h-full min-w-full overflow-hidden flex items-center justify-center">
    <div class="flex w-96 p-4 rounded border border-red-600 bg-red-50">
      <div class="mr-4 flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 text-red-600/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h4 class="font-bold text-red-600">{{ error }}</h4>
        <p
          class="mt-1 text-red-900"
        >An error occured while trying to load your content. Please try again.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ndow-error',
  props: {
    error: {
      type: String
    }
  }
}
</script>
