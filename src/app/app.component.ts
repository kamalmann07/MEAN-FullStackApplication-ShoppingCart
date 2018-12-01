import { Component, Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Punjabi Shopping Test';
  authorName: String;
  itemDetails: any;
  display = ['ItemName', 'Image', 'Rating'];

  constructor() {}
}



