import { CommonModule } from '@angular/common';
import { Data } from './../../shard/interface/usercart';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { UserCart } from 'src/app/shard/interface/usercart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  // standalone:true,
  // imports:[CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService,private _ToastrService:ToastrService,
    private cdr: ChangeDetectorRef

  ){}
  allCartItems:any;

  // oninit function to call the function at first all
  ngOnInit(): void {
    this.getItemToCart()
  }

  // get a cart item
  getItemToCart():void{
    this._CartService.getaCart().subscribe({
      next:(response)=>{
      this.allCartItems=response.data;
      console.log(response)
      },
      error:(err)=>{
        console.log("error")

      }
    })
  }
  // remove specific item
  removeSpecificItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
         this.allCartItems=response.data
         this._ToastrService.success('Done,the item is removed')
         this._CartService.countCart.next(response.numOfCartItems);
      },
      error:()=>{

      }
    })
  }

  // upData function
  upDatafunction(id:string,counter:number):void{
    if(counter>0){
      this._CartService.upData(id,counter).subscribe({
        next:(Response)=>{
          this.allCartItems=Response.data
        }
      })
    }

  }
  // clear all items in cart
  clearAllItems(): void {
    this._CartService.clearAllItem().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this._CartService.updateCartItems([]);
          this._ToastrService.success('All items have been removed');
          this._CartService.countCart.next(response.numOfCartItems);

          this._CartService.getaCart().subscribe({
            next:(response)=>{
            this.allCartItems=response.data;
            console.log(response)
            },
            error:(err)=>{
              console.log("error")

            }
          })



        }
      },
      error: (err) => {
        console.log("Error in clearing all items", err);
      }
    });
  }


}
