import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { IApiResponse, ILoginUser } from '../../../core/models/interface/common.model';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { ILeaveList } from '../../../core/models/interface/leave.model';
import { LeaveService } from '../../../core/services/leave/leave-service';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { DepartmentService } from '../../../core/services/department/department-service';
import { map, Observable } from 'rxjs';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { RouterLink } from '@angular/router';

@Component({
  imports: [NgClass,DatePipe,AsyncPipe, GetInitialsPipe, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  loggedUserData?:ILoginUser=readLoggedUserData()
  constantData=GlobalConstant
  myLeaves=signal<ILeaveList[]>([])
  allLeavesApproval=signal<ILeaveList[]>([])

  myTotalLeaves=computed(()=>this.myLeaves().length)
  myPendingLeaves=computed(()=>this.myLeaves().filter(x=>x.isApproved===null).length)
  myApprovedLeaves=computed(()=>this.myLeaves().filter(x=>x.isApproved===true).length)
  myRejectedLeaves=computed(()=>this.myLeaves().filter(x=>x.isApproved===false).length)

  TotalLeaveRequests=computed(()=>this.allLeavesApproval().length)
  TotalPendingRequests=computed(()=>this.allLeavesApproval().filter(x=>x.isApproved===null).length)
  TotalApprovedRequests=computed(()=>this.allLeavesApproval().filter(x=>x.isApproved===true).length)
  TotalRejectedRequests=computed(()=>this.allLeavesApproval().filter(x=>x.isApproved===false).length)

  PendingRequests=computed(()=>this.allLeavesApproval().filter(x=>x.isApproved===null))

  employeesObs$=new Observable<IEmployeeList[]>
  departmentListObs$=new Observable<IDepartmentList[]>
  
  leaveSrv= inject(LeaveService)
  employeeSrv=inject(EmployeeService)
  deparrtmentSrv=inject(DepartmentService)

  constructor(){
    this.employeesObs$=this.employeeSrv.getAllEmployees().pipe(
      map(res=>res.data)
    )
    this.departmentListObs$=this.deparrtmentSrv.getAllDepartments().pipe(
      map(res=>res.data)
    )
  }

  ngOnInit(): void {
    this.getMyLeaves()
    if(this.loggedUserData?.role===this.constantData.ROLE.HR){
      this.getAllLeaves()
    }
    else if(this.loggedUserData?.role===this.constantData.ROLE.DEPARTMENT_HEAD){
      this.getSpecificDepartmentEmployeeLeaves()
    }
  }

  getMyLeaves(){
    this.loggedUserData && this.leaveSrv.getAllLeavesByEmployeeId(this.loggedUserData?.employeeId).subscribe({
      next:(res:IApiResponse<ILeaveList[]>)=>{
        this.myLeaves.set(res.data.sort((a,b)=>new Date(b.fromDate).getTime()-new Date(a.fromDate).getTime()))
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  getAllLeaves(){
    this.leaveSrv.getAllLeaves().subscribe({
      next:(res:IApiResponse<ILeaveList[]>)=>{
        this.allLeavesApproval.set(res.data.sort((a,b)=>new Date(b.fromDate).getTime()-new Date(a.fromDate).getTime()))
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  getSpecificDepartmentEmployeeLeaves() {
    this.loggedUserData && this.leaveSrv.getLeavesApprovalBySupervisorId(this.loggedUserData?.employeeId).subscribe({
      next:(res:IApiResponse<ILeaveList[]>)=>{
        this.allLeavesApproval.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

}
