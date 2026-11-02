import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/auth/layout/layout';
import { pattern } from '@angular/forms/signals';
import { Department } from './pages/Department/department/department';
import { Dashboard } from './pages/Dashboard/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

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
                path:'department',
                component:Department
            }
        ]
    }
];
