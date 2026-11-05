export const GlobalConstant = {
    API_METHODS:{
        LOGIN_USER:'Login',
        DEPARTMENT:{
            GET_ALL_DEPARTMENTS:'GetDepartments',
            CREATE_DEPARTMENT: 'CreateDepartment',
            UPDATE_DEPARTMENT:'UpdateDepartment',
            DELETE_DEPARTMENT:'DeleteDepartment?id='
        },
        EMPLOYEE:{
            GET_ALL_EMPLOYEES:'GetEmployees',
            GET_EMPLOYEE_BY_ID:'GetEmployeeById?id=',
            GET_EMPLOYEE_BY_DEPARTMENT_ID:'GetEmployeesByDeptId?id=',
            CREATE_EMPLOYEE: 'CreateEmployee',
            UPDATE_EMPLOYEE:'UpdateEmployee',
            DELETE_EMPLOYEE:'DeleteEmployee?id='
        },
        LEAVES:{
            GET_ALL_LEAVES:'GetAllLeaves',
            GET_ALL_LEAVES_BY_EMP_ID:'GetAllLeavesByEmployeeId?id=',
            GET_LEAVES_APPROVAL_BY_SUPERVISOR_ID:'GetLeavesForApprovalBySuperwiserId?id=',
            ADD_LEAVE: 'AddLeave',
            APPROVE_LEAVE:'ApproveLeave?id=',
            REJECT_LEAVE:'RejectLeave?id='
        }
    },
    LOCAL_LOGIN_KEY: 'EmployeeLeaveAppUser',
    ROLE:{
        HR:'HR',
        EMPLOYEE:'Employee',
        DEPARTMENT_HEAD:'Department Head'
    },
    ROLE_LIST:[
        'HR',
        'Employee',
        'Department Head'
    ],
    GENDER:{
        MALE:'Male',
        FEMALE: 'Female'
    },
    GENDER_LIST:[
        'Male',
        'Female'
    ],
    LEAVE_TYPE:{
        CASUAL_LEAVE:{
            NAME:'Casual leave',
            ICON_CLASS:'fa-regular fa-sun'
        },
        SICK_LEAVE:{
            NAME:'Sick leave',
            ICON_CLASS:'fa-solid fa-heart-pulse'
        },
        ANNUAL_LEAVE: {
            NAME:'Annual leave',
            ICON_CLASS:'fa-regular fa-calendar-check'
        }
    },
    LEAVE_STATUS:{
        APPROVED:'Approved',
        PENDING:'Pending',
        REJECTED:'Rejected'
    }

}