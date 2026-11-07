import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { DepartmentService } from '../../../core/services/department/department-service';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IApiResponse } from '../../../core/models/interface/common.model';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { IEmployeeList, IEmployeeModel } from '../../../core/models/interface/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetValidationMessagePipe } from '../../../shared/pipes/get-validation-message-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, GetValidationMessagePipe, NgTemplateOutlet],
  selector: 'app-new-employee',
  styleUrl: './new-employee.css',
  templateUrl: './new-employee.html',
})
export class NewEmployee implements OnInit {

  employeeForm!:FormGroup
  departmentListObs$:Observable<IDepartmentList[]> = new Observable<IDepartmentList[]>()

  departmentSrv = inject(DepartmentService)
  employeeSrv = inject(EmployeeService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  roleList = GlobalConstant.ROLE_LIST
  genderList = GlobalConstant.GENDER_LIST

  currentEmployeeId:number = 0
  isFormSubmitBtnClicked:boolean=false

  destroyRef=inject(DestroyRef)

  constructor(private fb:FormBuilder){
    this.initializeForm()
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        this.currentEmployeeId=Number(res.employeeId)
        if(this.currentEmployeeId!==0){
          this.getEmployeeById()
        }
      }
    })
  }

  ngOnInit(): void {
    this.departmentListObs$ = this.departmentSrv.getAllDepartments().pipe(
      map((res:IApiResponse<IDepartmentList[]>)=>res.data)
    )
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      employeeId: [0],
      employeeName: ['',[Validators.required,Validators.minLength(3)]],
      deptId: ['',[Validators.required]],
      contactNo: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      emailId: ['',[Validators.required,Validators.pattern(GlobalConstant.PATTERN.EMAIL)]],
      role: ['',[Validators.required]],
      password: ['',[Validators.required]],
      gender: ['',Validators.required],
    })
  }

  getEmployeeById(){
    this.employeeSrv.getEmployeeById(this.currentEmployeeId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next:(res:IApiResponse<IEmployeeList>)=>{
        this.employeeForm.patchValue(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onCancel(){
    this.router.navigateByUrl("/admin/employees")
    this.isFormSubmitBtnClicked=false
  }

  onSaveForm(){
    this.isFormSubmitBtnClicked=true
    const formValue = this.employeeForm.value as IEmployeeModel
    if(this.employeeForm.valid){
      this.employeeSrv.createEmployee(formValue).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next:(res:IApiResponse<IEmployeeList>)=>{
          if(res.result){
            alert("Employee created success")
            this.onCancel()
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

  onUpdateForm(){
    this.isFormSubmitBtnClicked=true
    const formValue = this.employeeForm.value as IEmployeeModel
    if(this.employeeForm.valid){
      this.employeeSrv.updateEmployee(formValue).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next:(res:IApiResponse<IEmployeeList>)=>{
          if(res.result){
            alert("Employee updated success")
            this.onCancel()
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
