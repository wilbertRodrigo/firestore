import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  // constructor(private fireStore: Firestore) {}
  // name: string = '';
  // email: string = '';
  // reset() {
  //   this.name = '';
  //   this.email = '';
  // }
  // onSubmit() {
  //   addDoc(collection(this.fireStore, 'employees'), {
  //     name: this.name,
  //     email: this.email,
  //   });
  //   this.reset();
  // }

  // constructor(
  //   private fb: FormBuilder,
  //   private employeeService: EmployeeService
  // ) {
  //   this.employeeForm = this.fb.group(
  //     name: ['', Validators.required],
  //     email: ['', Validators.required],
  //   )
  // }

  // employeeForm!: FormGroup;

  ngOnInit(): void {}
}
