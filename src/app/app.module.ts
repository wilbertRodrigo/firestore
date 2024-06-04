import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { EmployeesComponent } from './employee/employees/employees.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './admin/admin-registration/admin-registration.component';
import { FileLeaveComponent } from './components/leave/file-leave/file-leave.component';
import { EmployeesOnLeaveComponent } from './components/leave/employees-on-leave/employees-on-leave.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';

import { EmployeesDashboardComponent } from './employee/employees-dashboard/employees-dashboard.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeesOnLeaveComponent,
    DashboardComponent,
    RegistrationComponent,
    AdminLoginComponent,
    AdminRegistrationComponent,
    AdminLoginComponent,
    FileLeaveComponent,
    EmployeeDetailsComponent,
    EmployeesDashboardComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('idToken');
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
