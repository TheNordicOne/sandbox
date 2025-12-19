import {ChangeDetectionStrategy, Component, input, output, signal, viewChild,} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Editor} from '@tiptap/core';
import {Popover} from '../../../popover/popover';

export interface CellColorData {
  backgroundColor: string;
}

@Component({
  selector: 'sbc-cell-color-popover',
  imports: [FormsModule,Popover],
  templateUrl: './cell-color-popover.html',
  styleUrl: './cell-color-popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CellColorPopover {
  editor = input.required<Editor>();

  popover = viewChild<Popover>(Popover);

  colorApplied = output<CellColorData>();
  colorRemoved = output<void>();

  backgroundColor = signal('#ffffff');
  selectedCellsCount = signal(1);
  
  predefinedColors = [
    '#ffffff',
    '#f8f9fa',
    '#e9ecef',
    '#dee2e6',
    '#fff3cd',
    '#d1e7dd',
    '#cfe2ff',
    '#f8d7da',
    '#e2e3e5',
    '#ffc107',
    '#28a745',
    '#007bff',
    '#dc3545',
    '#6c757d',
  ];

  open() {
    const editor = this.editor();
    const { $from } = editor.state.selection;

    let cellNode = null;
    for (let i = $from.depth; i > 0; i--) {
      const node = $from.node(i);
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        cellNode = node;
        break;
      }
    }

    const currentBg = cellNode?.attrs['backgroundColor'] || '#ffffff';
    this.backgroundColor.set(currentBg);

    this.selectedCellsCount.set(this.countSelectedCells());
    this.popover()?.open();
  }

  private countSelectedCells(): number {
    const editor = this.editor();
    const { state } = editor;
    const { selection } = state;

    let count = 0;
    state.doc.nodesBetween(selection.from, selection.to, (node) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        count++;
      }
    });

    return count || 1;
  }

  close() {
    this.popover()?.close();
  }

  selectPredefinedColor(color: string) {
    this.backgroundColor.set(color);
  }

  apply() {
    this.colorApplied.emit({
      backgroundColor: this.backgroundColor(),
    });
    this.close();
  }

  remove() {
    this.colorRemoved.emit();
    this.close();
  }

  cancel() {
    this.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.apply();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancel();
    }
  }
}
