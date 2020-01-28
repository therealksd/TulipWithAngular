import { Component, OnInit, OnDestroy} from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { CategoryService } from 'src/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { take, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  listOfProd:any[]=[]
  categories:any[]
  filteredCategories:any[]=[]
  listOfShoppingProds:any[]
  category:string
  quantity:number
  s1:Subscription;s2:Subscription;s3:Subscription;s4:Subscription
  constructor(
    private productService:ProductService,
    private catService:CategoryService,
    route:ActivatedRoute,
    private router:Router,
    private shopService:ShoppingCartService)
     { 
      
        this.s4=route.queryParamMap.subscribe(query=>
          {
            this.category=query.get('category')
            this.filteredCategories=[]
            if(this.category===null)
            {
              this.filteredCategories=this.listOfProd
            }
            else{
              this.productService.getAll().snapshotChanges()
              .subscribe(_=>{
                for(var i=0;i<_.length;i++)
                {
                  if(_[i].payload.val()['category']===this.category) 
                  {
                    this.filteredCategories.push(
                      {
                        key:_[i].key,
                        name:_[i].payload.val()['title'],
                        imageurl:_[i].payload.val()['imageUrl'],
                        price:_[i].payload.val()['price']
                      })
                  }
                }
              })
            }
        })
       
        
     }
     product:string
  ngOnInit() {
    this.s1=this.productService.getAll().snapshotChanges().subscribe(_=>{
      for(var i=0;i<_.length;i++)
          {
            this.listOfProd.push(
              {
                key:_[i].key,
                name:_[i].payload.val()['title'],
                imageurl:_[i].payload.val()['imageUrl'],
                price:_[i].payload.val()['price']
              })
          }
          this.filteredCategories=this.listOfProd
    })

    this.s2=this.catService.getCategories().pipe(take(1)).subscribe(list=>{
      this.categories=list 
    })
    this.s3=this.shopService.getList().subscribe(_=>{
      this.listOfShoppingProds=_
    })
  }
  ngOnDestroy(){
this.s1.unsubscribe()
this.s2.unsubscribe()
this.s3.unsubscribe()
this.s4.unsubscribe()
  }

  flag:boolean=true
  
  addToCart(product){
    this.shopService.addToCart(product) 
    this.product=product.key 
    this.flag=!this.flag
    this.router.navigate([['/']])
    //console.log('result is'+this.getquantity(product.key))
  
  }
  updateCart(pKey,value)
  {
    this.shopService.updateCart(pKey,value)
  }

 /* getquantity(pKey:string)
  {let q:string
    let temp=this.shopService.getOne(pKey)
    .pipe(map(_=>{
      return _.payload.val()['quantity']
   })).subscribe(_=>q=_)
    return q
  }*/
}
