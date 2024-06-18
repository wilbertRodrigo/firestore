import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-file-leave',
  templateUrl: './file-leave.component.html',
  styleUrls: ['./file-leave.component.css'],
})
export class FileLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  employee: Employee | undefined;
  leaveTypes = ['Emergency', 'Sick Leave', 'Maternity', 'Vacation Leave'];

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: NotificationService
  ) {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      leaveStartDate: ['', Validators.required],
      leaveEndDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      this.employeeService.getEmployeeById(employeeId).subscribe((employee) => {
        this.employee = employee;
      });
    }
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const { leaveType, leaveStartDate, leaveEndDate } = this.leaveForm.value;
      const employeeId = this.employee?.id;
      if (employeeId) {
        // Convert strings to Date objects
        const startDate: Date = new Date(leaveStartDate);
        const endDate: Date = new Date(leaveEndDate);

        const leave: Leave = {
          id: '', // Leave the ID empty for Firestore to auto-generate
          leaveType,
          from: startDate,
          to: endDate,
          employeeId,
        };

        this.leaveService
          .deductLeaveCredit(employeeId, leave.from, leave.to)
          .subscribe({
            next: () => {
              console.log('Leave credit deducted successfully');
              this.toastr.showSuccess(
                'Leave credit deducted successfully',
                'Success'
              );
              // Redirect to appropriate route, assuming '/dashboard/leaves'
              this.router.navigate(['/dashboard/summary']);
            },
            error: (err) => {
              if (err.message === 'Not enough leave credits') {
                this.toastr.showError('Not enough leave credits', 'Error');
              } else if (err.message === 'Employee not found') {
                this.toastr.showError('Employee not found', 'Error');
              } else {
                this.toastr.showError('Error deducting leave credits', 'Error');
                console.error('Error deducting leave credits', err);
              }
            },
          });
      }
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/employees']);
  }
}
