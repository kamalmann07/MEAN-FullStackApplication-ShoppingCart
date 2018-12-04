import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupName, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addItems: FormGroup;

  constructor() {
    this.addItems = new FormGroup({ itemname: new FormControl(), imageLoaction: new FormControl(), price: new FormControl(),
      Inventory: new FormControl() });
   }

  ngOnInit() {
  }

}
