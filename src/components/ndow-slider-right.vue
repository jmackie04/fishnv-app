<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed z-40 lg:z-10 overflow-hidden">
      <div class="absolute overflow-hidden">

        <div class="fixed inset-0 lg:top-16 lg:bottom-0 lg:left-20 pr-0 lg:pr-10 max-w-full flex">
          <TransitionChild as="template"
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <div class="w-screen lg:max-w-md">
              <div class="h-full flex flex-col py-6 bg-gray-100 shadow-xl overflow-y-scroll">
                <div class="px-4">
                  <div class="flex items-start justify-between">
                    <DialogTitle class="text-lg text-oxford-700">
                      <slot name="title">Panel Title</slot>
                    </DialogTitle>
                    <div class="ml-3 h-7 flex items-center">
                      <button type="button" class="rounded text-gray-400 hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500" @click="close">
                        <span class="sr-only">Close panel</span>
                        <XIcon class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-6 relative flex-1 px-4">
                  <!-- Replace with your content -->
                  <div class="absolute inset-0 px-4">
                    <div class="h-full bg-white rounded border-2 border-dashed border-gray-200" aria-hidden="true">
                      <slot name="content">content here</slot>
                    </div>
                  </div>
                  <!-- /End replace -->
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

export default {
  name: 'ndow-slider-right',
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup (_, { emit }) {
    const close = () => {
      emit('close')
    }

    return { close }
  }
}
</script>