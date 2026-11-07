import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { IApiResponse, ILoginUser } from '../../../core/models/interface/common.model';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { DepartmentService } from '../../../core/services/department/department-service';
import { map, Observable } from 'rxjs';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { GetValidationMessagePipe } from '../../../shared/pipes/get-validation-message-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule, GetValidationMessagePipe, NgTemplateOutlet],
  selector: 'app-my-profile',
  styleUrl: './my-profile.css',
  templateUrl: './my-profile.html',
})
export class MyProfile implements OnInit{

  loggedUserData?:ILoginUser

  employeeSrv=inject(EmployeeService)
  departmentSrv=inject(DepartmentService)
  destroyRef = inject(DestroyRef)

  employeeForm!:FormGroup

  genderList=GlobalConstant.GENDER_LIST

  departmentList=signal<IDepartmentList[]>([])

  isFormSubmitBtnClicked = false

  constructor(){
    this.loggedUserData=readLoggedUserData()
    this.initializeForm()
  }
  ngOnInit(): void {
    this.getEmployeeById()
    this.employeeForm.controls['deptId'].disable()
    this.departmentSrv.getAllDepartments().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
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
      employeeName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      deptId: new FormControl('',[Validators.required]),
      contactNo: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      emailId: new FormControl('',[Validators.required,Validators.pattern(GlobalConstant.PATTERN.EMAIL)]),
      role: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required])
    })
  }

  getEmployeeById(){
    this.employeeSrv.getEmployeeById(this.loggedUserData?.employeeId||0).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:(res:IApiResponse<IEmployeeList>)=>{
        this.employeeForm.patchValue(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  updateProfile(){
    this.isFormSubmitBtnClicked=true
    if(this.employeeForm.valid){
      const formValue=this.employeeForm.getRawValue()
      this.employeeSrv.updateEmployee(formValue).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
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
}
