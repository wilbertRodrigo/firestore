import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent {
  constructor(
    public auth: Auth,
    public database: Database,
    public router: Router,
    private authService: AuthService,
    private toastr: NotificationService
  ) {}
  email: string = '';
  password: string = '';

  resetForm() {
    this.email = '';
    this.password = '';
  }
}
