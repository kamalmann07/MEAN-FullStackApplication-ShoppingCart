import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { ItemDetails } from '../itemDetails.model';
import { ProductDataService } from '../product-data.service';
import { element } from 'protractor';


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

  constructor(private pds: ProductDataService) {
   }


  ngOnInit() {
    const itemList = this.pds.getItemsData();
    itemList.snapshotChanges().subscribe(
      items => {
        items = items.sort((a, b) => (a as any).rating - (b as any).rating).reverse();
        this.itemDetails = [];
        items.forEach(element => {
          const y = element.payload.toJSON();
          y['$key'] = element.key;
          this.itemDetails.push(y as ItemDetails);
          console.log('testdata is  ' + this.itemDetails);
        }
        );
      }
    );
  }

  // getItemDetail(item: ItemDetails) {
  //   console.log(item);
  //   this.selectedItem = item;
  // }

}
