import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHostComponent } from '../controls/content-host.component';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from '../../dynamic-form.service';
import { shouldBeShown } from '../../helper';
import { NestedDynamicFormGroup } from '../../dynamic-form.type';

@Component({
  selector: 'sbf-nested-dynamic-form-group',
  standalone: true,
  imports: [CommonModule, ContentHostComponent, ReactiveFormsModule],
  templateUrl: './nested-dynamic-form-group.component.html',
  styleUrl: './nested-dynamic-form-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedDynamicFormGroupComponent implements OnInit {
  @Input({ required: true }) group!: NestedDynamicFormGroup;

  private parentContainer = inject(ControlContainer);
  private dynamicFormService = inject(DynamicFormService);

  public isVisible = computed(() => {
    const value = this.dynamicFormService.formValue();
    if (!this.group.showIf || value === null) {
      return true;
    }
    return shouldBeShown(this.group.showIf, value);
  });

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  constructor() {
    effect(() => {
      const isVisible = this.isVisible();
      if (isVisible || this.group.keepAttachedIfHidden) {
        this.parentFormGroup.get(this.group.id)?.enable({ emitEvent: false });
        return;
      }
      this.parentFormGroup.get(this.group.id)?.disable({ emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.group.id, new FormGroup({}), { emitEvent: false });
  }
}
