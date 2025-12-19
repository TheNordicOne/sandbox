import {Editor} from '@tiptap/core';


export interface EditorTool {
  id: string;
  icon: string;
  label: string;
  action?: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  isVisible?: (editor: Editor) => boolean;
  needsPopover?: boolean;
  anchorName?: string;
}

export interface ToolbarGroup {
  id: string;
  tools: string[];
}

export type ToolbarConfig = ToolbarGroup[];

export const EDITOR_TOOLS: Record<string, EditorTool> = {
  bold: {
    id: 'bold',
    label: "Bold",
    icon: 'TYPE_BOLD',
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  italic: {
    id: 'italic',
    label: "Italic",
    icon: 'TYPE_ITALIC',
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  underline: {
    id: 'underline',
    label: "Underline",
    icon: 'TYPE_UNDERLINE',
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
  h1: {
    id: 'h1',
    label: "Heading 1",
    icon: 'TYPE_H1',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },
  h2: {
    id: 'h2',
    label: "Heading 2",
    icon: 'TYPE_H2',
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  bulletList: {
    id: 'bulletList',
    label: "Unordered",
    icon: 'UNORDERED_LIST',
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  orderedList: {
    id: 'orderedList',
    label: "Ordered",
    icon: 'ORDERED_LIST',
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  blockquote: {
    id: 'blockquote',
    label: "Quote",
    icon: 'BLOCK_QUOTE',
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  clear: {
    id: 'clear',
    label: "Clear Formatting",
    icon: 'CLEAR',
    action: (editor) =>
      editor.chain().focus().unsetAllMarks().clearNodes().run(),
  },
  link: {
    id: 'link',
    label: "Link",
    icon: 'LINK',
    isActive: (editor) => editor.isActive('link'),
    needsPopover: true,
    anchorName: '--link-action',
  },
  insertTable: {
    id: 'insertTable',
    label: 'Insert Table',
    icon: 'TABLE',
    action: (editor) =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
    isVisible: (editor) => editor.can().insertTable(),
  },
  addRowBefore: {
    id: 'addRowBefore',
    label: 'Add Row Above',
    icon: 'ARROW_UP',
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    isVisible: (editor) => editor.can().addRowBefore(),
  },
  addRowAfter: {
    id: 'addRowAfter',
    label: 'Add Row Below',
    icon: 'ARROW_DOWN',
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    isVisible: (editor) => editor.can().addRowAfter(),
  },
  deleteRow: {
    id: 'deleteRow',
    label: 'Delete Row',
    icon: 'DASH_CIRCLE',
    action: (editor) => editor.chain().focus().deleteRow().run(),
    isVisible: (editor) => editor.can().deleteRow(),
  },
  addColumnBefore: {
    id: 'addColumnBefore',
    label: 'Add Column Left',
    icon: 'ARROW_LEFT',
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    isVisible: (editor) => editor.can().addColumnBefore(),
  },
  addColumnAfter: {
    id: 'addColumnAfter',
    label: 'Add Column Right',
    icon: 'ARROW_RIGHT',
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    isVisible: (editor) => editor.can().addColumnAfter(),
  },
  deleteColumn: {
    id: 'deleteColumn',
    label: 'Delete Column',
    icon: 'DASH_CIRCLE',
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    isVisible: (editor) => editor.can().deleteColumn(),
  },
  deleteTable: {
    id: 'deleteTable',
    label: 'Delete Table',
    icon: 'TABLE',
    action: (editor) => editor.chain().focus().deleteTable().run(),
    isVisible: (editor) => editor.can().deleteTable(),
  },
  cellBackgroundColor: {
    id: 'cellBackgroundColor',
    label: "Title",
    icon: 'PAINT_BUCKET',
    needsPopover: true,
    anchorName: '--cell-color-action',
    isVisible: (editor) => {
      const { $from } = editor.state.selection;
      for (let i = $from.depth; i > 0; i--) {
        const node = $from.node(i);
        if (
          node.type.name === 'tableCell' ||
          node.type.name === 'tableHeader'
        ) {
          return true;
        }
      }
      return false;
    },
  },
} as const;
