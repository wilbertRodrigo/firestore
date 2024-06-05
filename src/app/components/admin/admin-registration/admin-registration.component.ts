import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent {
  constructor(
    public auth: Auth,
    public database: Database,
    public router: Router
  ) {}

  registerUser(value: any) {
    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        //this is for real-time database
        // set(ref(this.database, 'users/' + user.uid), {
        //   username: value.username,
        //   email: value.email,
        // });

        alert(`user created with ${user.email}`); //later will add router
        this.router.navigate(['admin/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);

        // ..
      });
  }
}
