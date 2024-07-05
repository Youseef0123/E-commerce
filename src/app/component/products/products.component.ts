import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ){}

  allProductData:any=''

  ngOnInit(): void {

    this._CartService.getAllproducts().subscribe({
      next:(response)=>{
          console.log(response)
          this.allProductData=response.data
      }
    })
  }

  addCART(id:string):void{
    this._CartService.  addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.countCart.next(response.numOfCartItems)
      },
      error:(err)=>{
        this._ToastrService.error(err.message)
      }
    })
  }



}
