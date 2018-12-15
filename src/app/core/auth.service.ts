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
  verMail;
  admins: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {

   }

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

    // return new Promise<any>((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((user) => {
        const userName = firebase.auth().currentUser;


        // const x = this.db.list('Admin');
        // x.valueChanges().subscribe(
        //   admin => {
        //     this.admins = JSON.stringify(admin);
        //     console.log(this.admins);
        //   });


        //   for (let i = 0; i < JSON.parse(this.admins).length; i++) {
        //     if (JSON.parse(this.admins)[i].username === userName) {
        //       console.log('Admin Found ' + JSON.parse(this.admins)[i].username);
        //     }
        //   }

        if (userName.emailVerified) {
            this.router.navigate(['/authenticatedUser']);
            return Promise.resolve({verMail : 'Authenticated'});
        } else {
          this.verMail = 'Please verify your email.';
          // return Promise.resolve({verMail : 'Please verify your email.'});
        }
      })
      .catch(error => {
        console.log('Invalid Credientials. Please try again.' + error);
      });
    // });
  }

  signInAsAdmin(loginForm) {

    //  Login Information
    firebase.auth().signInWithEmailAndPassword(loginForm.email, loginForm.password)
      .then((user) => {
        const userName = firebase.auth().currentUser.uid;
      })
      .catch(error => {
        console.log('Invalid Credientials. Please try again.');
        // throw error;
      });
  }

  getCurrentUser(): any {
    const userName = firebase.auth().currentUser;
    return userName.uid;
  }

  deactivateUser() {
  }

  getVerMailStatus(): String {
    console.log('Verification status retured by method is ' + this.verMail);
    return this.verMail;
  }

}
