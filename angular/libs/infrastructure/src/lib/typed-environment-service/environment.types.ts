export type EnvironmentKey<E> = keyof E
export type EnvironmentValueType<E, K extends EnvironmentKey<E>> = E[K]
