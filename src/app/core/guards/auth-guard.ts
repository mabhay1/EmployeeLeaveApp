import { CanActivateFn, Router } from '@angular/router';
import { readLoggedUserData } from '../helper/common.helper';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const localUserData = readLoggedUserData()
  const router=inject(Router)
  if(localUserData!==undefined){
    return true
  }
  else{
    router.navigateByUrl('/login')
    return false
  }
};
