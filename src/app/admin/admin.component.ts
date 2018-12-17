import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ProductDataService } from '../product-data.service';
import { ItemDetails, AdminRights } from '../itemDetails.model';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod, RequestOptionsArgs} from '@angular/http';

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
      this.title = authService.getCurrentUser();
   }

  //  Add items in Inventory
   addItem(addItems) {
    this.http.post('add', {name: addItems.itemname, imageLocation: addItems.imageLoaction,
    price: addItems.price, inventory: addItems.Inventory, rating : 0, itemsSold: 0 }).subscribe(
      res => {
        console.log(res);
        window.alert(addItems.itemname + ' is added successfully!');
        this.getItemDetails();
      },
      err => {
        console.log('Error occured');
      }
    );
    }

    // Update Inventory
    updateItem(item) {
      this.http.put('update', {name: item.name, price: item.price, inventory: item.inventory }).subscribe(
        res => {
          console.log(res);
          window.alert(item.name + ' is updated successfully!');
          this.getItemDetails();
        },
        err => {
          console.log('Error occured');
        }
      );
      }

      // Manage Admin Rights
    assignAdminRights(user) {
      const admin = this.authService.getCurrentUser();
      if ( admin === '79ttUG57Z2XtoiNgw1QGprKXgJp1' ) {
        this.http.put('updateUserDetails', {userName: user.userName, isAdmin: 'Y',
        isActive: 'Y'}).subscribe(
          res => {
            console.log(res);
            window.alert(user.userName + ' is assigned Admin Rights successfully!');
          },
          err => {
            console.log('Error occured');
          }
        );
        } else {
          window.alert('Error - Only Manager can grant the admin rights.');
        }
      }

      // Manage Users
      deactivateAccount(user) {
        const admin = this.authService.getCurrentUser();
      if ( admin === '79ttUG57Z2XtoiNgw1QGprKXgJp1' ) {
          this.http.put('updateUserDetails', {userName: user.userName, isAdmin: 'N',
          isActive: 'N'}).subscribe(
            res => {
              console.log(res);
              window.alert(user.userName + ' is deactivated successfully!');
            },
            err => {
              console.log('Error occured');
            }
          );
        } else {
          window.alert('Error - Only Manager can deactivate an account.');
        }
          }

      onClick(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const idAttr = target.attributes.id;
        const value = idAttr.nodeValue;
        console.log('The captured value is ' + target);
      }

      // Delete item
      deleteItem(item) {
        this.http.request('delete', 'delete', {body: {name: item.name} }).subscribe();
        this.getItemDetails();
      }

  getItemDetails() {
    // Data From Mongo DB
    this.http.get('Items').subscribe(items => {
      this.itemDetails = items;
    });
  }

  ngOnInit() {

    this.http.get('getUserDetails').subscribe(users => {
          this.userList = users;
        });

        this.getItemDetails();
  }

}
