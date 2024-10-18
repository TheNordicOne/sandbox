import { normalize } from '@angular-devkit/core'
import {
  url,
  Rule,
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  strings,
} from '@angular-devkit/schematics'
import { TypedEnvironmentServiceSchema } from './typed-environment-service'

export function typedEnvironmentServiceGenerator(
  options: TypedEnvironmentServiceSchema,
): Rule {
  return () => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        dasherize: strings.dasherize,
        classify: strings.classify,
        name: options.name,
        environmentInterfaceName: options.environmentInterfaceName,
      }),
      move(normalize(`/${options.path}`)),
    ])

    return chain([mergeWith(templateSource)])
  }
}
