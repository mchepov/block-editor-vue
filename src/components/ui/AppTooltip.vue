<script setup lang="ts">
import { computed, ref } from 'vue'
import AppDropdown from '@/components/ui/AppDropdown.vue'

interface AppTooltipProps {
    content?: string,
    tooltipClass?: string,
    dark?: boolean,
    visible?: boolean,
}

const props = withDefaults(defineProps<AppTooltipProps>(), {
    position: 'top',
    visible: true,
    dark: true,
})

const isVisible = ref<boolean>(false)

const tooltipClasses = computed(() => {
    const classList = {
        'app-tooltip': true,
        'app-tooltip--dark': props.dark,
    }

    if (props.tooltipClass) {
        return { ...classList, [props.tooltipClass]: true }
    }

    return classList
})

const showTooltip = () => {
    if (props.visible) {
        isVisible.value = true
    }
}

const hideTooltip = () => {
    isVisible.value = false
}
</script>

<template>
    <div
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
    >
        <div ref="trigger">
            <slot />
        </div>

        <app-dropdown
            v-if="isVisible"
            :class="tooltipClasses"
            @mouseleave="hideTooltip"
            @scroll="hideTooltip"
        >
            <slot name="content">
                {{ content }}
            </slot>
        </app-dropdown>
    </div>
</template>
