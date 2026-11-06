import { Component, inject, signal } from '@angular/core';
import { LoginModel } from '../../../core/models/class/user.model';
import { UserService } from '../../../core/services/user/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize, map } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  imports: [FormsModule, NgIf],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  loginObj:LoginModel = new LoginModel()

  router = inject(Router)
  loading=signal<boolean>(false)

  constructor(private userSrv:UserService){

  }
  onLoginUser(){
    this.loading.set(true)
    this.userSrv.loginUser(this.loginObj).pipe(
      finalize(()=>{
        this.loading.set(false)
      })
    ).subscribe({
      next:(res)=>{
        if(res.result){
          alert("Logged In Success")
          localStorage.setItem(GlobalConstant.LOCAL_LOGIN_KEY,JSON.stringify(res.data))
          this.router.navigateByUrl('/admin/dashboard')
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }
}
