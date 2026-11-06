import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { Department } from './pages/Department/department/department';
import { Dashboard } from './pages/Dashboard/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { EmployeeList } from './pages/Employee/employee-list/employee-list';
import { NewEmployee } from './pages/Employee/new-employee/new-employee';
import { Leaves } from './pages/Leave/leaves/leaves';
import { MyProfile } from './pages/Employee/my-profile/my-profile';
import { NoAccess } from './pages/no-access/no-access';
import { roleBasedAccessGuard } from './core/guards/role-based-access-guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'admin',
        component:Layout,
        canActivate:[authGuard],
        children:[
            {
                path:'dashboard',
                canActivate:[roleBasedAccessGuard],
                component: Dashboard,
                data:{
                    title:'Dashboard'
                }
            },
            {
                path: 'my-profile',
                canActivate:[roleBasedAccessGuard],
                component: MyProfile,
                data:{
                    title:'My Profile'
                }
            },
            {
                path:'department',
                canActivate:[roleBasedAccessGuard],
                component:Department,
                data:{
                    title:'Department'
                }
            },
            {
                path: 'employees',
                canActivate:[roleBasedAccessGuard],
                component: EmployeeList,
                data:{
                    title:'Employees'
                }
            },
            {
                path: 'new-employee/:employeeId',
                canActivate:[roleBasedAccessGuard],
                component: NewEmployee,
                data:{
                    title:'New/Update Employee'
                }
            },
            {
                path: 'leaves',
                canActivate:[roleBasedAccessGuard],
                component: Leaves,
                data:{
                    title:'Leaves'
                }
            },
            {
                path: 'no-access',
                component: NoAccess,
                data:{
                    title:'No Access'
                }
            }
        ]
    }
];
