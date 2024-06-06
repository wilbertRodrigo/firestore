import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employee/employees/employees.component';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { FileLeaveComponent } from './components/leave/file-leave/file-leave.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { EmployeesDashboardComponent } from './components/employee/employees-dashboard/employees-dashboard.component';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { PasswordResetComponent } from './components/admin/password-reset/password-reset.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: EmployeesDashboardComponent,
    children: [
      { path: 'employees', component: EmployeesComponent },
      { path: 'summary', component: EmployeeDetailsComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
    ],
  },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/registration', component: AdminRegistrationComponent },
  { path: '', component: PasswordResetComponent },
  {
    path: 'employees/leave-application/:employeeId',
    component: FileLeaveComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
