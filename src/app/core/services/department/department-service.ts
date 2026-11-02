import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { GlobalConstant } from '../../constants/GlobalConstant';
import { environment } from '../../../../environments/environment.development';
import { IDepartmentList } from '../../models/interface/department.model';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../models/class/department.model';
import { IApiResponse } from '../../models/interface/common.model';

@Service()
export class DepartmentService {
    apiUrl:string=environment.API_URL

    http=inject(HttpClient)

    getAllDepartments():Observable<IApiResponse<IDepartmentList[]>>{
        return this.http.get<IApiResponse<IDepartmentList[]>>(this.apiUrl+GlobalConstant.API_METHODS.DEPARTMENT.GET_ALL_DEPARTMENTS)
    }
    createDepartment(obj:DepartmentModel):Observable<IApiResponse<IDepartmentList>>{
        return this.http.post<IApiResponse<IDepartmentList>>(this.apiUrl+GlobalConstant.API_METHODS.DEPARTMENT.CREATE_DEPARTMENT,obj)
    }
    updateDepartment(obj:DepartmentModel):Observable<IApiResponse<IDepartmentList>>{
        return this.http.put<IApiResponse<IDepartmentList>>(this.apiUrl+GlobalConstant.API_METHODS.DEPARTMENT.UPDATE_DEPARTMENT,obj)
    }
    deleteDepartmentById(id:number):Observable<IApiResponse>{
        return this.http.delete<IApiResponse>(this.apiUrl+GlobalConstant.API_METHODS.DEPARTMENT.DELETE_DEPARTMENT+id)
    }

}
