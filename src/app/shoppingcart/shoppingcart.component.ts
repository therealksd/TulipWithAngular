import { Component, OnInit, OnDestroy} from '@angular/core';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Subscription} from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit,OnDestroy {
ProductsKey:any[]=[]
Subscription:Subscription
total:number=0

  constructor(private shopService:ShoppingCartService) { }

  ngOnInit() 
  {
    this.Subscription=this.shopService.getList().subscribe(_=>{
      this.ProductsKey=[]
      this.total=0
      if(_.length)
      {  
        for(var i=0;i<_.length;i++)
        { 
          this.ProductsKey[i]=
          {
            key:_[i].key,
            name:_[i].payload.val()['Pname'],
            quantity:_[i].payload.val()['quantity'],
            price:(_[i].payload.val()['Price'])*(_[i].payload.val()['quantity']),
            image:_[i].payload.val()['image']
          }
          this.total+=this.ProductsKey[i].price
        }
      }
  
  })
    
  }
  async  updateCart(pkey,value)
  {
    await this.shopService.updateCart(pkey,value)
    console.log(this.ProductsKey.length)
  }
  ngOnDestroy()
  {
   this.Subscription.unsubscribe()
  }
}
