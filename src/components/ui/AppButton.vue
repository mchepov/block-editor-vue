<script setup lang="ts">
import { computed } from 'vue'
interface AppButtonProps {
    look?: 'primary' | 'secondary' | 'tertiary' | 'outlined',
    icon?: string,
    disabled?: boolean,
    loading?: boolean,
}

const props = withDefaults(defineProps<AppButtonProps>(), {
    look: 'primary',
    disabled: false,
    loading: false,
})

const emits = defineEmits<{
    'click': [Event],
}>()

const btnClasses = computed(() => {
    return {
        'bg-sky-400 hover:bg-sky-600 text-white hover:shadow-md': props.look === 'primary',
        'bg-green-400 hover:bg-green-600 text-white hover:shadow-md': props.look === 'secondary',
        'bg-white border border-slate-300 text-slate-700 hover:shadow-md': props.look === 'outlined',
        'bg-slate-200 hover:bg-slate-300 text-slate-700': props.look === 'tertiary',
        'flex gap-2 items-center': props.icon,
        'relative': props.loading,
        'opacity-40': props.disabled || props.loading,
    }
})

const onClick = (e: Event): void => {
    if (!props.disabled && !props.loading) {
        emits('click', e)
    }
}
</script>

<template>
    <button
        class="py-2 px-4 rounded-md cursor-pointer"
        :class="btnClasses"
        :disabled="disabled || loading"
        @click="onClick"
    >
        <i
            v-if="loading"
            class="fas fa-circle-notch fa-spin absolute text-sm top-2 left-0 bottom-0 right-0 w-4 h-4 mx-auto"
            aria-hidden="true"
        />

        <span
            v-if="icon"
            class="text-sm"
            :class="{'invisible': loading}"
        >
            <i
                class="fa"
                :class="icon"
                aria-hidden="true"
            />
        </span>

        <span
            class="text-nowrap text-sm"
            :class="{'invisible': loading}"
        >
            <slot />
        </span>
    </button>
</template>
