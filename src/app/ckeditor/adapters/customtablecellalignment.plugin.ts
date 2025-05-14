import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class CustomTableCellHorizontalAlignment extends Plugin {
    public static get requires() {
        return [];
    }

    public static get pluginName() {
        return 'CustomTableCellHorizontalAlignment';
    }

    init() {
        const editor = this.editor;

        // Define three commands
        editor.commands.add('alignCellLeft', new AlignTableCellCommand(editor, 'left'));
        editor.commands.add('alignCellCenter', new AlignTableCellCommand(editor, 'center'));
        editor.commands.add('alignCellRight', new AlignTableCellCommand(editor, 'right'));

        // Add buttons to the UI
        this._createButton('alignCellLeft', 'Align Left', '⬅');
        this._createButton('alignCellCenter', 'Align Center', '↔');
        this._createButton('alignCellRight', 'Align Right', '➡');
    }

    private _createButton(commandName: string, label: string, icon: string) {
        this.editor.ui.componentFactory.add(commandName, locale => {
            const view = new ButtonView(locale);

            view.set({
                label,
                withText: true,
                tooltip: true
            });

            view.on('execute', () => {
                this.editor.execute(commandName);
            });

            return view;
        });
    }
}

class AlignTableCellCommand extends Command {
    constructor(editor: any, private alignment: 'left' | 'center' | 'right') {
        super(editor);
    }

    override execute() {
        const editor = this.editor;
        const model = editor.model;

        model.change(writer => {
            const selection = model.document.selection;
            for (const range of selection.getRanges()) {
                for (const item of range.getItems()) {
                    if (item.is('element', 'tableCell')) {
                        writer.setAttribute('alignment', this.alignment, item);
                    }
                }
            }
        });
    }
}
