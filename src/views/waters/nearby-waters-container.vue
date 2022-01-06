<template>
  <div>
    <h2 class="py-2 pl-1 text-2xl tracking-wide font-light text-gray-700">Nearby Waters</h2>
    <div class="mt-2 overflow-hidden rounded">
      <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        <nearby-waters-item
          v-for="water in nearbyWaters"
          :key="water.knn_water_id"
          :water-id="water.knn_water_id"
          class="border border-olive-200 rounded w-full"
        >
          <template #title>{{ water.knn_water_name }}</template>
          <template #subtitle>{{ water.distance }} miles away</template>
        </nearby-waters-item>
      </ul>
    </div>
  </div>
</template>

<script>
import NearbyWatersItem from './nearby-waters-item.vue'

export default {
  name: 'nearby-waters-container',
  components: { NearbyWatersItem },
  props: {
    nearbyWaters: {
      type: Array,
      required: true
    }
  }
}
</script>
