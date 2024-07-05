import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Category } from '../interface/product';


@Injectable({
  providedIn: 'root'
})
export class EcomdatapService {

  constructor(private _HttpClient:HttpClient) { }


  getAllProducts():Observable<any>
  {
   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  getSpecificProduct(id:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  getAllCategory():Observable<any>
  {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }


}
