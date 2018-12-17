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

  constructor(private router: Router, private http: HttpClient, private auth: AuthService, private pds: ProductDataService) {
    this.userName = auth.getCurrentUser();
    if (pds.validateInputs(' ')) {
      window.alert('Invalid Out');
    }
  }

  // Create Comments
  addComment() {
    if (this.userComment.toString() === ' ') {
      window.alert('Please type valid value');
    } else {
      if (this.pds.validateInputs(this.userComment)) {
        window.alert('Please input valid data format');
      } else {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.post('addUserComment', {name: itemName, comment: this.userComment, user: this.userName }).subscribe(
      res => {
        console.log(res);
        this.getUserComments();
        window.alert('Comment updated for ' + itemName);
      },
      err => {
        console.log('Error occured');
      }
    );
    }
    }
  }

// Rate Products
  rateProduct() {
    if (!this.pds.validateInputNumber(this.userRating)) {
      window.alert('Please type valid value');
    } else {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.put('updateRating', {name: itemName, rating: this.userRating}).subscribe(
        res => {
          console.log(res);
          window.alert('Rating updated for ' + itemName);
        },
        err => {
          console.log('Error occured');
        }
      );
      }
  }

  // Get User Comments
  getUserComments() {
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.get('getUserComments').subscribe(comment => {
      this.comments = comment;
      const filtered = this.comments.filter(function(item) {
        return item.name === itemName;
      });
      this.comments = filtered;
    });
  }

  // Populate wishlist
  wishlistItem(item) {
    this.http.post('addWishlistItems', {name: item.name, visibility: this.wishlistVisibility,
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

  // Remove an item from wishlist
  removeFromWishList(itm) {
    const username = this.auth.getCurrentUser();
    this.http.request('delete', 'deleteFromWishlist', {body: {name: itm.name,
    user: username} }).subscribe();
    this.getWishlistDetails();
    window.alert('Item Removed from wishlist');
  }

  // Get wishlist data
  getWishlistDetails() {
    const username = this.auth.getCurrentUser();
    this.http.get('getWishlistDetails').subscribe(wish => {
      this.wishlist = wish;
      const filtered = this.wishlist.filter(function(item) {
        return item.user === username;
      });
      this.wishlist = filtered;
    });
  }

  ngOnInit() {
    // Filter data for selected item
    const itemName = this.router.parseUrl(this.router.url).queryParamMap.get('name');
    this.http.get('Items').subscribe(items => {
      this.selectedProduct = items;
      const filtered = this.selectedProduct.filter(function(item) {
        return item.name === itemName;
      });
      this.selectedProduct = filtered;
    });

    this.getUserComments();
    this.getWishlistDetails();
  }

}
