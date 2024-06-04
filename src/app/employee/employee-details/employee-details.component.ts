import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employeesOnLeave$:
    | Observable<{ department: string; employees: Employee[] }[]>
    | undefined;

  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    const employees$ = this.employeeService.getEmployees();
    const leaves$ = this.leaveService.getLeaves();

    this.employeesOnLeave$ = combineLatest([employees$, leaves$]).pipe(
      map(([employees, leaves]) => {
        // Create a map to group employees by department
        const departmentMap = new Map<string, Employee[]>();

        if (employees && leaves) {
          // Iterate over leaves and match with employees
          leaves.forEach((leave) => {
            if (leave.leave) {
              // Ensure the leave is active
              const employee = employees.find(
                (emp) => emp.id === leave.employeeId
              );
              if (employee) {
                const department = employee.department;
                if (!departmentMap.has(department)) {
                  departmentMap.set(department, []);
                }
                departmentMap.get(department)!.push(employee);
              }
            }
          });
        }

        // Convert the map to an array of objects
        return Array.from(departmentMap.entries()).map(
          ([department, employees]) => ({
            department,
            employees,
          })
        );
      })
    );
  }
}
