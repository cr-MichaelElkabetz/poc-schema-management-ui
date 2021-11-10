import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GetReleaseComponent } from './component/get-release/get-release.component';
import { CreateReleaseComponent } from './component/create-release/create-release.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CdsModule } from '@cds/angular';

@NgModule({
    declarations: [
        AppComponent,
        GetReleaseComponent,
        CreateReleaseComponent
    ],
    imports: [
        BrowserModule,
        ClarityModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        CdsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
