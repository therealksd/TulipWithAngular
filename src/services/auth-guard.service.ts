import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(private authService:AuthService,private router:Router) { }


  canActivate(route,state:RouterStateSnapshot){
   return this.authService.username$.pipe(map(user=>{
     if(user) return true
     this.router.navigate(['/log-in'],{queryParams:{returnurl:state.url}})
     return false;
   }))
  }
}
