import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ForgotpassService } from 'src/app/forgotpass.service';

@Component({
  selector: 'app-forget-password',
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService,
    private _Router:Router
  ){}




  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:String=''
  messageError:String=''


  forgotForm:FormGroup=new FormGroup({
    email:new FormControl('')
  })



 resetCodeForm:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  })



  resetPassword:FormGroup=new FormGroup({
    newPassword:new FormControl('')
  })

  forgotPassword():void{
    let usermail=this.forgotForm.value
    this.email=usermail.email;
    this._ForgotpassService.forgotPassword(usermail).subscribe({
      next:(response)=>{
        console.log(response)
        this.messageError=response.message
        this.step1=false;
        this.step2=true;

      },
      error:(err)=>{
        this.messageError=err.error.message;


      }
    })
  }

  resetCode(): void {
    let resetCodeValue = this.resetCodeForm.value;
    // Ensure the resetCode is a string
    resetCodeValue.resetCode = resetCodeValue.resetCode.toString();

    this._ForgotpassService.resetCode(resetCodeValue).subscribe({
      next: (response) => {
        this.messageError = response.status;
        this.step2 = false;
        this.step3 = true;
      },
      error: (err) => {
        this.messageError = err.error.message;
      }
    });
  }

  newPassword(){
    let resetForm=this.resetPassword.value
    resetForm.email=this.email
    this._ForgotpassService.resetPassWord(resetForm).subscribe({
      next:(responnse)=>{
        if(responnse.token){
          localStorage.setItem('eToken',responnse.token);
           this._Router.navigate(['/home'])

          }

      },
      error:(err)=>{
        this.messageError = err.error.message;

      }
    })

  }





}
