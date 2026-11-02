export interface IApiResponse<T=any> {
    message: string,
    result: boolean,
    data:T
}

export interface ILoginUser{
    employeeId: number,
    employeeName: string,
    contactNo: string,
    emailId: string,
    deptId: number,
    password: string,
    gender: string,
    role: string
}