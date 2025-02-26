<script setup lang="ts">
import { computed } from 'vue'
import { useContentElement } from '@/components/editor/ContentElement'
import { useRichTextEditor } from '@/components/editor/rich-text/RichTextEditor'
import { BubbleMenu, EditorContent } from '@tiptap/vue-3'
import type { ElementProps, ElementEmit } from '@/components/editor/ContentElementTypes'
import ContentElementDefaults from '@/components/editor/ContentElementDefaults'
import AppTooltip from '@/components/ui/AppTooltip.vue'
import AppModal from "@/components/ui/AppModal.vue";
import RichTextSettings from '@/components/editor/rich-text/RichTextSettings.vue'

const props = withDefaults(defineProps<ElementProps>(), ContentElementDefaults)
const emits = defineEmits<ElementEmit>()
const { settings, saveSettings, closeSettings } = useContentElement(props, emits)
const { editor, menuActions, runCommand } = useRichTextEditor(props, emits)

const contentClass = computed(() => {
    const columns = settings.value?.columns || 1

    return {
        'gap-3': true,
        'md:columns-1': +columns === 1,
        'md:columns-2': +columns === 2,
        'md:columns-3': +columns === 3,
        'md:columns-4': +columns === 4,
    }
})
const containerClass = computed(() => {
    const classes = {}

    if (settings?.value?.background) {
        return { ...classes, 'bg-slate-50': true }
    }

    return classes
})
</script>

<template>
    <div :class="containerClass">
        <div
            class="container mx-auto py-6 px-3 md:px-0"
            :class="{ 'py-6': !settings?.title, 'pt-6 pb-8': settings?.title }"
        >
            <div
                v-if="settings?.title"
                class="mb-4 pt-4 font-semibold text-2xl text-center text-slate-900"
            >
                {{ settings.title }}
            </div>

            <div v-if="editor">
                <BubbleMenu
                    :editor="editor"
                    class="shadow-md rounded-md flex"
                >
                    <AppTooltip
                        v-for="(item, index) in menuActions"
                        :key="item.id"
                        :content="item.tooltip"
                    >
                        <button
                            class="border border-gray-200 h-8 w-8 px-1 py-1 text-xs cursor-pointer"
                            :class="{
                                'rounded-l-md': !index,
                                'rounded-r-md': index === (menuActions.length - 1),
                                '-ml-[1px]': index,
                                'bg-sky-400 text-white': editor.isActive(item.id),
                                'bg-white hover:bg-slate-50 text-slate-700': !editor.isActive(item.id),
                            }"
                            @click="runCommand(item)"
                        >
                            <i :class="item.icon" />
                        </button>
                    </AppTooltip>
                </BubbleMenu>
            </div>

            <div>
                <EditorContent
                    :editor="editor"
                    class="prose prose-p:first:mt-0 prose-p:last:mb-0 prose-sm prose-slate max-w-none"
                    :class="contentClass"
                />
            </div>

            <AppModal
                v-if="openSettings"
                title="Block settings"
                @close="closeSettings"
            >
                <RichTextSettings
                    :settings="settings"
                    @update="saveSettings"
                    @close="closeSettings"
                />
            </AppModal>
        </div>
    </div>
</template>
