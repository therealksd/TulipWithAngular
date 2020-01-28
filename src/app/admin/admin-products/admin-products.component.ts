import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  {
  listProducts$

  constructor(productService:ProductService) { 
  this.listProducts$=productService.getAll().snapshotChanges()
   }






  }



