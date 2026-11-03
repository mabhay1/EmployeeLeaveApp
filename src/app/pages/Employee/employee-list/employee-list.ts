import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IApiResponse } from '../../../core/models/interface/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { NgClass } from '@angular/common';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';

@Component({
  imports: [RouterLink, GetInitialsPipe, NgClass],
  selector: 'app-employee-list',
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList implements OnInit{

  employees=signal<IEmployeeList[]>([])

  employeeSrv=inject(EmployeeService)
  router = inject(Router)

  globalConstantValue=GlobalConstant


  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.employeeSrv.getAllEmployees().subscribe({
      next:(res:IApiResponse<IEmployeeList[]>)=>{
        this.employees.set(res.data)
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
      this.employeeSrv.deleteEmployee(id).subscribe({
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
}
