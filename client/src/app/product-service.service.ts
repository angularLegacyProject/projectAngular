import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  constructor(private http: HttpClient) {}
  getProduct(id: string) {
    this.http
      .get(
        `
    http://localhost:5000/product/${id}`
      )
      .subscribe((result: any) => {
        return result.find((p :any)=> p.id == id);
      });
  }
}
