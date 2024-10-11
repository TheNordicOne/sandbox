import { DynamicForm } from './dynamic-form.type'

export const exampleForm: DynamicForm = {
  groups: [
    {
      type: 'flat-group',
      id: 'group-1',
      title: 'Group with all basic control types',
      content: [
        {
          type: 'text',
          id: 'company',
          label: 'Name of Company',
        },
        {
          type: 'numeric',
          id: 'licenses',
          label: 'Amount of Licenses',
        },
        {
          type: 'radio',
          id: 'plan',
          label: 'Price Plan',
          options: [
            {
              id: 'plan-123',
              label: 'Free',
              value: 'p123',
            },
            {
              id: 'plan-456',
              label: 'Medium',
              value: 'p456',
            },
            {
              id: 'plan-789',
              label: 'Large',
              value: 'p789',
            },
          ],
        },
        {
          type: 'dropdown',
          id: 'package',
          label: 'Product Package',
          options: [
            {
              id: 'package-1',
              label: 'Product 1 Only',
              value: 'pack-1',
            },
            {
              id: 'package-2',
              label: 'Product 2 Only',
              value: 'pack-2',
            },
            {
              id: 'package-all',
              label: 'All Products',
              value: 'pack-all',
            },
          ],
        },
        {
          type: 'checkbox',
          id: 'termsAccepted',
          label: 'I Accept Terms',
        },
      ],
    },
    {
      type: 'nested-group',
      id: 'group-2',
      title: 'Group with controls using default and value properties',
      content: [
        {
          type: 'text',
          id: 'username',
          label: 'Username',
          value: 'SuperGitUser',
          default: 'UsernameSuggestion123',
        },
        {
          type: 'numeric',
          id: 'repositories',
          label: 'Repositories to create',
          value: 2,
          default: 1,
        },
        {
          type: 'radio',
          id: 'visibility',
          label: 'Visibility of the repositories',
          value: 'public',
          default: 'private',
          options: [
            {
              id: 'public-repos-option',
              label: 'Public',
              value: 'public',
            },
            {
              id: 'private-repos-option',
              label: 'Private',
              value: 'private',
            },
          ],
        },
        {
          type: 'dropdown',
          id: 'repoTemplate',
          label: 'Template',
          value: 'mono',
          default: 'none',
          options: [
            {
              id: 'template-1',
              label: 'None',
              value: 'none',
            },
            {
              id: 'template-2',
              label: 'Monorepo',
              value: 'mono',
            },
            {
              id: 'template-3',
              label: 'Documentation',
              value: 'doc',
            },
            {
              id: 'template-3',
              label: 'Note Management',
              value: 'note',
            },
          ],
        },
        {
          type: 'checkbox',
          id: 'sendConfirmation',
          label: 'Send confirmation mail',
          value: false,
          default: true,
        },
        {
          type: 'text',
          id: 'confirmationMailTarget',
          label: 'E-Mail',
          value: 'dummy@sandbox.com',
          keepAttachedIfHidden: true,
          resetValueIfHidden: false,
          showIf: {
            controlId: 'sendConfirmation',
            comparer: 'eq',
            compareValue: true,
          },
        },
        {
          type: 'checkbox',
          id: 'editProjectId',
          label: 'Edit Project ID',
          value: false,
          default: false,
        },
        {
          type: 'text',
          id: 'projectId',
          label: 'Project ID',
          default: '123456789',
          resetValueIfHidden: false,
          showIf: {
            controlId: 'editProjectId',
            comparer: 'eq',
            compareValue: true,
          },
        },
      ],
    },
    {
      type: 'nested-group',
      id: 'group-3',
      keepAttachedIfHidden: true,
      content: [
        {
          type: 'numeric',
          id: 'docAmount',
          label: 'Documents to store',
        },
        {
          type: 'checkbox',
          id: 'acceptedLimits',
          label: 'I accept the limits for large volumes of documents',
          showIf: {
            controlId: 'docAmount',
            comparer: 'lt',
            compareValue: 1000,
          },
        },
        {
          type: 'radio',
          id: 'docTypes',
          label: 'Types of documents',
          options: [
            {
              id: 'simple-text',
              label: 'Simple Text Files',
              value: 'text-raw',
            },
            {
              id: 'markdown-text',
              label: 'Markdown Files',
              value: 'text-markdown',
            },
          ],
        },
        {
          type: 'dropdown',
          id: 'docFrequency',
          label: 'Documentation Update Frequency',
          options: [
            {
              id: 'on-the-fly',
              label: 'On the fly',
              value: 'otf',
            },
            {
              id: 'sprint',
              label: 'Sprint',
              value: 'spr',
            },
            {
              id: 'cycle',
              label: 'Cycle',
              value: 'cyc',
            },
            {
              id: 'planned',
              label: 'Planned',
              value: 'pla',
            },
          ],
        },
        {
          type: 'numeric',
          id: 'frequency',
          label: 'Frequency (Sprint / Cycle Duration)',
          resetValueIfHidden: true,
          showIf: {
            controlId: 'docAmount',
            comparer: 'lt',
            compareValue: 2000,
            and: {
              controlId: 'docFrequency',
              comparer: 'eq',
              compareValue: 'spr',
              or: {
                controlId: 'docFrequency',
                comparer: 'eq',
                compareValue: 'cyc',
              },
            },
          },
        },
        {
          type: 'text',
          id: 'altCompanyName',
          label: 'Alternative Company Name',
          showIf: {
            controlId: 'company',
            comparer: 'empty',
          },
        },
        {
          type: 'text',
          id: 'altUsername',
          label: 'Alternative Username',
          showIf: {
            controlId: 'username',
            comparer: 'eqOrEmpty',
            compareValue: 'none',
          },
        },
        {
          type: 'nested-group',
          id: 'group-3-1',
          title: 'Subgroup with invalid condition',
          content: [
            {
              type: 'text',
              id: 'inviso-text-1',
              label: 'Practically never visible',
              showIf: {
                controlId: 'frequency',
                comparer: 'eq',
                compareValue: 1,
              },
            },
            {
              type: 'text',
              id: 'inviso-text-2',
              label: 'Practically never visible',
              showIf: {
                controlId: 'repositories',
                comparer: 'lt',
                compareValue: '1',
              },
            },
          ],
        },
        {
          type: 'nested-group',
          id: 'group-3-2',
          content: [],
        },

        {
          type: 'nested-group',
          id: 'group-3-3',
          content: [],
        },
      ],
      showIf: {
        controlId: 'group-2.repoTemplate',
        comparer: 'eq',
        compareValue: 'doc',
      },
    },
  ],
}
