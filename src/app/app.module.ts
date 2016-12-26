import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {PersonComponent} from './components/person/person.component';
import {FormComponent} from './components/form/form.component';
import {TableComponent} from './components/table/table.component';
import {HomeComponent} from './routes/home/home.component';
import {PersonService} from "./service/person.service";
import {PersonFilterPipe} from './person.pipe';
import {OrderByPipe} from "./order.pipe";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        PersonComponent,
        FormComponent,
        TableComponent,
        HomeComponent,
        PersonComponent,
        PersonFilterPipe,
        OrderByPipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [PersonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
