import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenicateUserComponent } from './authenicate-user/authenicate-user.component';
import { UserAuthenticatedComponent } from './user-authenticated/user-authenticated.component';
import { DefaultPageComponent } from './default-page/default-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/itemDetails', pathMatch: 'full'},
  { path: 'itemDetails', component: DefaultPageComponent},
  { path: 'testRoute', component: UserAuthenticatedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
