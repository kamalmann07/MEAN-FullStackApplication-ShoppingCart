import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService} from '../core/auth.service';

@Component({
  selector: 'app-user-authenticated',
  templateUrl: './user-authenticated.component.html',
  styleUrls: ['./user-authenticated.component.css']
})
export class UserAuthenticatedComponent implements OnInit {
  user: any;
  title: String;
  itemDetails: any;

  constructor(db: AngularFireDatabase, public authService: AuthService) {
    const x = db.list('itemDetails');
    x.valueChanges().subscribe(
      items => {
        this.itemDetails = items;
        console.log(this.itemDetails);
      }
    );

    this.user = authService.getCurrentUser();
    this.title = this.user;
   }

  ngOnInit() {
  }

}
