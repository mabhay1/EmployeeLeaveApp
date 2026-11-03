import { Component, inject, OnInit, signal } from '@angular/core';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { DepartmentService } from '../../../core/services/department/department-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse } from '../../../core/models/interface/common.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { NaPipe } from '../../../shared/pipes/na-pipe';
import { DepartmentModel } from '../../../core/models/class/department.model';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee/employee-service';

@Component({
  imports: [DatePipe,GetInitialsPipe,NaPipe,FormsModule, NgClass, NgIf, DecimalPipe, AsyncPipe],
  selector: 'app-department',
  styleUrl: './department.css',
  templateUrl: './department.html',
})
export class Department implements OnInit {

  departmentList=signal<IDepartmentList[]>([])

  isFormOpen:boolean=false;

  departmentSrv = inject(DepartmentService)
  employeeService = inject(EmployeeService)

  departmentObj:DepartmentModel=new DepartmentModel()


  ngOnInit(): void {
    this.getAllDepartments()
  }
  openCloseForm(isFormOpen:boolean){
    this.isFormOpen=isFormOpen
  }

  getAllDepartments(){
    this.departmentSrv.getAllDepartments().subscribe({
      next:(res:IApiResponse<IDepartmentList[]>)=>{
        this.departmentList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }
  onEdit(obj:IDepartmentList){
    const stringObj=JSON.stringify(obj)
    this.departmentObj=JSON.parse(stringObj)
    this.openCloseForm(true)
  }
  onDelete(id:number){
    const isConfirm = confirm("Are you sure want to Delete!!")
    if(isConfirm){
      this.departmentSrv.deleteDepartmentById(id).subscribe({
        next:(res)=>{
          if(res.result){
            alert("Department Deleted Successfully")
            this.getAllDepartments()
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
  onReset(form:NgForm){
    form.reset()
    this.departmentObj=new DepartmentModel()
  }
  onCreateDepartment(form:NgForm){
    this.departmentSrv.createDepartment(this.departmentObj).subscribe({
      next:(res:IApiResponse<IDepartmentList>)=>{
        if(res.result){
          alert("Department Created Successfully")
          this.getAllDepartments()
          this.onReset(form)
          this.openCloseForm(false)
        }
        else{
          alert(res.message)
        }
      },error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }

  onUpdateDepartment(form:NgForm){
    this.departmentSrv.updateDepartment(this.departmentObj).subscribe({
      next:(res:IApiResponse<IDepartmentList>)=>{
        if(res.result){
          alert("Department Updated Successfully")
          this.getAllDepartments()
          this.onReset(form)
          this.openCloseForm(false)
        }
        else{
          alert(res.message)
        }
      },error:(err:HttpErrorResponse)=>{
        alert("API Error")
      }
    })
  }

}
