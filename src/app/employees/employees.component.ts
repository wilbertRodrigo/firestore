import { Component } from '@angular/core';
import { Employee } from 'src/employee';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
  employees$: Observable<Employee[]> | undefined;
  employee: any;
  employeeData: any;
  employeeForm!: FormGroup;
  editForm!: FormGroup;
  //forms toggle
  showEditForm = false;
  showViewEmployee = false;
  showAddEmployeeForm = false;

  toggleEditEmployeeForm() {
    this.showEditForm = !this.showEditForm;
  }
  toggleViewEmployee() {
    this.showViewEmployee = !this.showViewEmployee;
  }
  toggleAddEmployeeForm() {
    this.showAddEmployeeForm = !this.showAddEmployeeForm;
  }
  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    //this form is for adding employees
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      // Add other employee fields as needed
    });
    //this form is for editing employee
    this.editForm = this.fb.group({
      edit_name: ['', Validators.required],
      edit_email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getAllEmployees();
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
  //adding employee
  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService
        .addEmployee(newEmployee)
        .then(() => {
          console.log('Employee added successfully');
          this.showAddEmployeeForm = !this.showAddEmployeeForm;
          this.employeeForm.reset();
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
    this.employeeService
      .updateEmployee(employee)
      .then(() => {
        this.showEditForm = !this.showEditForm;
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
    });
    this.showEditForm = !this.showEditForm;
    console.log(employee);
  }
}
