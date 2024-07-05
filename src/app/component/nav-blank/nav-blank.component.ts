import { Data } from './../../shard/interface/usercart';
import { Route } from '@angular/router';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shard/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/wishlist.service';
import { WishlistComponent } from 'src/app/wishlist/wishlist.component';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(
    private _AuthService:AuthService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private  _WishlistService:WishlistService


  ){}

   // to manage im scrollbar im any items (host listener)

   @ViewChild("navBar") navElement!:ElementRef;

   @HostListener('window:scroll')
   onScroll():void{
    if(scrollY>500){
      this._Renderer2.addClass(this.navElement.nativeElement,'px-5')

    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
    }

   }





   counterCartData:number=0
   counterWishlistData:number=0


  ngOnInit(): void {
    this._CartService.countCart.subscribe({
      next:(data)=>{

        this.counterCartData=data

      }
    });

    this._CartService.getaCart().subscribe({
      next:(respons)=>{

        this.counterCartData=respons.numOfCartItems

      }
    })



    this._WishlistService.countwishlist.subscribe({
      next:(data)=>{


        this.counterWishlistData=data

      }
    });

    this._WishlistService.showWishlist().subscribe({
      next:(respons)=>{

        this.counterWishlistData=respons.count


      }
    })



  }








  logoutUser():void{
    this._AuthService.logOut();

  }

}

