import { Component } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
@Component({
  selector: 'app-employees-on-leave',
  templateUrl: './employees-on-leave.component.html',
  styleUrls: ['./employees-on-leave.component.css'],
})
export class EmployeesOnLeaveComponent {
  leavesWithEmployeeDetails: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveService.getLeavesWithEmployeeDetails().subscribe({
      next: (leaves) => {
        // Filter out employees who are not currently on leave
        this.leavesWithEmployeeDetails = leaves.filter((leave) => leave.leave);
      },
      error: (err) => {
        console.error('Error fetching leaves with employee details', err);
      },
    });
  }
}
