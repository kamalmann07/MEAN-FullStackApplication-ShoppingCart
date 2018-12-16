import { Component, OnInit, Input } from '@angular/core';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.component.html',
  styleUrls: ['./item-detail-page.component.css']
})
export class ItemDetailPageComponent implements OnInit {
   @Input()  item: ItemDetails;
   selectedProduct: any;
   userName: String;
   userComment: String;
   comments: any;
   userRating: Number;
   wishlistVisibility: String;
   wishlist: any;
  //  public wishlist: Array<{name: string, visibility: String, user: String, group: String}> = [];

  //  selectedItem: any = ItemDetails;
  constructor(private router: Router, private http: HttpClient, private auth: AuthService) {
    this.userName = auth.getCurrentUser();
  }

  addComment() {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.post('http://localhost:8080/addUserComment', {name: itemName, comment: this.userComment, user: this.userName }).subscribe(
      res => {
        console.log(res);
        this.getUserComments();
      },
      err => {
        console.log('Error occured');
      }
    );
  }


  rateProduct() {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    // console.log('Rating updated is ' , this.userRating);
    this.http.put('http://localhost:8080/updateRating', {name: itemName, rating: this.userRating}).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
  }

  // Get User Comments
  getUserComments() {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.get('http://localhost:8080/getUserComments').subscribe(comment => {
      this.comments = comment;
      const filtered = this.comments.filter(function(item) {
        return item.name === itemName;
      });
      this.comments = filtered;
    });
  }

  // Populate wishlist
  wishlistItem(item) {
    // this.wishlist.push({name: item.name, visibility: '', user: this.userName, group: 'Test'});
    this.http.post('http://localhost:8080/addWishlistItems', {name: item.name, visibility: this.wishlistVisibility,
    user: this.userName, group: 'Default' }).subscribe(
      res => {
        console.log(res);
        this.getWishlistDetails();
      },
      err => {
        console.log('Error occured');
      }
    );
  }

  removeFromWishList(item) {
    this.http.request('delete', 'http://localhost:8080/deleteFromWishlist', {body: {name: item.name,
    user: this.userName} }).subscribe();
    // this.getWishlistDetails();
  }

  getWishlistDetails() {
    const username = this.auth.getCurrentUser();
    console.log(username + ' is');
    this.http.get('http://localhost:8080/getWishlistDetails').subscribe(wish => {
      this.wishlist = wish;
      const filtered = this.wishlist.filter(function(item) {
        return item.user === username;
      });
      this.wishlist = filtered;
      // console.log(this.wishlist);
    });
  }

  ngOnInit() {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.selectedProduct = items;
      const filtered = this.selectedProduct.filter(function(item) {
        return item.name === itemName;
      });
      this.selectedProduct = filtered;
      // console.log(this.selectedProduct);
    });

    this.getUserComments();
    this.getWishlistDetails();
  }

}
