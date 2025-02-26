<script setup lang="ts">
interface AppModalProps {
    title?: string,
    boxClass?: string,
    modalClass?: string,
    closable?: boolean,
}

const props = withDefaults(defineProps<AppModalProps>(), {
    boxClass: 'px-6 py-6',
    modalClass: 'w-[32rem]',
    closable: true,
})

const emits = defineEmits<{
    'close': [Event]
}>()

const closeModal = (e: Event) => {
    if (props.closable) {
        emits('close', e)
    }
}
</script>

<template>
    <teleport to="body">
        <transition appear name="modal">
            <div class="fixed top-0 left-0 w-full bottom-0 right-0 z-30 flex items-center justify-center">
                <div
                    class="fixed top-0 left-0 w-full bottom-0 right-0 flex items-center justify-center bg-slate-950 opacity-20"
                    @click="closeModal"
                />
                <div
                    class="z-40"
                    :class="modalClass"
                >
                    <div class="bg-white rounded-lg shadow-xl overflow-hidden">
                        <div class="flex justify-between border-b border-slate-200">
                            <slot name="header">
                                <div class="px-6 py-3 text-slate-700 font-bold">
                                    {{ title }}
                                </div>
                            </slot>

                            <div class="px-6 py-3 text-lg">
                                <button
                                    v-if="closable"
                                    class="text-slate-400 hover:text-slate-700"
                                    @click="closeModal"
                                >
                                    <i class="fa fa-times" />
                                </button>
                            </div>
                        </div>
                        <div :class="boxClass">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
