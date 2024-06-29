import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHostComponent } from '../controls/content-host.component';
import { NestedDynamicFormGroup } from '../../dynamic-form.type';
import { DynamicFormService } from '../../dynamic-form.service';
import { shouldBeShown } from '../../helper';

@Component({
  selector: 'sbf-flat-dynamic-form-group',
  standalone: true,
  imports: [CommonModule, ContentHostComponent],
  templateUrl: './flat-dynamic-form-group.component.html',
  styleUrl: './flat-dynamic-form-group.component.scss'
})
export class FlatDynamicFormGroupComponent {
  @Input({ required: true }) group!: NestedDynamicFormGroup;

  private parentContainer = inject(ControlContainer);
  private dynamicFormService = inject(DynamicFormService);

  public isVisible = computed(() => {
    const value = this.dynamicFormService.formValue();
    if (!this.group.showIf || value === null) {
      return this.group.visible === undefined || this.group.visible;
    }
    return shouldBeShown(this.group.showIf, value);
  });
}
