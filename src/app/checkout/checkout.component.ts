import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  constructor(private _FormBuilder:FormBuilder ,
     private _ActivatedRoute:ActivatedRoute,
     private _CartService:CartService
    ){}


  urlId:any|string='' //id cart
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.urlId=params.get('id')

      }
    })
  }

  checkout:FormGroup=new FormGroup({
    details:new FormControl(''),
    phone:new FormControl(''),
    city:new FormControl('')
  })



  handelForm():void{

    console.log(this.checkout.value)
    this._CartService.checkout(this.urlId,this.checkout.value).subscribe({
      next:(response)=>{
         console.log(response)
         if(response.status=="succes"){
          window.open(response.session.url ,'_selsf')
         }




      }
    })

  }

}
