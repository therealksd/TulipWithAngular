import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,private router:Router) {}
   username$:Observable<firebase.User>=this.afAuth.authState
login(){
  let returnUrl=this.route.snapshot.queryParamMap.get('returnurl') || '/';
  localStorage.setItem('temp',returnUrl)
this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
}
logout(){
this.afAuth.auth.signOut()
localStorage.clear()
}

}
