import {Component} from '@angular/core';
import {RichTextEditor} from './rich-text-editor/rich-text-editor';

@Component({
  selector: 'sbc-components',
  imports: [
    RichTextEditor
  ],
  template: `
    <sbc-rich-text-editor/>
  `,
  styles: ``
})
export class ComponentsComponent {

}
