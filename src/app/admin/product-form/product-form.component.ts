import { Component, OnInit, OnDestroy} from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take} from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnDestroy{
  categories:any[];
  cat:any={}
  product:any={}
  id
  subscription:Subscription
  constructor(private categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private activateRoute:ActivatedRoute) 
    {}
   ngOnInit()
   {
    this.subscription=this.categoryService.getCategories()
    .subscribe(list=>{
      this.categories=list
    })

     this.id=(this.activateRoute.snapshot.paramMap.get('id'))

     this.productService.getOneProduct(this.id).pipe(take(1)).subscribe(
      prod=>{
        this.product=prod.payload.val()
        console.log(this.product)
      }
    )
   }
   ngOnDestroy()
   {
     this.subscription.unsubscribe()
   }
   createProduct(form){
     if(this.id) this.productService.updateProduct(this.id).update(this.product)
     else this.productService.createProduct(form.value)      

     this.router.navigate(['/admin/products'])
   }
   onDelete(){
     if(!confirm('Do you really want to delete')) return

     console.log(this.id)
     this.productService.deleteProduct(this.id)
     this.router.navigate(['/admin/products'])
   }

}

