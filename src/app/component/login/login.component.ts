import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/service/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  constructor(private _AuthService:AuthService,private _Router:Router ,private _FormBuilder:FormBuilder){}




  // use any method to create formGroup
  // #first method
  // loginform:FormGroup=new FormGroup({
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  // });

  // second method
  loginform:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]]
  })





  loginSpinner:boolean=false;
  messageLoginError:string="";

  loginHundler():void{
    this.loginSpinner=true;

    if(this.loginform.valid){
      this._AuthService.setLogin(this.loginform.value).subscribe({
        next:(Response)=>{
          this.loginSpinner=false;

          localStorage.setItem('eToken',Response.token);
          this._AuthService.saveData();
          this._Router.navigate(['/home']);

        },
        error:(err:HttpErrorResponse)=>{

          this.messageLoginError=err.error.message;
          this.loginSpinner=false;

        }

      })
    }

    else{
      this.loginform.markAllAsTouched();
    }

  }



}
