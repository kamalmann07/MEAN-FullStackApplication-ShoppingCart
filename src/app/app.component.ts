import { Component, Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSort, MatSortable, MatTableDataSource} from '@angular/material';


@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Punjabi Shopping';
  authorName: String;
  itemDetails: any;
  display = ['ItemName', 'Image', 'Rating'];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
      // console.log(this.itemDetails);
  });
  }


  // onClickAddAuthor() {
  //   this.http.post('http://localhost:8080/add', {name: this.authorName}).subscribe(
  //     res => {
  //       this.refreshAuthors();
  //       console.log(res);
  //     },
  //     err => {
  //       console.log('Error occured');
  //     }
  //   );
  //   console.log(this.authorName + 'Added to DB');
  //   }

    refreshAuthors() {
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
    });
  }

}



