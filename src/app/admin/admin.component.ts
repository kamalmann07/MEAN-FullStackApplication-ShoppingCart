import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductDataService } from '../product-data.service';
import { ItemDetails, AdminRights } from '../itemDetails.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItems: FormGroup;
  title: String;
  itemDetails: any;
  userList: any;

  constructor(authService: AuthService, db: AngularFireDatabase, private pds: ProductDataService) {
    this.addItems = new FormGroup({ itemname: new FormControl(), imageLoaction: new FormControl(), price: new FormControl(),
      Inventory: new FormControl() });
      this.title = 'authService.getCurrentUser()';

    // Get User Details
    // const user = db.list('Admin');
    // user.valueChanges().subscribe(
    //   users => {
    //     this.userList = users;
    //   }
    // );
   }

  ngOnInit() {
    // Get Items Data
    const itemList = this.pds.getItemsData();
    itemList.snapshotChanges().subscribe(
      items => {
        items = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
        this.itemDetails = [];
        items.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.itemDetails.push(y as ItemDetails);
        }
        );
      }
    );

    const admin = this.pds.getAdminDetails();
    admin.snapshotChanges().subscribe(
      users => {
        this.userList = [];
        users.forEach(element => {
          const z = element.payload.toJSON();
          z['$key'] = element.key;
          this.userList.push(z as AdminRights);
        }
        );
      }
    );
  }

}
