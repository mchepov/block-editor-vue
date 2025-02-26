export interface RichTextAction {
    id: string,
    icon: string,
    command: string,
    tooltip: string,
    params?: { [key: string]: string|number },
}

const RichTextActions: RichTextAction[] = [
    {
        id: 'heading',
        icon: 'fa fa-heading',
        command: 'toggleHeading',
        tooltip: 'Заголовок',
        params: { level: 3 },
    },
    {
        id: 'bold',
        icon: 'fa fa-bold',
        command: 'toggleBold',
        tooltip: 'Жирный',
    },
    {
        id: 'italic',
        icon: 'fa fa-italic',
        command: 'toggleItalic',
        tooltip: 'Курсив',
    },
    {
        id: 'bulletList',
        icon: 'fa fa-list',
        command: 'toggleBulletList',
        tooltip: 'Список',
    },
]

export default RichTextActions
