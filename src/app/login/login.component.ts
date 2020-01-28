import { Component} from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private authService:AuthService,
              private aAuth:AngularFireAuth,
              private router:Router) { }
login(){
this.authService.login()
}
onSignUp(form:NgForm)
{
  this.aAuth.auth.createUserWithEmailAndPassword(form.value['email'],form.value['pass']).then(x=>
    this.router.navigate(['/'])
  ).catch(error=>{
    alert(error)
  })
}
onSignIn(form:NgForm)
{
this.aAuth.auth.signInWithEmailAndPassword(form.value['email'],form.value['pass']).then(x=>
  this.router.navigate(['/'])
).catch(error=>alert(error))

}
}
