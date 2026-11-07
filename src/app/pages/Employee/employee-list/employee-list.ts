import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IApiResponse } from '../../../core/models/interface/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../../core/services/department/department-service';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { IDepartmentList } from '../../../core/models/interface/department.model';

@Component({
  imports: [RouterLink, GetInitialsPipe, NgClass, FormsModule, AsyncPipe],
  selector: 'app-employee-list',
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList implements OnInit, OnDestroy{

  employees=signal<IEmployeeList[]>([])
  filteredEmployees=signal<IEmployeeList[]>([])

  employeeSrv=inject(EmployeeService)
  departmentSrv=inject(DepartmentService)
  router = inject(Router)

  globalConstantValue=GlobalConstant

  departmentListObs$=new Observable<IDepartmentList[]>()

  selectedDepartmemt:string=''
  selectedRole:string=''

  takeUntilSubs$:Subject<void>=new Subject<void>()

  constructor(){
    this.departmentListObs$=this.departmentSrv.getAllDepartments().pipe(
      map(res=>res.data)
    )
  }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  onFilterEmployees(){
    const filterEmployees=this.employees().filter(x=>{
      return (this.selectedDepartmemt===''||x.deptName===this.selectedDepartmemt) && (this.selectedRole===''||x.role===this.selectedRole)
    })
    this.filteredEmployees.set(filterEmployees)
    console.log(this.filteredEmployees())
  }

  getAllEmployees(){
    this.employeeSrv.getAllEmployees().pipe(
      takeUntil(this.takeUntilSubs$)
    ).subscribe({
      next:(res:IApiResponse<IEmployeeList[]>)=>{
        this.employees.set(res.data)
        this.filteredEmployees.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  onEdit(id:number){
    this.router.navigate(['/admin/new-employee/',id])
  }
  onDelete(id:number){
    const isConfirm = confirm("Are you sure want to delete!!")
    if(isConfirm){
      this.employeeSrv.deleteEmployee(id).pipe(
        takeUntil(this.takeUntilSubs$)
      ).subscribe({
        next:(res:IApiResponse)=>{
          if(res.result){
            alert("Employee Deleted Success")
            this.getAllEmployees()
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
  ngOnDestroy(): void {
    this.takeUntilSubs$.next()
  }
}
