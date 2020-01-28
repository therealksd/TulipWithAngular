import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/services/users.service';
import { switchMap, map, take } from 'rxjs/operators';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit,OnDestroy{
  Pcount:number
  s1:Subscription
  flag:boolean
  constructor(
    public AuthService:AuthService,
    private router:Router,
    private shoppingCartService:ShoppingCartService,
    private usrService:UsersService) { 

      AuthService.username$.pipe(switchMap(x=>{
        if(x) return usrService.getUser(x.uid)
      })).pipe(take(1)).subscribe(_=>{
        if(_['admin']) return this.flag=true
        else return this.flag=false
      })
     }
     
 ngOnInit(){

this.s1=this.shoppingCartService.getList1().subscribe(_=>{
  this.Pcount=0
  if(_.length)
  {
    for(var i=0;i<_.length;i++)
    {
      this.Pcount+=(_[i]['quantity'])
    }
  }
})
 }
 ngOnDestroy()
 {
this.s1.unsubscribe()

 }
  logout(){
this.AuthService.logout()
this.router.navigate(['/log-in'])
this.Pcount=0
localStorage.clear()
}
}
