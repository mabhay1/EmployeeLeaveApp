import { Component, inject, OnInit, signal } from '@angular/core';
import { IApiResponse, ILoginUser } from '../../../core/models/interface/common.model';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { DepartmentService } from '../../../core/services/department/department-service';
import { map, Observable } from 'rxjs';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-my-profile',
  styleUrl: './my-profile.css',
  templateUrl: './my-profile.html',
})
export class MyProfile implements OnInit{

  loggedUserData?:ILoginUser

  employeeSrv=inject(EmployeeService)
  departmentSrv=inject(DepartmentService)

  employeeForm!:FormGroup

  genderList=GlobalConstant.GENDER_LIST

  departmentList=signal<IDepartmentList[]>([])

  constructor(){
    this.loggedUserData=readLoggedUserData()
    this.initializeForm()
  }
  ngOnInit(): void {
    this.getEmployeeById()
    this.employeeForm.controls['deptId'].disable()
    this.departmentSrv.getAllDepartments().subscribe({
      next:(res:IApiResponse<IDepartmentList[]>)=>{
        this.departmentList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  initializeForm(){
    this.employeeForm=new FormGroup({
      employeeId: new FormControl(0),
      employeeName: new FormControl(''),
      deptId: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl(''),
      gender: new FormControl('')
    })
  }

  getEmployeeById(){
    this.employeeSrv.getEmployeeById(this.loggedUserData?.employeeId||0).subscribe({
      next:(res:IApiResponse<IEmployeeList>)=>{
        this.employeeForm.patchValue(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  updateProfile(){
    const formValue=this.employeeForm.getRawValue()
    this.employeeSrv.updateEmployee(formValue).subscribe({
      next:(res:IApiResponse<IEmployeeList>)=>{
        if(res.result){
          alert("Profile updated Success")
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
}
