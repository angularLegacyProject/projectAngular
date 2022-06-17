import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute } from '@angular/router';
import { Query } from '@angular/core';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  public dataarray: any;
  public filterd:any;
  
  constructor(private http: HttpClient,private productService:ProductServiceService,private ac:ActivatedRoute) {
  }
  
  ngOnInit() {
    this.http.get('http://localhost:5000/product').subscribe((result) => {
      this.dataarray = result;
      console.log(this.dataarray);
      this.filterd=this.dataarray
    }) 
  }

  //SEARCH A SPECIFIC QUERY
  filterQ(query: string){
    this.filterd = (query) ?
      this.dataarray.filter((f:any) => {
        console.log(query)
        return f.productName.toLowerCase().includes(query.toLowerCase())
      }): 
      this.dataarray;
    
  }
}
