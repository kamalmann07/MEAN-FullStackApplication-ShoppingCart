import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-authenticated',
  templateUrl: './user-authenticated.component.html',
  styleUrls: ['./user-authenticated.component.css']
})
export class UserAuthenticatedComponent implements OnInit {
  user: String;
  constructor() {
    this.user = 'Kamaljeet';
  }

  ngOnInit() {
  }

}
