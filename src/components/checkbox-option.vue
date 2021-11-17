<template>
  <div class="">
    <input
      type="checkbox"
      :id="optionId"
      class="hidden"
      :value="optionLabel"
      v-model="model"
    >
    <label
      :for="optionId"
      :class="checked ? 'text-olive-600 border-olive-500 bg-olive-200 bg-opacity-50 hover:text-olive-500 hover:border-olive-400 hover:bg-olive-200 hover:bg-opacity-25' : 'bg-white'"
      class="text-sm inline-flex items-center py-1 px-2 rounded text-gray-500 border border-gray-400 cursor-pointer hover:text-gray-400 hover:border-gray-300 hover:bg-white"
    > 
      <span>{{ optionLabel }}</span>
      <span class="">
        <svg v-if="checked" class="h-2 w-2 ml-1 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />  
        </svg>  
      </span>       
    </label>
  </div>
</template>

<script>
/**
 * Most helpful checkbox info:
 * https://stackoverflow.com/questions/67703675/in-vue3-how-to-make-custom-component-work-with-v-model-for-group-of-checkboxs
 */
import { computed } from 'vue'
export default {
  name: 'checkbox-option',
  props: {
    optionId: {
      type: [String, Number]
    },
    optionLabel: {
      type: String
    },
    modelValue: {
      type: [Boolean, Array]
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: value  => {
        emit('update:modelValue', value)
      }
    })

    const checked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.optionLabel)
      } else {
        return props.modelValue
      }
      
    })

    return { model, checked }
  }
}
</script>

<style scoped>
/* input[type=checkbox] {
  display: none;
} */
</style>