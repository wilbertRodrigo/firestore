import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  collectionData,
  deleteDoc,
  updateDoc,
  setDoc,
  CollectionReference,
  DocumentReference,
  getDoc,
} from '@angular/fire/firestore';

import { Observable, merge, from } from 'rxjs';

import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  ngOnInit() {}
  private employeesCollection: CollectionReference<Employee>;

  constructor(private firestore: Firestore) {
    this.employeesCollection = collection(
      this.firestore,
      'employees'
    ) as CollectionReference<Employee>;
  }

  //adding Employee

  addEmployee(employee: Employee) {
    const newEmployee: Employee = {
      ...employee,
      leaveCredits: 20,
      leaves: [],
    };
    return addDoc(this.employeesCollection, newEmployee);
  }

  //getting all Employees
  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, {
      idField: 'id',
    }) as Observable<Employee[]>;
  }

  //removing employee
  removeEmployee(employee: Employee) {
    const employeeDocRef = doc(this.employeesCollection, employee.id);
    return deleteDoc(employeeDocRef);
  }

  //udpating employee
  updateEmployee(employee: Employee) {
    const employeeDocRef = doc(this.employeesCollection, employee.id);
    return updateDoc(employeeDocRef, employee);
  }

  // Getting Employee by ID
  getEmployeeById(employeeId: string): Observable<Employee> {
    const employeeDocRef = doc(
      this.firestore,
      `employees/${employeeId}`
    ) as DocumentReference<Employee>;
    return from(
      getDoc(employeeDocRef).then((doc) => {
        if (doc.exists()) {
          return { id: doc.id, ...doc.data() } as Employee;
        } else {
          throw new Error('Employee not found');
        }
      })
    );
  }

  updateEmployeeLeaveStatus(
    employeeId: string,
    leaveStatus: boolean
  ): Promise<void> {
    const employeeDocRef = doc(this.employeesCollection, employeeId);
    return updateDoc(employeeDocRef, {});
  }
}
