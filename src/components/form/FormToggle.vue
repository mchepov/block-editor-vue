<script setup lang="ts">
import type { ErrorsBag } from '@/components/form/FormTypes.ts'
import { computed, useId } from 'vue'

type ToggleBoolean = string | number| boolean

interface ToggleProps {
    name: string,
    look?: string,
    label?: string,
    placeholder?: string,
    type?: string,
    modelValue?: ToggleBoolean,
    labelClass?: string,
    disabled?: boolean,
    errors?: ErrorsBag,
}

const inputId = useId()

const props = withDefaults(defineProps<ToggleProps>(), {
    modelValue: false,
    label: 'text-nowrap',
    look: 'primary',
    disabled: false,
})

const emits = defineEmits<{
    'update:model-value': [value?: string|number|boolean],
}>()

const content = computed<boolean>({
    get() {
        return !!props.modelValue
    },
    set(value: string|number|boolean): void {
        emits('update:model-value', !!value)
    }
})

const hasError = computed<boolean>(() => {
    return !!props.errors?.[props.name]
})

const errorMessage = computed<string|null>(() => {
    return props.errors?.[props.name]?.[0] || null
})

const inputClass = computed((): string[] => {
    return [
        props.disabled ? 'opacity-20' : '',
        'relative',
        'w-11',
        'h-6',
        'p-px',
        content.value ? '' : 'bg-slate-100',
        'border-transparent',
        'text-transparent',
        'rounded-full',
        'cursor-pointer',
        'transition-colors',
        'ease-in-out',
        'duration-200',
        props.look === 'primary' ? 'focus:ring-sky-400' : 'focus:ring-blue-400',
        'disabled:opacity-50',
        'disabled:pointer-events-none',
        'checked:bg-none',
        props.look === 'primary' ? 'checked:text-sky-400' : 'checked:text-blue-400',
        props.look === 'primary' ? 'checked:border-sky-400' : 'checked:border-blue-400',
        props.look === 'primary' ? 'focus:checked:border-sky-400' : 'focus:checked:border-blue-400',
        'before:inline-block',
        'before:size-5',
        'before:bg-white',
        'checked:before:bg-white',
        'before:translate-x-0',
        'checked:before:translate-x-full',
        'before:rounded-full',
        'before:shadow',
        'before:transform',
        'before:ring-0',
        'before:transition',
        'before:ease-in-out',
        'before:duration-200',
    ]
})
</script>

<template>
    <div>
        <div class="flex items-center">
            <input
                v-model="content"
                type="checkbox"
                :id="inputId"
                :class="inputClass"
                :disabled="disabled"
            >
            <label
                :for="inputId"
                class="text-xs text-slate-700 ms-2 cursor-pointer"
                :class="labelClass"
            >
                <slot>
                    {{ label }}
                </slot>
            </label>
        </div>
        <p
            v-if="hasError"
            class="text-red-500 text-left text-xs py-2"
        >
            {{ errorMessage }}
        </p>
    </div>
</template>
