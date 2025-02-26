import _ from 'lodash'
import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'
import EditorConfig from '@/components/editor/EditorConfig.ts'

const editorComponents: Record<string, Component> = {}
const modules: Record<string, () => Promise<Component>> = import.meta.glob('./**/*.vue', { import: 'default' })
const moduleNames: string[] = EditorConfig.components.map(item => item.name)

_.keys(modules).forEach(module => {
    const [ fileName ]: string[] = module.split('/').reverse()
    const [ componentName ]: string[] = fileName.split('.')

    if (moduleNames.includes(componentName)) {
        editorComponents[componentName] = defineAsyncComponent(modules[module])
    }
})

export default editorComponents;
