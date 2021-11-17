<template>
  <div class="w-full">
    <input
      type="checkbox"
      :id="fieldId"
      class="mr-2"
      :checked="checked"
      @input="(event) => $emit('update:checked', event.target.checked)"
    />
    <label :for="fieldId" class="">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'input-checkbox',
  props: {
    label: String,
    fieldId: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean
    }
  }
}
</script>
