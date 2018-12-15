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

  // get item details from firebase
  constructor(private authService: AuthService, private pds: ProductDataService, private http: HttpClient, private router: Router) {
    // get logged user
    this.user = authService.getCurrentUser();
    this.title = this.user;

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
    const subTotal: number = item.price * 1.13 * this.qtyToPurchase;
    if (this.qtyToPurchase <= item.inventory) {
    this.rows.push({ name: item.name.toString(), price: item.price * this.qtyToPurchase,
      qty: this.qtyToPurchase, tax: subTotal, inventory: item.inventory, itemSold: item.itemsSold});
    } else {
      console.log('Invalid Quantity Selected');
    }

    // Add Html to Shopping Cart
    const table: HTMLTableElement = <HTMLTableElement> document.getElementById('shopingCart');
    // if (table.rows.length === 0) {
    const row = table.insertRow(table.rows.length);
    // const cell1 = row.insertCell(0);
    // const cell2 = row.insertCell(1);
    // cell1.innerHTML = '<button class="btnToCart" (click)="buy()">Buy</button> ';
    // cell2.innerHTML = '<button class="btnToCart" (click)="clearCart()">Clear</button> ';
    // }
  }

  // Increment Item Number
  increment(selected) {

    if (selected.inventory >= selected.qty + 1) {
      selected.price = (selected.price / selected.qty) * (selected.qty + 1);
      selected.tax = selected.price * .13;
      selected.qty = selected.qty + 1;
    } else {
      console.log('Invalid Quantity Selected');
    }
  }

  buy() {
    const table: HTMLTableElement = <HTMLTableElement> document.getElementById('shopingCart');
    for ( let i = 0 ; i < table.rows.length; i++) {
      const updatedInv: number = parseInt(table.rows[i].cells[6].innerHTML.toString(), 10) - parseInt(table.rows[i].cells[2].innerHTML, 10);
      const updatedSoldCount: number = parseInt(table.rows[i].cells[7].innerHTML.toString(), 10) +
      parseInt(table.rows[i].cells[2].innerHTML, 10);
      this.http.put('http://localhost:8080/order',
      {name: table.rows[i].cells[0].innerHTML, inventory: updatedInv, itemsSold: updatedSoldCount }).subscribe(
        res => {
          console.log(res);
          if (i = table.rows.length - 1) {
            this.clearCart();
            this.getItemDetails();
          }
        },
        err => {
          console.log('Error occured');
        }
      );
    }
  }

  clearCart() {

    while ( this.rows.length > 0) {
      this.rows.splice( 0, 1 );
    }
  }

  sortData() {
    this.itemDetails.sort((a, b) => (a as any).inventory - (b as any).inventory).reverse();
   }

  // Decrement Item Count
  removeItem(selected) {
    if (selected.qty === 1) {
      console.log('Cannot increment value from cart');
    } else {
      selected.price = (selected.price / selected.qty) * (selected.qty - 1);
      selected.tax = selected.price * .13;
      selected.qty = selected.qty - 1;
    }
  }

  getItemDetails() {
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
      const filtered = this.itemDetails.filter(function(item) {
        return item.inventory > 0;
      });
      this.itemDetails = filtered;
      this.itemDetails.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
    });
  }

  ngOnInit() {
    // const itemList = this.pds.getItemsData();
    // itemList.snapshotChanges().subscribe(
    //   items => {
    //     items = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
    //     this.itemDetails = [];
    //     items.forEach(element => {
    //       const y = element.payload.toJSON();
    //       y['$key'] = element.key;
    //       this.itemDetails.push(y as ItemDetails);
    //       console.log('testdata is  ' + this.itemDetails);
    //     }
    //     );
    //   }
    // );

    // Data From Mongo DB
    this.getItemDetails();
  }

}
