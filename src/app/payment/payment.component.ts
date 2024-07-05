import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartComponent } from '../component/cart/cart.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-payment',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _CartService:CartService
  ){}


cartId:string|null=''

   orderForm:FormGroup=new FormGroup({
    detail:new FormControl(''),
    phone :new FormControl(''),
    city  :new FormControl(''),
   })

   handelForm():void{
      console.log(this.orderForm.value)
      this._CartService.checkout(this.cartId,this.orderForm.value).subscribe({
        next:(response)=>{
          if(response.status=="success"){
            window.open(response.session.url ,'_self')
          }
        }
      })

   }




  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{

        this.cartId=params.get('id')
        console.log(this.cartId)

      }
    })

  }







}
