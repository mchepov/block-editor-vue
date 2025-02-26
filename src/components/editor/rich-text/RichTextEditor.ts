import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import RichTextActions, { type RichTextAction } from '@/components/editor/rich-text/RichTextActions'
import type { ElementProps, ElementEmit } from '@/components/editor/ContentElementTypes'
import RichTextDefaults from '@/components/editor/rich-text/RichTextDefaults'
import { Editor} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

interface EditorCommandsProps {
    [key: string]: (params?: { [key: string]: string|number }) => void
}

export const useRichTextEditor = (props: ElementProps, emits: ElementEmit) => {
    const editor = ref()
    const menuActions = ref(RichTextActions)

    const editorCommands: EditorCommandsProps = {
        toggleHeading: params => editor.value.chain().focus().toggleHeading(params).run(),
        toggleBold: () => editor.value.chain().focus().toggleBold().run(),
        toggleItalic: () => editor.value.chain().focus().toggleItalic().run(),
        toggleBulletList: () => editor.value.chain().focus().toggleBulletList().run(),
    }

    const runCommand = (item: RichTextAction) => {
        if (item.params) {
            editorCommands[item.command](item.params)
        } else {
            editorCommands[item.command]()
        }
    }

    watch(props.contentValue, (value) => {
        const isSame = editor.value.getHTML() === value.content

        if (!isSame) {
            editor.value.commands.setContent(value.content, false)
        }
    })

    onMounted(() => {
        const editorContent = props.contentValue?.content ?? RichTextDefaults.paragraph

        editor.value = new Editor({
            content: editorContent,
            extensions: [ StarterKit ],
            onUpdate: () => emits('update:content-value', { content: editor.value.getHTML() }),
        })

        emits('update:content-value', { content: editor.value.getHTML() })
    })

    onBeforeUnmount(() => {
        editor.value.destroy()
    })

    return {
        editor,
        menuActions,
        runCommand,
    }
}
