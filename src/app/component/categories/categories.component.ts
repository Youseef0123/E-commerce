import { ThisReceiver } from '@angular/compiler';
import { Data } from './../../shard/interface/usercart';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _CartService:CartService){}


  CategoriesData:any[]=[]

  ngOnInit(): void {
   this._CartService.getAllcategories().subscribe({
    next:(response)=>{
      console.log(response)

      this.CategoriesData=response.data

    }
   })
  }

  getSpecificCat(id:string):void{
    this._CartService.getSpecificCategories(id).subscribe({
      next:(response)=>{
        console.log(response)
      }
    })
  }



}
