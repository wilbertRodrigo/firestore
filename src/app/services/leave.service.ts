import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  setDoc,
  query,
  where,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Leave } from '../interface/leave';

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

  // Adding a leave
  addLeave(leave: Leave): Observable<void> {
    const leaveRef = doc(this.firestore, `leaves/${leave.id}`);
    return from(setDoc(leaveRef, leave));
  }
  addLeaveCredit(employeeId: string, leaveId: string): Observable<void> {
    const leaveCreditRef = doc(
      this.firestore,
      `employees/${employeeId}/leaveCredits/${leaveId}`
    );
    return from(setDoc(leaveCreditRef, { leaveId }));
  }

  getLeaves(employeeId: string): Observable<Leave[]> {
    const leavesQuery = query(
      this.leavesCollection,
      where('employeeId', '==', employeeId)
    );
    return new Observable<Leave[]>((subscriber) => {
      const unsubscribe = onSnapshot(leavesQuery, (snapshot) => {
        subscriber.next(snapshot.docs.map((doc) => doc.data() as Leave));
      });
      // Unsubscribe on cleanup
      return () => unsubscribe();
    });
  }
  calculateLeaveDays(from: Date, to: Date): number {
    const diffTime = Math.abs(to.getTime() - from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  getLeaveDaysByType(leaves: Leave[]): { [key: string]: number } {
    return leaves.reduce((acc, leave) => {
      const leaveType = leave.leaveType;
      const leaveDays = this.calculateLeaveDays(
        new Date(leave.from),
        new Date(leave.to)
      );
      if (acc[leaveType]) {
        acc[leaveType] += leaveDays;
      } else {
        acc[leaveType] = leaveDays;
      }
      return acc;
    }, {} as { [key: string]: number });
  }
}
