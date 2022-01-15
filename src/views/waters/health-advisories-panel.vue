<template>
  <div>
    <div class="w-full bg-red-100 text-red-900 border border-red-800 rounded p-4">
      <div class="space-y-2">
        <p>
          There is some risk when consuming fish from this water due to mercury.
          Visit
          <a
            class="text-blue-500 underline hover:cursor-pointer font-semibold hover:text-red-700"
            href="https://www.ndow.org/blog/mercury-in-fish/#"
            target="_blank"
            rel="noopener noreferrer"
          >NDOW.org</a> for more information.
        </p>
        <p>The number listed in Meals Per Month is the recommended maximum number of 8 ounce meals to consume per month.</p>
        <ul class="pl-4">
          <li v-for="advisory in healthAdvisories" :key="advisory.id" class="list-disc pl-2">
            <strong class="font-semibold">{{ advisory.species }}</strong>
            &mdash; {{ advisory.meals_per_month }} meals per month
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'health-advisories-panel',
  props: {
    healthAdvisories: {
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  setup() {

    return {}
  }
}
</script>
