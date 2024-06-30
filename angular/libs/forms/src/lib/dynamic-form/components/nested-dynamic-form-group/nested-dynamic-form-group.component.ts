import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, OnDestroy, OnInit } from '@angular/core';
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
export class NestedDynamicFormGroupComponent implements OnInit, OnDestroy {
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

  public isAttached = computed(() => this.isVisible() || this.group.keepAttachedIfHidden);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  constructor() {
    effect(() => {
      const isAttached = this.isAttached();
      if (!this.parentFormGroup) {
        return;
      }
      const formGroupStillExists = !!this.parentFormGroup.get(this.group.id);
      if (isAttached && !formGroupStillExists) {
        this.parentFormGroup.addControl(this.group.id, new FormGroup({}));
        return;
      }
      if (isAttached) {
        return;
      }
      this.parentFormGroup.removeControl(this.group.id);
    });
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(this.group.id, new FormGroup({}), { emitEvent: false });
  }

  ngOnDestroy() {
    this.parentFormGroup?.removeControl(this.group.id);
  }
}
