import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ENVIRONMENT_SERVICE } from '../../environments/environment.token'

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private environmentService = inject(ENVIRONMENT_SERVICE)

  demoBool = this.environmentService.get('demoBool')
  demoString = this.environmentService.get('demoString')
  demoNumber = this.environmentService.get('demoNumber')
  demoArray = this.environmentService.get('demoArray')
  demoObject = this.environmentService.get('demoObject')
}
