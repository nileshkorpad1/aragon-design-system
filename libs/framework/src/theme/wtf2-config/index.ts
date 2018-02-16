import { Wtf2Config } from '@wtf2/types';

/**
 * Default WTF2 Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/main/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */

export const wtf2Config: Wtf2Config = {
    layout: {
        style: 'vertical-layout-1',
        width: 'fullwidth',
        navbar: {
            background: '',
            folded: false,
            hidden: false,
            position: 'left',
            variant: 'vertical-style-2',
        },
        toolbar: {
            background: '',
            hidden: false,
            position: 'below-fixed',
        },
        footer: {
            background: '',
            hidden: false,
            position: 'above-fixed',
        },
        sidepanel: {
            hidden: false,
            position: 'right',
        },
    },
    globleSearch: false,
    wtf2theme: 'default',
    customScrollbars: true,
};
