export class LeaveModel {
    leaveId: number
    employeeId: number
    fromDate: string
    toDate: string
    noOfDays: number
    leaveType: string
    details: string
    isApproved: boolean|null
    approvedDate: string|null
    constructor(){
        this.leaveId= 0
        this.employeeId= 0
        this.fromDate= ''
        this.toDate= ''
        this.noOfDays= 0
        this.leaveType= ''
        this.details= ''
        this.isApproved= null
        this.approvedDate = null
    }
}