import {ChangeDetectionStrategy, Component, computed, effect, input, output, signal,} from '@angular/core';
import {EDITOR_TOOLS, EditorTool, ToolbarConfig} from '../../editor.config';
import {Editor} from '@tiptap/core';

export interface ToolbarGroupWithTools {
  id: string;
  tools: EditorTool[];
}

@Component({
  selector: 'sbc-rich-text-editor-toolbar',
  imports: [],
  templateUrl: './rich-text-editor-toolbar.html',
  styleUrl: './rich-text-editor-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorToolbar {
  toolbarConfig = input<ToolbarConfig>([]);
  editor = input.required<Editor>();

  popoverToolClicked = output<string>();

  toolState = signal<Record<string, boolean>>({});
  toolVisibility = signal<Record<string, boolean>>({});

  toolbarGroups = computed<ToolbarGroupWithTools[]>(() => {
    const config = this.toolbarConfig();
    return config.map((group) => ({
      ...group,
      tools: group.tools
        .map((toolId) => EDITOR_TOOLS[toolId])
        .filter((tool) => !!tool),
    }));
  });

  visibleToolbarGroups = computed<ToolbarGroupWithTools[]>(() => {
    const groups = this.toolbarGroups();
    const visibility = this.toolVisibility();

    return groups
      .map((group) => ({
        ...group,
        tools: group.tools.filter((tool) => visibility[tool.id]),
      }))
      .filter((group) => group.tools.length > 0);
  });

  constructor() {
    effect(() => {
      const editor = this.editor();
      this.updateToolStates();
      this.updateToolVisibility();

      editor.on('update', () => this.updateToolStates());
      editor.on('selectionUpdate', () => {
        this.updateToolStates();
        this.updateToolVisibility();
      });
    });
  }

  private updateToolStates() {
    const editor = this.editor();
    const currentState = this.toolState();
    let hasChanges = false;
    const newState: Record<string, boolean> = { ...currentState };

    for (const group of this.toolbarGroups()) {
      for (const tool of group.tools) {
        const newValue = tool.isActive ? tool.isActive(editor) : false;
        if (currentState[tool.id] !== newValue) {
          newState[tool.id] = newValue;
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      this.toolState.set(newState);
    }
  }

  private updateToolVisibility() {
    const editor = this.editor();
    const currentVisibility = this.toolVisibility();
    let hasChanges = false;
    const newVisibility: Record<string, boolean> = { ...currentVisibility };

    for (const group of this.toolbarGroups()) {
      for (const tool of group.tools) {
        const newValue = tool.isVisible ? tool.isVisible(editor) : true;
        if (currentVisibility[tool.id] !== newValue) {
          newVisibility[tool.id] = newValue;
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      this.toolVisibility.set(newVisibility);
    }
  }

  executeTool(tool: EditorTool) {
    if (tool.needsPopover) {
      this.popoverToolClicked.emit(tool.id);
      return;
    }

    if (!tool.action) {
      return;
    }

    tool.action(this.editor());
    this.editor().view.focus();
  }
}
