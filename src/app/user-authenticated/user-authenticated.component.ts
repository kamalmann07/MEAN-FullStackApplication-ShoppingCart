import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService} from '../core/auth.service';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';
import { HttpClient } from '@angular/common/http';

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
  public rows: Array<{name: string, price: number, qty: number, tax: number, inventory: number}> = [];
  qtyToPurchase: number;

  // get item details from firebase
  constructor(private authService: AuthService, private pds: ProductDataService, private http: HttpClient) {
    // get logged user
    this.user = authService.getCurrentUser();
    this.title = this.user;
   }

  // Add Data into Cart
  addToCart(item) {
    const subTotal: number = item.price * 1.13 * this.qtyToPurchase;
    if (this.qtyToPurchase <= item.inventory) {
    this.rows.push({ name: item.name.toString(), price: item.price * this.qtyToPurchase,
      qty: this.qtyToPurchase, tax: subTotal, inventory: item.inventory});
    } else {
      console.log('Invalid Quantity Selected');
    }
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
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
    });
  }

}
