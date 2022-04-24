import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersdashboardComponent } from './usersdashboard/usersdashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersdashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
