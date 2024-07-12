import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CkeditorComponent implements OnInit, OnChanges {
  @Input() data!: string;
  @Output() dataChange = new EventEmitter<string>();

  public Editor = ClassicEditor;
  public config: EditorConfig = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'subscript',
      'superscript',
      'link',
      'blockquote',
      'code',
      'codeBlock',
      'insertTable',
      'imageUpload',
      'mediaEmbed',
      'bulletedList',
      'numberedList',
      'todoList',
      'outdent',
      'indent',
      '|',
      'alignment',
      'fontBackgroundColor',
      'fontColor',
      'fontFamily',
      'fontSize',
      '|',
      'removeFormat',
      '|',
      'undo',
      'redo'
    ],
    plugins: ClassicEditor.builtinPlugins,
    licenseKey: '<YOUR_LICENSE_KEY>',
    mention: {
      feeds: [
        {
          marker: '@',
          feed: ['@angular', '@ckeditor', '@typescript'],
          minimumCharacters: 1
        }
      ]
    }
  };

  private editorInstance: Editor | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.editorInstance) {
      this.editorInstance.setData(this.data);
    }
  }

  public onChange({ editor }: { editor: Editor }) {
    const data = editor.getData();
    this.dataChange.emit(data);
    console.log(data);
  }

  public onReady(editor: Editor) {
    this.editorInstance = editor;
    if (this.data) {
      editor.setData(this.data);
    }
  }
}