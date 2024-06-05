import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';
import { TypesOfLeave } from '../../../interface/typesOfLeave';

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
        const leave: Leave = {
          id: leaveType + leaveStartDate, // Assuming unique combination
          leaveType,
          from: leaveStartDate,
          to: leaveEndDate,
          employeeId,
        };

        this.leaveService.addLeave(leave).subscribe({
          next: () => {
            this.leaveService.addLeaveCredit(employeeId, leave.id!).subscribe({
              next: () => {
                console.log('Leave filed and credit added successfully');
                this.leaveForm.reset();
                this.router.navigate(['employees-dashboard/employees']);
              },
              error: (err) => {
                console.error('Error adding leave credit', err);
              },
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
