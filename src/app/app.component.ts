import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/users.service';
import { take } from 'rxjs/operators';
import { Identifiers } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 constructor(authService:AuthService,router:Router,userService:UsersService){
  authService.username$.subscribe(x=>{
    if(!x) return
    userService.getUser(x.uid).pipe(take(1)).subscribe(user=>{
      if(user.shopCart)
      {
        localStorage.setItem('shop-Id',user.shopCart)
      }
      else{
        userService.save(x)
      }
    })
    
    let returnUrl1=localStorage.getItem('temp')
    if(!returnUrl1) return
    
    localStorage.removeItem('temp')
    router.navigateByUrl(returnUrl1)
    
  })
 }
}
