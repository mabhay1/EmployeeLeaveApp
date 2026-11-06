import { Component, inject, OnInit, signal } from '@angular/core';
import { IDepartmentList } from '../../../core/models/interface/department.model';
import { DepartmentService } from '../../../core/services/department/department-service';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiResponse, ILoginUser } from '../../../core/models/interface/common.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { NaPipe } from '../../../shared/pipes/na-pipe';
import { DepartmentModel } from '../../../core/models/class/department.model';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { map, Observable } from 'rxjs';
import { IEmployeeList } from '../../../core/models/interface/employee.model';
import { readLoggedUserData } from '../../../core/helper/common.helper';
import { GlobalConstant } from '../../../core/constants/GlobalConstant';
import { GetValidationMessagePipe } from '../../../shared/pipes/get-validation-message-pipe';

@Component({
  imports: [DatePipe,GetInitialsPipe,NaPipe,FormsModule, NgClass, NgIf, DecimalPipe,AsyncPipe, GetValidationMessagePipe],
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

  departmentHeadEmployeesObs$:Observable<IEmployeeList[]>=new Observable<IEmployeeList[]>()

  isFormButtonClicked:boolean=false

  ngOnInit(): void {
    this.getAllDepartments()
    this.departmentHeadEmployeesObs$=this.employeeService.getAllEmployees().pipe(
      map((res:IApiResponse<IEmployeeList[]>)=>res.data.filter(x=>x.role===GlobalConstant.ROLE.DEPARTMENT_HEAD && x.deptId===this.departmentObj.deptId))
    )
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
    this.isFormButtonClicked=false
  }
  onCreateDepartment(form:NgForm){
    this.isFormButtonClicked=true
    if(form.valid){
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
  }

  onUpdateDepartment(form: NgForm) {
    this.isFormButtonClicked=true
    if (form.valid) {
      this.departmentSrv.updateDepartment(this.departmentObj).subscribe({
        next: (res: IApiResponse<IDepartmentList>) => {
          if (res.result) {
            alert("Department Updated Successfully")
            this.getAllDepartments()
            this.onReset(form)
            this.openCloseForm(false)
          }
          else {
            alert(res.message)
          }
        }, error: (err: HttpErrorResponse) => {
          alert("API Error")
        }
      })
    }
  }

}
