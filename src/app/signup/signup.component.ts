import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../core/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  successMessage: String = 'Test';
  errorMessage: String = 'Test';

  registerForm: FormGroup;
  // email: FormControlName;
  // password: FormControlName;

  constructor(public authService: AuthService) {
    this.registerForm = new FormGroup({ email: new FormControl(), password: new FormControl() });
   }

  tryRegister(registerForm) {
    this.authService.doRegister(registerForm)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created';
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = '';
    });
    console.log(registerForm);
  }

  ngOnInit() {
  }

}
