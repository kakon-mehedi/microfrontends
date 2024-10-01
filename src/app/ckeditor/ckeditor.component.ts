import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import * as DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Editor, EditorConfig } from "@ckeditor/ckeditor5-core";
import Base64Upload from "../ckeditor/Base64Upload.ts";
// import Base64UploaderPlugin from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
@Component({
  selector: "app-ckeditor",
  templateUrl: "./ckeditor.component.html",
  styleUrls: ["./ckeditor.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CkeditorComponent implements OnInit, OnChanges {
  @Input() data!: string;
  @Output() dataChange = new EventEmitter<string>();

  public Editor: any = DecoupledEditor;

  public config: EditorConfig = {
    // Editor.builtinPlugins = [
    // 	Base64UploadAdapter
    // ]

    toolbar: [
      "undo",
      "redo",
      "heading",
      "|",
      "fontSize",
      "fontFamily",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "superscript",
      "subscript",
      "removeFormat",
      "findAndReplace",
      "|",
      "alignment",
      "|",
      "numberedList",
      "bulletedList",
      "todoList",
      "|",
      "outdent",
      "indent",
      "|",
      "imageUpload",
      "insertTable",
      "mediaEmbed",
      "|",
      "horizontalLine",
      "link",
      "blockQuote",
      "code",
      "codeBlock",
      "htmlEmbed",
      "pageBreak",
      "specialCharacters",
    ],
    plugins: [Base64Upload, ...(DecoupledEditor as any).builtinPlugins],
    // plugins: (DecoupledEditor as any).builtinPlugins,
    // extraPlugins: [Base64Upload],
    // extraPlugins: [Base64UploaderPlugin],
    licenseKey: "<YOUR_LICENSE_KEY>",
    mention: {
      feeds: [
        {
          marker: "@",
          feed: ["@angular", "@ckeditor", "@typescript"],
          minimumCharacters: 1,
        },
      ],
    },
  };

  private editorInstance: Editor | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] && this.editorInstance) {
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
    editor.focus();

    if (this.data) {
      editor.setData(this.data);
    }

    // Attach the toolbar to the container.
    const toolbarContainer = document.querySelector("#toolbar-container");
    if (toolbarContainer) {
      const editorView = editor.ui.view as any;
      if (editorView.toolbar && editorView.toolbar.element) {
        toolbarContainer.appendChild(editorView.toolbar.element);
      }
    }

    // *** Key addition: Mode change listener ***
    // Listen for mode change (WYSIWYG to source and vice versa)
    editor.on("change:isSourceEditingMode", (evt, editor) => {
      const isSourceMode = editor.commands.get("sourceEditing").value;
      const iframe = document.querySelector("iframe"); // Target the iframe element

      if (isSourceMode && iframe) {
        // *** Key change: Hide iframe in source mode ***
        iframe.style.display = "none";
      } else if (iframe) {
        // *** Key change: Show iframe in WYSIWYG mode ***
        iframe.style.display = "block";
      }
    });
    // Set up the Base64 upload adapter
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return new Base64Upload(loader); // Use the custom adapter for file uploads
    };
  }
}
