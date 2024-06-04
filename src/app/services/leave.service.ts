import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  CollectionReference,
  addDoc,
  DocumentReference,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EmployeeService } from './employee.service'; // Ensure the path is correct
import { Leave } from '../interface/leave';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private leavesCollection: CollectionReference<Leave>;

  constructor(
    private firestore: Firestore,
    private employeeService: EmployeeService
  ) {
    this.leavesCollection = collection(
      this.firestore,
      'leaves'
    ) as CollectionReference<Leave>;
  }

  // Adding Leave
  addLeave(
    leave: boolean,
    employeeId: string,
    leaveType: string
  ): Promise<DocumentReference<Leave>> {
    return addDoc(this.leavesCollection, { leave, employeeId, leaveType });
  }

  // Getting leaves collection as an observable
  getLeaves(): Observable<Leave[]> {
    return collectionData(this.leavesCollection, {
      idField: 'id',
    }) as Observable<Leave[]>;
  }

  // Filing a leave for an employee
  fileLeave(
    employeeId: string,
    leaveType: string
  ): Observable<DocumentReference<Leave>> {
    const leaveDocument = { leave: true, employeeId, leaveType };
    return from(addDoc(this.leavesCollection, leaveDocument));
  }

  // Getting leaves with employee details
  getLeavesWithEmployeeDetails(): Observable<any[]> {
    return this.getLeaves().pipe(
      switchMap((leaves) => {
        return this.employeeService.getEmployees().pipe(
          map((employees) => {
            return leaves.map((leave) => {
              const employee = employees.find((e) => e.id === leave.employeeId);
              return {
                ...leave,
                employeeName: employee?.name,
                employeeDepartment: employee?.department,
              };
            });
          })
        );
      })
    );
  }

  getLeavesByEmployeeId(employeeId: string): Observable<Leave[]> {
    return collectionData(this.leavesCollection, { idField: 'id' }).pipe(
      map((leaves) => leaves.filter((leave) => leave.employeeId === employeeId))
    ) as Observable<Leave[]>;
  }
}
