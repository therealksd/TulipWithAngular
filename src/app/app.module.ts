import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { NgModule} from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import { UsersService } from 'src/services/users.service';
import { AdminGaurd } from 'src/services/admin-gaurd.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from 'src/services/shopping-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    ProductsComponent,
    ShoppingcartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
      {path:'',component:ProductsComponent,runGuardsAndResolvers:'always'},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingcartComponent},
      {path:'check-out',component:CheckOutComponent,canActivate:[AuthGuard]},
      {path:'order-success',component:OrderSuccessComponent,canActivate:[AuthGuard]},
      {path:'log-in',component:LoginComponent},
      {path:'admin/products/new',component:ProductFormComponent,canActivate:[AuthGuard,AdminGaurd]},
      {path:'admin/products/:id',component:ProductFormComponent,canActivate:[AuthGuard,AdminGaurd]},
      {path:'admin/products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminGaurd]},
      {path:'admin/orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminGaurd]},
      {path:'**',component:LoginComponent}
    ])
  ],
  providers: [
    AuthService,AuthGuard,UsersService,AdminGaurd,CategoryService,ProductService,ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
