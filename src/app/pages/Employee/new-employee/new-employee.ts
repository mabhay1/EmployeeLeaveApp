import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { DepartmentService } from '../../../core/services/department/department-service';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IApiResponse } from '../../../core/models/interface/common.model';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { IEmployeeList, IEmployeeModel } from '../../../core/models/interface/employee.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe],
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
      employeeName: [''],
      deptId: [''],
      contactNo: [''],
      emailId: [''],
      role: [''],
      password: [''],
      gender: [''],
    })
  }

  getEmployeeById(){
    this.employeeSrv.getEmployeeById(this.currentEmployeeId).subscribe({
      next:(res:IApiResponse<IEmployeeList>)=>{
        this.employeeForm.patchValue(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onCancel(){
    this.router.navigateByUrl("/admin/employees")
  }

  onSaveForm(){
    const formValue = this.employeeForm.value as IEmployeeModel
    this.employeeSrv.createEmployee(formValue).subscribe({
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

  onUpdateForm(){
    const formValue = this.employeeForm.value as IEmployeeModel
    this.employeeSrv.updateEmployee(formValue).subscribe({
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
