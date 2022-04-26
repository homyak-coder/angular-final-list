import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersdashboardComponent } from './usersdashboard/usersdashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IonicModule, IonInfiniteScroll} from '@ionic/angular';


@NgModule({
  declarations: [
    AppComponent,
    UsersdashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDadataModule,
    BrowserAnimationsModule,
    IonicModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
