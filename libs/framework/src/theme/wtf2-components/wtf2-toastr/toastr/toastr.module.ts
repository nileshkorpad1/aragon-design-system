import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { Toast } from './toast.component';
import {
    DefaultNoComponentGlobalConfig,
    GlobalConfig,
    TOAST_CONFIG,
} from './toastr-config';

export const DefaultGlobalConfig: GlobalConfig = {
    ...DefaultNoComponentGlobalConfig,
    toastComponent: Toast,
};

@NgModule({
    imports: [CommonModule],
    declarations: [Toast],
    exports: [Toast],
    entryComponents: [Toast],
})
export class Wtf2ToastrModule {
    static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders {
        return {
            ngModule: Wtf2ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultGlobalConfig,
                        config,
                    },
                },
            ],
        };
    }
}

@NgModule({
    imports: [CommonModule],
})
export class ToastrComponentlessModule {
    static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders {
        return {
            ngModule: Wtf2ToastrModule,
            providers: [
                {
                    provide: TOAST_CONFIG,
                    useValue: {
                        default: DefaultNoComponentGlobalConfig,
                        config,
                    },
                },
            ],
        };
    }
}
