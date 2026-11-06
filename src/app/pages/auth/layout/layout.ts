import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ILoginUser } from '../../../core/models/interface/common.model';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { MenuConstant } from '../../../core/constants/menuConstant';

@Component({
  imports: [RouterOutlet,RouterLink, RouterLinkActive, NgClass,GetInitialsPipe, DatePipe,UpperCasePipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {

  isSidebarCollapsed:boolean=false
  loggedUserData?:ILoginUser

  router=inject(Router)

  allowedMenuList:any[]=[]
  currentDate:Date=new Date()

  constructor(){
    this.loggedUserData=readLoggedUserData()
    this.allowedMenuList=MenuConstant.filter(menu=>menu.SHOW_IN_SIDEBAR && menu.ALLOWED_ROLES.includes(this.loggedUserData?.role||''))
  }

  toggleSideBar(){
    this.isSidebarCollapsed=!this.isSidebarCollapsed
  }

  onLogOff(){
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_KEY)
    this.router.navigate(['/login'])
  }
}
