import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceClickService } from './service-click.service';
import { ConnectComponent } from './connect/connect.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule

  ],
  providers: [
    ServiceClickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
