import { Component } from '@angular/core';
import { Employee } from '../../interface/employee';
import { EmployeeService } from '../../services/employee.service';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees$: Observable<Employee[]> | undefined;
  today: string;
  employee: Employee | undefined;
  employeeData: any;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  //forms toggle
  showEditForm = false;
  showViewEmployee = false;
  showAddEmployeeForm = false;
  showViewAndDelete = false;
  successMessage: string | null = null; // Add this property

  toggleEditEmployeeForm() {
    this.showEditForm = !this.showEditForm;
  }
  toggleViewEmployee() {
    this.showViewEmployee = !this.showViewEmployee;
  }
  toggleAddEmployeeForm() {
    this.employeeForm.reset();
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }
  toggleshowViewAndDelete() {
    this.showViewAndDelete = !this.showViewAndDelete;
  }
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    //this form is for adding employees
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      // Add other employee fields as needed
    });
    //this form is for editing employee
    this.editForm = this.fb.group({
      edit_name: ['', Validators.required],
      edit_email: ['', [Validators.required, Validators.email]],
      edit_dateOfHire: ['', [Validators.required]],
    });

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }
  //use property binding
  getEmployeeRoute(employee: Employee): string {
    return `/employees/leave-application/${employee.id}`;
  }

  ngOnInit() {
    this.getAllEmployees();
    this.checkRegularEmployees();
  }
  //getting all employees
  getAllEmployees() {
    this.employees$ = this.employeeService.getEmployees();
  }

  //getting specific employee detail
  getEmployeeDetails(employee: Employee) {
    this.showViewEmployee = !this.showViewEmployee;
    this.employeeData = employee;
    console.log(this.employeeData);
  }

  getEmployeeDetailsAndDelete(employee: Employee) {
    this.showViewAndDelete = !this.showViewAndDelete;
    this.employeeData = employee;
    console.log(this.employeeData);
  }
  //adding employee
  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService
        .addEmployee(newEmployee)
        .then(() => {
          console.log(newEmployee);
          this.showAddEmployeeForm = !this.showAddEmployeeForm;
          this.employeeForm.reset();
          this.successMessage = 'Success'; // Set success message
          setTimeout(() => (this.successMessage = null), 3000); // Clear message after 5 seconds
        })
        .catch((error) => {
          console.error('Error adding employee: ', error);
        });
    }
  }
  //deleting employee
  removeEmployee(employee: Employee) {
    this.employeeService
      .removeEmployee(employee)
      .then(() => {
        console.log('Deletion successful');
        // Optionally, refresh the employee list
        this.showViewAndDelete = !this.showViewAndDelete;
        this.successMessage = 'Success'; // Set success message
        setTimeout(() => (this.successMessage = null), 3000);
        this.getAllEmployees();
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  }

  //updating employee
  editEmployee(employee: Employee) {
    const { value } = this.editForm;
    console.log(value);
    this.employeeData.id = employee.id;
    this.employeeData.name = value.edit_name;
    this.employeeData.email = value.edit_email;
    this.employeeData.dateOfHire = value.edit_dateOfHire;
    this.employeeService
      .updateEmployee(employee)
      .then(() => {
        this.showEditForm = !this.showEditForm;
        this.successMessage = 'Success'; // Set success message
        setTimeout(() => (this.successMessage = null), 3000);
        console.log('Update successful');
        // Optionally, refresh the employee list
        this.getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAndEditEmployeeData(employee: Employee) {
    this.employeeData = employee;
    this.editForm.patchValue({
      edit_name: employee.name,
      edit_email: employee.email,
      edit_dateOfHire: employee.dateOfHire,
    });
    this.showEditForm = !this.showEditForm;
    console.log(employee);
  }
  // allEmployeesNames: string[] = [];

  // getAllEmployeesNames() {
  //   this.employees$ = this.employeeService.getEmployees();
  //   this.employees$
  //     .pipe(map((employees) => employees.map((employee) => employee.name)))
  //     .subscribe((names) => {
  //       this.allEmployeesNames = names;
  //       this.allEmployeesNames.forEach((names) => console.log(names));
  //     });
  // }
  allEmployeesNames: string[] = [];

  getAllEmployeesNames() {
    this.employees$ = this.employeeService.getEmployees();
    this.employees$
      .pipe(map((employees) => employees.map((employee) => employee.name)))
      .subscribe((names) => {
        this.allEmployeesNames = names;
        this.allEmployeesNames.forEach((names) => console.log(names));
      });
  }
  regularEmployees: Employee[] = [];
  // getAllRegularEmployees(): void {
  //   this.employees$ = this.employeeService.getEmployees();
  //   this.employees$
  //     .pipe(
  //       map((employees) =>
  //         employees.filter(
  //           (employee) => employee.employmentStatus === 'regular'
  //         )
  //       )
  //     )
  //     .subscribe((regularEmployees) => {
  //       regularEmployees.forEach((employee) => console.log(employee.name));
  //     });
  // }

  checkRegularEmployees(): void {
    this.employees$ = this.employeeService.getEmployees();
    this.employees$
      .pipe(
        map((employees) =>
          employees.filter((employee) => {
            const hireDate = new Date(employee.dateOfHire);
            const currentDate = new Date();
            const diffMonths =
              currentDate.getMonth() -
              hireDate.getMonth() +
              12 * (currentDate.getFullYear() - hireDate.getFullYear());
            return diffMonths >= 6;
          })
        )
      )
      .subscribe((regularEmployees) => {
        this.regularEmployees = regularEmployees; // Store the regular employees
      });
  }
}
