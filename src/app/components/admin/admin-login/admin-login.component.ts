import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Database, set, ref } from '@angular/fire/database';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  constructor(
    public auth: Auth,
    public database: Database,
    public router: Router
  ) {}

  // loginUser(value: any) {
  //   signInWithEmailAndPassword(this.auth, value.email, value.password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // <<<<<<< HEAD
  //       alert('login successful');

  //       this.router.navigate(['employees-dashboard']);
  //       // >>>>>>> 22ee2a8034af07e9b558691065966930432b09d5
  //       //         // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }
  loginUser(value: any) {
    signInWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('login successful');
        this.router.navigate(['employees-dashboard']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}