import type { BlockProps } from '@/components/editor/ContentElementTypes.ts'
import RichTextDefaults from '@/components/editor/rich-text/RichTextDefaults.ts'

export default {
    components: [
        {
            name: 'RichText',
            title: 'Text',
            tooltip: 'Insert text',
            initMethod(): BlockProps {
                return {
                    component: 'RichText',
                    content: { content: RichTextDefaults.paragraph },
                    settings: {},
                }
            },
            icon: 'fa fa-align-justify',
        },
    ]
}
