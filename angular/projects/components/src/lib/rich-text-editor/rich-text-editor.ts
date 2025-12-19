import {ChangeDetectionStrategy, Component, forwardRef, input, OnDestroy, signal, viewChild,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Editor} from '@tiptap/core';
import {TiptapEditorDirective} from 'ngx-tiptap';
import {RichTextEditorToolbar} from './components/toolbar/rich-text-editor-toolbar';
import {LinkData, LinkPopover} from './components/link-popover/link-popover';
import {CellColorData, CellColorPopover,} from './components/cell-color-popover/cell-color-popover';
import StarterKit from '@tiptap/starter-kit';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR,} from '@angular/forms';
import {Table, TableCell, TableHeader, TableRow,} from '@tiptap/extension-table';
import {Link} from '@tiptap/extension-link';
import {Underline} from '@tiptap/extension-underline';
import {ToolbarConfig} from './editor.config';

@Component({
  selector: 'sbc-rich-text-editor',
  imports: [
    CommonModule,
    TiptapEditorDirective,
    RichTextEditorToolbar,
    LinkPopover,
    FormsModule,
    CellColorPopover,
  ],
  templateUrl: './rich-text-editor.html',
  styleUrl: './rich-text-editor.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditor),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditor implements OnDestroy, ControlValueAccessor {
  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  linkPopover = viewChild<LinkPopover>('linkPopover');
  cellColorPopover = viewChild<CellColorPopover>('cellColorPopover');

  toolbarConfig = input<ToolbarConfig>([
    { id: 'text-format', tools: ['bold', 'italic', 'underline'] },
    { id: 'link', tools: ['link'] },
    { id: 'headings', tools: ['h1', 'h2'] },
    { id: 'lists', tools: ['bulletList', 'orderedList'] },
    { id: 'formatting', tools: ['blockquote', 'clear'] },
    { id: 'table-insert', tools: ['insertTable'] },
    { id: 'table-rows', tools: ['addRowBefore', 'addRowAfter', 'deleteRow'] },
    {
      id: 'table-columns',
      tools: ['addColumnBefore', 'addColumnAfter', 'deleteColumn'],
    },
    { id: 'table-styling', tools: ['cellBackgroundColor'] },
    { id: 'table-delete', tools: ['deleteTable'] },
  ]);

  placeholder = input<string>("");
  readonly = input(false);

  content = signal<string>('');
  disabled = signal(false);

  editor = new Editor({
    content: this.content(),
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      Table.configure({
        HTMLAttributes: {
          style:
            'border-collapse: collapse; border: 1px solid #ddd; width: 100%;',
        },
      }),
      TableRow,
      TableCell.extend({
        content: 'inline*',
        addAttributes() {
          return {
            ...this.parent?.(),
            backgroundColor: {
              default: null,
              parseHTML: (element) => element.style.backgroundColor || null,
              renderHTML: (attributes) => {
                if (!attributes['backgroundColor']) {
                  return {};
                }
                return {
                  style: `background-color: ${attributes['backgroundColor']}`,
                };
              },
            },
          };
        },
      }).configure({
        HTMLAttributes: {
          style: 'border: 1px solid #ddd; padding: 8px; min-width: 100px;',
        },
      }),
      TableHeader.extend({
        content: 'inline*',
        addAttributes() {
          return {
            ...this.parent?.(),
            backgroundColor: {
              default: null,
              parseHTML: (element) => element.style.backgroundColor || null,
              renderHTML: (attributes) => {
                if (!attributes['backgroundColor']) {
                  return {};
                }
                return {
                  style: `background-color: ${attributes['backgroundColor']}`,
                };
              },
            },
          };
        },
      }).configure({
        HTMLAttributes: {
          style:
            'border: 1px solid #ddd; padding: 8px; min-width: 100px; font-weight: bold; background-color: #f5f5f5; text-align: left;',
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'sbc-input rich-text-editor',
      },
    },
  });

  onValuesChange(content: string) {
    this.content.set(content);
    if (this.onChange) {
      this.onChange(content);
    }
  }

  writeValue(content: string): void {
    this.content.set(content);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onPopoverToolClicked(toolId: string) {
    if (toolId === 'link') {
      this.linkPopover()?.open();
    } else if (toolId === 'cellBackgroundColor') {
      this.cellColorPopover()?.open();
    }
  }

  onLinkSaved(linkData: LinkData) {
    const { url, text } = linkData;
    const currentSelection = this.editor.state.doc.textBetween(
      this.editor.state.selection.from,
      this.editor.state.selection.to,
    );

    if (text && text !== currentSelection) {
      this.editor
        .chain()
        .focus()
        .insertContent(text)
        .setLink({ href: url })
        .run();
      return;
    }

    this.editor.chain().focus().setLink({ href: url }).run();
  }

  onLinkRemoved() {
    this.editor.chain().focus().unsetLink().run();
  }

  onCellColorApplied(colorData: CellColorData) {
    const { backgroundColor } = colorData;
    this.applyCellBackgroundColor(backgroundColor);
  }

  onCellColorRemoved() {
    this.applyCellBackgroundColor(null);
  }

  private applyCellBackgroundColor(color: string | null) {
    const { state, view } = this.editor;
    const { selection } = state;
    const { $from, $to } = selection;

    const tr = state.tr;
    let cellsUpdated = false;

    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          backgroundColor: color,
        });
        cellsUpdated = true;
      }
      return true;
    });

    if (cellsUpdated) {
      view.dispatch(tr);
    }

    this.editor.view.focus();
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }
}
