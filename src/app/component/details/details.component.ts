import { Product } from './../../shard/interface/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { EcomdatapService } from 'src/app/shard/service/ecomdatap.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute,
    private _EcomdatapService:EcomdatapService,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ){}

  detailsImage: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
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
    nav: false
  }



  getDataProduct:Product={} as Product
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        let productId =param.get("id");
        console.log(productId)

        this._EcomdatapService.getSpecificProduct(productId).subscribe({
          next:(respons)=>{
             return this.getDataProduct=respons.data;
          }

        })


      }
    })

  }

  addProductInDetails(id:string):void{
       this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.countCart.next(response.numOfCartItems)
      }
    })
  }

}
