import { Product } from 'src/app/shard/interface/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  countCart:BehaviorSubject<any>=new BehaviorSubject(0);

  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  // totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // changeCartCound: Observable<number> = this.totalCartItems.asObservable();
  // updateCartCound(newNumber: number): void {
  //   this.totalCartItems.next(newNumber);
  // }

  // add cart function
  userToken: any = localStorage.getItem('eToken');
  userId: any = '';
  totalCartItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  updateCartCound(newNumber: number): void {
    this.totalCartItems.next(newNumber);
  }


  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',

      { productId: productId },
      // { headers: { token: this.userToken } }
    );
  }
  // /////////////////////////////////////////////**

  //get the cart
  getaCart():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,

      // { headers: { token: this.userToken } }
    )
  }

  // remove specific item
  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      // { headers: { token: this.userToken } }
    )
  }


  // upData function
  upData(productId:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count:newCount},
      // { headers: { token: this.userToken } }

    )
  }

  checkout(cartId:string|null,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://github.com/`,
      {
        shippingAddress: userData
    },
    // { headers: { token: this.userToken } }
    )
  }

  getAllproducts():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`,
      // { headers: { token: this.userToken } }
    )

  }

  // clear all item
  clearAllItem():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
      // { headers: { token: this.userToken } }
    )
  }
  updateCartItems(items: any[]) {
    this.cartItems.next(items);
  }

  // get All categories
  getAllcategories():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`,
      // { headers: { token: this.userToken } }
    )
  }
  // get specific category
  getSpecificCategories(productId:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${productId}`,
      // { headers: { token: this.userToken } }
    )
  }


}
