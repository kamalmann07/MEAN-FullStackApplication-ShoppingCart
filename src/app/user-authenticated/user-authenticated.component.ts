import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService} from '../core/auth.service';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-authenticated',
  templateUrl: './user-authenticated.component.html',
  styleUrls: ['./user-authenticated.component.css']
})
export class UserAuthenticatedComponent implements OnInit {

  user: any;
  title: String;
  itemDetails: any;
  selectedItem: ItemDetails = new ItemDetails();
  public rows: Array<{name: string, price: number, qty: number, tax: number, inventory: number, itemSold: number}> = [];
  qtyToPurchase: number;
  selectedProduct: any;
  AdminText: String = '';
  userDetails: any;
  tax: Number = 0.10;
  subTotal: Number;

  // get item details from firebase
  constructor(private authService: AuthService, private pds: ProductDataService, private http: HttpClient, private router: Router) {
    // get logged user
    this.user = authService.getCurrentUser();
    this.title = this.user;
    this.subTotal = 0;
   }

  //  Route to Item Details
   itemPage(item) {
     this.selectedProduct = item;
    this.router.navigate(['/itemDetail'], {queryParams: {name: item.name}});
   }

  //  Return Seleted Item
   returnSelectedProduct(): any {
     return this.selectedProduct;
   }


  // Add Data into Cart
  addToCart(item) {
    if ( !this.pds.validateInputNumber(this.qtyToPurchase) ) {
      window.alert('Please select a number');
    } else {
    const subTotal: number = item.price * parseFloat(this.tax.toString()) * this.qtyToPurchase;
    if (this.qtyToPurchase <= item.inventory) {
    this.rows.push({ name: item.name.toString(), price: item.price * this.qtyToPurchase,
      qty: this.qtyToPurchase, tax: subTotal, inventory: item.inventory, itemSold: item.itemsSold});
      this.calculateTotal();
    } else {
      window.alert('Please select valid inventory');
    }
  }

    // Add Html to Shopping Cart
    const table: HTMLTableElement = <HTMLTableElement> document.getElementById('shopingCart');
    const row = table.insertRow(table.rows.length);
  }

  // Calculate Cart Details Before Buying
  checkDetails() {
    let str: String = '';
    for (let i = 0; i < this.rows.length; i++) {
      str += '\t• ' + this.rows[i].name + '\n';
    }
    window.alert('Following are items to be purchased \n\n'
    + str);
  }

  // Increment Item Number in Cart
  increment(selected) {

    if (selected.inventory >= selected.qty + 1) {
      selected.price = (selected.price / selected.qty) * (selected.qty + 1);
      selected.tax = selected.price * parseFloat(this.tax.toString());
      selected.qty = selected.qty + 1;
      this.calculateTotal();
    } else {
      window.alert('Insufficient inventory');
    }
  }

  // Place Order
  buy() {
    const table: HTMLTableElement = <HTMLTableElement> document.getElementById('shopingCart');
    for ( let i = 0 ; i < table.rows.length; i++) {
      const updatedInv: number = parseInt(table.rows[i].cells[6].innerHTML.toString(), 10) - parseInt(table.rows[i].cells[2].innerHTML, 10);
      const updatedSoldCount: number = parseInt(table.rows[i].cells[7].innerHTML.toString(), 10) +
      parseInt(table.rows[i].cells[2].innerHTML, 10);
      this.http.put('order',
      {name: table.rows[i].cells[0].innerHTML, inventory: updatedInv, itemsSold: updatedSoldCount }).subscribe(
        res => {
          console.log(res);
          if (i = table.rows.length - 1) {
            this.clearCart();
            this.getItemDetails();
            window.alert('Congratulations...Order Placed Successfully');
          }
        },
        err => {
          console.log('Error occured');
        }
      );
    }

  }

  // Total Amount calculation
  calculateTotal() {
    this.subTotal = 0;
    for (let i = 0; i < this.rows.length; i++) {
      this.subTotal = this.rows[i].price + this.rows[i].tax + parseFloat(this.subTotal.toString());
    }
  }

  // Clear cart
  clearCart() {

    while ( this.rows.length > 0) {
      this.rows.splice( 0, 1 );
    }
  }

  // Sort Data
  sortData() {
    this.itemDetails.sort((a, b) => (a as any).itemsSold - (b as any).itemsSold).reverse();
   }

  // Decrement Item Count in Cart
  removeItem(selected) {
    if (selected.qty === 1) {
      window.alert('Cannot decrement from 1 quantity');
    } else {
      selected.price = (selected.price / selected.qty) * (selected.qty - 1);
      selected.tax = selected.price * parseFloat(this.tax.toString());
      selected.qty = selected.qty - 1;
      this.calculateTotal();
    }
  }

  // Item Details
  getItemDetails() {
    this.http.get('Items').subscribe(items => {
      this.itemDetails = items;
      const filtered = this.itemDetails.filter(function(item) {
        return item.inventory > 0;
      });
      this.itemDetails = filtered;
      this.itemDetails.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
    });
  }

  // Handle admin button
  handleAdminRights() {
    this.http.get('getUserDetails').subscribe(items => {
      this.userDetails = items;
      for (let i = 0; i < this.userDetails.length; i++) {
        if (this.userDetails[i].userName === this.user && this.userDetails[i].isAdmin === 'Y') {
          const element = <HTMLInputElement> document.getElementById('btnAdmin');
          element.disabled = false;
          this.AdminText = 'Admin';
        }
      }
    });
  }

  // Delete Items from cart
  deleteItemFromCart(item) {
    console.log(item);

    const filtered = this.rows.filter(function(list) {
      return list.name !== item.name;
    });
    this.rows = filtered;
    // console.log(this.rows);
    this.calculateTotal();
  }

  ngOnInit() {
    const element = <HTMLInputElement> document.getElementById('btnAdmin');
    element.disabled = true;
    this.AdminText = 'No Admin Rights';

    // Data From Mongo DB
    this.getItemDetails();

    // Validate data
    this.handleAdminRights();
  }

}
