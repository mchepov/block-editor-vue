import { computed, type WritableComputedRef } from 'vue'
import type {
    ElementProps,
    ElementEmit,
    ElementContentProps,
    ElementSettingsProps
} from '@/components/editor/ContentElementTypes'

export const useContentElement = (props: ElementProps, emits: ElementEmit) => {
    const content: WritableComputedRef<ElementContentProps> = computed({
        get(): ElementContentProps {
            return props.contentValue
        },
        set(value: ElementContentProps): void {
            emits('update:content-value', value)
        },
    })

    const settings: WritableComputedRef<ElementSettingsProps> = computed({
        get(): ElementSettingsProps {
            return props.settingsValue
        },
        set(value: ElementSettingsProps): void {
            emits('update:settings-value', value)
        },
    })

    const saveSettings = (newSettings: ElementSettingsProps): void => {
        settings.value = newSettings
        closeSettings()
    }

    const closeSettings = (): void => {
        emits('close-settings')
    }

    return {
        content,
        settings,
        saveSettings,
        closeSettings,
    }
}
