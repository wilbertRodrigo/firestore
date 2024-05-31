// import { Component } from '@angular/core';
// import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

// @Component({
//   selector: 'app-employee-registration',
//   templateUrl: './employee-registration.component.html',
//   styleUrls: ['./employee-registration.component.css'],
// })
// export class EmployeeRegistrationComponent {
//   constructor(private auth: Auth) {}
//   resgisterEmployee(value: any) {
//     createUserWithEmailAndPassword(this.auth, value.email, value.password)
//       .then((employeeCredential) => {
//         // Signed up
//         const employee = employeeCredential.employee;
//         // ...

//         alert(`Registration success using ${employee.email}`)
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//       });
//   }
// }
