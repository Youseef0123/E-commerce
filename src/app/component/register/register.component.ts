import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/shard/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private _AuthService:AuthService,private _Router:Router){

  }

  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required ,Validators.minLength(3),Validators.maxLength(20) ]),
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    rePassword:new FormControl(null),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),


  } ,{validators:[this.confirmPassword]}as FormControlOptions);

  confirmPassword(group:FormGroup):void{
    let password=group.get('password')
    let rePassword=group.get('rePassword')


    if(rePassword?.value==null){
      rePassword?.setErrors({required:true})

    }
    else if(rePassword?.value!=password?.value){
      rePassword?.setErrors({mismatch:true})

    }



  }








  isloading:boolean=false;
  errorMessage:string='';
  handlerForm():void{

    this.isloading=true;
    if(this.registerForm.valid){
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(Response)=>{
          this._Router.navigate(['/login']);

          this.isloading=false;

        },
        error:(err:HttpErrorResponse)=>{
         this.errorMessage=err.error.message;

         this.isloading=false;
        },
      });
    }
    else{
      this.registerForm.markAllAsTouched()
    }

    }


}
