import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  constructor(private db:AngularFireDatabase) { }
  private create(product)
  {
    return this.db.list('/shoppingCart').push({
      productKey:product.key
    }) 
  }
   private async getOrCreateCartId(product){
    //console.log('step-1 ')
    let temp = localStorage.getItem('shop-Id')
    if(temp)
    {
      //console.log('step-3--return shop-id'+temp)
      return temp
    }
      await this.create(product).then(result=>{
        localStorage.setItem('shop-Id',result.key)
        //console.log('step-2 key'+result.key)
      temp=result.key
      })  
      return temp 
  }
  async addToCart(product){
  let shopId=await this.getOrCreateCartId(product)
  //console.log('step-4'+shopId)
  if(shopId)
  {
    let path=this.db.object('/shoppingCart/'+shopId+'/items/'+product.key)
    path.valueChanges()
    .pipe(take(1)).subscribe(item=>{
      if(item) path.update({quantity:(item['quantity'])+1 })
      else path.set({
        quantity:1,
        Pname:product.name,
        Price:product.price,
        image:product.imageurl
       })
    })
  }
  
  }

  
updateCart(pKey,value){
  let cartId=localStorage.getItem('shop-Id')
  this.db.object('/shoppingCart/'+cartId+'/items/'+pKey).valueChanges()
  .pipe(take(1)).subscribe(_=>{
    let t=_['quantity']+value
    if(t===0)
    {
      this.db.object('/shoppingCart/'+cartId+'/items/'+pKey).remove()
    }
    else
    {
      this.db.object('/shoppingCart/'+cartId+'/items/'+pKey).update({quantity:t})
    }
  })
  
}
getList()
{
  let cartId=localStorage.getItem('shop-Id')
  return this.db.list('/shoppingCart/'+cartId+'/items').snapshotChanges()
}
getList1()
{
  let cartId=localStorage.getItem('shop-Id')
  return this.db.list('/shoppingCart/'+cartId+'/items').valueChanges()
}
getCart(add)
{
  let cartId=localStorage.getItem('shop-Id')
  return this.db.object('/shoppingCart/'+cartId).update({
    address:add
  })
}

getOne(pKey)
{
  let cartId=localStorage.getItem('shop-Id')
  if(cartId) 
  {
    return this.db.object('/shoppingCart/'+cartId+'/items/'+pKey).snapshotChanges()
    
    /*.subscribe(_=>
      {
        if(_)
         {
          //console.log('hi---'+_['quantity']);
            let t=_['quantity']
            console.log('t-'+t)
            return t
          }
        else return 0
     })*/
  }
  //else return 0;
}
}
