import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  imports: [RouterModule],
  selector: 'asb-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-sandbox'
}
