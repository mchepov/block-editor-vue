export interface ElementContentProps {
    content?: string|null,
}

export interface ElementSettingsProps {
    title?: string,
    columns?: number,
    background?: boolean,
}

export interface ElementProps {
    contentValue: ElementContentProps,
    settingsValue: ElementSettingsProps,
    openSettings?: boolean,
}

export interface BlockProps {
    id?: string,
    component: string,
    content: ElementContentProps | null,
    settings?: ElementSettingsProps | null,
}

export interface ElementConfigItem {
    name: string,
    title: string,
    tooltip: string,
    icon: string,
    initMethod: () => BlockProps,
}

export type ElementEmit = (evt: string, value?: object | object[] | string) => void
