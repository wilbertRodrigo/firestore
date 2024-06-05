import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { FileLeaveComponent } from './components/leave/file-leave/file-leave.component';
import { EmployeesOnLeaveComponent } from './components/leave/employees-on-leave/employees-on-leave.component';
import { EmployeesDashboardComponent } from './components/employee/employees-dashboard/employees-dashboard.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employees-dashboard/employees', component: EmployeesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/registration',
    component: AdminRegistrationComponent,
  },
  {
    path: 'employees/leave-application/:employeeId',
    component: FileLeaveComponent,
  },
  {
    path: 'employees/employees-on-leave',
    component: EmployeesOnLeaveComponent,
  },
  {
    path: 'employees-dashboard',
    component: EmployeesDashboardComponent,
  },
  {
    path: '',
    component: FileLeaveComponent,
  },
  {
    path: 'employees-dashboard/details',
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
