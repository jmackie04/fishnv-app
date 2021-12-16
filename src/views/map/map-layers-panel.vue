<template>
  <ndow-slider-right :open="open" @close="close" />
</template>

<script>
import NdowSliderRight from '../../components/ndow-slider-right.vue'

export default {
  components: {
    NdowSliderRight
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['panel:close'],
  setup (_, { emit }) {
    const close = () => {
      emit('panel:close')
    }

    return { close }
  }
}
</script>