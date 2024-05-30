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
} from '@angular/fire/firestore';

import { Observable, merge } from 'rxjs';

import { Employee } from 'src/employee';

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
    return addDoc(this.employeesCollection, employee);
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
}
