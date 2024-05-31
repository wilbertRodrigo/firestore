import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  getDoc,
  collection,
  addDoc,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { from, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firestore: Firestore,
    private fireAuth: Auth,
    private jwtHelper: JwtHelperService
  ) {}
  async getUserLogInResponse(
    res: object,
    collectionName: string
  ): Promise<object> {
    try {
      const uid = (res as any).user.uid;
      const docRef = doc(this.firestore, collectionName, uid);
      const docData = await getDoc(docRef);

      if (!docData.exists()) {
        console.log('No such document!');
        return {};
      }
      const userObject = docData.data();
      const userEmail = userObject['email'];
      const isAdmin = userObject['isAdmin'];
      return { res, userEmail, isAdmin };
    } catch (error) {
      console.error('Error retrieving login response', error);
      return {};
    }
  }

  userLogin(email: string, password: string, role: string) {
    return from(
      signInWithEmailAndPassword(this.fireAuth, email, password)
    ).pipe(switchMap((res) => this.getUserLogInResponse(res, role)));
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
}
