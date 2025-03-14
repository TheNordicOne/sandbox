import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'sbf-signal-form',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './signal-form.component.html',
  styleUrl: './signal-form.component.scss'
})
export class SignalFormComponent {
  public firstName = signal('');
  public lastName = signal('');
  public email = signal('');
  // We need to use a signal for the phone numbers, so we get reactivity when typing in the input fields
  public phoneNumbers = signal([signal('')]);
  public street = signal('');
  public city = signal('');
  public state = signal('');
  public zip = signal('');

  public formValue = computed(() => {
    return {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(), // We need to do a little mapping here, so we get the actual value for the phone numbers
      phoneNumbers: this.phoneNumbers().map((phoneNumber) => phoneNumber()),
      address: {
        street: this.street(),
        city: this.city(),
        state: this.state(),
        zip: this.zip()
      }
    };
  });

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
