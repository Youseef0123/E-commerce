import { Product } from './../shard/interface/usercart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css']
})
export class SpecificCategoryComponent implements OnInit  {
  constructor(
    private _CartService:CartService ,
    private _ActivatedRoute:ActivatedRoute,


  ){}
  getcategory:any

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        let productId=param.get("id")
        console.log(productId)

        this._CartService.getSpecificCategories(productId).subscribe({
          next:(respons)=>{
            console.log(respons.data)
            return this.getcategory=respons.data;


          }
        })

      }

    })



  }











}
