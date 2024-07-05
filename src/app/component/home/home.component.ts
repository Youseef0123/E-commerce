import { Data } from './../../shard/interface/usercart';
// import { Category, Product } from './../../shard/interface/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { Product } from 'src/app/shard/interface/product';
import { EcomdatapService } from 'src/app/shard/service/ecomdatap.service';
import { WishlistService } from 'src/app/wishlist.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _EcomdatapService:EcomdatapService ,
     private _CartService:CartService,
     private _ToastrService:ToastrService,
     private _Renderer2:Renderer2,
     private _WishlistService:WishlistService,

    ){}

  products:Product[]=[]
  CategoryProduct:any[]=[]
  counterWish:number=0
   rangaveragenum:number[]=[]



  addCART(id:string ,element:any):void{


    this._Renderer2.setAttribute(element,'disabled','true')

    this._CartService.  addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element,'disabled')

        // counter cart
        this._CartService.countCart.next(response.numOfCartItems);
      },
      error:(err)=>{
        this._ToastrService.error(err.message)
        this._Renderer2.removeAttribute(element,'disabled')
      }
    })
  }




  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navSpeed: 700,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  mainSlid: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots:false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navSpeed: 700,
    navText: ['', ''],
   items:1,
    nav: false
  }

 searchInput:string='';



  ngOnInit(): void {

    // get all product
    this._EcomdatapService.getAllProducts().subscribe({
      next:(response)=> {
        this.products=response.data
        this.rangaveragenum=response.Data.ratingsAverage
      },
    })


    // get all category
    this._EcomdatapService.getAllCategory().subscribe({
      next:(respons)=>{
        this.CategoryProduct=respons.data;

      }
    })



  }


  wishProduct:any[]=[]
  addIcon:any
  addTowish(ProductId:string,elementLove:any):void{
    this._WishlistService.addToWishlist(ProductId).subscribe({
      next:(response)=>{
        this.wishProduct=response.data
         this._WishlistService.addToWishlist(ProductId).subscribe({
           next:(response)=>{

        this.wishProduct=response.data
        this.addIcon=elementLove
        this._Renderer2.setStyle(elementLove,'display','none')
      }
    })
        this.addIcon=elementLove
        this._Renderer2.setStyle(elementLove,'display','none')



      }
    })
  }

  removWish(productId:string,elementred:any):void{
    this._WishlistService.DeleteWishlist(productId).subscribe({
      next:(response)=>{
        this._Renderer2.removeStyle(this.addIcon,'display')

        this._WishlistService.addToWishlist(productId).subscribe({
          next:(response)=>{

            this.wishProduct=response.data



          }
        })

        // this._Renderer2.removeStyle(elementred,'display')



      }
    })
  }

}
