import { InjectionToken } from '@angular/core'
import { TypedEnvironmentService } from 'infrastructure'
import { SandboxEnv } from '../app/types/environment.types'
import { environment } from './environment'

export const ENVIRONMENT_SERVICE = new InjectionToken<
  TypedEnvironmentService<SandboxEnv>
>('TypedEnvironmentService', {
  providedIn: 'root',
  factory: () => new TypedEnvironmentService<SandboxEnv>(environment),
})
