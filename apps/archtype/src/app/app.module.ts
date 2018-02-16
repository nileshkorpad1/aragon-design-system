import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { Wtf2ButtonModule, Wtf2IconModule, Wtf2FormFieldModule, Wtf2InputModule, Wtf2CardModule, Wtf2SelectModule, Wtf2DatepickerModule, Wtf2CheckboxModule, Wtf2RadioModule } from '@wtf2/theme/wtf2-material';
// import { Wtf2TabsModule } from '@wtf2/theme/wtf2-material/tabs';
import { TranslateModule } from '@ngx-translate/core';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';

import { AppComponent } from './app.component';
import { VerticalLayout1Module } from './layout/vertical/layout-1/layout-1.module';
import { VerticalLayout2Module } from './layout/vertical/layout-2/layout-2.module';
import { VerticalLayout3Module } from './layout/vertical/layout-3/layout-3.module';
import { HorizontalLayout1Module } from './layout/horizontal/layout-1/layout-1.module';
// import { Wtf2CustomProgressBarModule, Wtf2SidebarModule, Wtf2ToastrModule, Wtf2DatepickerRangeModule, Wtf2GlobalSearchModule, Wtf2SkeletonModule } from '@wtf2/theme/wtf2-components';
import { Wtf2Module } from '@wtf2/theme/wtf2.module';
import { Wtf2CoreModule } from '@wtf2/theme/wtf2Core.module';
import { wtf2Config } from '@wtf2/theme/wtf2-config';
// import { FakeDbService } from '@wtf2/fake-db/fake-db.service';
// import { ScrollSpyModule } from 'ngx-scrollspy';

import { InputComponent } from '@wtf2/theme/wtf2-components/wtf2-input/input.component';
import { ButtonComponent } from '@wtf2/theme/wtf2-components/wtf2-button/button.component';
import { SelectComponent } from '@wtf2/theme/wtf2-components/wtf2-select/select.component';
import { DateComponent } from '@wtf2/theme/wtf2-components/wtf2-datepicker/date.component';
import { RadiobuttonComponent } from '@wtf2/theme/wtf2-components/wtf2-radio/radiobutton.component';
import { CheckboxComponent } from '@wtf2/theme/wtf2-components/wtf2-checkbox/checkbox.component';
// import '../styles.scss';
import { AppStoreModule } from './store/store.module';
import { Wtf2GlobalSearchComponent } from '@wtf2/theme/wtf2-components/wtf2-global-search/global-search.component';
import { Wtf2DatepickerRangeComponent } from '@wtf2/theme/wtf2-components/wtf2-datepicker-range/wtf2-datepicker-range.component';
import { Wtf2GlobalSearchModule, Wtf2DatepickerRangeModule, Wtf2CustomProgressBarModule, Wtf2SidebarModule, Wtf2ToastrModule } from '@wtf2/theme/wtf2-components';
// import { LayoutModule } from './layout/layout.module';
// import '@wtf2/theme/styles/wtf2.scss';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        Wtf2ButtonModule,
        Wtf2IconModule,
        Wtf2CustomProgressBarModule,
        Wtf2SidebarModule,
        Wtf2Module.forRoot(wtf2Config),
        Wtf2ToastrModule.forRoot(),
        Wtf2CoreModule,
        AppRoutingModule,
        VerticalLayout1Module,
        VerticalLayout2Module,
        VerticalLayout3Module,
        HorizontalLayout1Module,
        AppStoreModule,
        Wtf2GlobalSearchModule,
        Wtf2DatepickerRangeModule,
        Wtf2FormFieldModule,
        Wtf2InputModule,
        Wtf2CardModule,
        Wtf2SelectModule,
        Wtf2DatepickerModule,
        Wtf2CheckboxModule,
        Wtf2RadioModule,
        // LayoutModule
        // Wtf2SkeletonModule
    ],
    declarations: [
        AppComponent,
        InputComponent,
        ButtonComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        CheckboxComponent,
    ],
    providers: [
        {
            provide: APP_BASE_HREF, useValue: '/',
        },
    ],

    entryComponents: [
        InputComponent,
        ButtonComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        CheckboxComponent,
        Wtf2GlobalSearchComponent,
        Wtf2DatepickerRangeComponent,
    ],

    bootstrap: [
        AppComponent,
    ],
})
export class AppModule { }
