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
    ]


}