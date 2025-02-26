<script setup lang="ts">
import { ref } from 'vue'
import ContentEditor from '@/components/editor/ContentEditor.vue'
import type { BlockProps } from '@/components/editor/ContentElementTypes.ts'
import RichTextDefaults from '@/components/editor/rich-text/RichTextDefaults.ts'

const content = ref<BlockProps[]>([
    {
        component: 'RichText',
        content: { content: RichTextDefaults.paragraph },
        settings: { title: 'Block Title' },
    }
])
</script>

<template>
    <div>
        <ContentEditor v-model="content" />
    </div>
</template>
