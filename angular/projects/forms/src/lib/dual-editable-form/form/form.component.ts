import { Component, effect, input, linkedSignal, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sbf-dual-form',
  imports: [
    FormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formValue = input<any>();
  formValueChange = output<any>();

  firstName = linkedSignal(() => this.formValue()?.firstName ?? '');
  lastName = linkedSignal(() => this.formValue()?.lastName ?? '');
  email = linkedSignal(() => this.formValue()?.email ?? '');
  phoneNumbers = linkedSignal<WritableSignal<string>[]>(() => this.formValue()?.phoneNumbers?.map((v: string) => signal<string>(v)) ?? []);

  street = linkedSignal(() => this.formValue()?.address?.street ?? '');
  city = linkedSignal(() => this.formValue()?.address?.city ?? '');
  state = linkedSignal(() => this.formValue()?.address?.state ?? '');
  zip = linkedSignal(() => this.formValue()?.address?.zip ?? '');

  constructor() {
    effect(() => {
      console.log('Effect Form');
      const newValue = {
        firstName: this.firstName(),
        lastName: this.lastName(),
        email: this.email(),
        // Commenting this leads to an infinite loop
        // phoneNumbers: this.phoneNumbers().map((phoneNumber) => phoneNumber()),
        address: {
          street: this.street(),
          city: this.city(),
          state: this.state(),
          zip: this.zip()
        }
      };
      this.formValueChange.emit(newValue);
    });
  }

  addPhoneNumber() {
    this.phoneNumbers.update((phoneNumbers) => {
      phoneNumbers.push(signal(''));
      return [...phoneNumbers];
    });
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.update((phoneNumbers) => {
      phoneNumbers.splice(index, 1);
      return [...phoneNumbers];
    });
  }

}
