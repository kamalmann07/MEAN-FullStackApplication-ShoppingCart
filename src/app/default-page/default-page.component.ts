import { Component, OnInit } from '@angular/core';
import { ProductDataService } from './product-data.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
  providers: [ProductDataService]
})
export class DefaultPageComponent implements OnInit {
  title = 'Default Page';
  itemDetails: any;

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

}
