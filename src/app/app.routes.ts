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
                component: Dashboard
            },
            {
                path: 'my-profile',
                component: MyProfile
            },
            {
                path:'department',
                component:Department
            },
            {
                path: 'employees',
                component: EmployeeList
            },
            {
                path: 'new-employee/:employeeId',
                component: NewEmployee
            },
            {
                path: 'leaves',
                component: Leaves
            }
        ]
    }
];
