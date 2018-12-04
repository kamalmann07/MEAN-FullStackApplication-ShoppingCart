import { Component, OnInit, Input } from '@angular/core';
import { ItemDetails } from '../itemDetails.model';

@Component({
  selector: 'app-item-detail-page',
  templateUrl: './item-detail-page.component.html',
  styleUrls: ['./item-detail-page.component.css']
})
export class ItemDetailPageComponent implements OnInit {
   @Input()  item: ItemDetails;

  constructor() {
    console.log(this.item);
  }

  ngOnInit() {
  }

}
