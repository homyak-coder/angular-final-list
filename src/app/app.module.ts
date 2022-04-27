import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersdashboardComponent } from './usersdashboard/usersdashboard.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NgxDadataModule } from '@kolkov/ngx-dadata';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IonicModule, IonInfiniteScroll} from '@ionic/angular';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


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
    ScrollingModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
