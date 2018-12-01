import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClient } from 'selenium-webdriver/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule} from '@angular/material';
import { AuthenicateUserComponent } from './authenicate-user/authenicate-user.component';
import { UserAuthenticatedComponent } from './user-authenticated/user-authenticated.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
@NgModule({
  declarations: [
    AppComponent,
    AuthenicateUserComponent,
    UserAuthenticatedComponent,
    DefaultPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
