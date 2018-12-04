import { Component, OnInit } from '@angular/core';
import { ProductDataService } from './product-data.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataSource } from '@angular/cdk/table';
import { ItemDetails } from '../itemDetails.model';


@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
  providers: [ProductDataService]
})
export class DefaultPageComponent implements OnInit {
  title = 'Default Page';
  itemDetails: any;
  columnsToDisplay = ['userName', 'age'];
  selectedItem: ItemDetails = new ItemDetails();

  constructor(db: AngularFireDatabase) {
    const x = db.list('itemDetails');
    x.valueChanges().subscribe(
      items => {
        this.itemDetails = items;
        console.log(this.itemDetails);
      }
    );
   }

  ngOnInit() {
  }

  getItemDetail(item: ItemDetails) {
    console.log(item);
    this.selectedItem = item;
  }

}
