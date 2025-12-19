import {ChangeDetectionStrategy, Component, input, output, signal, viewChild,} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {Editor} from '@tiptap/core';
import {Popover} from '../../../popover/popover';

export interface LinkData {
  url: string;
  text: string;
}

@Component({
  selector: 'sbc-link-popover',
  imports: [FormsModule, Popover],
  templateUrl: './link-popover.html',
  styleUrl: './link-popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkPopover {
  editor = input.required<Editor>();

  popover = viewChild<Popover>(Popover);

  linkSaved = output<LinkData>();
  linkRemoved = output<void>();

  url = signal('');
  text = signal('');

  open() {
    const editor = this.editor();
    const { from, to } = editor.state.selection;

    const attrs = editor.getAttributes('link');
    const href = attrs['href'] || '';

    let linkText = '';
    if (href) {
      const { state } = editor;
      const { doc, schema } = state;
      const linkMark = schema.marks['link'];

      let linkStart = from;
      let linkEnd = to;

      const $pos = state.doc.resolve(from);
      const node = $pos.parent;
      const nodeStart = $pos.start();

      node.forEach((child, offset) => {
        if (!child.isText) {
          return;
        }

        const mark = child.marks.find(
          (m) => m.type === linkMark && m.attrs['href'] === href,
        );

        if (!mark) {
          return;
        }

        const childStart = nodeStart + offset;
        const childEnd = childStart + child.nodeSize;

        if (childEnd >= from && childStart <= to) {
          linkStart = Math.min(linkStart, childStart);
          linkEnd = Math.max(linkEnd, childEnd);
        }
      });

      linkText = doc.textBetween(linkStart, linkEnd);
    }

    if (!linkText) {
      linkText = editor.state.doc.textBetween(from, to);
    }

    this.url.set(href);
    this.text.set(linkText);

    this.popover()?.open();
  }

  close() {
    this.popover()?.close();
  }

  save() {
    if (this.url()) {
      this.linkSaved.emit({
        url: this.url(),
        text: this.text(),
      });
    }
    this.close();
  }

  remove() {
    this.linkRemoved.emit();
    this.close();
  }

  cancel() {
    this.close();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.save();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.cancel();
    }
  }
}
