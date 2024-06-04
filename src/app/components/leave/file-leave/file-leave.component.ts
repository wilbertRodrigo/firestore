import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';

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
    private route: ActivatedRoute
  ) {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
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
      const { leaveType } = this.leaveForm.value;
      const employeeId = this.employee?.id;
      if (employeeId) {
        this.leaveService.fileLeave(employeeId, leaveType).subscribe({
          next: (result) => {
            console.log('Leave filed successfully', result);
            this.employeeService
              .updateEmployeeLeaveStatus(employeeId, true)
              .then(() => {
                console.log('Employee leave status updated to true');
                this.leaveForm.reset();
                this.router.navigate(['employees-dashboard/employees']);
              })
              .catch((error) => {
                console.error('Error updating employee leave status', error);
              });
          },
          error: (err) => {
            console.error('Error filing leave', err);
          },
        });
      }
    }
  }

  toggleLeaveStatus() {
    const employeeId = this.employee?.id;
    if (employeeId) {
      this.employeeService
        .updateEmployeeLeaveStatus(employeeId, false)
        .then(() => {
          console.log('Employee leave status updated to false');
          this.router.navigate(['employees-dashboard/employees']);
        })
        .catch((error) => {
          console.error('Error updating employee leave status', error);
        });
    }
  }
}
