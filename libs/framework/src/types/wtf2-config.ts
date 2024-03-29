export interface Wtf2Config {
    layout: {
        style: string;

        width: 'fullwidth' | 'boxed';
        navbar: {
            background: string;
            hidden: boolean;
            folded: boolean;
            position: 'left' | 'right' | 'top';
            variant: string;
        };
        toolbar: {
            background: string;
            hidden: boolean;
            position:
                | 'above'
                | 'above-static'
                | 'above-fixed'
                | 'below'
                | 'below-static'
                | 'below-fixed';
        };
        footer: {
            background: string;
            hidden: boolean;
            position:
                | 'above'
                | 'above-static'
                | 'above-fixed'
                | 'below'
                | 'below-static'
                | 'below-fixed';
        };
        sidepanel: {
            hidden: boolean;
            position: 'left' | 'right';
        };
    };
    wtf2theme: 'default';
    globleSearch: boolean;
    customScrollbars: boolean;
}
