import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-employees-dashboard',
  templateUrl: './employees-dashboard.component.html',
  styleUrls: ['./employees-dashboard.component.css'],
})
export class EmployeesDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: NotificationService
  ) {}

  signOut() {
    this.authService.logout();
    this.router.navigate(['admin/login']);
    this.toastr.showSuccess('Admin Logged Out', 'Success');
  }
}
