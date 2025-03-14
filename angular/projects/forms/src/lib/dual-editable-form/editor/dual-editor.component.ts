import { Component, input, output, signal } from '@angular/core';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'sbf-editor',
  imports: [
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './dual-editor.component.html',
  styleUrl: './dual-editor.component.scss'
})
export class DualEditorComponent {
  jsonObject = input();
  jsonObjectChange = output();

  options = signal({
    theme: 'vs-dark',
    language: 'json'
  });


  onModelChange(json: string) {
    console.log('Model Change JSON');
    this.jsonObjectChange.emit(JSON.parse(json));
  }
}
