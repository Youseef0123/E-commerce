import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router) { }

  userDataDecode:any;

userLogOutServise():void{
  localStorage.removeItem('eToken');

  this._Router.navigate(['/login'])

}


  saveData(){
    if(localStorage.getItem('eToken')!=null){
      let enCodeToken:any=localStorage.getItem('eToken');
      let deCodeToken=jwtDecode(enCodeToken);
      this.userDataDecode=deCodeToken;
      console.log(deCodeToken)


    }
  }

  setRegister(userData:object): Observable <any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData);
  }

  setLogin(userData:object): Observable <any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData);
  }

  // logout function

  logOut(){
    localStorage.removeItem('eToken');
    // go to login
    this._Router.navigate(['/login'])
  }


}


