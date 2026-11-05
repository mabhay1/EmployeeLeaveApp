import { DatePipe, NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ILeaveList } from '../../../core/models/interface/leave.model';
import { IApiResponse, ILoginUser } from '../../../core/models/interface/common.model';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { LeaveService } from '../../../core/services/leave/leave-service';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { LeaveModel } from '../../../core/models/class/leave.model';
import { form, FormField } from '@angular/forms/signals';

@Component({
  imports: [NgClass, DatePipe, GetInitialsPipe, FormField],
  selector: 'app-leaves',
  styleUrl: './leaves.css',
  templateUrl: './leaves.html',
})
export class Leaves implements OnInit,AfterViewInit {
  tabs:any[]=[
    {tabName:'My Leaves', iconClass:'fa-regular fa-calendar'},
    {tabName:'Leave Approvals', iconClass:'fa-solid fa-clipboard-check'}
  ]
  activeTab:any=this.tabs[0]
  loggedUserData?:ILoginUser
  myLeaves=signal<ILeaveList[]>([])
  allLeavesApproval=signal<ILeaveList[]>([])

  leaveSrv=inject(LeaveService)

  leaveType=GlobalConstant.LEAVE_TYPE
  leaveStatus=GlobalConstant.LEAVE_STATUS
  roleConstant=GlobalConstant.ROLE

  leaveTypeList=Object.values(this.leaveType).map(x=>x.NAME)
  leaveStatusList=Object.values(this.leaveStatus)

  @ViewChild('leaveModelPopup') leaveModelPopup!:ElementRef

  leaveApplySignalObj=signal<LeaveModel>(new LeaveModel())
  leaveApplyForm=form(this.leaveApplySignalObj)

  constructor(){
    this.loggedUserData=readLoggedUserData()
    this.leaveApplySignalObj.update(oldValue=>({
      ...oldValue,
      employeeId:this.loggedUserData?.employeeId||0
    }))
  }

  ngOnInit(): void {
    this.getMyLeaves()
    if(this.loggedUserData?.role === GlobalConstant.ROLE.HR){
      this.getAllLeaves()
    }
    else if(this.loggedUserData?.role === GlobalConstant.ROLE.DEPARTMENT_HEAD){
      this.getSpecificDepartmentEmployeeLeaves()
    }
  }

  ngAfterViewInit(): void {
    this.openLeaveModelPopup(false)
  }

  openTab(tab:any){
    this.activeTab=tab
  }
  openLeaveModelPopup(isOpen:boolean){
    if(this.leaveModelPopup){
      this.leaveModelPopup.nativeElement.style.display=isOpen?'block':'none'
    }
    this.onResetForm()
  }

  onResetForm(){
    this.leaveApplyForm().reset();
    const leaveObj=new LeaveModel()
    leaveObj.employeeId=this.loggedUserData?.employeeId||0
    this.leaveApplySignalObj.set(leaveObj)
  }

  onSubmitLeaveRequest(){
    const formValue=this.leaveApplyForm().value()
    formValue.noOfDays=(new Date(formValue.toDate).getTime()-new Date(formValue.fromDate).getTime())/(1000*3600*24)
    this.leaveSrv.addLeave(formValue).subscribe({
      next:(res:IApiResponse<ILeaveList>)=>{
        if(res.result){
          alert(res.message)
          this.getMyLeaves()
          this.openLeaveModelPopup(false)
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

  getMyLeaves(){
    this.loggedUserData && this.leaveSrv.getAllLeavesByEmployeeId(this.loggedUserData?.employeeId).subscribe({
      next:(res:IApiResponse<ILeaveList[]>)=>{
        this.myLeaves.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  getAllLeaves(){
    this.leaveSrv.getAllLeaves().subscribe({
      next:(res:IApiResponse<ILeaveList[]>)=>{
        this.allLeavesApproval.set(res.data)
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

  approveLeave(id:number){
    this.leaveSrv.approveLeave(id).subscribe({
      next:(res:IApiResponse)=>{
        if(res.result){
          alert(res.message)
          if (this.loggedUserData?.role === GlobalConstant.ROLE.HR) {
            this.getAllLeaves()
          }
          else if (this.loggedUserData?.role === GlobalConstant.ROLE.DEPARTMENT_HEAD) {
            this.getSpecificDepartmentEmployeeLeaves()
          }
        }
        else {
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  rejectLeave(id:number){
    this.leaveSrv.rejectLeave(id).subscribe({
      next:(res:IApiResponse)=>{
        if(res.result){
          alert(res.message)
          if (this.loggedUserData?.role === GlobalConstant.ROLE.HR) {
            this.getAllLeaves()
          }
          else if (this.loggedUserData?.role === GlobalConstant.ROLE.DEPARTMENT_HEAD) {
            this.getSpecificDepartmentEmployeeLeaves()
          }
        }
        else {
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
}
