<template>
  <RadioGroup v-model="model">
    <RadioGroupLabel class="sr-only">
      Radio Options
    </RadioGroupLabel>
    <div class="bg-white rounded-md -space-y-px">
      <RadioGroupOption as="template" v-for="(option, index) in options" :key="option.name" :value="option.name" v-slot="{ checked, active }">
        <div
          :class="[
            index === 0 ? 'rounded-tl-md rounded-tr-md' : '',
            index === options.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
            checked ? 'bg-olive-200 bg-opacity-50 border-olive-200 z-10' : '',
            'relative p-4 flex cursor-pointer focus:outline-none'
          ]"
        >
          <span :class="[checked ? 'bg-olive-600 border-transparent' : 'bg-white border-gray-300', active ? 'ring-2 ring-offset-2 ring-olive-500' : '', 'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center']" aria-hidden="true">
            <span class="rounded-full bg-white w-1.5 h-1.5" />
          </span>
          <div class="ml-3 flex flex-col">
            <RadioGroupLabel as="span" :class="[checked ? 'text-olive-900' : 'text-gray-900', 'block text-sm font-medium capitalize']">
              {{ option.name }}
            </RadioGroupLabel>
            <RadioGroupDescription v-if="option.name !== option.description" as="span" :class="[checked ? 'text-olive-700' : 'text-gray-500', 'block text-sm']">
              {{ option.description }}
            </RadioGroupDescription>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>

<script>
import { computed } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

export default {
  name: 'input-radio-group',

  components: { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption },

  props: {
    options: {
      type: [String, Array],
      required: true
    },
    modelValue: {
      type: String
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: value => { emit('update:modelValue', value) }
    })

    const checked = computed(() => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.options.name)
      } else {
        return props.modelValue
      }
    })

    return { model, checked }
  }
}
</script>
