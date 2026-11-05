import { CanActivateFn, Router } from '@angular/router';
import { readLoggedUserData } from '../helper/common.helper';
import { MenuConstant } from '../constants/menuConstant';
import { inject } from '@angular/core';

export const roleBasedAccessGuard: CanActivateFn = (route, state) => {
  const currenturl = state.url.split("/")[2]
  const loggedUserData= readLoggedUserData()
  const router = inject(Router)

  
  if(loggedUserData){
    const menuItem = MenuConstant.find(menu=>menu.ROUTE_PATH===currenturl)
    if(menuItem!==undefined){
      const isAllowedAccess=menuItem.ALLOWED_ROLES.includes(loggedUserData?.role)
      if(isAllowedAccess){
        return true
      }
      else{
        router.navigateByUrl('/admin/no-access')
        return false
      }
    }
    else{
      router.navigate(['/admin/no-access'])
      return false
    }
  }
  else{
    router.navigate(['/login'])
    return false
  }
};
