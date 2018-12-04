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
  verMail: String;

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  doRegister(registerForm) {
    // Create User Sign up
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(registerForm.email, registerForm.password)
      .then(res => {
        // For Sending Verification Email
        firebase.auth().signInWithEmailAndPassword(registerForm.email, registerForm.password)
        .then((user) => {
          // this.authState = user
          const userName = firebase.auth().currentUser;
          userName.sendEmailVerification();
          console.log('Verification Email Sent to user ' + userName.uid);
        })
        .catch(error => {
          console.log('Error WHile Sending Verification Email. Please try again.');
        });
      }, err => reject(err));
    });
  }

  signInRegular(loginForm) {
    firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password)
    .then((user) => {
      // this.authState = user
      const userName = firebase.auth().currentUser;
      if (userName.emailVerified) {
      this.router.navigate(['/authenticatedUser']);
      } else {
      console.log('Please verify your email.');
      this.verMail = 'Please verify your email to login.';
      }
    })
    .catch(error => {
      console.log('Inaalid Credientials. Please try again.');
      // throw error;
    });
 }

 getCurrentUser(): any {
  const userName = firebase.auth().currentUser;
  return userName.uid;
 }

 getVerMailStatus(): any {
    return this.verMail;
 }

}
