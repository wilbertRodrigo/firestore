import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  doc,
  runTransaction,
  DocumentReference,
  getDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Leave } from '../interface/leave';
import { Employee } from '../interface/employee';

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

  deductLeaveCredit(
    employeeId: string,
    leaveStartDate: Date,
    leaveEndDate: Date
  ): Observable<void> {
    const employeeRef = doc(
      this.firestore,
      `employees/${employeeId}`
    ) as DocumentReference<Employee>;

    const leaveDays = this.calculateLeaveDays(leaveStartDate, leaveEndDate);

    return from(
      runTransaction(this.firestore, async (transaction) => {
        const employeeDoc = await transaction.get(employeeRef);

        if (!employeeDoc.exists) {
          throw new Error('Employee not found');
        }

        const employeeData = employeeDoc.data() as Employee;

        if (employeeData.leaveCredits < leaveDays) {
          throw new Error('Not enough leave credits');
        }

        const leaveCredits = employeeData.leaveCredits - leaveDays;

        transaction.update(employeeRef, { leaveCredits });
      })
        .then(() => {
          console.log('Leave credits successfully deducted!');
        })
        .catch((error) => {
          console.error('Transaction failed: ');
          throw error;
        })
    );
  }

  private calculateLeaveDays(from: Date, to: Date): number {
    const diffTime = Math.abs(to.getTime() - from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getLeaveDetails(leaveId: string): Observable<Leave> {
    const leaveRef = doc(
      this.firestore,
      `leaves/${leaveId}`
    ) as DocumentReference<Leave>;
    return from(
      getDoc(leaveRef).then((docSnapshot) => {
        if (docSnapshot.exists()) {
          return docSnapshot.data() as Leave;
        } else {
          throw new Error('Leave not found');
        }
      })
    );
  }
}
