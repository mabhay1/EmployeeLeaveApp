import { GlobalConstant } from "./GlobalConstant";

export const MenuConstant=[
    {
        ROUTE_TITLE:'Dashboard',
        ROUTE_PATH:'dashboard',
        ICON_CLASS:'fa-solid fa-table-columns',
        SHOW_IN_SIDEBAR:true,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR,GlobalConstant.ROLE.EMPLOYEE,GlobalConstant.ROLE.DEPARTMENT_HEAD]
    },
    {
        ROUTE_TITLE:'Employees',
        ROUTE_PATH:'employees',
        ICON_CLASS:'fa-solid fa-users',
        SHOW_IN_SIDEBAR:true,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR]
    },
    {
        ROUTE_TITLE:'Departments',
        ROUTE_PATH:'department',
        ICON_CLASS:'fa-solid fa-building',
        SHOW_IN_SIDEBAR:true,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR]
    },
    {
        ROUTE_TITLE:'Leaves',
        ROUTE_PATH:'leaves',
        ICON_CLASS:'fa-regular fa-calendar-check',
        SHOW_IN_SIDEBAR:true,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR,GlobalConstant.ROLE.EMPLOYEE,GlobalConstant.ROLE.DEPARTMENT_HEAD]
    },
    {
        ROUTE_TITLE:'',
        ROUTE_PATH:'my-profile',
        ICON_CLASS:'',
        SHOW_IN_SIDEBAR:false,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR,GlobalConstant.ROLE.EMPLOYEE,GlobalConstant.ROLE.DEPARTMENT_HEAD]
    },
    {
        ROUTE_TITLE:'',
        ROUTE_PATH:'new-employee',
        ICON_CLASS:'',
        SHOW_IN_SIDEBAR:false,
        ALLOWED_ROLES:[GlobalConstant.ROLE.HR]
    }


]