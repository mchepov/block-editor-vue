<script setup lang="ts">
import { computed } from 'vue'
import type { ElementConfigItem } from '@/components/editor/ContentElementTypes.ts'
import EditorConfig from '@/components/editor/EditorConfig.ts'

const items = computed(() => EditorConfig.components)
const emits = defineEmits<{ 'insert': [value: ElementConfigItem] }>()
const addItem = (item: ElementConfigItem): void => {
    emits('insert', item)
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        <button
            v-for="item in items"
            :key="item.name"
            class="cursor-pointer px-4 py-6 bg-white flex flex-col gap-2 justify-center items-center w-full border border-slate-200 rounded-md shadow-sm hover:shadow-md"
            @click="addItem(item)"
        >
            <span class="w-8 h-8 max-w-8 max-h-8 text-slate-700 text-xl block">
                <i :class="item.icon" />
            </span>

            <span class="text-slate-700 text-xs flex-grow">
                {{ item.title }}
            </span>
        </button>
    </div>
</template>
