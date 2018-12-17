import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  successMessage: String;
  errorMessage: String;

  registerForm: FormGroup;

  constructor(public authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({ email: new FormControl(), password: new FormControl() });
   }

  tryRegister(registerForm) {
    if (this.authService.validateEmail(registerForm.email)) {
    this.authService.doRegister(registerForm)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created and verification email has been sent.';
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
  }

}
