<template>
  <div class="flex flex-col p-2 divide-y-2 divide-gray-200 overflow-x-hidden mx-auto">
    <router-link
      v-for="(water, index) in fishableWaters"
      :key="water.id"
      :to="{ name: 'waters', params: { id: water.id } }"
      :class="[
        index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
        index === fishableWaters.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
        'bg-white overflow-hidden flex flex-col p-2 group cursor-pointer'
      ]"
      @mouseover="mouseover(water.id)"
      @mouseleave="mouseleave"
    >
      <h2
        class="text-lg text-oxford-600 tracking-wide font-medium leading-loose group-hover:text-saffron-600"
      >
        {{ water.water_name }}
        <span class="text-gray-600 text-sm font-light">{{ water.id }}</span>
      </h2>
      <div>
        <p class="text-gray-600 text-sm font-light capitalize">{{ water.species.join(', ') }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'fw-list-container',
  emits: ['card:hover'],
  props: {
    fishableWaters: {
      type: Array,
      required: true
    }
  },
  setup(_, { emit }) {
    const mouseover = (id) => { emit('card:hover', { id, hover: true }) }
    const mouseleave = () => { emit('card:hover', { hover: false }) }

    return { mouseover, mouseleave }
  }
}
</script>
