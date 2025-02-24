import {Component, input, signal} from '@angular/core';

@Component({
    selector: 'app-hello',
    standalone: true,
    imports: [],
    template: `
    <p>Hello from Angular!!</p>

    @if(show()){
        <p>{{ helpText() }}</p>
    }

    <button (click)="toggle()">Toggle</button>
  `,
})
export class ExampleComponent {
    helpText = input<string>('Help Text');

    show = signal(false);

    toggle() {
        this.show.update(showing => !showing);
    }
}