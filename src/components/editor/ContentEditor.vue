<script setup lang="ts">
import { ref, computed, toValue, defineOptions } from 'vue'
import type { ElementConfigItem, BlockProps } from '@/components/editor/ContentElementTypes'
import editorComponents from '@/components/editor/InitComponents.ts'
import AppModal from '@/components/ui/AppModal.vue'
import ContentEditorButtons from '@/components/editor/ContentEditorButtons.vue'
import ElementActions from '@/components/editor/ElementActions.vue'

defineOptions({
    components: editorComponents,
})

interface ContentEditorProps {
    modelValue?: Array<BlockProps> | [],
}
interface ContentEditorState {
    popupIsOpen: boolean,
    insertAfter: BlockProps | null,
    openedSettings?: string | null,
}

const props = withDefaults(defineProps<ContentEditorProps>(), {
    modelValue: () => ([]),
})
const emits = defineEmits<{
    'update:model-value': [value?: Array<object> | []],
}>()

const state = ref<ContentEditorState>({
    popupIsOpen: false,
    insertAfter: null,
    openedSettings: null,
})

const content = computed({
    get(): BlockProps[] {
        return props.modelValue
    },
    set(value: BlockProps[]) {
        emits('update:model-value', value)
    },
})

const hasContent = computed(() => {
    return !!content?.value?.length
})

const getElementId = () => {
    return `f${(~~(Math.random()*1e8)).toString(16)}`
}

const addElement = (component: ElementConfigItem) => {
    const newElement: BlockProps = component.initMethod()

    newElement.id = getElementId()
    insertElement(newElement)
}

const closePopup = () => {
    state.value.popupIsOpen = false
    state.value.insertAfter = null
}

const selectElement = (target: BlockProps) => {
    state.value.popupIsOpen = true
    state.value.insertAfter = target
}

const insertElement = (element: BlockProps) => {
    const contentValue = toValue(content.value)

    if (state.value.insertAfter === null) {
        contentValue.push(element)
    } else {
        const index = content.value.indexOf(state.value.insertAfter)
        contentValue.splice(index + 1, 0, element)
    }
    content.value = contentValue
    closePopup()
}

const move = (from: number, to: number) => {
    while (from < 0) {
        from += content.value.length
    }
    while (to < 0) {
        to += content.value.length
    }
    if (to >= content.value.length) {
        let k = to - content.value.length + 1

        while (k--) {
            to = content.value.length
        }
    }
    content.value.splice(to, 0, content.value.splice(from, 1)[0])
}

const removeElement = (item: BlockProps) => {
    const index = content.value.indexOf(item)
    content.value.splice(index, 1)
}

const settingsAreOpened = (element: BlockProps) => state.value.openedSettings === element.id
const openSettings = (element: BlockProps) => state.value.openedSettings = element.id
const closeSettings = () => state.value.openedSettings = null
</script>

<template>
    <div>
        <div v-if="hasContent">
            <div
                v-for="(element, i) in content"
                :key="element.id"
                class="border group border-transparent hover:border-gray-200 relative"
            >
                <Component
                    :is="element.component"
                    :key="element.id"
                    v-model:content-value="element.content"
                    v-model:settings-value="element.settings"
                    :open-settings="settingsAreOpened(element)"
                    @close-settings="closeSettings"
                />

                <ElementActions
                    @select="selectElement(element)"
                    @move-up="move(i, (i - 1))"
                    @move-down="move(i, (i + 1))"
                    @settings="openSettings(element)"
                    @remove="removeElement(element)"
                />
            </div>
        </div>

        <div
            v-else
            class="flex items-center justify-center p-8"
        >
            <div class="w-1/2">
                <ContentEditorButtons @insert="addElement" />
            </div>
        </div>

        <AppModal
            v-if="state.popupIsOpen"
            title="Вставить блок"
            @close="closePopup"
        >
            <div>
                <ContentEditorButtons @insert="addElement" />
            </div>
        </AppModal>
    </div>
</template>
