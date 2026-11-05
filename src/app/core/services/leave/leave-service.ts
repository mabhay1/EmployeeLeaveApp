import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GlobalConstant } from '../../constants/GlobalConstant';
import { Observable } from 'rxjs';
import { ILeaveList } from '../../models/interface/leave.model';
import { IApiResponse } from '../../models/interface/common.model';
import { LeaveModel } from '../../models/class/leave.model';

@Service()
export class LeaveService {
    apiUrl:string=environment.API_URL
    http=inject(HttpClient)

    getAllLeaves():Observable<IApiResponse<ILeaveList[]>>{
        return this.http.get<IApiResponse<ILeaveList[]>>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.GET_ALL_LEAVES)
    }

    getAllLeavesByEmployeeId(empId:number):Observable<IApiResponse<ILeaveList[]>>{
        return this.http.get<IApiResponse<ILeaveList[]>>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.GET_ALL_LEAVES_BY_EMP_ID+empId)
    }

    getLeavesApprovalBySupervisorId(supervisorId:number):Observable<IApiResponse<ILeaveList[]>>{
        return this.http.get<IApiResponse<ILeaveList[]>>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.GET_LEAVES_APPROVAL_BY_SUPERVISOR_ID+supervisorId)
    }

    addLeave(obj:LeaveModel):Observable<IApiResponse<ILeaveList>>{
        return this.http.post<IApiResponse<ILeaveList>>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.ADD_LEAVE,obj)
    }

    approveLeave(id:number):Observable<IApiResponse>{
        return this.http.get<IApiResponse>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.APPROVE_LEAVE+id)
    }

    rejectLeave(id:number):Observable<IApiResponse>{
        return this.http.get<IApiResponse>(this.apiUrl+GlobalConstant.API_METHODS.LEAVES.REJECT_LEAVE+id)
    }
}
