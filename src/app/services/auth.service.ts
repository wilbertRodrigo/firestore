import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import {
  Firestore,
  getDoc,
  collection,
  addDoc,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';

import { JwtHelperService } from '@auth0/angular-jwt';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    public router: Router // private jwtHelper: JwtHelperService
  ) {}

  //create admin document
  createAdminLoginCredential(uid: string, adminObject: object) {
    try {
      setDoc(doc(this.firestore, 'adminAccounts', uid), adminObject);
      console.log('Admin Login Account Document Created');
    } catch (error) {
      console.log('Error Creating Admin Login Account Document');
    }
  }

  registerWithEmailAndPassword(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((adminCredential) => {
        this.createAdminLoginCredential(adminCredential.user.uid, {
          email: email,
          role: 'admin',
        });
        console.log('Admin Registered');
        return adminCredential;
      })
      .catch((error) => {
        console.log('Error Registering Admin');
        throw error;
      });
  }
  loginWithEmailAndPassword(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((adminCredential) => {
        console.log('Admin Logged In');
        return adminCredential;
      })
      .catch((error) => {
        console.log('Error Logging In Admin');
        throw error;
      });
  }
  logout() {
    this.auth.signOut();
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  googleLogin() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken; // Add null check for credential
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
