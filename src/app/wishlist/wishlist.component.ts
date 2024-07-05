import { Data } from './../shard/interface/usercart';
import { Product } from './../shard/interface/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(
    private _WishlistService:WishlistService,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private  _ToastrService:ToastrService
  ){}

  wishProduct:any
  counterWish:number=0

  ngOnInit(): void {

      this._WishlistService.showWishlist().subscribe({
        next:(response)=>{
          console.log(response)
          this.wishProduct=response.data

        }
      })
  }


  // wishProduct:any[]=[]

  addTowish(ProductId:string,elementLove:any):void{
    this._WishlistService.addToWishlist(ProductId).subscribe({
      next:(response)=>{

        this.wishProduct=response.data

        this._Renderer2.setStyle(elementLove,'display','none')



      }
    })
  }



  removeWishlist(productId:string):void{
    this._WishlistService.DeleteWishlist(productId).subscribe({
      next:(response)=>{
        this._WishlistService.showWishlist().subscribe({
          next:(response)=>{
            console.log(response)
            this.wishProduct=response.data
            this._WishlistService.countwishlist.next(response.count);

          }
        })

      },
      error:()=>{

      }
    })
  }


  addCART(id:string ,element:any):void{


    this._Renderer2.setAttribute(element,'disabled','true')

    this._CartService.  addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element,'disabled')
        this._WishlistService.countwishlist.next(response.count);


        // counter cart
        this._CartService.countCart.next(response.numOfCartItems);
      },
      error:(err)=>{
        this._ToastrService.error(err.message)
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }




}
