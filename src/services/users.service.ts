import { Injectable } from '@angular/core';
import { FirebaseDatabase ,} from '@angular/fire';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { appUser } from 'src/app/models/app-user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db:AngularFireDatabase) { }

save(user:firebase.User){
  let sCart=localStorage.getItem('shop-Id')
  if(sCart)
  {
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email:user.email,
      shopCart:sCart
    })
  }
  else
  {
    this.db.object('/users/'+user.uid).update({
      name:user.displayName,
      email:user.email
    })
  }
}
getUser(uid:string):Observable<any>{
  return this.db.object('/users/'+uid).valueChanges()
}



}
