import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenicateUserComponent } from './authenicate-user/authenicate-user.component';
import { UserAuthenticatedComponent } from './user-authenticated/user-authenticated.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { AuthService } from './core/auth.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/defaultPage', pathMatch: 'full'},
  { path: 'defaultPage', component: DefaultPageComponent},
  { path: 'authenticate', component: AuthenicateUserComponent},
  { path: 'authenticatedUser', component: UserAuthenticatedComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
