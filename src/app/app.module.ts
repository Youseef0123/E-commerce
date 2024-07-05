import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { BrandsComponent } from './component/brands/brands.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { DetailsComponent } from './component/details/details.component';
import { NavBlankComponent } from './component/nav-blank/nav-blank.component';
import { NavAuthComponent } from './component/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './component/blank-layout/blank-layout.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import{HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import{BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';
import { BuyPipe } from './buy.pipe';
import { SearchPipe } from './search.pipe';
import { FormsModule } from '@angular/forms'; // استيراد FormsModule
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { MyHttpInterceptor } from './my-http.interceptor';
import { SpecificCategoryComponent } from './specific-category/specific-category.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from './loading.interceptor';
import { WishlistComponent } from './wishlist/wishlist.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    BuyPipe,
    SearchPipe,
    AppComponent,
    CheckoutComponent,
    AllordersComponent,
    SpecificCategoryComponent,
    WishlistComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MyHttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
