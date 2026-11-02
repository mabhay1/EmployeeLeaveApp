import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ILoginUser } from '../../../core/models/interface/common.model';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { readLoggedUserData } from '../../../core/helper/common.helper';

@Component({
  imports: [RouterOutlet,RouterLink, RouterLinkActive, NgClass,GetInitialsPipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {

  isSidebarCollapsed:boolean=false
  loggedUserData?:ILoginUser
  router=inject(Router)

  constructor(){
    this.loggedUserData=readLoggedUserData()
  }

  toggleSideBar(){
    this.isSidebarCollapsed=!this.isSidebarCollapsed
  }

  onLogOff(){
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_KEY)
    this.router.navigate(['/login'])
  }
}
