import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseAuth } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  doRegister(registerForm) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(registerForm.email, registerForm.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      this.emailsent = 'verification email has now been sent to ' + 'emailaddress';
      console.log('sending email to ' + this.user);
}, function(error) {
  console.log('Error while sending email');
});
  }

  signInRegular(loginForm) {
    firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password)
    .then((user) => {
      // this.authState = user
      console.log('User Logged in Successfully');
      this.router.navigate(['/authenticatedUser']);
    })
    .catch(error => {
      console.log('Inaalid Credientials. Please try again.');
      // throw error;
    });
 }

}
