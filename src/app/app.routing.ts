import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent}  from './routes/home/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}