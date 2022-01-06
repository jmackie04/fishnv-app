<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <caption
              class="text-sm text-gray-500/80 p-2 text-right font-light"
            >The top five trophy fish caught for each species caught in this water.</caption>
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Species</th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Weight</th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Angler Name</th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Angler State</th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >Year</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="fish in fishEntries" :key="fish.id">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize"
                >{{ fish.species }}</td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{{ fish.pounds }}lbs. {{ fish.ounces }}oz.</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ fish.angler_name }}</td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{{ fish.angler_state }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ fish.year_caught }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fish-entries-table',
  props: {
    fishEntries: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
caption {
  caption-side: bottom;
}
</style>