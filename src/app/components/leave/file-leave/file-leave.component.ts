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
  employee: Employee | undefined; // Adjust the type based on your Employee model
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
            this.leaveForm.reset();
            this.router.navigate(['employees/employees-on-leave']);
          },
          error: (err) => {
            console.error('Error filing leave', err);
          },
        });
      }
    }
  }
}
