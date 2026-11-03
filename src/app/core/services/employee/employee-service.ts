import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GlobalConstant } from '../../constants/GlobalConstant';
import { IApiResponse } from '../../models/interface/common.model';
import { IEmployeeList, IEmployeeModel } from '../../models/interface/employee.model';
import { Observable } from 'rxjs';

@Service()
export class EmployeeService {

    apiUrl:string=environment.API_URL
    http=inject(HttpClient)

    getAllEmployees():Observable<IApiResponse<IEmployeeList[]>>{
        return this.http.get<IApiResponse<IEmployeeList[]>>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.GET_ALL_EMPLOYEES)
    }

    createEmployee(obj:IEmployeeModel):Observable<IApiResponse<IEmployeeList>>{
        return this.http.post<IApiResponse<IEmployeeList>>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.CREATE_EMPLOYEE,obj)
    }

    updateEmployee(obj:IEmployeeModel):Observable<IApiResponse<IEmployeeList>>{
        return this.http.put<IApiResponse<IEmployeeList>>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.UPDATE_EMPLOYEE,obj)
    }

    deleteEmployee(id:number):Observable<IApiResponse>{
        return this.http.delete<IApiResponse>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.DELETE_EMPLOYEE+id)
    }

    getEmployeeById(id:number):Observable<IApiResponse<IEmployeeList>>{
        return this.http.get<IApiResponse<IEmployeeList>>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.GET_EMPLOYEE_BY_ID+id)
    }

    getEmployeeByDepartmentId(deptId:number):Observable<IApiResponse<IEmployeeList>>{
        return this.http.get<IApiResponse<IEmployeeList>>(this.apiUrl+GlobalConstant.API_METHODS.EMPLOYEE.GET_EMPLOYEE_BY_DEPARTMENT_ID+deptId)
    }
}
