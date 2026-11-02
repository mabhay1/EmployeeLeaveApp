import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginModel } from '../../models/class/user.model';
import { environment } from '../../../../environments/environment.development';
import { GlobalConstant } from '../../constants/GlobalConstant';
import { IApiResponse, ILoginUser } from '../../models/interface/common.model';
import { Observable } from 'rxjs';

@Service()
export class UserService {
    apiUrl:string=environment.API_URL
    http = inject(HttpClient)

    loginUser(obj:LoginModel):Observable<IApiResponse<ILoginUser>>{
        return this.http.post<IApiResponse<ILoginUser>>(this.apiUrl+GlobalConstant.API_METHODS.LOGIN_USER,obj)
    }
}
