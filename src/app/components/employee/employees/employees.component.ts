import { Component } from '@angular/core';
import { Employee } from '../../../interface/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees$: Observable<Employee[]> | undefined;
  employeesOnLeave: Employee[] = [];
  today: string;
  employee: Employee | undefined;
  employees: Employee[] = [];
  employeeData: any;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  //forms toggle
  showEditForm = false;
  showViewEmployee = false;
  showAddEmployeeForm = false;
  showViewAndDelete = false;
  successMessage: string | null = null; // Add this property
  departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];

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
    private fb: FormBuilder,
    private toastr: NotificationService
  ) {
    //this form is for adding employees
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      department: ['', Validators.required],
      // Add other employee fields as needed
    });
    //this form is for editing employee
    this.editForm = this.fb.group({
      edit_name: ['', Validators.required],
      edit_email: ['', [Validators.required, Validators.email]],
      edit_dateOfHire: ['', [Validators.required]],
      edit_department: ['', Validators.required],
    });

    const now = new Date();
    this.today = now.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.getEmployees();
  }
  //getting all employees
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  //getting specific employee detail
  getEmployeeDetails(employee: Employee) {
    this.showViewEmployee = !this.showViewEmployee;
    this.employeeData = employee;
    console.log(this.employeeData.leaves);
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
          this.toastr.showSuccess('Employee added successfully', 'Success');
        })
        .catch(() => {
          this.toastr.showError('Error adding employee', 'Error');
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
        this.toastr.showSuccess('Employee deleted successfully', 'Success');
      })
      .catch(() => {
        this.toastr.showError('Error deleting employee', 'Error');
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
    this.employeeData.department = value.edit_department;
    this.employeeService
      .updateEmployee(employee)
      .then(() => {
        this.showEditForm = !this.showEditForm;
        this.toastr.showSuccess('Employee updated successfully', 'Success');
        console.log('Update successful');
        // Optionally, refresh the employee list
        this.getEmployees();
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
      edit_department: employee.department,
    });
    this.showEditForm = !this.showEditForm;
    console.log(employee);
  }

  allEmployeesNames: string[] = [];

  getAllEmployeesNames() {
    this.employees$ = this.employeeService.getEmployees();
    this.employees$
      .pipe(map((employees) => employees.map((employee) => employee.name)))
      .subscribe((names) => {
        console.log(names);
      });
  }
}
