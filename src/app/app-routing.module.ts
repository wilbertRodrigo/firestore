import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/login', component: AdminLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
