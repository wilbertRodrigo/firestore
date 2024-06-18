import { Component, OnInit, HostBinding } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interface/employee';
import { MatDialog } from '@angular/material/dialog';
import { EmplooyeeDetailsDialogComponent } from 'src/app/modal/emplooyee-details-dialog/emplooyee-details-dialog.component';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { LeaveService } from 'src/app/services/leave.service';
import { Leave } from 'src/app/interface/leave';
import { EmployeeWithLeave } from 'src/app/interface/employeesWithLeave';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query(
          '.hero',
          [
            style({ opacity: 0, transform: 'translateY(-100px)' }),
            stagger(30, [
              animate(
                '500ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' })
              ),
            ]),
          ],
          { optional: true }
        ), // Correct placement of { optional: true }
      ]),
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: 0 }),
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
          ],
          { optional: true } // Correctly placed
        ),
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: 0 })),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class EmployeeDetailsComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  searchText = '';

  data: any;
  employees: EmployeeWithLeave[] = [];
  selectedEmployee: Employee | undefined;
  currentLeaveDetails: Leave | undefined;
  constructor(
    private employeeService: EmployeeService,
    private leaveService: LeaveService, // Inject LeaveService
    private dialog: MatDialog,
    private http: HttpClient
  ) {}
  heroesTotal = -1;
  employeesTotal = -1;

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
      this.heroesTotal = employees.length; // Set the total for animation
    });
  }

  updateCriteria(criteria: string) {
    criteria = criteria ? criteria.trim() : '';

    this.employees = this.employees.filter((hero) =>
      hero.name.toLowerCase().includes(criteria.toLowerCase())
    );
    const newTotal = this.employees.length;

    if (this.employeesTotal !== newTotal) {
      this.heroesTotal = newTotal;
    } else if (!criteria) {
      this.employeesTotal = -1;
    }
  }
  getLeaveDetails(leaveId: string): void {
    this.leaveService.getLeaveDetails(leaveId).subscribe({
      next: (leave) => {
        this.currentLeaveDetails = leave; // Update the property with the fetched leave details
      },
      error: (error) => console.error(error),
    });
  }
}
