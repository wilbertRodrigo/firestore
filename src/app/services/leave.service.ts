import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  addDoc,
  DocumentReference,
  collectionData,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

interface Leave {
  leave: string;
  employeeId: string;
  id?: string; // Add an optional id field
}

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private leavesCollection: CollectionReference<Leave>;

  constructor(private firestore: Firestore) {
    this.leavesCollection = collection(
      this.firestore,
      'leaves'
    ) as CollectionReference<Leave>;
  }

  // Adding Leave
  addLeave(
    leave: string,
    employeeId: string
  ): Promise<DocumentReference<Leave>> {
    return addDoc(this.leavesCollection, { leave, employeeId });
  }

  // Getting leaves collection as an observable
  getLeaves(): Observable<Leave[]> {
    return collectionData(this.leavesCollection, {
      idField: 'id',
    }) as Observable<Leave[]>;
  }

  // Filing a leave for an employee
  fileLeave(
    leave: string,
    employeeId: string
  ): Observable<DocumentReference<Leave>> {
    const leaveDocument = { leave, employeeId };
    return from(addDoc(this.leavesCollection, leaveDocument));
  }
}
