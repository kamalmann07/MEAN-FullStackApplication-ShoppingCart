import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';
import { element } from 'protractor';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
  providers: [ProductDataService]
})
export class DefaultPageComponent implements OnInit {
  title = 'Default Page';
  itemDetails: any;
  test: any;
  itemList: AngularFireList<any>;
  wishlist: any;

  constructor(private pds: ProductDataService, private http: HttpClient) {
   }

   sortData() {
    this.itemDetails.sort((a, b) => (a as any).inventory - (b as any).inventory).reverse();
   }

   getWishlistDetails() {
    this.http.get('http://localhost:8080/getWishlistDetails').subscribe(wish => {
      this.wishlist = wish;
      const filtered = this.wishlist.filter(function(item) {
        return item.visibility === 'Public';
      });
      this.wishlist = filtered;
      this.wishlist.sort((a, b) => (a as any).user - (b as any).user).reverse();
    });
  }

  ngOnInit() {
    // Get Data from mongo
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
      const filtered = this.itemDetails.filter(function(item) {
        return item.inventory > 0;
      });
    this.itemDetails = filtered;
    this.itemDetails.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
  });

  this.getWishlistDetails();
  }

}
