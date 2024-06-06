import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    public auth: Auth,
    public database: Database,
    public router: Router,
    public toastr: NotificationService,
    private authService: AuthService
  ) {}

  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email === '' || this.password === '') {
      alert('Please fill in all fields');
      return;
    }

    this.authService
      .loginWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.toastr.showSuccess('Login Successful', 'Success');
        this.router.navigate(['dashboard']);
        this.resetForm();
      })
      .catch(() => {
        this.toastr.showError('Error Logging In', 'Error');
        this.resetForm();
      });
  }

  resetForm() {
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.authService
      .googleLogin()
      .then(() => {
        this.toastr.showSuccess('Login Successful', 'Success');
        this.router.navigate(['dashboard']);
      })
      .catch(() => {
        this.toastr.showError('Error Logging In', 'Error');
      });
  }
}
