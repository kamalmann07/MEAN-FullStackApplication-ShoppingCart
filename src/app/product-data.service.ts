import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  itemDetails: any;

  constructor(db: AngularFireDatabase) {
   }

   getData(db: AngularFireDatabase): any {
    const x = db.list('itemDetails');
    x.valueChanges().subscribe(
      items => {
        this.itemDetails = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
        console.log(this.itemDetails);
      }
    );
    return this.itemDetails;
   }
}
