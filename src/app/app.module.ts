import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpClient } from 'selenium-webdriver/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule, MatSortModule} from '@angular/material';
import { AuthenicateUserComponent } from './authenicate-user/authenicate-user.component';
import { UserAuthenticatedComponent } from './user-authenticated/user-authenticated.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { SignupComponent } from './signup/signup.component';

@Injectable()
@NgModule({
  declarations: [
    AppComponent,
    AuthenicateUserComponent,
    UserAuthenticatedComponent,
    DefaultPageComponent,
    UserLoginComponent,
    UserProfileComponent,
    SignupComponent
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
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
