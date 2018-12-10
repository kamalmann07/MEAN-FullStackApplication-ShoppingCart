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
  public rows: Array<{name: string, price: number, qty: number}> = [];

  // get item details from firebase
  constructor(private authService: AuthService, private pds: ProductDataService, private http: HttpClient) {
    // get logged user
    this.user = authService.getCurrentUser();
    this.title = this.user;
   }

   getItemDetail(item: ItemDetails) {
    this.selectedItem = item;
    // this.rows.push( {name: this.selectedItem.name.toString(), price: parseFloat(this.selectedItem.price.toString()), qty:
    //   parseFloat(this.selectedItem.inventory.toString()) } );
    console.log('Selected item data is ', this.selectedItem.name);
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
