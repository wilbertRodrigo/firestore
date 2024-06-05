import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmplooyeeDetailsDialogComponent } from 'src/app/modal/emplooyee-details-dialog/emplooyee-details-dialog.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  searchText = '';
  employeesOnLeave$:
    | Observable<{ employee: Employee; leaves: Leave[] }[]>
    | undefined;
  employees: Employee[] = [];

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.employeesOnLeave$ = this.employeeService.getEmployees().pipe(
      switchMap((employees) =>
        combineLatest(
          employees
            .filter((employee) => employee.id !== undefined)
            .map((employee) =>
              this.leaveService.getLeaves(employee.id!).pipe(
                map((leaves) => ({
                  employee: employee,
                  leaves: leaves,
                }))
              )
            )
        )
      )
    );
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }
  calculateLeaveDays(from: Date, to: Date): number {
    const diffTime = Math.abs(to.getTime() - from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  getLeavesByType(leaves: Leave[]): { [key: string]: Leave[] } {
    return leaves.reduce((acc, leave) => {
      const key = leave.leaveType;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(leave);
      return acc;
    }, {} as { [key: string]: Leave[] });
  }
  openDialog(item: { employee: Employee; leaves: Leave[] }) {
    this.dialog.open(EmplooyeeDetailsDialogComponent, {
      data: item,
    });
  }

  searchEmployees(): void {
    if (this.searchText === '') {
      this.getEmployees();
    } else {
      this.employees = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
