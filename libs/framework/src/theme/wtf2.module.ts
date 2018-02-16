import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { WTF2_CONFIG } from '../services/config.service';

@NgModule()
export class Wtf2Module {
    constructor(@Optional() @SkipSelf() parentModule: Wtf2Module) {
        if (parentModule) {
            throw new Error('Wtf2Module is already loaded. Import it in the AppModule only!');
        }
    }

    static forRoot(config): ModuleWithProviders {
        return {
            ngModule: Wtf2Module,
            providers: [
                {
                    provide: WTF2_CONFIG,
                    useValue: config,
                },
            ],
        };
    }
}
