export interface IEmployeeModel{
    employeeId: number,
    employeeName: string,
    deptId: number,
    contactNo: string,
    emailId: string,
    role: string,
    password: string,
    gender: string,
}

export interface IEmployeeList extends IEmployeeModel{
    deptName:string
}



