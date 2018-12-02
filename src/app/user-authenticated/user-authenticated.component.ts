import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-user-authenticated',
  templateUrl: './user-authenticated.component.html',
  styleUrls: ['./user-authenticated.component.css']
})
export class UserAuthenticatedComponent implements OnInit {
  user: String;
  title = 'Authenticated User';
  itemDetails: any;

  constructor(db: AngularFireDatabase) {
    const x = db.list('itemDetails');
    x.valueChanges().subscribe(
      items => {
        this.itemDetails = items;
        console.log(this.itemDetails);
      }
    );
   }

  ngOnInit() {
  }

}
