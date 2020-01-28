import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

createProduct(product){
 return this.db.list('/products').push(product)
 
}
getAll(){
  return this.db.list('/products')
}
getOneProduct(uid:string){
 return this.db.object('/products/'+uid).snapshotChanges()
}
updateProduct(key){
  return this.db.object('/products/'+key)
}
deleteProduct(key){
  this.db.object('/products/'+key).remove()
}
}
