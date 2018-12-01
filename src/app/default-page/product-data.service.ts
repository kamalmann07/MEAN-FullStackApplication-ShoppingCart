import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  itemDetails: any;
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/Items').subscribe(items => {
      this.itemDetails = items;
  });
   }
}
