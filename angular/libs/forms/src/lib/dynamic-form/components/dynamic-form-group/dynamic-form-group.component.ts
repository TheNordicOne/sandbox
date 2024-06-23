import { AfterViewChecked, Component, computed, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxControlComponent } from '../controls/dynamic-checkbox-control.component';
import { DropdownControlComponent } from '../controls/dynamic-dropdown-control.component';
import { RadioControlComponent } from '../controls/dynamic-radio-control.component';
import { NumericControlComponent } from '../controls/dynamic-numeric-control.component';
import { TextControlComponent } from '../controls/dynamic-text-control.component';
import { DynamicFormGroup } from '../../dynamic-form.type';
import { Subscription } from 'rxjs';
import { shouldBeShown } from '../../helper';
import { ContentHostComponent } from '../controls/content-host.component';

@Component({
  selector: 'sbf-dynamic-form-group',
  standalone: true,
  imports: [CommonModule,
    TextControlComponent,
    NumericControlComponent,
    RadioControlComponent,
    DropdownControlComponent,
    CheckboxControlComponent,
    ReactiveFormsModule, ContentHostComponent],
  templateUrl: './dynamic-form-group.component.html',
  styleUrl: './dynamic-form-group.component.scss'
})
export class DynamicFormGroupComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input({ required: true }) group!: DynamicFormGroup;
  private parentContainer = inject(ControlContainer);

  private formValue = signal(null);
  private formSubscription: Subscription | undefined;

  public isVisible = computed(() => {
    const value = this.formValue();
    if (!this.group.showIf || value === null) {
      return this.group.visible === undefined || this.group.visible;
    }
    return shouldBeShown(this.group.showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit(): void {
    this.formSubscription = this.parentFormGroup.valueChanges.subscribe((value) => {
      this.formValue.set(value);
    });
  }

  ngAfterViewChecked() {
    this.parentFormGroup.updateValueAndValidity({ emitEvent: true });
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }
}
