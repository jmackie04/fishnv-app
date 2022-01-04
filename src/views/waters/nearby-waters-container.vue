<template>
  <div>
    <h2 class="py-2 pl-1 text-2xl tracking-wide font-light text-gray-700">Nearby Waters</h2>
    <div class="bg-white shadow overflow-hidden rounded">
      <ul class="divide-y divide-gray-200">
        <nearby-waters-item
          v-for="water in nearbyWaters"
          :key="water.knn_water_id"
          :water-id="water.knn_water_id"
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
