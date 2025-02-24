// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import analogjsangular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
    integrations: [starlight({
        title: 'My Docs',
        social: {
            github: 'https://github.com/withastro/starlight',
        },
        sidebar: [
            {
                label: 'Guides',
                autogenerate: { directory: 'guides' },
            },
            {
                label: 'Reference',
                autogenerate: { directory: 'reference' },
            },
            {
                label: 'Angular',
                autogenerate: { directory: 'angular' },
                badge: 'success',

            },
        ],
		}), analogjsangular(
        {
            vite: {
                inlineStylesExtension: 'scss',
                transformFilter: (_code, id) => {
                    return id.includes('src/components'); // <- only transform Angular TypeScript files
                },
            },

        }
    )],
});