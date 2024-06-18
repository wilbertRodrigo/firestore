import { Employee } from './employee';
import { Leave } from './leave';

export interface EmployeeWithLeave extends Employee {
  leaveDetails?: Leave; // Optional property to hold leave details
}
