import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  itemDetails: AngularFireList<any>;
  admin: AngularFireList<any>;
  itemList: any;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
   }

  //  Validate Input
   validateInputs(str) {
      const reg = /<(.|\n)*?>/g;
      return reg.test(str);
   }

  //  Validate number
   validateInputNumber(str) {
    const reg = /[0-9]|\./;
    return reg.test(str);
 }

   getItemsData(): any {
    this.itemDetails = this.db.list('itemDetails');
    return this.itemDetails;
   }

   getAdminDetails(): any {
    this.admin = this.db.list('Admin');
    return this.admin;
   }

   getItemDetails(): any {
    this.http.get('/Items').subscribe(items => {
      this.itemList = items;
      return this.itemList;
  });
   }
}
