import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import ToastrModule and ToastrService
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { EmployeesComponent } from './components/employee/employees/employees.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './components/admin/registration/registration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { FileLeaveComponent } from './components/leave/file-leave/file-leave.component';

import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';
import { EmployeesDashboardComponent } from './components/employee/employees-dashboard/employees-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmplooyeeDetailsDialogComponent } from './modal/emplooyee-details-dialog/emplooyee-details-dialog.component';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './components/admin/password-reset/password-reset.component';
import { LandingComponent } from './components/admin/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,

    RegistrationComponent,
    AdminLoginComponent,
    AdminRegistrationComponent,
    AdminLoginComponent,
    FileLeaveComponent,
    EmployeeDetailsComponent,
    EmployeesDashboardComponent,
    EmplooyeeDetailsDialogComponent,
    ConfirmationComponent,
    PageNotFoundComponent,
    PasswordResetComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,

    // Import and provide ToastrModule.forRoot() here
    ToastrModule.forRoot(),

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
    BrowserAnimationsModule,
  ],
  providers: [
    // Provide ToastrService here
    ToastrService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
