import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DualEditorComponent } from './editor/dual-editor.component';
import { FormComponent } from './form/form.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'sbf-dual-editable-form',
  imports: [
    FormsModule,
    DualEditorComponent,
    FormComponent,
    JsonPipe
  ],
  templateUrl: './dual-editable-form.component.html',
  styleUrl: './dual-editable-form.component.scss'
})
export class DualEditableFormComponent {
  formValue = signal({
    firstName: 'Hans',
    lastName: 'Peter',
    email: 'hans@peter.de',
    phoneNumbers: ['123456'],
    address: {
      street: 'Hans Street 69',
      city: 'Peter City',
      state: 'Solid',
      zip: '12345'
    }
  });
}
