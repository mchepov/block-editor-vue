<script setup lang="ts">
import { ref } from 'vue'
import AppTooltip from '@/components/ui/AppTooltip.vue'

type ElementActionEmit = (evt: string, value?: string) => void
type ElementActionItem = {
    id: string,
    title: string,
    icon: string,
}

const emits = defineEmits<ElementActionEmit>()
const actions = ref<ElementActionItem[]>([
    {
        id: 'select',
        title: 'Insert block',
        icon: 'fa fa-plus',
    },
    {
        id: 'move-up',
        title: 'Move up',
        icon: 'fa fa-arrow-up',
    },
    {
        id: 'move-down',
        title: 'Move down',
        icon: 'fa fa-arrow-down',
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: 'fa fa-gear',
    },
    {
        id: 'remove',
        title: 'Remove block',
        icon: 'fa fa-trash-alt',
    },
])

const run = (item: ElementActionItem) => {
    emits(item.id)
}

</script>

<template>
    <div class="absolute -bottom-4 left-0 w-full hidden group-hover:flex justify-center items-center z-10">
        <AppTooltip
            v-for="(item, index) in actions"
            :key="item.id"
            :content="item.title"
        >
            <button
                class="cursor-pointer h-8 w-8 px-2 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-xs"
                :class="{
                    '-ml-[1px]': index,
                    'rounded-l-md': !index,
                    'rounded-r-md': index === (actions.length - 1),
                }"
                @click="run(item)"
            >
                <i :class="item.icon" />
            </button>
        </AppTooltip>
    </div>
</template>
