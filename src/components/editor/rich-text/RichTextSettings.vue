<script setup lang="ts">
import type { ElementSettingsProps } from '@/components/editor/ContentElementTypes.ts'
import { ref, onMounted, watch } from 'vue'
import _ from 'lodash'
import AppButton from '@/components/ui/AppButton.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormToggle from '@/components/form/FormToggle.vue'

interface RichTextSettingsProps {
    settings: ElementSettingsProps
}

type ElementSettingsEmit = (evt: string, value?: ElementSettingsProps) => void

const props = defineProps<RichTextSettingsProps>()
const emits = defineEmits<ElementSettingsEmit>()

const form = ref<ElementSettingsProps>({})
const save = (): void => emits('update', form.value)
const cancel = () => emits('close', form.value)

watch(props.settings, (value: ElementSettingsProps) => form.value = _.cloneDeep(value))
onMounted(() => form.value = _.cloneDeep(props.settings))
</script>

<template>
    <div>
        <FormInput
            v-model="form.title"
            name="title"
            label="Block title"
            placeholder="Enter block title"
            class="mb-3"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="md:pr-4">
                <FormInput
                    v-model="form.columns"
                    name="columns"
                    type="number"
                    label="Number of columns (1-4)"
                    placeholder="Enter a number"
                    class="mb-3"
                />
            </div>

            <div class="pt-6">
                <FormToggle
                    v-model="form.background"
                    name="background"
                    label="Gray background"
                />
            </div>
        </div>

        <div class="flex items-center gap-2">
            <AppButton
                class="text-sm"
                @click="save"
            >
                Save
            </AppButton>

            <AppButton
                look="outlined"
                class="text-sm"
                @click="cancel"
            >
                Cancel
            </AppButton>
        </div>
    </div>
</template>
