<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, onBeforeUnmount } from 'vue'

interface AppDropdownProps {
    position?: 'top' | 'bottom',
    distance?: number,
    alignment?: 'start' | 'end' | 'center',
    parentRef?: HTMLElement,
}

const props = withDefaults(defineProps<AppDropdownProps>(), {
    position: 'top',
    distance: 7,
    alignment: 'center',
})

const emits = defineEmits<{
    'scroll': [event: Event],
}>()

const parent = ref<HTMLElement>()
const el = ref<HTMLElement>()
const realPosition = ref<string>()

const onScroll = (event: Event) => {
    updateCoords()
    emits('scroll', event)
}

const updateCoords = () => {
    const parentRect = parent.value?.getBoundingClientRect()
    const rect = el.value?.getBoundingClientRect()

    if (rect && parentRect) {
        updatePosition(props.position, rect, parentRect)
        updateAlignment(props.alignment, rect, parentRect)
    }
}

const updatePosition = (position: string, rect: DOMRect, parentRect: DOMRect): void => {
    const element: HTMLElement | undefined = el.value

    if (element) {
        if (position === 'bottom') {
            element.style.top = `${parentRect.y + parentRect.height + window.scrollY + props.distance}px`
        } else if (position === 'top') {
            element.style.top = `${parentRect.y + window.scrollY - rect.height - props.distance}px`
        } else if (position === 'right') {
            element.style.left = `${parentRect.x + parentRect.width + props.distance}px`
        } else if (position === 'left') {
            element.style.left = `${parentRect.x - rect.width - props.distance}px`
        }
    }
    realPosition.value = position
}

const updateAlignment = (alignment: string, rect: DOMRect, parentRect: DOMRect) => {
    if (props.position === 'top' || props.position === 'bottom') {
        horizontalAlignment(alignment, rect, parentRect)
    } else {
        verticalAlignment(alignment, rect, parentRect)
    }
}

const horizontalAlignment = (alignment: string, rect: DOMRect, parentRect: DOMRect) => {
    const element: HTMLElement | undefined = el.value

    if (element) {
        if (alignment === 'end') {
            element.style.left = `${parentRect.x + parentRect.width - rect.width}px`
        } else if (alignment === 'start') {
            element.style.left = `${parentRect.x}px`
        } else {
            element.style.left = `${parentRect.x + (parentRect.width - rect.width) / 2}px`
        }
    }
}

const verticalAlignment = (alignment: string, rect: DOMRect, parentRect: DOMRect) => {
    const element: HTMLElement | undefined = el.value

    if (element) {
        if (alignment === 'start') {
            element.style.top = `${parentRect.y + window.scrollY}px`
        } else if (alignment === 'end') {
            element.style.top = `${parentRect.y + parentRect.height - rect.height + window.scrollY}px`
        } else {
            element.style.top = `${parentRect.y + (parentRect.height - rect.height) / 2 + window.scrollY}px`
        }
    }
}

onMounted(() => {
    if (el.value) {
        const instance = getCurrentInstance()
        const parentEl = instance?.parent?.vnode.el as HTMLElement || null

        document.body.insertBefore(el?.value, document.body.firstChild)
        document.addEventListener('scroll', onScroll, true)
        parent.value = props.parentRef || parentEl

        updateCoords()
    }
})

onBeforeUnmount(() => {
    document.removeEventListener('scroll', onScroll, true)
    if (el.value) {
        el.value.remove()
    }
})
</script>

<template>
    <div ref="el" class="app-dropdown">
        <slot />
    </div>
</template>
