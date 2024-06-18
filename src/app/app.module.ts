import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Import ToastrModule and ToastrService
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
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
import { AgentsComponent } from './animation/agents/agents.component';

import { DetailComponent } from './components/employee/employee-details/detail/detail.component';
import { connectAuthEmulator } from '@firebase/auth';
import { connectFirestoreEmulator } from '@firebase/firestore';
import { connectStorageEmulator } from '@firebase/storage';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from '@angular/common/http';

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
    AngularFireModule,
    HttpClientModule,

    // Import and provide ToastrModule.forRoot() here
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => {
      const auth = getAuth();
      if (environment.production === false) {
        connectAuthEmulator(auth, 'http://127.0.0.1:4000');
      }
      return auth;
    }),

    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.production === false) {
        connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return firestore;
    }),

    provideStorage(() => {
      const storage = getStorage();
      if (environment.production === false) {
        connectStorageEmulator(storage, '', 9199);
      }
      return storage;
    }),
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
