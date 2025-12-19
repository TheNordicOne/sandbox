import {afterRenderEffect, ChangeDetectionStrategy, Component, ElementRef, input, output, signal, viewChild,} from '@angular/core';

@Component({
  selector: 'sbc-popover',
  standalone: true,
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popover {
  anchor = input<string>();
  focusOnOpen = input<boolean>(true);

  popoverRef = viewChild<ElementRef<HTMLDivElement>>('popover');

  closed = output<void>();
  closing = output<void>();
  opened = output<void>();

  isOpen = signal(false);

  constructor() {
    afterRenderEffect(() => {
      if (!this.isOpen() || !this.focusOnOpen()) {
        return;
      }
      setTimeout(() => {
        this.popoverRef()?.nativeElement.focus();
      }, 0);
    });
  }

  open() {
    this.isOpen.set(true);
    this.popoverRef()?.nativeElement.showPopover();
    this.opened.emit();
  }

  close() {
    this.closing.emit();
    this.isOpen.set(false);
    this.popoverRef()?.nativeElement.hidePopover();
  }

  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  onToggle(event: Event) {
    const toggleEvent = event as ToggleEvent;
    if (toggleEvent.newState === 'closed') {
      this.closing.emit();
      this.isOpen.set(false);
      this.closed.emit();
      return;
    }

    if (toggleEvent.newState === 'open') {
      this.isOpen.set(true);
      this.opened.emit();
    }
  }
}

interface ToggleEvent extends Event {
  newState: 'open' | 'closed';
  oldState: 'open' | 'closed';
}
