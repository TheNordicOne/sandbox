import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from './dynamic-form.component';
import { By } from '@angular/platform-browser';
import { exampleForm } from './example-form';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  // Missing Tests:
  // should not show controls that have explicitly defined visibility to be false (check nested as well)
  // should show or hide groups and controls based on conditions (simple, complex) => maybe refactor to be implied by showIf
  // should show title if present
  // should use default values (initialize and reset)
  // should consider validators

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [DynamicFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    fixture.componentRef.setInput('dynamicFormConfig', exampleForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show groups that have explicitly defined visibility to be false', () => {
    const groups = fixture.debugElement.queryAll(By.css('[e2e-data-content-type]'));
    expect(groups.length).toBe(2);
  });
});
