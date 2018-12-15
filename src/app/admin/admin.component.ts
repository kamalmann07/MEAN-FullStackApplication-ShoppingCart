import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductDataService } from '../product-data.service';
import { ItemDetails, AdminRights } from '../itemDetails.model';
import { HttpClient } from '@angular/common/http';

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
  delItem: String = 'TYY';

  constructor(private authService: AuthService, private pds: ProductDataService, private http: HttpClient) {
    this.addItems = new FormGroup({ itemname: new FormControl(), imageLoaction: new FormControl(), price: new FormControl(),
      Inventory: new FormControl() });
      this.title = 'authService.getCurrentUser()';
   }

   addItem(addItems) {
    this.http.post('http://localhost:8080/add', {name: addItems.itemname, imageLocation: addItems.imageLoaction,
    price: addItems.price, inventory: addItems.Inventory, rating : 0, itemsSold: 0 }).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('Error occured');
      }
    );
    }

    updateItem(item) {
      this.http.put('http://localhost:8080/update', {name: item.name, price: item.price, inventory: item.inventory }).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
      }

      onClick(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const idAttr = target.attributes.id;
        const value = idAttr.nodeValue;
        console.log('The captured value is ' + target);
      }

      // deleteItem() {
      //   this.http.delete('http://localhost:8080/delete', { name: this.delItem }).subscribe(
      //     res => {
      //       console.log(res);
      //     },
      //     err => {
      //       console.log('Error occured');
      //     }
      //   );
      // }

  ngOnInit() {
    // Get Items Data
    // const itemList = this.pds.getItemsData();
    // itemList.snapshotChanges().subscribe(
    //   items => {
    //     items = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
    //     this.itemDetails = [];
    //     items.forEach(element => {
    //       const y = element.payload.toJSON();
    //       y['$key'] = element.key;
    //       this.itemDetails.push(y as ItemDetails);
    //     }
    //     );
    //   }
    // );

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


        // Data From Mongo DB
        this.http.get('http://localhost:8080/Items').subscribe(items => {
          this.itemDetails = items;
        });
  }

}
