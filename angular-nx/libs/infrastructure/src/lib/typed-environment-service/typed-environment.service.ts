import { EnvironmentKey, EnvironmentValueType } from './environment.types'

export class TypedEnvironmentService<T> {
  constructor(private readonly environment: T) {}

  public get<K extends EnvironmentKey<T>>(key: K): EnvironmentValueType<T, K> {
    return this.environment[key]
  }
}
