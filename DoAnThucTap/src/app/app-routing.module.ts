import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { AuthGuard } from './../app/_helpers/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { EmployeeManagerComponent } from './pages/employee-manager/employee-manager.component';
import { RoleManagerComponent } from './pages/role-manager/role-manager.component';
import { DepartmentManagerComponent } from './pages/department-manager/department-manager.component';
import { ContractComponent } from './pages/contract/contract.component';
import { TimekeepingComponent } from './pages/timekeeping/timekeeping.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'employee',
    component: EmployeeManagerComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'contract',
    component: ContractComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'role',
    component: RoleManagerComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'department',
    component: DepartmentManagerComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'timekeeping',
    component: TimekeepingComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent, EmployeeManagerComponent, RoleManagerComponent]
})
export class AppRoutingModule { }
