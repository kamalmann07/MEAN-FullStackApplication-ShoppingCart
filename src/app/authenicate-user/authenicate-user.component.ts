import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormsModule, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthService} from '../core/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authenicate-user',
  templateUrl: './authenicate-user.component.html',
  styleUrls: ['./authenicate-user.component.css']
})
export class AuthenicateUserComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: String;
  text: any;
  userDetails: any;
  successMessage: String;

  constructor(public authService: AuthService, private router: Router, private http: HttpClient) {
    this.loginForm = new FormGroup({ email: new FormControl(), password: new FormControl() });
   }

  //  loginWithEmail(loginForm) {
  //   this.authService.signInRegular(loginForm);
  // }

  loginWithEmail(loginForm) {

    if (this.authService.validateEmail(loginForm.email)) {

    firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((user) => {
        const userName = firebase.auth().currentUser;

        if (userName.emailVerified) {
          for ( let i = 0; i < this.userDetails.length; i++) {
            if (this.userDetails[i].userName === userName.uid) {
              console.log('User Found');
            if (this.userDetails[i].userName === userName.uid && this.userDetails[i].isActive === 'N') {
              window.alert('User is deactivated. Please contact manager.');
            } else {
            this.router.navigate(['/authenticatedUser']);
            }
          }
          }
        } else {
          window.alert('Please verify your email.');
        }
      })
      .catch(error => {
        this.errorMessage = error.message;
        console.log('Invalid Credientials. Please try again.' + error);
      });
    } else {
      window.alert('Please enter valid email address!');
    }
  }

  // Handle admin button
  handleAdminRights() {
    const username = firebase.auth().currentUser;
    this.http.get('getUserDetails').subscribe(wish => {
      this.userDetails = wish;
      console.log(this.userDetails);
    });
  }

  signUp(registerForm) {
    if (this.authService.validateEmail(registerForm.email)) {
      this.authService.doRegister(registerForm)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created and verification email has been sent.';
        window.alert('Your account has been created and verification email has been sent.');
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
    } else {
      window.alert('Please enter a valid email!');
    }
  }

  ngOnInit() {
    this.handleAdminRights();
  }

}
