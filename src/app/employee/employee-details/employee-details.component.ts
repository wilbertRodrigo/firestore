import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  outputData$: Observable<[Employee, Leave[]]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (employeeId) {
      const employee$ = this.employeeService.getEmployeeById(employeeId);
      const leaves$ = this.leaveService.getLeavesByEmployeeId(employeeId);

      this.outputData$ = combineLatest([employee$, leaves$]).pipe(
        map(([employee, leaves]) => [employee, leaves])
      );
    }
  }
}
