import {EditorConfig} from "@ckeditor/ckeditor5-core";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

export const editorConfig: EditorConfig = {
    toolbar: [
        'undo',
        'redo',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        '|',
        'fontColor',
        'fontBackgroundColor',
        'highlight',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        'removeFormat',
        'findAndReplace',
        '|',
        'alignment',
        '|',
        'numberedList',
        'bulletedList',
        'todoList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'insertTable',
        'mediaEmbed',
        '|',
        'horizontalLine',
        'link',
        'blockQuote',
        'code',
        'codeBlock',
        'htmlEmbed',
        'pageBreak',
        'specialCharacters',
    ],
    plugins: (DecoupledEditor as any).builtinPlugins,
    licenseKey: '<YOUR_LICENSE_KEY>',
    mention: {
        feeds: [
            {
                marker: '@',
                feed: ['@angular', '@ckeditor', '@typescript'],
                minimumCharacters: 1,
            },
        ],
    },
    fontColor: {
        colors: [
            {
                color: 'rgb(255, 0, 0)',
                label: 'Red'
            },
            {
                color: 'rgb(0, 128, 0)',
                label: 'Green'
            },
            {
                color: 'rgb(0, 0, 255)',
                label: 'Blue'
            },
            {
                color: 'rgb(255, 255, 0)',
                label: 'Yellow'
            },
            {
                color: 'rgb(255, 165, 0)',
                label: 'Orange'
            },
            {
                color: 'rgb(128, 0, 128)',
                label: 'Purple'
            },
            {
                color: 'rgb(0, 0, 0)',
                label: 'Black'
            },
            {
                color: 'rgb(128, 128, 128)',
                label: 'Gray'
            },
            {
                color: 'rgb(255, 192, 203)',
                label: 'Pink'
            },
            {
                color: 'rgb(0, 255, 255)',
                label: 'Cyan'
            },
            {
                color: 'rgb(128, 0, 0)',
                label: 'Maroon'
            },
            {
                color: 'rgb(0, 128, 128)',
                label: 'Teal'
            },
            {
                color: 'rgb(255, 105, 180)',
                label: 'Hot Pink'
            },
            {
                color: 'rgb(75, 0, 130)',
                label: 'Indigo'
            },
            {
                color: 'rgb(255, 255, 255)',
                label: 'White'
            }
        ]
    },

    fontBackgroundColor: {
        colors: [
            {
                color: 'rgb(255, 255, 255)',
                label: 'White'
            },
            {
                color: 'rgb(255, 0, 0)',
                label: 'Red'
            },
            {
                color: 'rgb(0, 255, 0)',
                label: 'Green'
            },
            {
                color: 'rgb(173, 216, 230)',
                label: 'Light Blue'
            },
            {
                color: 'rgb(0, 0, 255)',
                label: 'Blue'
            },
            {
                color: 'rgb(255, 255, 0)',
                label: 'Yellow'
            },
            {
                color: 'rgb(255, 165, 0)',
                label: 'Orange'
            },
            {
                color: 'rgb(128, 0, 128)',
                label: 'Purple'
            },
            {
                color: 'rgb(0, 0, 0)',
                label: 'Black'
            },
            {
                color: 'rgb(240, 230, 140)',
                label: 'Khaki'
            },
            {
                color: 'rgb(255, 192, 203)',
                label: 'Pink'
            },
            {
                color: 'rgb(47, 79, 79)',
                label: 'Dark Slate Gray'
            },
            {
                color: 'rgb(224, 255, 255)',
                label: 'Light Cyan'
            },
            {
                color: 'rgb(255, 239, 213)',
                label: 'Papaya Whip'
            },
            {
                color: 'rgb(245, 222, 179)',
                label: 'Wheat'
            }
        ]
    },

    highlight: {
        options: [
            {
                model: 'yellowMarker',
                class: 'marker-yellow',
                title: 'Yellow marker',
                color: 'rgb(255, 255, 0)',
                type: 'marker'
            },
            {
                model: 'greenMarker',
                class: 'marker-green',
                title: 'Green marker',
                color: 'rgb(0, 255, 0)',
                type: 'marker'
            },
            {
                model: 'pinkMarker',
                class: 'marker-pink',
                title: 'Pink marker',
                color: 'rgb(255, 192, 203)',
                type: 'marker'
            },
            {
                model: 'blueMarker',
                class: 'marker-blue',
                title: 'Blue marker',
                color: 'rgb(0, 191, 255)',
                type: 'marker'
            },
            {
                model: 'orangeMarker',
                class: 'marker-orange',
                title: 'Orange marker',
                color: 'rgb(255, 165, 0)',
                type: 'marker'
            },
            {
                model: 'purpleMarker',
                class: 'marker-purple',
                title: 'Purple marker',
                color: 'rgb(128, 0, 128)',
                type: 'marker'
            },
            {
                model: 'cyanMarker',
                class: 'marker-cyan',
                title: 'Cyan marker',
                color: 'rgb(0, 255, 255)',
                type: 'marker'
            },
            {
                model: 'limeMarker',
                class: 'marker-lime',
                title: 'Lime marker',
                color: 'rgb(0, 255, 0)',
                type: 'marker'
            },
            {
                model: 'redMarker',
                class: 'marker-red',
                title: 'Red marker',
                color: 'rgb(255, 0, 0)',
                type: 'marker'
            }
        ]
    },
    image: {
        toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side',
            'imageStyle:center',
        ],
        styles: {
            options: [],
        },
    },
};
