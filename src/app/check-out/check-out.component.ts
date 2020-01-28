import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
listOfProds:any[]=[]
s1:Subscription
total:number=0
  constructor(private shopCartService:ShoppingCartService) { }

  ngOnInit() {
    this.s1=this.shopCartService.getList().subscribe(_=>{
      this.listOfProds=[]
      this.total=0
      for(var i=0;i<_.length;i++)
      {
        this.listOfProds.push({
          name:_[i].payload.val()['Pname'],
          price:_[i].payload.val()['Price'],
          quantity:_[i].payload.val()['quantity']
        })
        this.total+=_[i].payload.val()['quantity']*_[i].payload.val()['Price']
      }
    })
  }
  ngOnDestroy()
  {
    this.s1.unsubscribe()
  }
  
 placeOrder(form:NgForm){
  this.shopCartService.getCart(form.value)
/*
 let order={
    date:new Date().getUTCDate(),
    shippingDetail:form.value,
    products:this.listOfProds,
    shopId:localStorage.getItem('shop-Id') 
  }
  form.reset();
  alert('Order Successfully Placed')
  console.log(order)
  */
  }

}
