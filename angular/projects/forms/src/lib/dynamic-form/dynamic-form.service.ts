import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class DynamicFormService {
  dynamicForm = new FormGroup({});
  formValue = toSignal(this.dynamicForm.valueChanges);
}
