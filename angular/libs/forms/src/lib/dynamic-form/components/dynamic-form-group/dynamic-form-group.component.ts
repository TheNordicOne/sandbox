import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DynamicFormGroup } from '../../dynamic-form.type'
import { FlatDynamicFormGroupComponent } from '../flat-dynamic-form-group/flat-dynamic-form-group.component'
import { NestedDynamicFormGroupComponent } from '../nested-dynamic-form-group/nested-dynamic-form-group.component'

@Component({
  selector: 'sbf-dynamic-form-group',
  standalone: true,
  imports: [
    CommonModule,
    FlatDynamicFormGroupComponent,
    NestedDynamicFormGroupComponent,
  ],
  templateUrl: './dynamic-form-group.component.html',
  styleUrl: './dynamic-form-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormGroupComponent {
  @Input({ required: true }) group!: DynamicFormGroup
}
