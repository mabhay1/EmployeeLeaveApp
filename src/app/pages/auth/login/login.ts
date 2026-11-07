import { Component, inject, OnDestroy, signal } from '@angular/core';
import { LoginModel } from '../../../core/models/class/user.model';
import { UserService } from '../../../core/services/user/user-service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { finalize, map, Subscription } from 'rxjs';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { GetValidationMessagePipe } from '../../../shared/pipes/get-validation-message-pipe';

@Component({
  imports: [FormsModule, NgIf, GetValidationMessagePipe, NgTemplateOutlet],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnDestroy {

  loginObj:LoginModel = new LoginModel()

  router = inject(Router)
  loading=signal<boolean>(false)
  emailPattern=GlobalConstant.PATTERN.EMAIL
  isLoginButtonClicked:boolean=false
  subscription!:Subscription

  constructor(private userSrv:UserService){

  }
  onLoginUser(form:NgForm){
    this.isLoginButtonClicked=true
    if(form.valid){
      this.loading.set(true)
      const subs = this.userSrv.loginUser(this.loginObj).pipe(
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
