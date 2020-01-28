import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurd implements CanActivate{

constructor(private authService:AuthService,private userService:UsersService) { }
canActivate(){
 return this.authService.username$.pipe(switchMap(user=>{
  return this.userService.getUser(user.uid)
})).pipe(map(x=>x['admin']))  
}
}
