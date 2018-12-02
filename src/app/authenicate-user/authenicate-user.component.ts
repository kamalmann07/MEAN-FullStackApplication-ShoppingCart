import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormsModule, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService} from '../core/auth.service';

@Component({
  selector: 'app-authenicate-user',
  templateUrl: './authenicate-user.component.html',
  styleUrls: ['./authenicate-user.component.css']
})
export class AuthenicateUserComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String;

  constructor(public authService: AuthService) {
    this.loginForm = new FormGroup({ email: new FormControl(), password: new FormControl() });
   }

   loginWithEmail(loginForm) {
    this.authService.signInRegular(loginForm);
    this.errorMessage = 'Inavlid Credientials. Please try again';
  }

  ngOnInit() {
  }

}
