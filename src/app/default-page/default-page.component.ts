import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';


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
  // selectedItem: ItemDetails = new ItemDetails();

  constructor(db: AngularFireDatabase, pds: ProductDataService) {
    const x = db.list('itemDetails');
    x.valueChanges().subscribe(
      items => {
        this.itemDetails = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
      }
    );
   }

  ngOnInit() {
  }

  // getItemDetail(item: ItemDetails) {
  //   console.log(item);
  //   this.selectedItem = item;
  // }

}
