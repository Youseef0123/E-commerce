import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavAuthComponent } from './component/nav-auth/nav-auth.component';
import { NavBlankComponent } from './component/nav-blank/nav-blank.component';
import { HomeComponent } from './component/home/home.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { ProductsComponent } from './component/products/products.component';
import { BlankLayoutComponent } from './component/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { authGuard } from './shard/guards/auth.guard';
import { DetailsComponent } from './component/details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { SpecificCategoryComponent } from './specific-category/specific-category.component';
import { Title } from '@angular/platform-browser';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [

  {path:"",component:BlankLayoutComponent,
    canActivate:[authGuard],
     children:[
    {path:"",redirectTo:"home",pathMatch:'full'},
    {path:"home",component:HomeComponent},
    {path:"brands",component:BrandsComponent},
    {path:"forgetPassword",component:ForgetPasswordComponent},
    {
     path:"payment/:id",
     loadComponent:()=>
      import('./payment/payment.component').then(
        (m)=>m.PaymentComponent
      ),
      title:'payment',

    },
    {path:"checkout/:id",component:CheckoutComponent},
    {path:"details/:id",component:DetailsComponent},
    {path:"categories",component:CategoriesComponent},
    {path:"wishlist",component:WishlistComponent},
    {path:"specificCategory/:id",component:SpecificCategoryComponent},
    {path:"products",component:ProductsComponent},
    // {path:"payment/:id",component:PaymentComponent},
    {path:"allorders",component:AllordersComponent},
    {path:"cart",component:CartComponent},
  ],
},


  {path:"",component:AuthLayoutComponent,
  children:[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
  ],



},

{path:'**',component:NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
