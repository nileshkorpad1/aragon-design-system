import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: 'archetype',
        loadChildren: './archetype/archetype.module#ArcheTypeModule',
    },
    {
        path: '**',
        redirectTo: 'archetype/dashboard',
    },
];
const config: ExtraOptions = {
    useHash: true,
    // enableTracing: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
    declarations: [],
})
export class AppRoutingModule { }
